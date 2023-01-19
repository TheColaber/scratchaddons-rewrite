import SharedObserver from "./classes/shared-observer";

window.scratchAddons = {
  console: { ...console },
  events: new EventTarget(),
  redux: {},
  sharedObserver: new SharedObserver(),
  classNames: { loaded: false, arr: [] },
};

window.scratchAddons.sharedObserver.watch({ query: "title" }).then(loadClasses);
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

  const seenNonAddedClasses = new WeakSet();
  while (true) {
    const nonAddedClass = await window.scratchAddons.sharedObserver.watch({
      query: "[class*='scratchAddonsScratchClass/']",
      seen: seenNonAddedClasses,
    });
    nonAddedClass.classList.forEach((className) => {
      if (!className.startsWith("scratchAddonsScratchClass")) return;
      const classNameToFind = className.substring(className.indexOf("/") + 1);
      const scratchClass = window.scratchAddons.classNames.arr.find(
        (className) =>
          className.startsWith(classNameToFind + "_") &&
          className.length === classNameToFind.length + 6
      );
      if (scratchClass) {
        nonAddedClass.classList.replace(className, scratchClass);
      }
    });
  }
}
