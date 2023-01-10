import * as addons from "#addons";

export default function (addonsEnabled: any, l10nUrls: string[], baseUrl: string) {  
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      /* @ts-ignore */
      const addon = addons[id];
      console.log(addon);
      
      if (!addon) continue;
      for (const {url} of addon.userscripts) {
        import(baseUrl + url)

      }
    }
  }
}
