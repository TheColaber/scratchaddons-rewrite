import { d as defineAddonManifest } from './chunk.index-e4c60ce4.js';

var addon = defineAddonManifest({
  name: "Find bar",
  description: "Creates a search bar next to the sounds tab to find and jump to scripts, costumes and sounds.",
  versionAdded: "1.0.0",
  userscripts: [
    {
      runAtComplete: false
    }
  ],
  userstyles: [],
  hotkeys: [
    {
      id: "previousLocation",
      description: "Use in the code area to navigate to previous visited positions after using the find bar.",
      default: ["Ctrl", "Left"]
    },
    {
      id: "nextLocation",
      description: "Use in the code area to navigate to next visited positions after using the find bar.",
      default: ["Ctrl", "Right"]
    }
  ],
  tags: ["codeEditor", "costumeEditor", "recommended"],
  enabledByDefault: true
});

var addons = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'find-bar': addon
});

export { addons as a };
