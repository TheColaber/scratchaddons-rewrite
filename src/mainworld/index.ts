import * as addons from "#addons";

export default function (addonsEnabled: any, l10nUrls: string[]) {
  for (const id in addonsEnabled) {
    if (addonsEnabled[id]) {
      /* @ts-ignore */
      const addon = addons[id];
      if (!addon) continue;
      const { manifest } = addon;
      console.log(manifest.userscripts);
    }
  }
  console.log(l10nUrls);
  // console.log(addons);
}
