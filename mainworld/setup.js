class SharedObserver {
    inactive;
    pending;
    observer;
    constructor() {
        this.inactive = true;
        this.pending = new Set();
        this.observer = new MutationObserver((mutation, observer) => {
            for (const item of this.pending) {
                if (item.condition && !item.condition())
                    continue;
                for (const match of document.querySelectorAll(item.query)) {
                    if (item.seen?.has(match))
                        continue;
                    if (item.elementCondition && !item.elementCondition(match))
                        continue;
                    item.seen?.add(match);
                    this.pending.delete(item);
                    item.resolve(match);
                    break;
                }
            }
            if (this.pending.size === 0) {
                this.inactive = true;
                this.observer.disconnect();
            }
        });
    }
    watch(opts) {
        if (this.inactive) {
            this.inactive = false;
            this.observer.observe(document.documentElement, {
                subtree: true,
                childList: true,
            });
        }
        return new Promise((resolve) => this.pending.add({
            resolve,
            ...opts,
        }));
    }
}

window.scratchAddons = {
    console: { ...console },
    events: new EventTarget(),
    redux: { target: new EventTarget() },
    sharedObserver: new SharedObserver(),
    classNames: { loaded: false, arr: [] },
};
window.scratchAddons.sharedObserver.watch({ query: "title" }).then(loadClasses);
async function loadClasses() {
    window.scratchAddons.classNames.arr = [
        ...new Set([...document.styleSheets]
            .filter((styleSheet) => !(styleSheet.ownerNode &&
            styleSheet.ownerNode.textContent &&
            styleSheet.ownerNode.textContent.startsWith("/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library.") &&
            (styleSheet.ownerNode.textContent.includes("input_input-form") ||
                styleSheet.ownerNode.textContent.includes("label_input-group_"))))
            .flatMap((styleSheet) => [...styleSheet.cssRules])
            .filter((cssRule) => cssRule instanceof CSSStyleRule)
            .map((styleRule) => styleRule.selectorText)
            .flatMap((selectorTest) => selectorTest.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g))
            .filter((regexMatch) => !!regexMatch)),
    ];
    window.scratchAddons.classNames.loaded = true;
    const seenNonAddedClasses = new WeakSet();
    while (true) {
        const nonAddedClass = await window.scratchAddons.sharedObserver.watch({
            query: "[class*='scratchAddonsScratchClass/']",
            seen: seenNonAddedClasses,
        });
        nonAddedClass.classList.forEach((className) => {
            if (!className.startsWith("scratchAddonsScratchClass"))
                return;
            const classNameToFind = className.substring(className.indexOf("/") + 1);
            const scratchClass = window.scratchAddons.classNames.arr.find((className) => className.startsWith(classNameToFind + "_") &&
                className.length === classNameToFind.length + 6);
            if (scratchClass) {
                nonAddedClass.classList.replace(className, scratchClass);
            }
        });
    }
}
