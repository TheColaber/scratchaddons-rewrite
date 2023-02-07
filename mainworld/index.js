import { a as addons } from '../chunk._virtual__addons-85f3862d.js';
import { A as Addon } from '../chunk.index-e4c60ce4.js';
import injectStyle from './inject-style.js';
import MATCH_PATTERNS from './matches.js';

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
    window.scratchAddons.redux.target.addEventListener("statechanged", ({
      detail
    }) => {
      const newEvent = new CustomEvent("statechanged", {
        detail: {
          action: detail.action,
          prev: detail.prev,
          next: detail.next
        }
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
  waitForState(condition, { actions } = {}) {
    return new Promise((resolve, reject) => {
      this.initialize();
      if (!window.scratchAddons.redux.target)
        return reject("Redux not found.");
      if (condition(window.scratchAddons.redux.state))
        return resolve(true);
      if (typeof actions === "string")
        actions = [actions];
      const listener = ({ detail }) => {
        if (!window.scratchAddons.redux.target)
          return reject("Redux not found.");
        if (actions && !actions.includes(detail.action.type))
          return;
        if (!condition(detail.next))
          return;
        window.scratchAddons.redux.target.removeEventListener(
          "statechanged",
          listener
        );
        setTimeout(resolve, 0);
      };
      window.scratchAddons.redux.target.addEventListener(
        "statechanged",
        listener
      );
    });
  }
}

class Tab {
  id;
  _waitForElementSet;
  redux;
  constructor(id) {
    this.id = id;
    this._waitForElementSet = /* @__PURE__ */ new WeakSet();
    this.redux = new ReduxHandler();
  }
  getInternalKey(elem) {
    return window.scratchAddons.getInternalKey(elem);
  }
  displayNoneWhileDisabled(el) {
    el.setAttribute("data-addon-disabled-" + this.id, "");
  }
  waitUntilScratchClassesLoaded() {
    return window.scratchAddons.classNames.promise;
  }
  scratchClass(...args) {
    let res = "";
    args.forEach((classNameToFind) => {
      if (typeof classNameToFind !== "string")
        return;
      if (window.scratchAddons.classNames.loaded) {
        const scratchClass = window.scratchAddons.classNames.arr.find(
          (className) => className.startsWith(classNameToFind + "_") && className.length === classNameToFind.length + 6
        );
        if (!scratchClass) {
          console.error("Could not find scratch class", classNameToFind);
        }
        res += scratchClass + " ";
      } else {
        console.error(
          "Scratch classes have not loaded. Use `await addon.tab.waitUntilScratchClassesLoaded()` before using scratchClass."
        );
      }
    });
    const options = args[args.length - 1];
    if (typeof options === "object") {
      const classNames = Array.isArray(options.others) ? options.others : [options.others];
      classNames.forEach((string) => res += string + " ");
    }
    res = res.slice(0, -1);
    res = res.replace(/"/g, "");
    return res;
  }
  waitForElement(selector, {
    markAsSeen = false,
    condition,
    reduxCondition,
    elementCondition,
    reduxEvents
  }) {
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
      return reduxEvents ? satisfied : true;
    };
    const promise = window.scratchAddons.sharedObserver.watch({
      query: selector,
      seen: markAsSeen ? this._waitForElementSet : null,
      condition: combinedCondition,
      elementCondition
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
    return window.scratchAddons.getBlockly();
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

const AddonInstances = [];
window.scratchAddons.events.addEventListener("addonDynamicDisable", (event) => {
  const id = event.detail.id;
  const addon = AddonInstances.find((addon2) => addon2.id === id);
  if (!addon)
    throw "HUH??";
  addon.dispatchEvent(new CustomEvent("dynamicDisable"));
  addon.disabled = true;
  const style = document.createElement("style");
  style.setAttribute("data-addon-disabled-style-" + id, "");
  style.textContent = `[data-addon-disabled-${id}] { display: none !important; }`;
  document.body.appendChild(style);
});
window.scratchAddons.events.addEventListener("addonDynamicEnable", (event) => {
  const id = event.detail.id;
  const addon = AddonInstances.find((addon2) => addon2.id === id);
  if (!addon)
    throw "HUH??";
  addon.dispatchEvent(new CustomEvent("dynamicEnable"));
  addon.disabled = false;
  const disabledStyle = document.querySelector(
    `[data-addon-disabled-style-${id}]`
  );
  if (disabledStyle) {
    disabledStyle.remove();
  }
});
async function index(addonsEnabled, l10nUrls) {
  window.scratchAddons.loaded = true;
  for (const id in addonsEnabled) {
    if (!addonsEnabled[id])
      continue;
    const addon = addons[id];
    if (!addon)
      continue;
    if (addon.userscripts) {
      for (const { script, matches } of addon.userscripts) {
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
          script({
            addon: addonInstance,
            console: window.scratchAddons.console,
            msg: (msg) => {
              console.log(l10nUrls);
              return "test";
            }
          });
        }
      }
    }
    if (addon.userstyles) {
      for (const { style, matches } of addon.userstyles) {
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

export { index as default };
