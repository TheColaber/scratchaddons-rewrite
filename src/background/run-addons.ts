chrome.scripting.getRegisteredContentScripts({ ids: ["load-redux"] }).then((contentScript) => {
  if (contentScript.find((cs) => cs.id === "load-redux")) return;
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
});

chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
  if (!url) return;
  if (status !== "loading") return;

  const l10nUrls = await getL10NURLs(url);

  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  await chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",

    func: async (script: string, addonsEnabled, l10nUrls) => {
      if (window.scratchAddons.loaded) return;
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
    func: async (id: string) => {
      window.scratchAddons.events.dispatchEvent(
        new CustomEvent("addonDynamicDisable", { detail: { id } })
      );
    },
    args: ["find-bar"],
  });

  await new Promise((r) => setTimeout(r, 3000));

  await chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",
    func: async (id: string) => {
      window.scratchAddons.events.dispatchEvent(
        new CustomEvent("addonDynamicEnable", { detail: { id } })
      );
    },
    args: ["find-bar"],
  });
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
