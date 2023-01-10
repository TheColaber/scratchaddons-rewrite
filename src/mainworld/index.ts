import * as addons from "#addons";

export default function (addonsEnabled: any, l10nUrls: string[]) {
  console.log("test", addonsEnabled, l10nUrls);
  
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      /* @ts-ignore */
      const addon = addons[id];
      console.log(addon);
      
      if (!addon) continue;
      console.log(addon.userscripts);
    }
  }
  console.log(l10nUrls);
  // console.log(addons);
}
