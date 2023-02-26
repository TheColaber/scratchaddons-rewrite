import { A as Addon } from './chunk.index-b6ece9ed.js';
import { a as addons } from './chunk._virtual__addons-19cb23e2.js';

class SharedObserver {
  inactive;
  pending;
  observer;
  constructor() {
    this.inactive = true;
    this.pending = /* @__PURE__ */ new Set();
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
        childList: true
      });
    }
    return new Promise(
      (resolve) => this.pending.add({
        resolve,
        ...opts
      })
    );
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
  scratchWWWNoProject: /^\/(?:(?:about|annual-report(?:\/\d+)?|camp|conference\/20(?:1[79]|[2-9]\d|18(?:\/(?:[^\/]+\/details|expect|plan|schedule))?)|contact-us|code-of-ethics|credits|developers|DMCA|download(?:\/(?:scratch2|scratch-link))?|educators(?:\/(?:faq|register|waiting))?|explore\/(?:project|studio)s\/\w+(?:\/\w+)?|community_guidelines|faq|ideas|join|messages|parents|privacy_policy(?:\/apps)?|research|scratch_1\.4|search\/(?:project|studio)s|starter-projects|classes\/(?:complete_registration|[^\/]+\/register\/[^\/]+)|signup\/[^\/]+|terms_of_use|wedo(?:-legacy)?|ev3|microbit|vernier|boost|studios\/\d*(?:\/(?:projects|comments|curators|activity))?|components|become-a-scratcher|projects)\/?)?$/
};

function injectStyle(css) {
  if (!globalThis.document)
    return;
  const style = document.createElement("style");
  style.classList.add("scratch-addons-style");
  style.textContent = css;
  if (document.body)
    document.documentElement.insertBefore(style, document.body);
  else
    document.documentElement.appendChild(style);
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
    promise: sharedObserver.watch({ query: "title" }).then(loadClasses)
  },
  Blockly: null,
  getInternalKey(elem) {
    if (!reactInternalKey) {
      const key = Object.keys(elem).find(
        (key2) => key2.startsWith("__reactInternalInstance$")
      );
      if (!key)
        throw "Element is not a react element.";
      reactInternalKey = key;
    }
    return reactInternalKey;
  },
  async getBlockly() {
    if (!window.scratchAddons.Blockly) {
      const elem = await sharedObserver.watch({
        query: '[class^="gui_blocks-wrapper"]'
      });
      const internalKey = window.scratchAddons.getInternalKey(elem);
      if (!internalKey) {
        throw "React Internal Key not found on gui_blocks-wrapper";
      }
      const internal = elem[internalKey];
      let childable = internal;
      while (childable = childable.child, !childable || !childable.stateNode || !childable.stateNode.ScratchBlocks) {
      }
      window.scratchAddons.Blockly = childable.stateNode.ScratchBlocks;
      if (!window.scratchAddons.Blockly) {
        throw new Error(
          `Blockly was type ${typeof window.scratchAddons.Blockly} on page (${location.pathname})`
        );
      }
    }
    return window.scratchAddons.Blockly;
  }
};
const ranAt = (/* @__PURE__ */ new Date()).getTime();
const AddonInstances = [];
window.scratchAddons.events.addEventListener(
  "loaded",
  async ({ detail }) => {
    console.log(
      "Scratch Addons: Data received from storage",
      (/* @__PURE__ */ new Date()).getTime() - ranAt,
      "ms"
    );
    const { addonsEnabled, l10nUrls } = detail;
    for (const id in addonsEnabled) {
      if (!addonsEnabled[id])
        continue;
      const addon = addons[id];
      if (!addon || !addon.scripts)
        continue;
      for (const { matches, scripts, styles, runAtComplete } of addon.scripts) {
        let urlMatches = false;
        for (const match of matches) {
          if (MATCH_PATTERNS[match].test(window.location.pathname)) {
            urlMatches = true;
          }
        }
        if (!urlMatches)
          continue;
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
              }
            });
          }
        }
        if (styles) {
          for (const style of styles) {
            let urlMatches2 = false;
            for (const match of matches) {
              if (MATCH_PATTERNS[match].test(window.location.pathname)) {
                urlMatches2 = true;
              }
            }
            if (urlMatches2) {
              injectStyle(style);
            }
          }
        }
      }
    }
  }
);
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
async function loadClasses() {
  window.scratchAddons.classNames.arr = [
    ...new Set(
      [...document.styleSheets].filter(
        (styleSheet) => !(styleSheet.ownerNode && styleSheet.ownerNode.textContent && styleSheet.ownerNode.textContent.startsWith(
          "/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library."
        ) && (styleSheet.ownerNode.textContent.includes("input_input-form") || styleSheet.ownerNode.textContent.includes("label_input-group_")))
      ).flatMap((styleSheet) => [...styleSheet.cssRules]).filter(
        (cssRule) => cssRule instanceof CSSStyleRule
      ).map((styleRule) => styleRule.selectorText).flatMap(
        (selectorTest) => selectorTest.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g)
      ).filter((regexMatch) => !!regexMatch)
    )
  ];
  window.scratchAddons.classNames.loaded = true;
}
