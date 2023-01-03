import { popups } from "#addons";

(async function () {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  for (const { id, manifest } of popups) {
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  chrome.storage.sync.set({ addonsEnabled });
})();
