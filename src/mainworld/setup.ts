import SharedObserver from "./classes/shared-observer";

const sharedObserver = new SharedObserver();
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

