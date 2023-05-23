import { s as syncStorage, l as localStorage } from '../chunk.createVueComponent-bde6c1e7.js';
import { a as addons } from '../chunk._virtual__addons-19cb23e2.js';
import { p as popups } from '../chunk._virtual__popups-ed3e2cce.js';
import { A as Addon } from '../chunk.index-b6ece9ed.js';

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_settings_page") {
    chrome.runtime.openOptionsPage();
  }
});

const periods = [
  {
    id: "15min",
    mins: 15
  },
  {
    id: "1hour",
    mins: 60
  },
  {
    id: "8hours",
    mins: 480
  },
  {
    id: "24hours",
    mins: 1440
  },
  {
    id: "untilEnabled",
    mins: Infinity
  }
];
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  id: "unmute",
  title: chrome.i18n.getMessage("unmute"),
  contexts: ["action"]
});
chrome.contextMenus.create({
  id: "mute",
  title: chrome.i18n.getMessage("mute"),
  contexts: ["action"]
});
for (const period of periods) {
  chrome.contextMenus.create({
    id: period.id,
    parentId: "mute",
    title: chrome.i18n.getMessage(period.id),
    contexts: ["action"]
  });
}
chrome.storage.local.get("muted").then(({ muted }) => contextMenuMuted(muted));
chrome.contextMenus.onClicked.addListener(
  ({ parentMenuItemId, menuItemId }) => {
    if (parentMenuItemId === "mute") {
      const period = periods.find(({ id }) => menuItemId === id);
      if (!period)
        throw "Unknown context menu item";
      contextMenuMuted(true);
      if (period.mins !== Infinity)
        chrome.alarms.create("muted", { delayInMinutes: period.mins });
    } else if (menuItemId === "unmute") {
      contextMenuMuted(false);
    }
  }
);
function contextMenuMuted(muted) {
  chrome.contextMenus.update("mute", { visible: !muted });
  chrome.contextMenus.update("unmute", { visible: muted });
  chrome.storage.local.set({ muted });
  const versionName = chrome.runtime.getManifest().version_name || "";
  versionName.includes("-prerelease");
}
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "muted") {
    contextMenuMuted(false);
  }
});

chrome.scripting.registerContentScripts([
  {
    id: "content-scripts",
    world: "MAIN",
    runAt: "document_start",
    matches: ["https://scratch.mit.edu/*"],
    js: ["mainworld/importer.js"],
    allFrames: true
  }
]).catch(() => {
});
chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
  if (!url)
    return;
  if (status !== "loading")
    return;
  const l10nUrls = await getL10NURLs(url);
  const { addonsEnabled } = await syncStorage.get("addonsEnabled");
  await chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",
    func: async (addonsEnabled2, l10nUrls2) => {
      await window.scratchAddonsReady;
      if (window.scratchAddons.loaded)
        return;
      window.scratchAddons.loaded = true;
      window.scratchAddons.events.dispatchEvent(
        new CustomEvent("loaded", { detail: { addonsEnabled: addonsEnabled2, l10nUrls: l10nUrls2 } })
      );
    },
    args: [addonsEnabled, l10nUrls]
  });
});
async function getL10NURLs(url) {
  const cookie = await chrome.cookies.get({ url, name: "scratchlanguage" });
  const langCode = cookie ? cookie.value || "en" : "en";
  const urls = [langCode];
  if (langCode === "pt") {
    urls.push("pt-br");
  }
  if (langCode.includes("-")) {
    urls.push(langCode.split("-")[0]);
  }
  if (!urls.includes("en"))
    urls.push("en");
  return urls;
}

chrome.runtime.onInstalled.addListener(async (details) => {
  const { version } = chrome.runtime.getManifest();
  if (details.reason === "install" || details.reason === "update" && details.previousVersion !== version) {
    localStorage.set({ installedDetails: details });
    chrome.runtime.openOptionsPage();
  }
});
chrome.management.getSelf().then((info) => {
  if (info.installType === "development") {
    const uiLanguage = chrome.i18n.getUILanguage();
    const utm = "?utm_source=extension&utm_medium=tabscreate&utm_campaign=v" + info.version;
    const url = info.homepageUrl + uiLanguage.split("-")[0] + "/farewell" + utm;
    console.log(url);
    chrome.runtime.setUninstallURL(url);
  }
});
syncStorage.get("addonsEnabled").then(({ addonsEnabled = {} }) => {
  const allAddons = { ...addons, ...popups };
  for (const id in allAddons) {
    const manifest = allAddons[id];
    if (addonsEnabled[id] === void 0)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }
  syncStorage.set({ addonsEnabled });
});

class Auth extends EventTarget {
  id;
  constructor(id) {
    super();
    this.id = id;
    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
      if (cookie.name === "scratchsessionsid") {
        this.dispatchEvent(new CustomEvent("updatedSession"));
      }
    });
  }
  async getSession() {
    return await (await fetch("https://scratch.mit.edu/session/", {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })).json();
  }
  async getMessageCount() {
    const session = await this.getSession();
    if (!session.user)
      return 0;
    const { count } = await (await fetch(
      `https://api.scratch.mit.edu/users/${session.user.username}/messages/count?timestamp=${Date.now()}`
    )).json();
    return count;
  }
  async getMessages() {
    const session = await this.getSession();
    if (!session.user)
      return [];
    const messageCount = await this.getMessageCount();
    const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
    const pages = [];
    for (let i = 0; i < maxPages; i++) {
      const page = await (await fetch(
        `https://api.scratch.mit.edu/users/${session.user.username}/messages?limit=40&offset=${40 * i}`,
        {
          headers: {
            "x-token": session.user.token
          }
        }
      )).json();
      pages.push(page);
    }
    return pages.flat();
  }
}

class WorkerAddon extends Addon {
  auth;
  constructor(id) {
    super(id);
    this.auth = new Auth(id);
  }
}

const allAddons = { ...addons, ...popups };
const runningScripts = {};
for (const id in allAddons) {
  const addon = allAddons[id];
  if (!addon.worker)
    continue;
  if (runningScripts[id])
    continue;
  runningScripts[id] = new WorkerAddon(id);
  addon.worker(runningScripts[id]);
}
