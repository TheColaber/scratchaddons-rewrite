import * as addons from "#addons";
import * as popups from "#popups";

export default async function () {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  const allAddons = { ...addons, ...popups };
  for (const id in allAddons) {
    const manifest = allAddons[id];
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  chrome.storage.sync.set({ addonsEnabled });
};
