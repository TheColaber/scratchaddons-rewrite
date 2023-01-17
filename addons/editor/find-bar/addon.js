import { d as defineManifest } from '../../../chunk.define-manifest.js';
import userscript from './userscript.js';
import '../../../chunk.style-inject.es.js';

var addon = defineManifest({
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
            default: ["Ctrl", "Left"],
        },
        {
            id: "nextLocation",
            default: ["Ctrl", "Right"],
        },
    ],
    tags: ["codeEditor", "costumeEditor", "recommended"],
    enabledByDefault: true,
});

export { addon as default };
