import { AddonManifest } from "../../types/helpers/addon-manifest";

declare var addons: {
  [id: string]: AddonManifest;
};

export = addons;
