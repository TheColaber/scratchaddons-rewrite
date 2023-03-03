import * as addons from "#addons";
import * as popups from "#popups";
import { localStorage, syncStorage } from "./storage";

chrome.runtime.onInstalled.addListener(async (details) => {
  const { version } = chrome.runtime.getManifest();

  if (
    details.reason === "install" ||
    (details.reason === "update" && details.previousVersion !== version)
  ) {
    localStorage.set({ installedDetails: details });
    chrome.runtime.openOptionsPage();
  }
});

chrome.management.getSelf().then((info) => {
  if (info.installType === "development") {
    const uiLanguage = chrome.i18n.getUILanguage();
    const utm =
      "?utm_source=extension&utm_medium=tabscreate&utm_campaign=v" +
      info.version;
    const url = info.homepageUrl + uiLanguage.split("-")[0] + "/farewell" + utm;
    console.log(url);
    chrome.runtime.setUninstallURL(url);
  }
});

syncStorage.get("addonsEnabled").then(({ addonsEnabled = {} }) => {
  const allAddons = { ...addons, ...popups };
  for (const id in allAddons) {
    const manifest = allAddons[id];
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  syncStorage.set({ addonsEnabled });
});
