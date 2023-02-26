function defineAddonManifest(manifest) {
  return manifest;
}
function definePopupManifest(manifest) {
  return manifest;
}

function defineScript(script) {
  return script;
}

var script = defineScript(async function({ addon, console, msg }) {
  const Blockly = await addon.tab.getBlockly();
  Blockly.getMainWorkspace();
  await addon.tab.waitUntilScratchClassesLoaded();
  class FindBar {
    outerEl;
    inputEl;
    workspace_;
    constructor() {
      this.outerEl = document.createElement("div");
      this.outerEl.className = "sa-find-bar";
      addon.tab.displayNoneWhileDisabled(this.outerEl);
      const label = this.outerEl.appendChild(document.createElement("label"));
      label.htmlFor = "sa-find-input";
      label.textContent = msg("find");
      const wrapper = this.outerEl.appendChild(document.createElement("div"));
      wrapper.className = "sa-find-wrapper";
      const dropdown = wrapper.appendChild(document.createElement("div"));
      dropdown.className = "sa-find-dropdown-out";
      this.inputEl = dropdown.appendChild(document.createElement("input"));
      this.inputEl.className = addon.tab.scratchClass("input_input-form", {
        others: "sa-find-input"
      });
      this.inputEl.id = "sa-find-input";
      this.inputEl.type = "search";
      this.inputEl.placeholder = msg("find-placeholder");
      this.inputEl.autocomplete = "off";
    }
    attachDom(root) {
      root.appendChild(this.outerEl);
    }
    isVisible() {
      return true;
    }
    getContentBoundingBox() {
      var contentBounds = this.workspace_.getBlocksBoundingBox();
      var bounds = {
        xMin: contentBounds.x,
        yMin: contentBounds.y,
        xMax: contentBounds.x + contentBounds.width,
        yMax: contentBounds.y + contentBounds.height
      };
      return {
        x: bounds.xMin,
        y: bounds.yMin,
        width: bounds.xMax - bounds.xMin,
        height: bounds.yMax - bounds.yMin
      };
    }
    getMetrics() {
      if (!this.isVisible()) {
        return null;
      }
      var optionBox = this.getContentBoundingBox();
      var absoluteTop = 0;
      var absoluteLeft = 0;
      var viewHeight = 200;
      var viewWidth = 200;
      var contentHeight = optionBox.height * this.workspace_.scale;
      var metrics = {
        viewHeight,
        viewWidth,
        contentHeight,
        contentWidth: optionBox.width * this.workspace_.scale + 2 * 2,
        viewTop: -this.workspace_.scrollY + optionBox.y,
        viewLeft: -this.workspace_.scrollX,
        contentTop: optionBox.y,
        contentLeft: optionBox.x,
        absoluteTop,
        absoluteLeft
      };
      return metrics;
    }
    setMetrics(xyRatio) {
      var metrics = this.getMetrics();
      if (!metrics) {
        return;
      }
      if (typeof xyRatio.y === "number") {
        this.workspace_.scrollY = -metrics.contentHeight * xyRatio.y;
      }
      this.workspace_.translate(
        this.workspace_.scrollX + metrics.absoluteLeft,
        this.workspace_.scrollY + metrics.absoluteTop
      );
      console.log(Math.max(0, metrics.viewHeight), metrics.viewWidth);
    }
  }
  const findBar = new FindBar();
  while (true) {
    const root = await addon.tab.waitForElement("ul[class*=gui_tab-list]", {
      markAsSeen: true,
      reduxEvents: [
        "scratch-gui/mode/SET_PLAYER",
        "fontsLoaded/SET_FONTS_LOADED",
        "scratch-gui/locales/SELECT_LOCALE"
      ],
      reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly
    });
    findBar.attachDom(root);
  }
});

var addon = defineAddonManifest({
  name: "Find bar",
  description: "Creates a search bar next to the sounds tab to find and jump to scripts, costumes and sounds.",
  versionAdded: "1.0.0",
  scripts: [
    {
      scripts: [script],
      styles: [],
      matches: ["projects"],
      runAtComplete: false
    }
  ],
  hotkeys: [
    {
      id: "previousLocation",
      description: "Use in the code area to navigate to previous visited positions after using the find bar.",
      default: ["Ctrl", "Left"]
    },
    {
      id: "nextLocation",
      description: "Use in the code area to navigate to next visited positions after using the find bar.",
      default: ["Ctrl", "Right"]
    }
  ],
  tags: ["codeEditor", "costumeEditor", "recommended"],
  enabledByDefault: true
});

var addons = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'find-bar': addon
});

export { addons as a, definePopupManifest as d };
