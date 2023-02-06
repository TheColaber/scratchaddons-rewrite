import Addon from "../common";

export default class PopupAddon extends Addon {
  _port: null | chrome.runtime.Port;
  
  constructor(id: string) {
    super(id);
    this.id = id;
    this._port = null
  }

  get port() {
    return this._port || (this._port = chrome.runtime.connect(undefined, { name: this.id }))
  }
}
