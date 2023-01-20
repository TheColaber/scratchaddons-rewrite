import defineScript from "../../../../helpers/define-script";

export default defineScript(({ addon, msg }) => {
  return class Dropdown {
    constructor(utils) {
      this.utils = utils;

      this.el = null;
      this.items = [];
      this.selected = null;
      this.carousel = new Carousel(this.utils);
    }

    get workspace() {
      return Blockly.getMainWorkspace();
    }

    createDom() {
      this.el = document.createElement("ul");
      this.el.className = styles["sa-find-dropdown"];
      return this.el;
    }

    inputKeyDown(e) {
      // Up Arrow
      if (e.keyCode === 38) {
        this.navigateFilter(-1);
        e.preventDefault();
        return;
      }

      // Down Arrow
      if (e.keyCode === 40) {
        this.navigateFilter(1);
        e.preventDefault();
        return;
      }

      // Enter
      if (e.keyCode === 13) {
        // Any selected on enter? if not select now
        if (this.selected) {
          this.navigateFilter(1);
        }
        e.preventDefault();
        return;
      }

      this.carousel.inputKeyDown(e);
    }

    navigateFilter(dir) {
      let nxt;
      if (this.selected && this.selected.style.display !== "none") {
        nxt =
          dir === -1
            ? this.selected.previousSibling
            : this.selected.nextSibling;
      } else {
        nxt = this.items[0];
        dir = 1;
      }
      while (nxt && nxt.style.display === "none") {
        nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling;
      }
      if (nxt) {
        nxt.scrollIntoView({ block: "nearest" });
        this.onItemClick(nxt);
      }
    }

    addItem(proc) {
      const item = document.createElement("li");
      item.innerText = proc.procCode;
      item.data = proc;
      const colorIds = {
        receive: "events",
        event: "events",
        define: "more",
        var: "data",
        VAR: "data",
        list: "data-lists",
        LIST: "data-lists",
        costume: "looks",
        sound: "sounds",
      };
      if (proc.cls === "flag") {
        item.className = styles["sa-find-flag"];
      } else {
        const colorId = colorIds[proc.cls];
        item.classList.add(
          styles["sa-block-color"],
          styles[`sa-block-color-${colorId}`]
        );
      }
      item.addEventListener("mousedown", (e) => {
        this.onItemClick(item);
        e.preventDefault();
        e.cancelBubble = true;
        return false;
      });
      this.items.push(item);
      this.el.appendChild(item);
      return item;
    }

    onItemClick(item, instanceBlock) {
      if (this.selected && this.selected !== item) {
        this.selected.classList.remove("sel");
        this.selected = null;
      }
      if (this.selected !== item) {
        item.classList.add("sel");
        this.selected = item;
      }

      let cls = item.data.cls;
      if (cls === "costume" || cls === "sound") {
        // Viewing costumes/sounds - jump to selected costume/sound
        const assetPanel = document.querySelector(
          "[class^=asset-panel_wrapper]"
        );
        if (assetPanel) {
          const reactInstance =
            assetPanel[addon.tab.traps.getInternalKey(assetPanel)];
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
        cls === "var" ||
        cls === "VAR" ||
        cls === "list" ||
        cls === "LIST"
      ) {
        // Search now for all instances
        let blocks = this.getVariableUsesById(item.data.labelID);
        this.carousel.build(item, blocks, instanceBlock);
      } else if (cls === "define") {
        let blocks = this.getCallsToProcedureById(item.data.labelID);
        this.carousel.build(item, blocks, instanceBlock);
      } else if (cls === "receive") {
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
      } else if (item.data.clones) {
        let blocks = [this.workspace.getBlockById(item.data.labelID)];
        for (const cloneID of item.data.clones) {
          blocks.push(this.workspace.getBlockById(cloneID));
        }
        this.carousel.build(item, blocks, instanceBlock);
      } else {
        this.utils.scrollBlockIntoView(item.data.labelID);
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
        if (this.el.contains(item)) {
          this.el.removeChild(item);
        }
      }
      this.items = [];
      this.selected = null;
    }
  };
});
