import { a as addons } from '../chunk._virtual__addons.js';
import { p as popups } from '../chunk._virtual__popups.js';
import '../chunk.runtime-core.esm-bundler.js';
import '../chunk.define-manifest.js';
import '../chunk.style-inject.es.js';

// chrome.scripting.unregisterContentScripts({ ids: ["load-redux"]})
chrome.scripting.registerContentScripts([
    {
        id: "load-redux",
        world: "MAIN",
        runAt: "document_start",
        matches: ["https://scratch.mit.edu/*"],
        js: ["mainworld/setup.js", "mainworld/load-redux.js"],
        allFrames: true,
    },
]);
chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
    if (!url)
        return;
    if (status !== "loading")
        return;
    const l10nUrls = await getL10NURLs(url);
    const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");
    await chrome.scripting.executeScript({
        target: { tabId },
        injectImmediately: true,
        world: "MAIN",
        func: async (script, addonsEnabled, l10nUrls) => {
            if (window.scratchAddons.loaded)
                return;
            // TODO: lets rollupify or smth
            const { default: module } = await import(script);
            module(addonsEnabled, l10nUrls);
        },
        args: [
            chrome.runtime.getURL("mainworld/index.js"),
            addonsEnabled,
            l10nUrls,
        ],
    });
    await new Promise((r) => setTimeout(r, 3000));
    await chrome.scripting.executeScript({
        target: { tabId },
        injectImmediately: true,
        world: "MAIN",
        func: async (id) => {
            window.scratchAddons.events.dispatchEvent(new CustomEvent("addonDynamicDisable", { detail: { id } }));
        },
        args: ["find-bar"],
    });
    await new Promise((r) => setTimeout(r, 3000));
    await chrome.scripting.executeScript({
        target: { tabId },
        injectImmediately: true,
        world: "MAIN",
        func: async (id) => {
            window.scratchAddons.events.dispatchEvent(new CustomEvent("addonDynamicEnable", { detail: { id } }));
        },
        args: ["find-bar"],
    });
});
async function getL10NURLs(url) {
    const cookie = await chrome.cookies.get({ url, name: "scratchlanguage" });
    const langCode = cookie ? cookie.value || "en" : "en";
    const urls = [chrome.runtime.getURL(`addons-l10n/${langCode}`)];
    if (langCode === "pt") {
        urls.push(chrome.runtime.getURL(`addons-l10n/pt-br`));
    }
    if (langCode.includes("-")) {
        urls.push(chrome.runtime.getURL(`addons-l10n/${langCode.split("-")[0]}`));
    }
    const enJSON = chrome.runtime.getURL("addons-l10n/en");
    if (!urls.includes(enJSON))
        urls.push(enJSON);
    return urls;
}

const periods = [
    {
        id: "15min",
        mins: 15,
    },
    {
        id: "1hour",
        mins: 60,
    },
    {
        id: "8hours",
        mins: 480,
    },
    {
        id: "24hours",
        mins: 1440,
    },
    {
        id: "untilEnabled",
        mins: Infinity,
    },
];
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    id: "unmute",
    title: chrome.i18n.getMessage("unmute"),
    contexts: ["action"],
});
chrome.contextMenus.create({
    id: "mute",
    title: chrome.i18n.getMessage("mute"),
    contexts: ["action"],
});
for (const period of periods) {
    chrome.contextMenus.create({
        id: period.id,
        parentId: "mute",
        title: chrome.i18n.getMessage(period.id),
        contexts: ["action"],
    });
}
async function contextMenuSetup () {
    const { muted = false } = await chrome.storage.local.get("muted");
    contextMenuMuted(muted);
}
chrome.contextMenus.onClicked.addListener(({ parentMenuItemId, menuItemId }) => {
    if (parentMenuItemId === "mute") {
        const period = periods.find(({ id }) => menuItemId === id);
        if (!period)
            throw "Unknown context menu item";
        contextMenuMuted(true);
        if (period.mins !== Infinity)
            chrome.alarms.create("muted", { delayInMinutes: period.mins });
    }
    else if (menuItemId === "unmute") {
        contextMenuMuted(false);
    }
});
function contextMenuMuted(muted) {
    chrome.contextMenus.update("mute", { visible: !muted });
    chrome.contextMenus.update("unmute", { visible: muted });
    chrome.storage.local.set({ muted });
    const versionName = chrome.runtime.getManifest().version_name || "";
    const prerelease = versionName.includes("-prerelease");
    const icon = muted ? "icon-gray" : prerelease ? "icon-blue" : "icon";
    chrome.action.setIcon({
        path: {
            16: `../images/${icon}-16.png`,
            32: `../images/${icon}-32.png`,
        },
    });
}
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "muted") {
        contextMenuMuted(false);
    }
});

async function addonSetup () {
    const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");
    const allAddons = { ...addons, ...popups };
    for (const id in allAddons) {
        const manifest = allAddons[id];
        if (addonsEnabled[id] === undefined)
            addonsEnabled[id] = !!manifest.enabledByDefault;
    }
    chrome.storage.sync.set({ addonsEnabled });
}

var workerScripts = async () => {
    const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");
    for (const id in addons) {
        const addon = addons[id];
        if (!addon.worker)
            continue;
        if (!addonsEnabled[id])
            continue;
        addon.worker();
    }
};

// Creates Listener
contextMenuSetup();
(async () => {
    await addonSetup();
    await workerScripts();
})();
