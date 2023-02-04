import { PopupManifest } from "../../types/helpers/addon-manifest";

declare var addons: {
  [id: string]: PopupManifest;
};

export = addons;
