import { a as addons } from '../chunk._virtual__addons.js';
import '../addons/editor/code/test-addon/addon.js';
import '../chunk.define-manifest.js';
import '../addons/editor/code/test-addon/userscript.js';

var MATCH_PATTERNS = {
    projects: /^\/projects\/(?:editor|\d+(?:\/(?:fullscreen|editor))?)\/?$/,
    projectEmbeds: /^\/projects\/\d+\/embed\/?$/,
    studios: /^\/studios\/\d+(?:\/(?:projects|comments|curators|activity))?\/?$/,
    profiles: /^\/users\/[\w-]+\/?$/,
    topics: /^\/discuss\/topic\/\d+\/?$/,
    newPostScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add)\/?$/,
    editingScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add|post\/\d+\/edit|settings\/[\w-]+)\/?$/,
    forums: /^\/discuss(?!\/m(?:$|\/))(?:\/.*)?$/,
    // scratch-www routes, not including project pages
    // Matches /projects (an error page) but not /projects/<id>
    scratchWWWNoProject: /^\/(?:(?:about|annual-report(?:\/\d+)?|camp|conference\/20(?:1[79]|[2-9]\d|18(?:\/(?:[^\/]+\/details|expect|plan|schedule))?)|contact-us|code-of-ethics|credits|developers|DMCA|download(?:\/(?:scratch2|scratch-link))?|educators(?:\/(?:faq|register|waiting))?|explore\/(?:project|studio)s\/\w+(?:\/\w+)?|community_guidelines|faq|ideas|join|messages|parents|privacy_policy(?:\/apps)?|research|scratch_1\.4|search\/(?:project|studio)s|starter-projects|classes\/(?:complete_registration|[^\/]+\/register\/[^\/]+)|signup\/[^\/]+|terms_of_use|wedo(?:-legacy)?|ev3|microbit|vernier|boost|studios\/\d*(?:\/(?:projects|comments|curators|activity))?|components|become-a-scratcher|projects)\/?)?$/,
};

window.scratchAddons = {
    console: Object.assign({}, console),
    events: new EventTarget()
};
window.scratchAddons.events.addEventListener("addonChange", (event) => {
    console.log(event);
});
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
