import * as addons from "#addons";

(async () => {
  const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");

  for (const id in addons) {
    const addon = addons[id];
    if (!addon.worker) continue;
    if (!addonsEnabled[id]) continue;
    addon.worker();
  }
})();
