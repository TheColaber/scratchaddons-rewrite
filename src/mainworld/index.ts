import * as addons from "#addons";

export default async function (
  addonsEnabled: any,
  l10nUrls: string[],
  baseUrl: string
) {
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      /* @ts-ignore */
      const addon = addons[id];
      console.log(addon);

      if (!addon || !addon.userscripts) continue;
      for (const { func, matches } of addon.userscripts) {
        console.log(matches);

        func({ params: true });
      }
    }
  }
}
