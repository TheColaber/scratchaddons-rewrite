import SharedObserver from "./shared-observer";
import MATCH_PATTERNS from "./matches";
import injectStyle from "./inject-style";
import UserscriptAddon from "../addon-api/userscript";
import * as addons from "#addons";
// import { Blockly } from "../../types/apis/Blockly";

const sharedObserver = new SharedObserver();
let reactInternalKey: keyof Element | null = null;

window.scratchAddons = {
  loaded: false,
  console: { ...console },
  events: new EventTarget(),
  redux: { target: new EventTarget() },
  sharedObserver,
  classNames: {
    loaded: false,
    arr: [],
    promise: sharedObserver.watch({ query: "title" }).then(loadClasses),
  },
  Blockly: null,
  getInternalKey(elem) {
    if (!reactInternalKey) {
      const key = Object.keys(elem).find((key) =>
        key.startsWith("__reactInternalInstance$")
      );
      if (!key) throw "Element is not a react element.";
      reactInternalKey = key as keyof Element;
    }
    return reactInternalKey;
  },
  async getBlockly() {
    if (!window.scratchAddons.Blockly) {
      // if (!this.editorMode || this.editorMode === "embed") {
      //   throw new Error(
      //     `Cannot access Blockly on ${this.editorMode} page (${location.pathname})`
      //   );
      // }
      const elem = await sharedObserver.watch({
        query: '[class^="gui_blocks-wrapper"]',
      });
      const internalKey = window.scratchAddons.getInternalKey(elem);
      if (!internalKey) {
        throw "React Internal Key not found on gui_blocks-wrapper";
      }
      // TODO: we shouldn't need to use any here.
      const internal: any | { child: any; stateNode: any } = elem[internalKey];
      let childable = internal;
      while (
        ((childable = childable.child),
        !childable ||
          !childable.stateNode ||
          !childable.stateNode.ScratchBlocks)
      ) {}
      window.scratchAddons.Blockly = childable.stateNode.ScratchBlocks;
      if (!window.scratchAddons.Blockly) {
        throw new Error(
          `Blockly was type ${typeof window.scratchAddons.Blockly} on page (${
            location.pathname
          })`
        );
      }
    }
    return window.scratchAddons.Blockly;
  },
};

const ranAt = new Date().getTime();
const AddonInstances: UserscriptAddon[] = [];

window.scratchAddons.events.addEventListener(
  "loaded",
  async ({ detail }: CustomEvent) => {
    console.log(
      "Scratch Addons: Data received from storage",
      new Date().getTime() - ranAt,
      "ms"
    );

    const { addonsEnabled, l10nUrls } = detail;
    for (const id in addonsEnabled) {
      if (!addonsEnabled[id]) continue;
      const addon = addons[id];

      if (!addon || !addon.scripts) continue;
      for (const { matches, scripts, styles, runAtComplete } of addon.scripts) {
        let urlMatches = false;
        for (const match of matches) {
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }
        }
        if (!urlMatches) continue;
        if (scripts) {
          for (const script of scripts) {
            window.scratchAddons.console.log(id, "is now running!");
            const addonInstance = new UserscriptAddon(id, false);
            AddonInstances.push(addonInstance);
            script({
              addon: addonInstance,
              console: window.scratchAddons.console,
              msg: (msg) => {
                console.log(l10nUrls);

                return "test";
              },
            });
          }
        }
        if (styles) {
          for (const style of styles) {
            let urlMatches = false;
            for (const match of matches) {
              if (MATCH_PATTERNS[match].test(window.location.pathname)) {
                urlMatches = true;
              }
            }
            if (urlMatches) {
              injectStyle(style);
            }
          }
        }
      }
    }
  }
);

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


async function loadClasses() {
  window.scratchAddons.classNames.arr = [
    ...new Set(
      [...document.styleSheets]
        .filter(
          (styleSheet) =>
            !(
              styleSheet.ownerNode &&
              styleSheet.ownerNode.textContent &&
              styleSheet.ownerNode.textContent.startsWith(
                "/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library."
              ) &&
              (styleSheet.ownerNode.textContent.includes("input_input-form") ||
                styleSheet.ownerNode.textContent.includes("label_input-group_"))
            )
        )
        .flatMap((styleSheet) => [...styleSheet.cssRules])
        .filter(
          (cssRule): cssRule is CSSStyleRule => cssRule instanceof CSSStyleRule
        )
        .map((styleRule) => styleRule.selectorText)
        .flatMap((selectorTest) =>
          selectorTest.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g)
        )
        .filter(<T>(regexMatch: T | null): regexMatch is T => !!regexMatch)
    ),
  ];
  window.scratchAddons.classNames.loaded = true;
}
