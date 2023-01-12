import { a as addons } from '../chunk._virtual__addons.js';
import MATCH_PATTERNS from './matches.js';
import '../addons/editor/code/test-addon/addon.js';
import '../chunk.define-manifest.js';
import '../addons/editor/code/test-addon/userscript.js';

async function index (addonsEnabled, l10nUrls) {
    for (const id in addonsEnabled) {
        if (addonsEnabled[id]) {
            /* @ts-ignore */
            const addon = addons[id];
            if (!addon || !addon.userscripts)
                continue;
            for (const { func, matches } of addon.userscripts) {
                let urlMatches = false;
                for (const match of matches) {
                    /* @ts-ignore */
                    if (MATCH_PATTERNS[match].test(window.location.pathname)) {
                        urlMatches = true;
                    }
                }
                if (urlMatches) {
                    func({ params: true });
                }
            }
        }
    }
}

export { index as default };
