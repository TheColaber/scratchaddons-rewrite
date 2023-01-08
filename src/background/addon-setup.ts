import * as addons from "#addons";
import * as popups from "#popups";

(async function () {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  for (const id in { ...addons, ...popups }) {
    /* @ts-ignore */
    const manifest = addons[id];
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  chrome.storage.sync.set({ addonsEnabled });
})();
