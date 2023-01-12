import defineManifest from "../../../../helpers/define-manifest";
import userscript from "./userscript";

export default defineManifest({
  name: "Test Addon",
  description: "test desc",
  versionAdded: "1.0.0",
  userscripts: [
    {
      func: userscript,
      matches: ["projects"],
      runAtComplete: false,
    },
  ],
  tags: ["recommended"],
  enabledByDefault: true,
});
