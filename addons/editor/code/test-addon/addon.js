import { d as defineManifest } from '../../../../chunk.define-manifest.js';
import userscript from './userscript.js';

var addon = defineManifest({
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

export { addon as default };
