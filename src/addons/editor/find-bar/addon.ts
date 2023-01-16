import defineManifest from "../../../helpers/define-manifest";
import userscript from "./userscript";

export default defineManifest({
  name: "Find bar",
  description: "Creates a search bar next to the sounds tab to find and jump to scripts, costumes and sounds. Use the hotkeys for this addon in the code area to navigate to previous or next visited position after using the find bar.",
  versionAdded: "1.0.0",
  userscripts: [
    {
      func: userscript,
      matches: ["projects"],
      runAtComplete: false,
    },
  ],
  hotkeys: [
    {
      id: "previousLocation",
      default: ["Ctrl", "Left"]
    },
    {
      id: "nextLocation",
      default: ["Ctrl", "Right"]
    }
  ],
  tags: ["codeEditor", "costumeEditor","recommended"],
  enabledByDefault: true,
});
