import { AddonManifest } from "../addon-manifest";

declare var addons: {
  [id: string]: AddonManifest;
};

export default addons;
