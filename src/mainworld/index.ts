import * as addons from "#addons";
import UserscriptAddon from "../addon-api/userscript";
import MATCH_PATTERNS from "./matches";

const AddonInstances: UserscriptAddon[] = [];

window.scratchAddons.events.addEventListener("addonDynamicDisable", ((
  event: CustomEvent
) => {
  const id = event.detail.id;
  const addon = AddonInstances.find((addon) => addon.id === id);
  if (!addon) throw "HUH??";
  addon.dispatchEvent(new CustomEvent("dynamicDisable"));
  addon.disabled = true;
  const style = document.createElement("style");
  style.setAttribute("data-addon-disabled-style-" + id, "");
  style.textContent = `[data-addon-disabled-${id}] { display: none !important; }`;
  document.body.appendChild(style);
}) as EventListener);

window.scratchAddons.events.addEventListener("addonDynamicEnable", ((
  event: CustomEvent
) => {
  const id = event.detail.id;
  const addon = AddonInstances.find((addon) => addon.id === id);
  if (!addon) throw "HUH??";
  addon.dispatchEvent(new CustomEvent("dynamicEnable"));
  addon.disabled = false;
  const disabledStyle = document.querySelector(
    `[data-addon-disabled-style-${id}]`
  );
  if (disabledStyle) {
    disabledStyle.remove();
  }
}) as EventListener);

export default async function (addonsEnabled: any, l10nUrls: string[]) {
  window.scratchAddons.loaded = true;
  for (const id in addonsEnabled) {
    if (!addonsEnabled[id]) continue;
    const addon = addons[id];

    if (!addon) continue;
    if (addon.userscripts) {
      for (const { func, matches } of addon.userscripts) {
        let urlMatches = false;
        for (const match of matches) {
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }
        }
        if (urlMatches) {
          window.scratchAddons.console.log(id, "is now running!");
          const addonInstance = new UserscriptAddon(id, false);
          AddonInstances.push(addonInstance);
          func({
            addon: addonInstance,
            console: window.scratchAddons.console,
            msg: (msg) => {
              console.log(l10nUrls);

              return "test";
            },
          });
        }
      }
    }
    if (addon.userstyles) {
      for (const { url, matches } of addon.userstyles) {
        let urlMatches = false;
        for (const match of matches) {
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }
        }
        if (urlMatches) {
          const style = document.head.appendChild(document.createElement("style"))
        }
      }
    }
  }
}
