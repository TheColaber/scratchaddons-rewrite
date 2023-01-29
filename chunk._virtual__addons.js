import { d as defineManifest } from './chunk.define-manifest.js';

function defineScript(script) {
    return script;
}

async function worker$1 () {
    console.log("hi im a worker script");
}

var addon$2 = defineManifest({
    name: "Test Addon",
    description: "test desc",
    versionAdded: "1.0.0",
    tags: ["recommended"],
    enabledByDefault: true,
    worker: worker$1,
});

// import BlockInstance from "./blockly/BlockInstance.js";
// import Utils from "./blockly/Utils.js";
var script = defineScript(async function ({ addon, console, msg }) {
    const Blockly = await addon.tab.getBlockly();
    Blockly.getMainWorkspace();
    class FindBar {
        outerEl;
        inputEl;
        constructor() {
            // Outer
            this.outerEl = document.createElement("div");
            this.outerEl.className = "sa-find-bar";
            addon.tab.displayNoneWhileDisabled(this.outerEl);
            // Label
            const label = this.outerEl.appendChild(document.createElement("label"));
            label.htmlFor = "sa-find-input";
            label.textContent = msg("find");
            // Wrapper
            const wrapper = this.outerEl.appendChild(document.createElement("div"));
            wrapper.className = "sa-find-wrapper";
            // Dropdown
            const dropdown = wrapper.appendChild(document.createElement("div"));
            dropdown.className = "sa-find-dropdown-out";
            // Input
            this.inputEl = dropdown.appendChild(document.createElement("input"));
            this.inputEl.className = addon.tab.scratchClass("input_input-form", {
                others: "sa-find-input",
            });
            this.inputEl.id = "sa-find-input";
            this.inputEl.type = "search";
            this.inputEl.placeholder = msg("find-placeholder");
            this.inputEl.autocomplete = "off";
            // const workspace = new Blockly.WorkspaceSvg({
            //   getMetrics() {
            //     return {
            //       viewHeight: 100,
            //       viewWidth: 100,
            //       contentHeight: 100,
            //       contentWidth: 100,
            //       viewTop: 100,
            //       viewLeft: 100,
            //       contentTop: 100,
            //       contentLeft: 100,
            //       absoluteTop: 100,
            //       absoluteLeft: 100,
            //     };
            //   },
            // });
            // const dom = workspace.createDom()
            // const block = new Blockly.Block(workspace, "motion_movesteps");
            // console.log(dom);
        }
        attachDom(root) {
            root.appendChild(this.outerEl);
        }
    }
    const findBar = new FindBar();
    while (true) {
        const root = await addon.tab.waitForElement("ul[class*=gui_tab-list]", {
            markAsSeen: true,
            reduxEvents: [
                "scratch-gui/mode/SET_PLAYER",
                "fontsLoaded/SET_FONTS_LOADED",
                "scratch-gui/locales/SELECT_LOCALE",
            ],
            reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly,
        });
        findBar.attachDom(root);
    }
});

