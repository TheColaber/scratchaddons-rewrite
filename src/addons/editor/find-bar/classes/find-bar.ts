import DropdownScript from "./dropdown";
import styles from "../userstyle.module.css";
import defineScript from "../../../../helpers/define-script";
import { Blockly } from "../../../../../types/apis/Blockly";

export default defineScript(({ addon, msg, console }) => {
  const Dropdown = DropdownScript({ addon, msg, console });

  return class FindBar {
    prevValue: string | null;
    findBarOuter: HTMLDivElement;
    findLabel: HTMLLabelElement;
    findWrapper: HTMLSpanElement;
    findInput: HTMLInputElement;
    dropdownOut: HTMLLabelElement;
    dropdown: typeof Dropdown;
    Blockly: Blockly;

    constructor(Blockly: Blockly) {
      // this.utils = new Utils(addon);
      this.Blockly = Blockly;

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

      this.dropdownOut.appendChild(this.dropdown.createDom());

      this.bindEvents();
      this.tabChanged();

      document.addEventListener("keydown", (e) => this.eventKeyDown(e), true);
    }

    get workspace() {
      if (!this.Blockly) throw "Blockly not found";
      const workspace = this.Blockly.getMainWorkspace();
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
      const tab = this.selectedTab;
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

      this.dropdown.blocks = null;

      // Hide items in list that do not contain filter text
      let listLI = this.dropdown.items;
      for (const li of listLI) {
        let procCode = li.data.procCode;
        let i = li.data.lower.indexOf(val);
        if (i >= 0) {
          li.style.display = "block";
          while (li.firstChild) {
            li.removeChild(li.firstChild);
          }
          if (i > 0) {
            li.appendChild(document.createTextNode(procCode.substring(0, i)));
          }
          let bText = document.createElement("b");
          bText.appendChild(
            document.createTextNode(procCode.substr(i, val.length))
          );
          li.appendChild(bText);
          if (i + val.length < procCode.length) {
            li.appendChild(
              document.createTextNode(procCode.substr(i + val.length))
            );
          }
        } else {
          li.style.display = "none";
        }
      }
    }

    inputKeyDown(e: KeyboardEvent) {
      this.dropdown.inputKeyDown(e);

      // Enter
      console.log(e.key);

      if (e.keyCode === 13) {
        this.findInput.blur();
        return;
      }

      // Escape
      if (e.keyCode === 27) {
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

      if (e.keyCode === 37 && ctrlKey) {
        // Ctrl + Left Arrow Key
        if (
          document.activeElement &&
          document.activeElement.tagName === "INPUT"
        ) {
          return;
        }

        if (this.selectedTab === 0) {
          this.utils.navigationHistory.goBack();
          e.cancelBubble = true;
          e.preventDefault();
          return true;
        }
      }

      if (e.keyCode === 39 && ctrlKey) {
        // Ctrl + Right Arrow Key
        if (
          document.activeElement &&
          document.activeElement.tagName === "INPUT"
        ) {
          return;
        }

        if (this.selectedTab === 0) {
          this.utils.navigationHistory.goForward();
          e.cancelBubble = true;
          e.preventDefault();
          return true;
        }
      }
    }

    showDropDown(focusID?: string, instanceBlock?: any) {
      if (!focusID && this.dropdownOut.classList.contains("visible")) {
        return;
      }

      // special '' vs null... - null forces a reevaluation
      this.prevValue = focusID ? "" : null; // Clear the previous value of the input search

      this.dropdownOut.classList.add("visible");
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
        let item = this.dropdown.addItem(proc);

        if (focusID) {
          if (proc.matchesID(focusID)) {
            this.dropdown.onItemClick(item, instanceBlock);
          } else {
            item.style.display = "none";
          }
        }
      }

      this.utils.offsetX =
        this.dropdownOut.getBoundingClientRect().right -
        this.findLabel.getBoundingClientRect().left +
        26;
      this.utils.offsetY = 32;
    }

    hideDropDown() {
      this.dropdownOut.classList.remove("visible");
    }

    get selectedTab() {
      return addon.tab.redux.state.scratchGui.editorTab.activeTabIndex;
    }

    getScratchBlocks() {
      let myBlocks = [];
      let myBlocksByProcCode: { [id: string]: any } = {};

      let topBlocks = this.workspace.getTopBlocks();

      /**
       * @param cls
       * @param txt
       * @param root
       * @returns BlockItem
       */
      function addBlock(cls: string, txt: string, root: any) {
        let id = root.id ? root.id : root.getId ? root.getId() : null;
        let clone = myBlocksByProcCode[txt];
        if (clone) {
          if (!clone.clones) {
            clone.clones = [];
          }
          clone.clones.push(id);
          return clone;
        }
        let items = new BlockItem(cls, txt, id, 0);
        items.y = root.getRelativeToSurfaceXY
          ? root.getRelativeToSurfaceXY().y
          : null;
        myBlocks.push(items);
        myBlocksByProcCode[txt] = items;
        return items;
      }

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
          let eventName = fieldRow
            .find((input) => input.name === "BROADCAST_OPTION")
            .getText();
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

      let vars = map.getVariablesOfType("");
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
  };
});
