import { defineAddonManifest } from "../../../../types/helpers/addon-manifest";
import script from "./userscript"
export default defineAddonManifest({
  name: "Find bar",
  description:
    "Creates a search bar next to the sounds tab to find and jump to scripts, costumes and sounds.",
  versionAdded: "1.0.0",
  scripts: [
    {
      scripts: [script],
      styles: [],
      matches: ["projects"],
      runAtComplete: false,
    }
  ],
  hotkeys: [
    {
      id: "previousLocation",
      description:
        "Use in the code area to navigate to previous visited positions after using the find bar.",
      default: ["Ctrl", "Left"],
    },
    {
      id: "nextLocation",
      description:
        "Use in the code area to navigate to next visited positions after using the find bar.",
      default: ["Ctrl", "Right"],
    },
  ],
  tags: ["codeEditor", "costumeEditor", "recommended"],
  enabledByDefault: true,
});
