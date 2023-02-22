import defineScript from "../../../../types/helpers/define-script";

// import BlockItem from "./classes/BlockItem";
// import NavigationHistory from "./classes/NavigationHistory";

// import BlockInstance from "./blockly/BlockInstance.js";
// import Utils from "./blockly/Utils.js";

export default defineScript(async function ({ addon, console, msg }) {
  const Blockly = await addon.tab.getBlockly();
  const workspace = Blockly.getMainWorkspace();
  await addon.tab.waitUntilScratchClassesLoaded()

  class FindBar {
    outerEl: HTMLDivElement;
    inputEl: HTMLInputElement;
    workspace_: any;
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

      // var options = {
      //   disabledPatternId: workspace.options.disabledPatternId,
      //   parentWorkspace: workspace,
      //   RTL: workspace.RTL,
      //   oneBasedIndex: workspace.options.oneBasedIndex,
      //   horizontalLayout: workspace.horizontalLayout,
      //   toolboxPosition: workspace.options.toolboxPosition,
      //   stackGlowFilterId: workspace.options.stackGlowFilterId,
      //   getMetrics: this.getMetrics.bind(this),
      //   setMetrics: this.setMetrics.bind(this)
      // };
    
      // this.workspace_ = new Blockly.WorkspaceSvg(options);
      // console.log(this.workspace_);
      
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
        height: bounds.yMax - bounds.yMin,
      };
    }

    getMetrics() {
      if (!this.isVisible()) {
        // Flyout is hidden.
        return null;
      }
    
      var optionBox = this.getContentBoundingBox();
    
      // Padding for the end of the scrollbar.
      var absoluteTop = 0;
      var absoluteLeft = 0;
    
      var viewHeight = 200;
      var viewWidth = 200;
    
      // Add padding to the bottom of the flyout, so we can scroll to the top of
      // the last category.
      var contentHeight = optionBox.height * this.workspace_.scale;
    
      var metrics = {
        viewHeight: viewHeight,
        viewWidth: viewWidth,
        contentHeight: contentHeight,
        contentWidth: optionBox.width * this.workspace_.scale + 2 * 2,
        viewTop: -this.workspace_.scrollY + optionBox.y,
        viewLeft: -this.workspace_.scrollX,
        contentTop: optionBox.y,
        contentLeft: optionBox.x,
        absoluteTop: absoluteTop,
        absoluteLeft: absoluteLeft
      };
      return metrics;
    };
    
    setMetrics(xyRatio) {
      var metrics = this.getMetrics();
      // This is a fix to an apparent race condition.
      if (!metrics) {
        return;
      }
      if (typeof xyRatio.y === "number") {
        this.workspace_.scrollY = -metrics.contentHeight * xyRatio.y;
      }
      this.workspace_.translate(this.workspace_.scrollX + metrics.absoluteLeft,
          this.workspace_.scrollY + metrics.absoluteTop);
    
      console.log(Math.max(0, metrics.viewHeight), metrics.viewWidth);
      
      // this.clipRect_.setAttribute('height', Math.max(0, metrics.viewHeight) + 'px');
      // this.clipRect_.setAttribute('width', metrics.viewWidth + 'px');
    };
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