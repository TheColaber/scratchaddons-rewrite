import BlockItem from "./classes/BlockItem";
import NavigationHistory from "./classes/NavigationHistory"
import styles from "./userstyle.module.css";

// import BlockInstance from "./blockly/BlockInstance.js";
// import Utils from "./blockly/Utils.js";

export default defineScript(async function ({ addon, console, msg }) {
  const Blockly = await addon.tab.getBlockly();

  class FindBar {
    prevValue: string | null;
    findBarOuter: HTMLDivElement;
    findLabel: HTMLLabelElement;
    findWrapper: HTMLSpanElement;
    findInput: HTMLInputElement;
    dropdownOut: HTMLLabelElement;
    dropdown: Dropdown;

    constructor() {
      // this.utils = new Utils(addon);

      this.prevValue = "";

      this.findBarOuter = document.createElement("div");
      this.findBarOuter.className = styles["sa-find-bar"];
      addon.tab.displayNoneWhileDisabled(this.findBarOuter);

      this.findLabel = this.findBarOuter.appendChild(
        document.createElement("label")
      );
      this.findLabel.htmlFor = "sa-find-input";
      this.findLabel.textContent = msg("find");

      this.findWrapper = this.findBarOuter.appendChild(
        document.createElement("span")
      );
      this.findWrapper.className = styles["sa-find-wrapper"];

      this.dropdownOut = this.findWrapper.appendChild(
        document.createElement("label")
      );
      this.dropdownOut.className = styles["sa-find-dropdown-out"];

      this.findInput = this.dropdownOut.appendChild(
        document.createElement("input")
      );
      this.findInput.className = addon.tab.scratchClass("input_input-form", {
        others: styles["sa-find-input"],
      });
      // for <label>
      this.findInput.id = "sa-find-input";
      this.findInput.type = "search";
      this.findInput.placeholder = msg("find-placeholder");
      this.findInput.autocomplete = "off";

      this.dropdown = new Dropdown({} /* this.utils */);

      this.dropdown.attachDom(this.dropdownOut);

      this.bindEvents();
      this.tabChanged();

      document.addEventListener("keydown", (e) => this.eventKeyDown(e), true);
    }

    get workspace() {
      if (!Blockly) throw "Blockly not found";
      const workspace = Blockly.getMainWorkspace();
      if (!workspace) throw "Blockly workspace not found";
      return workspace;
    }

    attachDom(root: Element) {
      root.appendChild(this.findBarOuter);
    }

    bindEvents() {
      this.findInput.addEventListener("focus", () => this.inputChange());
      this.findInput.addEventListener("keydown", (e) => this.inputKeyDown(e));
      this.findInput.addEventListener("keyup", () => this.inputChange());
      this.findInput.addEventListener("focusout", () => this.hideDropDown());
    }

    tabChanged() {
      const tab = addon.tab.redux.state.scratchGui.editorTab.activeTabIndex;
      const visible = tab === 0 || tab === 1 || tab === 2;
      this.findBarOuter.hidden = !visible;
    }

    inputChange() {
      this.showDropDown();

      // Filter the list...
      let val = (this.findInput.value || "").toLowerCase();
      if (val === this.prevValue) {
        // No change so don't re-filter
        return;
      }
      this.prevValue = val;

      // TODO: Look at this
      // this.dropdown.blocks = null;

      // Hide items in list that do not contain filter text
      let listLI = this.dropdown.items;
      for (const item of listLI) {
        let procCode = item.procCode;
        let i = item.lower.indexOf(val);
        if (i >= 0) {
          item.el.style.display = "block";
          while (item.el.firstChild) {
            item.el.removeChild(item.el.firstChild);
          }
          if (i > 0) {
            item.el.appendChild(
              document.createTextNode(procCode.substring(0, i))
            );
          }
          let bText = document.createElement("b");
          bText.appendChild(
            document.createTextNode(procCode.substr(i, val.length))
          );
          item.el.appendChild(bText);
          if (i + val.length < procCode.length) {
            item.el.appendChild(
              document.createTextNode(procCode.substr(i + val.length))
            );
          }
        } else {
          item.el.style.display = "none";
        }
      }
    }

    inputKeyDown(e: KeyboardEvent) {
      this.dropdown.inputKeyDown(e);

      if (e.key === "Enter") {
        this.findInput.blur();
        return;
      }
      if (e.key === "Escape") {
        if (this.findInput.value.length > 0) {
          this.findInput.value = ""; // Clear search first, then close on second press
          this.inputChange();
        } else {
          this.findInput.blur();
        }
        e.preventDefault();
        return;
      }
    }

    eventKeyDown(e: KeyboardEvent) {
      if (addon.disabled || !this.findBarOuter) return;

      let ctrlKey = e.ctrlKey || e.metaKey;

      if (e.key === "f" && ctrlKey && !e.shiftKey) {
        // Ctrl + F (Override default Ctrl+F find)
        this.findInput.focus();
        this.findInput.select();
        e.cancelBubble = true;
        e.preventDefault();
        return true;
      }
    }

    showDropDown(focusID?: string, instanceBlock?: any) {
      console.log();
      
      if (!focusID && this.dropdownOut.classList.contains(styles["visible"] )) {
        return;
      }

      // special '' vs null... - null forces a reevaluation
      this.prevValue = focusID ? "" : null; // Clear the previous value of the input search

      this.dropdownOut.classList.add(styles["visible"] );
      let scratchBlocks =
        this.selectedTab === 0
          ? this.getScratchBlocks()
          : this.selectedTab === 1
          ? this.getScratchCostumes()
          : this.selectedTab === 2
          ? this.getScratchSounds()
          : [];

      this.dropdown.empty();

      for (const proc of scratchBlocks) {
        this.dropdown.items.push(proc);
        this.dropdown.el.appendChild(proc.el);

        if (focusID) {
          if (proc.matchesID(focusID)) {
            this.dropdown.onItemClick(proc, instanceBlock);
          } else {
            proc.el.style.display = "none";
          }
        }
      }

      // TODO: look back at this
      // this.utils.offsetX =
      //   this.dropdownOut.getBoundingClientRect().right -
      //   this.findLabel.getBoundingClientRect().left +
      //   26;
      // this.utils.offsetY = 32;
    }

    hideDropDown() {
      this.dropdownOut.classList.remove(styles["visible"] );
    }

    get selectedTab() {
      return addon.tab.redux.state.scratchGui.editorTab.activeTabIndex;
    }

    getScratchBlocks() {
      let myBlocks: BlockItem[] = [];
      let myBlocksByProcCode: { [id: string]: BlockItem } = {};

      let topBlocks = this.workspace.getTopBlocks();

      const addBlock = (cls: string, txt: string, root: any) => {
        let id = root.id ? root.id : root.getId ? root.getId() : null;
        let clone = myBlocksByProcCode[txt];
        if (clone) {
          if (!clone.clones) {
            clone.clones = [];
          }
          clone.clones.push(id);
          return clone;
        }

        const item = new BlockItem(cls, txt, id, 0);
        item.y = root.getRelativeToSurfaceXY
          ? root.getRelativeToSurfaceXY().y
          : null;
        item.el.addEventListener("mousedown", (e) => {
          this.dropdown.onItemClick(item);
          e.preventDefault();
          e.cancelBubble = true;
          return false;
        });
        myBlocks.push(item);
        myBlocksByProcCode[txt] = item;

        return item;
      };

      function getDescFromField(root: any) {
        let fields = root.inputList[0];
        let desc = "";
        for (const fieldRow of fields.fieldRow) {
          desc += (desc.length ? " " : "") + fieldRow.getText();
        }
        return desc;
      }

      for (const root of topBlocks) {
        if (root.type === "procedures_definition") {
          const label = root.getChildren()[0];
          const procCode = label.getProcCode();
          if (!procCode) {
            continue;
          }
          const indexOfLabel = root.inputList.findIndex(
            (i) => i.fieldRow.length > 0
          );
          if (indexOfLabel === -1) {
            continue;
          }
          const translatedDefine =
            root.inputList[indexOfLabel].fieldRow[0].getText();
          const message =
            indexOfLabel === 0
              ? `${translatedDefine} ${procCode}`
              : `${procCode} ${translatedDefine}`;
          addBlock("define", message, root);
          continue;
        }

        if (root.type === "event_whenflagclicked") {
          addBlock("flag", getDescFromField(root), root); // "When Flag Clicked"
          continue;
        }

        if (root.type === "event_whenbroadcastreceived") {
          const fieldRow = root.inputList[0].fieldRow;
          const input = fieldRow.find(
            (input) => input.name === "BROADCAST_OPTION"
          );
          if (!input) throw "This wasnt supposed to happen";
          let eventName = input.getText();
          addBlock("receive", "event " + eventName, root).eventName = eventName;

          continue;
        }

        if (root.type.substr(0, 10) === "event_when") {
          addBlock("event", getDescFromField(root), root); // "When Flag Clicked"
          continue;
        }

        if (root.type === "control_start_as_clone") {
          addBlock("event", getDescFromField(root), root); // "when I start as a clone"
          continue;
        }
      }

      let map = this.workspace.getVariableMap();

      let vars = map.getVariablesOfType("list");
      for (const row of vars) {
        addBlock(
          row.isLocal ? "var" : "VAR",
          (row.isLocal ? "var " : "VAR ") + row.name,
          row
        );
      }

      let lists = map.getVariablesOfType("list");
      for (const row of lists) {
        addBlock(
          row.isLocal ? "list" : "LIST",
          (row.isLocal ? "list " : "LIST ") + row.name,
          row
        );
      }

      const events = this.getCallsToEvents();
      for (const event of events) {
        addBlock("receive", "event " + event.eventName, event.block).eventName =
          event.eventName;
      }

      const clsOrder = {
        flag: 0,
        receive: 1,
        event: 2,
        define: 3,
        var: 4,
        VAR: 5,
        list: 6,
        LIST: 7,
      };

      myBlocks.sort((a, b) => {
        let t = clsOrder[a.cls] - clsOrder[b.cls];
        if (t !== 0) {
          return t;
        }
        if (a.lower < b.lower) {
          return -1;
        }
        if (a.lower > b.lower) {
          return 1;
        }
        return a.y - b.y;
      });

      return myBlocks;
    }

    getScratchCostumes() {
      let costumes = this.utils.getEditingTarget().getCostumes();

      let items = [];

      let i = 0;
      for (const costume of costumes) {
        let item = new BlockItem("costume", costume.name, costume.assetId, i);
        items.push(item);
        i++;
      }

      return items;
    }

    getScratchSounds() {
      let sounds = this.utils.getEditingTarget().getSounds();

      let items = [];

      let i = 0;
      for (const sound of sounds) {
        let item = new BlockItem("sound", sound.name, sound.assetId, i);
        items.push(item);
        i++;
      }

      return items;
    }

    getCallsToEvents() {
      const uses = [];
      const alreadyFound = new Set();

      for (const block of this.workspace.getAllBlocks()) {
        if (
          block.type !== "event_broadcast" &&
          block.type !== "event_broadcastandwait"
        ) {
          continue;
        }

        const broadcastInput = block.getChildren()[0];
        if (!broadcastInput) {
          continue;
        }

        let eventName = "";
        if (broadcastInput.type === "event_broadcast_menu") {
          eventName = broadcastInput.inputList[0].fieldRow[0].getText();
        } else {
          eventName = msg("complex-broadcast");
        }
        if (!alreadyFound.has(eventName)) {
          alreadyFound.add(eventName);
          uses.push({ eventName: eventName, block: block });
        }
      }

      return uses;
    }
  }

  class Dropdown {
    el: HTMLUListElement;
    items: BlockItem[];
    selected: null | BlockItem;
    carousel: Carousel;
    constructor(utils) {
      this.utils = utils;

      this.el = document.createElement("ul");
      this.el.className = styles["sa-find-dropdown"];

      this.items = [];
      this.selected = null;
      this.carousel = new Carousel(this.utils);
    }

    get workspace() {
      if (!Blockly) throw "Blockly not found";
      const workspace = Blockly.getMainWorkspace();
      if (!workspace) throw "Blockly workspace not found";
      return workspace;
    }

    attachDom(el: Element) {
      el.appendChild(this.el);
    }

    inputKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp") {
        this.navigateFilter(-1);
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowDown") {
        this.navigateFilter(1);
        e.preventDefault();
        return;
      }

      if (e.key === "Enter") {
        // Any selected on enter? if not select now
        if (this.selected) {
          this.navigateFilter(1);
        }
        e.preventDefault();
        return;
      }

      this.carousel.inputKeyDown(e);
    }

    getItemForEl(el: Element | null) {
      const item = this.items.find((item) => this.selected && item.el === el);
      if (!item) {
        throw "WHAT>>>";
      }
      return item;
    }

    navigateFilter(dir: 1 | -1) {
      let nxt: BlockItem;
      if (this.selected && this.selected.el.style.display !== "none") {
        nxt =
          dir === -1
            ? this.getItemForEl(this.selected.el.previousElementSibling)
            : this.getItemForEl(this.selected.el.nextElementSibling);
      } else {
        nxt = this.items[0];
        dir = 1;
      }
      while (nxt && nxt.el.style.display === "none") {
        nxt =
          dir === -1
            ? this.getItemForEl(nxt.el.previousElementSibling)
            : this.getItemForEl(nxt.el.nextElementSibling);
      }
      if (nxt) {
        nxt.el.scrollIntoView({ block: "nearest" });
        this.onItemClick(nxt);
      }
    }

    onItemClick(item: BlockItem, instanceBlock?: any) {
      if (this.selected && this.selected !== item) {
        this.selected.el.classList.remove(styles["sel"]);
        this.selected = null;
      }
      if (this.selected !== item) {
        item.el.classList.add(styles["sel"]);
        this.selected = item;
      }

      if (item.cls === "costume" || item.cls === "sound") {
        // Viewing costumes/sounds - jump to selected costume/sound
        const assetPanel = document.querySelector(
          "[class^=asset-panel_wrapper]"
        );
        if (assetPanel) {
          const reactInstance =
            assetPanel[addon.tab.getInternalKey(assetPanel)];
          const reactProps = reactInstance.pendingProps.children[0].props;
          reactProps.onItemClick(item.data.y);
          const selectorList = assetPanel.firstChild.firstChild;
          selectorList.children[item.data.y].scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "start",
          });
          // The wrapper seems to scroll when we use the function above.
          let wrapper = assetPanel.closest("div[class*=gui_flex-wrapper]");
          wrapper.scrollTop = 0;
        }
      } else if (
        item.cls === "var" ||
        item.cls === "VAR" ||
        item.cls === "list" ||
        item.cls === "LIST"
      ) {
        // Search now for all instances
        let blocks = this.getVariableUsesById(item.labelID);
        this.carousel.build(item, blocks, instanceBlock);
      } else if (item.cls === "define") {
        let blocks = this.getCallsToProcedureById(item.labelID);
        this.carousel.build(item, blocks, instanceBlock);
      } else if (item.cls === "receive") {
        /*
          let blocks = [this.workspace.getBlockById(li.data.labelID)];
          if (li.data.clones) {
              for (const cloneID of li.data.clones) {
                  blocks.push(this.workspace.getBlockById(cloneID))
              }
          }
          blocks = blocks.concat(getCallsToEventsByName(li.data.eventName));
        */
        // Now, fetch the events from the scratch runtime instead of blockly
        let blocks = this.getCallsToEventsByName(item.data.eventName);
        if (!instanceBlock) {
          // Can we start by selecting the first block on 'this' sprite
          const currentTargetID = this.utils.getEditingTarget().id;
          for (const block of blocks) {
            if (block.targetId === currentTargetID) {
              instanceBlock = block;
              break;
            }
          }
        }
        this.carousel.build(item, blocks, instanceBlock);
      } else if (item.clones) {
        let blocks = [this.workspace.getBlockById(item.labelID)];
        for (const cloneID of item.clones) {
          blocks.push(this.workspace.getBlockById(cloneID));
        }
        this.carousel.build(item, blocks, instanceBlock);
      } else {
        this.workspace.centerOnBlock(item.labelID)
        // TODO: a
        // this.utils.scrollBlockIntoView(item.labelID);
        this.carousel.remove();
      }
    }

    getVariableUsesById(id) {
      let uses = [];

      let topBlocks = this.workspace.getTopBlocks();
      for (const topBlock of topBlocks) {
        /** @type {!Array<!Blockly.Block>} */
        let kids = topBlock.getDescendants();
        for (const block of kids) {
          /** @type {!Array<!Blockly.VariableModel>} */
          let blockVariables = block.getVarModels();
          if (blockVariables) {
            for (const blockVar of blockVariables) {
              if (blockVar.getId() === id) {
                uses.push(block);
              }
            }
          }
        }
      }

      return uses;
    }

    getCallsToProcedureById(id) {
      let procBlock = this.workspace.getBlockById(id);
      let label = procBlock.getChildren()[0];
      let procCode = label.getProcCode();

      let uses = [procBlock]; // Definition First, then calls to it
      let topBlocks = this.workspace.getTopBlocks();
      for (const topBlock of topBlocks) {
        /** @type {!Array<!Blockly.Block>} */
        let kids = topBlock.getDescendants();
        for (const block of kids) {
          if (block.type === "procedures_call") {
            if (block.getProcCode() === procCode) {
              uses.push(block);
            }
          }
        }
      }

      return uses;
    }

    getCallsToEventsByName(name) {
      let uses = []; // Definition First, then calls to it

      const runtime = addon.tab.traps.vm.runtime;
      const targets = runtime.targets; // The sprites / stage

      for (const target of targets) {
        if (!target.isOriginal) {
          continue; // Skip clones
        }

        const blocks = target.blocks;
        if (!blocks._blocks) {
          continue;
        }

        for (const id of Object.keys(blocks._blocks)) {
          const block = blocks._blocks[id];
          if (
            block.opcode === "event_whenbroadcastreceived" &&
            block.fields.BROADCAST_OPTION.value === name
          ) {
            uses.push(new BlockInstance(target, block));
          } else if (
            block.opcode === "event_broadcast" ||
            block.opcode === "event_broadcastandwait"
          ) {
            const broadcastInputBlockId = block.inputs.BROADCAST_INPUT.block;
            const broadcastInputBlock = blocks._blocks[broadcastInputBlockId];
            if (broadcastInputBlock) {
              let eventName;
              if (broadcastInputBlock.opcode === "event_broadcast_menu") {
                eventName = broadcastInputBlock.fields.BROADCAST_OPTION.value;
              } else {
                eventName = msg("complex-broadcast");
              }
              if (eventName === name) {
                uses.push(new BlockInstance(target, block));
              }
            }
          }
        }
      }

      return uses;
    }

    empty() {
      for (const item of this.items) {
        if (this.el.contains(item.el)) {
          this.el.removeChild(item.el);
        }
      }
      this.items = [];
      this.selected = null;
    }
  }

  class Carousel {
    el: HTMLSpanElement;
    count: HTMLSpanElement;
    blocks: any[];
    idx: number;

    constructor(utils) {
      this.utils = utils;

      this.blocks = [];
      this.idx = 0;

      this.el = document.createElement("span");
      this.el.className = styles["sa-find-carousel"];

      const leftControl = this.el.appendChild(document.createElement("span"));
      leftControl.className = styles["sa-find-carousel-control"];
      leftControl.textContent = "◀";
      leftControl.addEventListener("mousedown", (e) => this.navLeft(e));

      this.count = this.el.appendChild(document.createElement("span"));
      this.count.innerText =
        this.blocks.length > 0
          ? this.idx + 1 + " / " + this.blocks.length
          : "0";

      const rightControl = this.el.appendChild(document.createElement("span"));
      rightControl.className = styles["sa-find-carousel-control"];
      rightControl.textContent = "▶";
      rightControl.addEventListener("mousedown", (e) => this.navRight(e));
    }

    build(item, blocks, instanceBlock) {
      if (this.el && this.el.parentNode === item) {
        // Same control... click again to go to next
        this.navRight();
      } else {
        this.remove();
        this.blocks = blocks;
        this.attachDom(item.el)

        this.idx = 0;
        if (instanceBlock) {
          for (const idx of Object.keys(this.blocks)) {
            const block = this.blocks[idx];
            if (block.id === instanceBlock.id) {
              this.idx = Number(idx);
              break;
            }
          }
        }

        if (this.idx < this.blocks.length) {
          this.utils.scrollBlockIntoView(this.blocks[this.idx]);
        }
      }
    }

    attachDom(el: Element) {
      el.appendChild(this.el);
    }

    inputKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        if (this.el && this.blocks) {
          this.navLeft(e);
        }
      }

      if (e.key === "ArrowRight") {
        if (this.el && this.blocks) {
          this.navRight(e);
        }
      }
    }

    navLeft(e: Event) {
      return this.navSideways(e, -1);
    }

    navRight(e: Event) {
      return this.navSideways(e, 1);
    }

    navSideways(e: Event, dir) {
      if (this.blocks.length > 0) {
        this.idx = (this.idx + dir + this.blocks.length) % this.blocks.length; // + length to fix negative modulo js issue.
        this.count.innerText = this.idx + 1 + " / " + this.blocks.length;
        // this.utils.scrollBlockIntoView(this.blocks[this.idx]);
      }

      if (e) {
        e.cancelBubble = true;
        e.preventDefault();
      }
    }

    remove() {
      if (this.el) {
        this.el.remove();
        this.blocks = [];
        this.idx = 0;
      }
    }
  }

  const findBar = new FindBar();

  const _doBlockClick_ = Blockly.Gesture.prototype.doBlockClick_;
  Blockly.Gesture.prototype.doBlockClick_ = function () {
    if (
      !addon.disabled &&
      (this.mostRecentEvent_.button === 1 || this.mostRecentEvent_.shiftKey)
    ) {
      // Wheel button...
      // Intercept clicks to allow jump to...?
      let block = this.startBlock_;
      for (; block; block = block.getSurroundParent()) {
        if (
          block.type === "procedures_definition" ||
          (!this.jumpToDef && block.type === "procedures_call")
        ) {
          let id = block.id ? block.id : block.getId ? block.getId() : null;

          findBar.findInput.focus();
          findBar.showDropDown(id);

          return;
        }

        if (
          block.type === "data_variable" ||
          block.type === "data_changevariableby" ||
          block.type === "data_setvariableto"
        ) {
          let id = block.getVars()[0];

          findBar.findInput.focus();
          findBar.showDropDown(id, block);

          findBar.selVarID = id;

          return;
        }

        if (
          block.type === "event_whenbroadcastreceived" ||
          block.type === "event_broadcastandwait" ||
          block.type === "event_broadcast"
        ) {
          // todo: actually index the broadcasts...!
          let id = block.id;

          findBar.findInput.focus();
          findBar.showDropDown(id, block);

          findBar.selVarID = id;

          return;
        }
      }
    }

    _doBlockClick_.call(this);
  };

  addon.tab.redux.initialize();
  addon.tab.redux.addEventListener("statechanged", (e) => {
    if (e.detail.action.type === "scratch-gui/navigation/ACTIVATE_TAB") {
      findBar.tabChanged();
    }
  });

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
