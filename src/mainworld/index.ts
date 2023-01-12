import * as addons from "#addons";
import MATCH_PATTERNS from "./matches";

export default async function (
  addonsEnabled: any,
  l10nUrls: string[]
) {
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      /* @ts-ignore */
      const addon = addons[id];

      if (!addon || !addon.userscripts) continue;
      for (const { func, matches } of addon.userscripts) {
        let urlMatches = false;
        for (const match of matches) {
          /* @ts-ignore */
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }       
        }
        if (urlMatches) {
          func({ params: true });
        }
      }
    }
  }
}
