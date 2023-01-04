import { addons, popups } from "#addons";

(async function () {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  for (const { id, manifest } of addons.concat(popups)) {
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  chrome.storage.sync.set({ addonsEnabled });
})();
