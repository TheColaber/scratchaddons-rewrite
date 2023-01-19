import { a as addons } from '../chunk._virtual__addons.js';
import MATCH_PATTERNS from './matches.js';
import '../chunk.define-manifest.js';
import '../chunk.style-inject.es.js';

class Addon extends EventTarget {
    id;
    browser;
    disabled;
    constructor(id) {
        super();
        this.id = id;
        // catches both Chrome and Chromium
        this.browser = /Chrom/.test(navigator.userAgent) ? "chrome" : "firefox";
        this.disabled = false;
        this.addEventListener("disabled", () => (this.disabled = true));
        this.addEventListener("reenabled", () => (this.disabled = false));
    }
}

class ReduxHandler extends EventTarget {
    initialized;
    constructor() {
        super();
        this.initialized = false;
        this.initialize();
    }
    /**
     * Initialize the handler. Must be called before adding events.
     */
    initialize() {
        if (!window.scratchAddons.redux.target || this.initialized)
            return;
        this.initialized = true;
        window.scratchAddons.redux.target.addEventListener("statechanged", (({ detail, }) => {
            const newEvent = new CustomEvent("statechanged", {
                detail: {
                    action: detail.action,
                    prev: detail.prev,
                    next: detail.next,
                },
            });
            this.dispatchEvent(newEvent);
        }));
    }
    /**
     * Redux state.
     * @type {object}
     */
    get state() {
        return window.scratchAddons.redux.state;
    }
    /**
     * Dispatches redux state change.
     * @param {object} payload - payload to pass to redux.
     * @throws when Redux is unavailable.
     */
    dispatch(payload) {
        if (!window.scratchAddons.redux.dispatch)
            throw new Error("Redux is unavailable");
        window.scratchAddons.redux.dispatch(payload);
    }
    /**
     * Waits until a state meets the condition.
     * @param {function} condition - a function that takes redux state and returns whether to keep waiting or not.
     * @param {object=} opts - options.
     * @param {string=|string[]=} actions - the action(s) to check for.
     * @returns {Promise} a Promise resolved when the state meets the condition.
     */
    waitForState(condition, { actions } = {}) {
        return new Promise((resolve, reject) => {
            this.initialize();
            if (!window.scratchAddons.redux.target)
                return reject("Redux not found.");
            if (condition(window.scratchAddons.redux.state))
                return resolve(true);
            if (typeof actions === "string")
                actions = [actions];
            const listener = (({ detail }) => {
                if (!window.scratchAddons.redux.target)
                    return reject("Redux not found.");
                if (actions && !actions.includes(detail.action.type))
                    return;
                if (!condition(detail.next))
                    return;
                window.scratchAddons.redux.target.removeEventListener("statechanged", listener);
                // TODO: WHY DO WE DO THIS????
                setTimeout(resolve, 0);
            });
            window.scratchAddons.redux.target.addEventListener("statechanged", listener);
        });
    }
}

