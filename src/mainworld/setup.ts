import SharedObserver from "./classes/shared-observer";
import { Blockly } from "../../types/apis/Blockly";

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
      const elem = await sharedObserver.watch({ query: '[class^="gui_blocks-wrapper"]' });
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

// let Blockly: any = undefined;
// Object.defineProperty(Object.prototype, "ScratchBlocks", {
//   set(data) {
//     Blockly = data
//     if (!data.WorkspaceSvg) return;

//     const BlocklyCreateDom = Blockly.WorkspaceSvg.prototype.createDom;
//     Blockly.WorkspaceSvg.prototype.createDom = function(opt_backgroundClass) {
//       console.log("lmao we trapped it :PPPPPP");
//       return BlocklyCreateDom.call(this, opt_backgroundClass)
//     }
//   },
//   get() {
//     return Blockly;
//   }
// })
