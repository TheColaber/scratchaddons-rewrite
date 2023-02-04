import storage from "./storage";
import * as addons from "#addons";
import * as popups from "#popups";

const allAddons = {...addons,...popups};
const runningScripts = {}

storage.valueStream.subscribe(({addonsEnabled}) => {
  if (addonsEnabled) {
    for (const id in allAddons) {
      const addon = allAddons[id];
      if (!addon.worker) continue;
      if (!addonsEnabled[id]) continue;
      if (runningScripts[id]) continue;
      runningScripts[id] = true
      addon.worker();
    }
  }
})