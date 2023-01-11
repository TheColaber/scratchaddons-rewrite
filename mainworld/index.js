import { a as addons } from '../_virtual__addons-351de710.js';

async function index (addonsEnabled, l10nUrls, baseUrl) {
    for (const id in addonsEnabled) {
        if (addonsEnabled[id]) {
            /* @ts-ignore */
            const addon = addons[id];
            console.log(addon);
            if (!addon)
                continue;
            for (const { url } of addon.userscripts) {
                const { default: func } = await import(baseUrl + url);
                func({ params: true });
            }
        }
    }
}

export { index as default };
