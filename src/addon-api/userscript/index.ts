import Addon from "../common";

export default class UserscriptAddon extends Addon {
  enabledLate: boolean;
  path: string;

  constructor(id: string, enabledLate: boolean) {
    super(id);
    this.path = new URL(import.meta.url).origin;
    this.enabledLate = enabledLate;
  }
}