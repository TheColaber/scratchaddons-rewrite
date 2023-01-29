import UserscriptAddon from "../../../addon-api/userscript";
import BlockItem from "./classes/BlockItem";
import NavigationHistory from "./classes/NavigationHistory";

// import BlockInstance from "./blockly/BlockInstance.js";
// import Utils from "./blockly/Utils.js";

export default defineScript(async function ({ addon, console, msg }) {
  const Blockly = await addon.tab.getBlockly();
  const workspace = Blockly.getMainWorkspace();

  class FindBar {
    outerEl: HTMLDivElement;
    inputEl: HTMLInputElement;
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

    attachDom(root: Element) {
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
