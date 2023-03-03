import { syncStorage } from "./storage";

chrome.scripting
  .registerContentScripts([
    {
      id: "content-scripts",
      world: "MAIN",
      runAt: "document_start",
      matches: ["https://scratch.mit.edu/*"],
      js: ["mainworld/importer.js"],
      allFrames: true,
    },
  ])
  .catch(() => {
    /* We catch because we might error "Duplicate content script id" */
  });

chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
  if (!url) return;
  if (status !== "loading") return;

  const l10nUrls = await getL10NURLs(url);

  const { addonsEnabled } = await syncStorage.get("addonsEnabled");

  await chrome.scripting.executeScript<
    [typeof addonsEnabled, typeof l10nUrls],
    void
  >({
    target: { tabId },
    injectImmediately: true,
    world: "MAIN",
    func: async (addonsEnabled, l10nUrls) => {
      await window.scratchAddonsReady;
      if (window.scratchAddons.loaded) return;
      window.scratchAddons.loaded = true;
      window.scratchAddons.events.dispatchEvent(
        new CustomEvent("loaded", { detail: { addonsEnabled, l10nUrls } })
      );
    },
    args: [addonsEnabled, l10nUrls],
  });

  // await new Promise((r) => setTimeout(r, 3000));

  // await chrome.scripting.executeScript({
  //   target: { tabId },
  //   injectImmediately: true,
  //   world: "MAIN",
  //   func: async (id: string) => {
  //     window.scratchAddons.events.dispatchEvent(
  //       new CustomEvent("addonDynamicDisable", { detail: { id } })
  //     );
  //   },
  //   args: ["find-bar"],
  // });

  // await new Promise((r) => setTimeout(r, 3000));

  // await chrome.scripting.executeScript({
  //   target: { tabId },
  //   injectImmediately: true,
  //   world: "MAIN",
  //   func: async (id: string) => {
  //     window.scratchAddons.events.dispatchEvent(
  //       new CustomEvent("addonDynamicEnable", { detail: { id } })
  //     );
  //   },
  //   args: ["find-bar"],
  // });
});

async function getL10NURLs(url: string) {
  const cookie = await chrome.cookies.get({ url, name: "scratchlanguage" });
  const langCode = cookie ? cookie.value || "en" : "en";

  const urls = [langCode];
  if (langCode === "pt") {
    urls.push("pt-br");
  }

  if (langCode.includes("-")) {
    urls.push(langCode.split("-")[0]);
  }
  if (!urls.includes("en")) urls.push("en");
  return urls;
}
