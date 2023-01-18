import SharedObserver from "./shared-observer";

window.scratchAddons = {
  console: { ...console },
  events: new EventTarget(),
  redux: {},
  sharedObserver: new SharedObserver(),
  classNames: { loaded: false, arr: [] }
};

if (document.querySelector("title")) {
  loadClasses();
  console.log("was slow");
  
}
else {
  const stylesObserver = new MutationObserver((mutationsList) => {
    if (document.querySelector("title")) {
      stylesObserver.disconnect();
      loadClasses();
    }
  });
  stylesObserver.observe(document.documentElement, { childList: true, subtree: true });
}

function loadClasses() {
  window.scratchAddons.classNames.arr = [
    ...new Set(
      [...document.styleSheets]
        .filter(
          (styleSheet) =>
            !(styleSheet.ownerNode && styleSheet.ownerNode.textContent &&
              styleSheet.ownerNode.textContent.startsWith(
                "/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library."
              ) &&
              (styleSheet.ownerNode.textContent.includes("input_input-form") ||
                styleSheet.ownerNode.textContent.includes("label_input-group_"))
            )
        )
        .map((e) => {
          try {
            return [...e.cssRules];
          } catch (e) {
            return [];
          }
        })
        .flat()
        .map((e) => e.selectorText)
        .filter((e) => e)
        .map((e) => e.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g))
        .filter((e) => e)
        .flat()
    ),
  ];
  window.scratchAddons.classNames.loaded = true;

  const fixPlaceHolderClasses = () =>
    document.querySelectorAll("[class*='scratchAddonsScratchClass/']").forEach((el) => {
      [...el.classList]
        .filter((className) => className.startsWith("scratchAddonsScratchClass"))
        .map((className) => className.substring(className.indexOf("/") + 1))
        .forEach((classNameToFind) =>
          el.classList.replace(
            `scratchAddonsScratchClass/${classNameToFind}`,
          window.scratchAddons.classNames.arr.find(
              (className) =>
                className.startsWith(classNameToFind + "_") && className.length === classNameToFind.length + 6
            ) || `scratchAddonsScratchClass/${classNameToFind}`
          )
        );
    });

  fixPlaceHolderClasses();
  new MutationObserver(() => fixPlaceHolderClasses()).observe(document.documentElement, {
    attributes: false,
    childList: true,
    subtree: true,
  });
}