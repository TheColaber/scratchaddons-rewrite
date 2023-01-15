import defineManifest from "../../../helpers/define-manifest";
import worker from "./worker";

export default defineManifest({
  name: "Message count on badge",
  description: "Message count from scratch on popup badge",
  tags: [],
  versionAdded: "1.0.0",
  worker,
  enabledByDefault: true,
});