class Tab {
    id;
    _cache;
    _waitForElementSet;
    redux;
    _react_internal_key;
    constructor(id) {
        this.id = id;
        this._cache = { Blockly: null };
        this._waitForElementSet = new WeakSet();
        this.redux = new ReduxHandler();
        this._react_internal_key = undefined;
    }
    get REACT_INTERNAL_PREFIX() {
        return "__reactInternalInstance$";
    }
    getInternalKey(elem) {
        if (!this._react_internal_key) {
            this._react_internal_key = Object.keys(elem).find((key) => key.startsWith(this.REACT_INTERNAL_PREFIX));
        }
        return this._react_internal_key;
    }
    displayNoneWhileDisabled(el) {
        el.setAttribute("data-addon-disabled-" + this.id, "");
    }
    scratchClass(...args) {
        let res = "";
        args.forEach((classNameToFind) => {
            if (typeof classNameToFind !== "string")
                return;
            if (window.scratchAddons.classNames.loaded) {
                // TODO: Make regex B)
                res +=
                    window.scratchAddons.classNames.arr.find((className) => className.startsWith(classNameToFind + "_") &&
                        className.length === classNameToFind.length + 6) || "";
            }
            else {
                res += `scratchAddonsScratchClass/${classNameToFind}`;
            }
            res += " ";
        });
        const options = args[args.length - 1];
        if (typeof options === "object") {
            const classNames = Array.isArray(options.others)
                ? options.others
                : [options.others];
            classNames.forEach((string) => (res += string + " "));
        }
        res = res.slice(0, -1);
        // Sanitize just in case
        res = res.replace(/"/g, "");
        return res;
    }
    waitForElement(selector, { markAsSeen = false, condition, reduxCondition, elementCondition, reduxEvents, }) {
        if (!condition || condition()) {
            const firstQuery = document.querySelectorAll(selector);
            for (const element of firstQuery) {
                if (this._waitForElementSet.has(element))
                    continue;
                if (elementCondition && !elementCondition(element))
                    continue;
                if (markAsSeen)
                    this._waitForElementSet.add(element);
                return Promise.resolve(element);
            }
        }
        let satisfied = false;
        let combinedCondition = () => {
            if (condition && !condition())
                return false;
            if (this.redux.state) {
                if (reduxCondition && !reduxCondition(this.redux.state))
                    return false;
            }
            // NOTE: this may reach sooner than expected, if redux state is not available
            // because of timing issues. However this is just an optimization! It's fine
            // if it runs a little earlier. Just don't error out.
            return reduxEvents ? satisfied : true;
        };
        const promise = window.scratchAddons.sharedObserver.watch({
            query: selector,
            seen: markAsSeen ? this._waitForElementSet : null,
            condition: combinedCondition,
            elementCondition,
        });
        if (reduxEvents) {
            let listener = (({ detail }) => {
                if (reduxEvents.includes(detail.action.type)) {
                    satisfied = true;
                }
            });
            this.redux.initialize();
            this.redux.addEventListener("statechanged", listener);
            promise.then((match) => {
                this.redux.removeEventListener("statechanged", listener);
                return match;
            });
        }
        return promise;
    }
    get editorMode() {
        const pathname = location.pathname.toLowerCase();
        const split = pathname.split("/").filter(Boolean);
        if (!split[0] || split[0] !== "projects")
            return null;
        if (split.includes("editor"))
            return "editor";
        if (split.includes("fullscreen"))
            return "fullscreen";
        if (split.includes("embed"))
            return "embed";
        return "projectpage";
    }
    async getBlockly() {
        if (this._cache.Blockly)
            return this._cache.Blockly;
        if (!this.editorMode || this.editorMode === "embed") {
            throw new Error(`Cannot access Blockly on ${this.editorMode} page (${location.pathname})`);
        }
        const elem = await this.waitForElement('[class^="gui_blocks-wrapper"]', {
            reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly,
        });
        const internalKey = this.getInternalKey(elem);
        if (!internalKey) {
            throw "React Internal Key not found on gui_blocks-wrapper";
        }
        // TODO: we shouldn't need to use any here.
        const internal = elem[internalKey];
        let childable = internal;
        while (((childable = childable.child),
            !childable || !childable.stateNode || !childable.stateNode.ScratchBlocks)) { }
        return (this._cache.Blockly = childable.stateNode.ScratchBlocks);
    }
}

class UserscriptAddon extends Addon {
    enabledLate;
    path;
    tab;
    constructor(id, enabledLate) {
        super(id);
        this.tab = new Tab(id);
        this.path = new URL(import.meta.url).origin;
        this.enabledLate = enabledLate;
    }
}

window.scratchAddons.events.addEventListener("addonChange", (event) => {
    console.log(event);
});
async function index (addonsEnabled, l10nUrls) {
    for (const id in addonsEnabled) {
        if (addonsEnabled[id]) {
            const addon = addons[id];
            if (!addon || !addon.userscripts)
                continue;
            for (const { func, matches } of addon.userscripts) {
                let urlMatches = false;
                for (const match of matches) {
                    if (MATCH_PATTERNS[match].test(window.location.pathname)) {
                        urlMatches = true;
                    }
                }
                if (urlMatches) {
                    window.scratchAddons.console.log(id, "is now running!");
                    func({
                        addon: new UserscriptAddon(id, false),
                        console: window.scratchAddons.console,
                        msg: (msg) => {
                            console.log(l10nUrls);
                            return "test";
                        },
                    });
                }
            }
        }
    }
}

export { index as default };
