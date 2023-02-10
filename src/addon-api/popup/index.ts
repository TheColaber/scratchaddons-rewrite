import Addon from "../common";
import Auth from "./auth";

export default class PopupAddon extends Addon {
  _port: null | chrome.runtime.Port;
  auth: Auth;

  constructor(id: string) {
    super(id);
    this.id = id;
    this._port = null;
    this.auth = new Auth(id);
  }

  get port() {
    return (
      this._port ||
      (this._port = chrome.runtime.connect(undefined, { name: this.id }))
    );
  }
}
