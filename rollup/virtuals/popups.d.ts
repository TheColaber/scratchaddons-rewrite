import { PopupManifest } from "../../types/helpers/addon-manifest";

declare var popups: {
  [id: string]: PopupManifest;
};

export = popups;
