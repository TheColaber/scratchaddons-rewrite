import Addon from "../common";
import Auth from "./auth";

export default class WorkerAddon extends Addon {
  auth: Auth;

  constructor(id: string) {
    super(id);
    this.auth = new Auth(id);
  }
}
