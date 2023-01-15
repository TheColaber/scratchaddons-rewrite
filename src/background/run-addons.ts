chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
  if (!url) return;
  if (status !== "loading") return;

  // chrome.scripting.executeScript({
  //   target: { tabId },
  //   injectImmediately: true,
  //   world: chrome.scripting.ExecutionWorld.MAIN,
  //   files: ["content-scripts/fix-console.js", "content-scripts/prototype-handler.js", "content-scripts/load-redux.js"],
  // });

  // const { globalState, addonsWithUserscripts, styles } = await getInfo(url);

  const l10nUrls = await getL10NURLs(url);

  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  await chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",
    func: async (script: string, addonsEnabled, l10nUrls) => {
      const { default: module } = await import(script);
      module(addonsEnabled, l10nUrls);
    },
    args: [
      chrome.runtime.getURL("mainworld/index.js"),
      addonsEnabled,
      l10nUrls,
    ],
  });

  await chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",
    func: async (id: string) => {
      window.scratchAddons.events.dispatchEvent(
        new CustomEvent("addonChange", { detail: { id } })
      );
    },
    args: ["scratch-messaging"],
  });

  // if (!styles.length) return;
  // chrome.scripting.insertCSS({
  //   target: { tabId },
  //   // origin: chrome.scripting.StyleOrigin.AUTHOR,
  //   files: styles.map((style) => style.href),
  // });
});

async function getL10NURLs(url: string) {
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
  if (!urls.includes(enJSON)) urls.push(enJSON);
  return urls;
}
