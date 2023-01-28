import styles from "../userstyle.module.css";
type cls =
  | "flag"
  | "receive"
  | "event"
  | "define"
  | "var"
  | "VAR"
  | "list"
  | "LIST"
  | "costume"
  | "sound";
export default class BlockItem {
  el: HTMLLIElement;
  cls: cls;
  procCode: string;
  lower: string;
  labelID: string;
  y: number;
  clones: null | string[];
  eventName: null | string;
  constructor(cls: cls, procCode: string, labelID: string, y: number) {
    this.el = document.createElement("li");
    this.el.innerText = procCode;
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
    if (cls === "flag") {
      this.el.className = styles["sa-find-flag"];
    } else {
      const colorId = colorIds[cls];

      this.el.classList.add(
        styles["sa-block-color"],
        styles[`sa-block-color-${colorId}`]
      );
    }

    this.cls = cls;
    this.procCode = procCode;
    this.labelID = labelID;
    this.y = y;
    this.lower = procCode.toLowerCase();
    /**
     * An Array of block ids
     * @type {Array.<string>}
     */
    this.clones = null;
    this.eventName = null;
  }

  matchesID(id: string) {
    if (this.labelID === id) {
      return true;
    }
    if (this.clones) {
      for (const cloneID of this.clones) {
        if (cloneID === id) {
          return true;
        }
      }
    }
    return false;
  }
}
