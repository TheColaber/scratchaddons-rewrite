import { a as addons } from '../chunk._virtual__addons.js';
import '../addons/editor/code/test-addon/addon.js';
import '../chunk.define-manifest.js';
import '../addons/editor/code/test-addon/userscript.js';

async function index (addonsEnabled, l10nUrls, baseUrl) {
    for (const id in addonsEnabled) {
        if (addonsEnabled[id]) {
            /* @ts-ignore */
            const addon = addons[id];
            console.log(addon);
            if (!addon || !addon.userscripts)
                continue;
            for (const { func, matches } of addon.userscripts) {
                console.log(matches);
                func({ params: true });
            }
        }
    }
}

export { index as default };
