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

      if (!addon) continue;
      for (const { url } of addon.userscripts) {
        const { default: func } = await import(baseUrl + url);
        func({ params: true });
      }
    }
  }
}