var css_248z = ".sa-find-bar {\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  width: 100%;\n  height: 100%;\n}\n.sa-find-bar[hidden] {\n  /* !important to override displayNoneWhileDisabled */\n  display: none !important;\n}\n\n.sa-find-bar > label {\n  /* padding instead of margin so clicking on the empty area will select the input */\n  padding-left: 1.5em;\n  padding-right: 1em;\n  font-weight: bold;\n  font-size: 0.625rem;\n  user-select: none;\n  cursor: default;\n  white-space: nowrap;\n  padding-top: 2px;\n}\n\n[dir=\"rtl\"] .sa-find-bar > label {\n  padding-right: 1.5em;\n  padding-left: 1em;\n}\n\n.sa-find-wrapper {\n  overflow: visible;\n  position: relative;\n  height: 2rem;\n  width: 100%;\n  max-width: 16em;\n}\n\n.sa-find-dropdown-out {\n  display: block;\n  top: -6px;\n  z-index: 100;\n  width: 100%;\n  max-width: 16em;\n  position: relative;\n  padding: 4px;\n  border: none;\n  border-radius: 4px;\n  margin-top: 6px;\n}\n\n.sa-find-dropdown-out.visible {\n  position: absolute;\n  width: 16em;\n  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.3);\n  background-color: white;\n}\n\n/* We need to modify Scratch styles so that the place where the find bar is injected */\n/* has actually correct size information, which is used to make the find bar not cover up controls */\n[class*=\"gui_tab-list_\"] {\n  width: 100%;\n}\n[class*=\"gui_tab_\"] {\n  flex-grow: 0;\n}\n\n.sa-find-input {\n  width: 100%;\n  box-sizing: border-box !important;\n  /* !important required for extension, because CSS injection method (and hence order) differs from addon */\n  height: 1.5rem;\n\n  /* Change Scratch default styles */\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  padding-left: 0.4em;\n}\n\n.sa-find-input:focus {\n  /* Change Scratch default styles */\n  box-shadow: none;\n}\n\n.sa-find-dropdown {\n  display: none;\n  position: relative;\n  padding: 0.2em 0;\n  font-size: 0.75rem;\n  line-height: 1;\n  overflow-y: auto;\n  min-height: 128px;\n  max-height: 65vh;\n  user-select: none;\n  max-width: 100%;\n  margin-top: 6px;\n  border: none;\n}\n\n.sa-find-dropdown-out.visible > .sa-find-dropdown {\n  display: block;\n}\n\n.sa-find-dropdown > li {\n  display: block;\n  padding: 0.5em 0.3em;\n  white-space: nowrap;\n  margin: 0;\n  font-weight: bold;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.sa-find-dropdown > li > b {\n  background-color: #aaffaa;\n  color: black;\n}\n\n/* Drop down items */\n.sa-find-dropdown > li:hover,\n.sa-find-dropdown > li.sel {\n  color: white;\n  cursor: pointer;\n}\n\n.sa-find-dropdown > li::before {\n  content: \"\\25CF \"; /* ● */\n}\n\n.sa-find-flag {\n  color: #4cbf56;\n}\n.sa-find-flag:hover,\n.sa-find-flag.sel {\n  background-color: #4cbf56;\n}\n\n.sa-find-dropdown .sa-block-color {\n  color: var(--sa-block-colored-text);\n}\n.sa-find-dropdown .sa-block-color:hover,\n.sa-find-dropdown .sa-block-color.sel {\n  background-color: var(--sa-block-bright-background);\n}\n\n.sa-find-carousel {\n  font-weight: normal;\n  position: absolute;\n  right: 0;\n  white-space: nowrap;\n  background-color: inherit;\n  z-index: 1;\n  padding: 0;\n}\n\n.sa-find-carousel-control {\n  padding: 0 6px;\n}\n\n.sa-find-carousel-control:hover {\n  color: #ffff80;\n}\n";

var addon$1 = defineManifest({
    name: "Find bar",
    description: "Creates a search bar next to the sounds tab to find and jump to scripts, costumes and sounds. Use the hotkeys for this addon in the code area to navigate to previous or next visited position after using the find bar.",
    versionAdded: "1.0.0",
    userscripts: [
        {
            script,
            matches: ["projects"],
            runAtComplete: false,
        },
    ],
    userstyles: [
        {
            style: css_248z,
            matches: ["projects"],
        },
    ],
    hotkeys: [
        {
            id: "previousLocation",
            default: ["Ctrl", "Left"],
        },
        {
            id: "nextLocation",
            default: ["Ctrl", "Right"],
        },
    ],
    tags: ["codeEditor", "costumeEditor", "recommended"],
    enabledByDefault: true,
});

const ALARM_FETCH_COUNT = "ALARM_FETCH_COUNT";
let session;
async function worker () {
    session = await updateSession();
    updateBadge();
    chrome.alarms.create(ALARM_FETCH_COUNT, {
        delayInMinutes: 5,
        periodInMinutes: 5,
    });
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === ALARM_FETCH_COUNT) {
            updateBadge();
        }
    });
    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
        if (cookie.name === "scratchsessionsid") {
            session = await updateSession();
            updateBadge();
        }
    });
}
async function updateSession() {
    return await (await fetch("https://scratch.mit.edu/session/", {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    })).json();
}
async function updateBadge() {
    if (session.user) {
        const { count } = await (await fetch(`https://api.scratch.mit.edu/users/${session.user.username}/messages/count?timestamp=${Date.now()}`)).json();
        chrome.action.setBadgeText({ text: count.toString() });
        chrome.action.setBadgeBackgroundColor({ color: "#000" });
    }
    else {
        chrome.action.setBadgeText({ text: "" });
    }
}

var addon = defineManifest({
    name: "Message count on badge",
    description: "Message count from scratch on popup badge",
    tags: [],
    versionAdded: "1.0.0",
    worker,
    enabledByDefault: true,
});

var addons = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'account-switcher': addon$2,
    'find-bar': addon$1,
    'msg-count-badge': addon
});

export { addons as a };
