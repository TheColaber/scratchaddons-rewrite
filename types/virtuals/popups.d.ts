import { PopupManifest } from "../addon-manifest";

declare var addons: {
  [id: string]: PopupManifest;
};

export = addons;
