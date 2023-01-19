import * as addons from "#addons";
import UserscriptAddon from "../addon-api/userscript";
import MATCH_PATTERNS from "./matches";

window.scratchAddons.events.addEventListener("addonChange", (event) => {
  console.log(event);
});

export default async function (addonsEnabled: any, l10nUrls: string[]) {
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      const addon = addons[id];

      if (!addon || !addon.userscripts) continue;
      for (const { func, matches } of addon.userscripts) {
        let urlMatches = false;
        for (const match of matches) {
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }
        }
        if (urlMatches) {
          window.scratchAddons.console.log(id, "is now running!");
          func({
            addon: new UserscriptAddon(id, false),
            console: window.scratchAddons.console,
            msg: (msg) => {
              console.log(l10nUrls);

              return "test";
            },
          });
        }
      }
    }
  }
}
