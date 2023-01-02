import { popups } from "#addons";

export default async function () {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  for (const { id, manifest } of popups) {
    if (addonsEnabled[id] === undefined)
      addonsEnabled[id] = !!manifest.enabledByDefault;
  }

  chrome.storage.sync.set({ addonsEnabled });
}
