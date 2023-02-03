import storage from "./storage";

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    storage.set({ openedSettingsReason: details.reason });
    chrome.runtime.openOptionsPage();
  }
});

chrome.management.getSelf().then((info) => {
  if (info.installType === "development") {
    const uiLanguage = chrome.i18n.getUILanguage();
    const utm =
      "farewell?utm_source=extension&utm_medium=tabscreate&utm_campaign=v" +
      info.version;
    const url = info.homepageUrl + "/" + uiLanguage.split("-")[0] + utm;
    console.log(url);
    chrome.runtime.setUninstallURL(url);
  }
});
