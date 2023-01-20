import defineScript from "../../../../helpers/define-script";

export default defineScript(({ addon, msg }) => {
  return class Carousel {
    constructor(utils) {
      this.utils = utils;

      this.el = null;
      this.count = null;
      this.blocks = [];
      this.idx = 0;
    }

    build(item, blocks, instanceBlock) {
      if (this.el && this.el.parentNode === item) {
        // Same control... click again to go to next
        this.navRight();
      } else {
        this.remove();
        this.blocks = blocks;
        item.appendChild(this.createDom());

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

    createDom() {
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

      return this.el;
    }

    inputKeyDown(e) {
      // Left Arrow
      if (e.keyCode === 37) {
        if (this.el && this.blocks) {
          this.navLeft(e);
        }
      }

      // Right Arrow
      if (e.keyCode === 39) {
        if (this.el && this.blocks) {
          this.navRight(e);
        }
      }
    }

    navLeft(e) {
      return this.navSideways(e, -1);
    }

    navRight(e) {
      return this.navSideways(e, 1);
    }

    navSideways(e, dir) {
      if (this.blocks.length > 0) {
        this.idx = (this.idx + dir + this.blocks.length) % this.blocks.length; // + length to fix negative modulo js issue.
        this.count.innerText = this.idx + 1 + " / " + this.blocks.length;
        this.utils.scrollBlockIntoView(this.blocks[this.idx]);
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
  };
});
