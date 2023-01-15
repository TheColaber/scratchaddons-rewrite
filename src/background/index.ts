// Creates Listener
import "./run-addons";

import contextMenuSetup from "./context-menu-setup";
import addonSetup from "./addon-setup";
import workerScripts from "./worker-scripts";

contextMenuSetup();
(async () => {
  await addonSetup();
  await workerScripts();
})();
