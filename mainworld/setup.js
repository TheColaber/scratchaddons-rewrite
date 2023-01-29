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

const sharedObserver = new SharedObserver();
let reactInternalKey = null;
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
            const key = Object.keys(elem).find((key) => key.startsWith("__reactInternalInstance$"));
            if (!key)
                throw "Element is not a react element.";
            reactInternalKey = key;
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
            const internal = elem[internalKey];
            let childable = internal;
            while (((childable = childable.child),
                !childable ||
                    !childable.stateNode ||
                    !childable.stateNode.ScratchBlocks)) { }
            window.scratchAddons.Blockly = childable.stateNode.ScratchBlocks;
            if (!window.scratchAddons.Blockly) {
                throw new Error(`Blockly was type ${typeof window.scratchAddons.Blockly} on page (${location.pathname})`);
            }
        }
        return window.scratchAddons.Blockly;
    },
};
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
