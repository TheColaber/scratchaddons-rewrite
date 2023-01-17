import Addon from "../common";
import Tab from "./tab";

export default class UserscriptAddon extends Addon {
  enabledLate: boolean;
  path: string;
  tab: Tab;

  constructor(id: string, enabledLate: boolean) {
    super(id);
    this.tab = new Tab(id);

    this.path = new URL(import.meta.url).origin;
    this.enabledLate = enabledLate;
  }
}
