import { a as addons } from '../chunk._virtual__addons.js';
import '../addons/editor/find-bar/userscript.js';
import '../addons/community/account-switcher/addon.js';
import '../chunk.define-manifest.js';
import '../addons/community/account-switcher/worker.js';
import '../addons/editor/find-bar/addon.js';
import '../addons/popup/msg-count-badge/addon.js';
import '../addons/popup/msg-count-badge/worker.js';
import '../chunk.style-inject.es.js';

class Addon extends EventTarget {
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
        window.scratchAddons.redux.target.addEventListener("statechanged", ({ detail }) => {
            const newEvent = new CustomEvent("statechanged", {
                detail: {
                    action: detail.action,
                    prev: detail.prev,
                    next: detail.next,
                },
            });
            this.dispatchEvent(newEvent);
        });
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
    waitForState(condition, opts = {}) {
        this.initialize();
        if (!window.scratchAddons.redux.target)
            return Promise.reject(new Error("Redux is unavailable"));
        if (condition(window.scratchAddons.redux.state))
            return Promise.resolve();
        let actions = opts.actions || null;
        if (typeof actions === "string")
            actions = [actions];
        return new Promise((resolve) => {
            const listener = ({ detail }) => {
                if (actions && !actions.includes(detail.action.type))
                    return;
                if (!condition(detail.next))
                    return;
                window.scratchAddons.redux.target.removeEventListener("statechanged", listener);
                setTimeout(resolve, 0);
            };
            window.scratchAddons.redux.target.addEventListener("statechanged", listener);
        });
    }
}

class Tab {
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
        return "todo-scratchclass-sa";
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
            let listener = ({ detail }) => {
                if (reduxEvents.includes(detail.action.type)) {
                    satisfied = true;
                }
            };
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
        const internal = elem[internalKey];
        let childable = internal;
        /* eslint-disable no-empty */
        while (((childable = childable.child),
            !childable || !childable.stateNode || !childable.stateNode.ScratchBlocks)) { }
        /* eslint-enable no-empty */
        return (this._cache.Blockly = childable.stateNode.ScratchBlocks);
    }
}

class UserscriptAddon extends Addon {
    constructor(id, enabledLate) {
        super(id);
        this.tab = new Tab(id);
        this.path = new URL(import.meta.url).origin;
        this.enabledLate = enabledLate;
    }
}

var MATCH_PATTERNS = {
    projects: /^\/projects\/(?:editor|\d+(?:\/(?:fullscreen|editor))?)\/?$/,
    projectEmbeds: /^\/projects\/\d+\/embed\/?$/,
    studios: /^\/studios\/\d+(?:\/(?:projects|comments|curators|activity))?\/?$/,
    profiles: /^\/users\/[\w-]+\/?$/,
    topics: /^\/discuss\/topic\/\d+\/?$/,
    newPostScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add)\/?$/,
    editingScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add|post\/\d+\/edit|settings\/[\w-]+)\/?$/,
    forums: /^\/discuss(?!\/m(?:$|\/))(?:\/.*)?$/,
    // scratch-www routes, not including project pages
    // Matches /projects (an error page) but not /projects/<id>
    scratchWWWNoProject: /^\/(?:(?:about|annual-report(?:\/\d+)?|camp|conference\/20(?:1[79]|[2-9]\d|18(?:\/(?:[^\/]+\/details|expect|plan|schedule))?)|contact-us|code-of-ethics|credits|developers|DMCA|download(?:\/(?:scratch2|scratch-link))?|educators(?:\/(?:faq|register|waiting))?|explore\/(?:project|studio)s\/\w+(?:\/\w+)?|community_guidelines|faq|ideas|join|messages|parents|privacy_policy(?:\/apps)?|research|scratch_1\.4|search\/(?:project|studio)s|starter-projects|classes\/(?:complete_registration|[^\/]+\/register\/[^\/]+)|signup\/[^\/]+|terms_of_use|wedo(?:-legacy)?|ev3|microbit|vernier|boost|studios\/\d*(?:\/(?:projects|comments|curators|activity))?|components|become-a-scratcher|projects)\/?)?$/,
};

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
