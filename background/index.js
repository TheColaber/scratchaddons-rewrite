import { a as addons } from '../chunk._virtual__addons.js';
import { p as popups } from '../chunk._virtual__popups.js';

(async function () {
    const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");
    const allAddons = Object.assign(Object.assign({}, addons), popups);
    for (const id in allAddons) {
        /* @ts-ignore */
        const manifest = allAddons[id];
        if (addonsEnabled[id] === undefined)
            addonsEnabled[id] = !!manifest.enabledByDefault;
    }
    chrome.storage.sync.set({ addonsEnabled });
})();

chrome.tabs.onUpdated.addListener(async (tabId, { status }, { url }) => {
    if (!url)
        return;
    if (status !== "loading")
        return;
    // chrome.scripting.executeScript({
    //   target: { tabId },
    //   injectImmediately: true,
    //   world: chrome.scripting.ExecutionWorld.MAIN,
    //   files: ["content-scripts/fix-console.js", "content-scripts/prototype-handler.js", "content-scripts/load-redux.js"],
    // });
    // const { globalState, addonsWithUserscripts, styles } = await getInfo(url);
    const l10nUrls = await getL10NURLs(url);
    const { addonsEnabled = {} } = await chrome.storage.sync.get("addonsEnabled");
    const result = await chrome.scripting.executeScript({
        target: { tabId },
        injectImmediately: true,
        world: "MAIN",
        func: async (script, addonsEnabled, l10nUrls, baseUrl) => {
            const { default: module } = await import(script);
            module(addonsEnabled, l10nUrls, baseUrl);
        },
        args: [
            chrome.runtime.getURL("mainworld/index.js"),
            addonsEnabled,
            l10nUrls,
            chrome.runtime.getURL(""),
        ],
    });
    console.log(result);
    // if (!styles.length) return;
    // chrome.scripting.insertCSS({
    //   target: { tabId },
    //   // origin: chrome.scripting.StyleOrigin.AUTHOR,
    //   files: styles.map((style) => style.href),
    // });
});
async function getL10NURLs(url) {
    const cookie = await chrome.cookies.get({ url, name: "scratchlanguage" });
    const langCode = cookie ? cookie.value || "en" : "en";
    const urls = [chrome.runtime.getURL(`addons-l10n/${langCode}`)];
    if (langCode === "pt") {
        urls.push(chrome.runtime.getURL(`addons-l10n/pt-br`));
    }
    if (langCode.includes("-")) {
        urls.push(chrome.runtime.getURL(`addons-l10n/${langCode.split("-")[0]}`));
    }
    const enJSON = chrome.runtime.getURL("addons-l10n/en");
    if (!urls.includes(enJSON))
        urls.push(enJSON);
    return urls;
}
// async function getInfo(url) {
//   const manifests = await loadAddonManifests();
//   const { addonsEnabled, addonSettings } = await loadSettings();
//   const data = {
//     globalState: {},
//     addonsWithUserscripts: [],
//     styles: [],
//   };
//   manifests.forEach(({ addonId, manifest }) => {
//     if (!addonsEnabled[addonId]) return;
//     const scripts = [];
//     for (const script of manifest.userscripts || []) {
//       if (urlMatches({ url }, script, addonId))
//         scripts.push({
//           url: script.url,
//           runAtComplete: typeof script.runAtComplete === "boolean" ? script.runAtComplete : true,
//         });
//     }
//     for (let i = 0; i < manifest.userstyles?.length; i++) {
//       const style = manifest.userstyles[i];
//       // const styleHref = chrome.runtime.getURL(`/addons/${addonId}/${style.url}`);
//       const styleHref = `/addons/${addonId}/${style.url}`;
//       if (urlMatches({ url }, style, addonId))
//         // if (manifest.injectAsStyleElt) {
//         //   // Reserve index in array to avoid race conditions (#700)
//         //   const arrLength = styles.push(null);
//         //   const indexToUse = arrLength - 1;
//         //   promises.push(
//         //     fetch(styleHref)
//         //       .then((res) => res.text())
//         //       .then((text) => {
//         //         // Replace %addon-self-dir% for relative URLs
//         //         text = text.replace(/\%addon-self-dir\%/g, chrome.runtime.getURL(`addons/${addonId}`));
//         //         // Provide source url
//         //         text += `\n/*# sourceURL=${style.url} */`;
//         //         styles[indexToUse] = {
//         //           href: styleHref,
//         //           text,
//         //           index: i,
//         //           addonEnabled: style.if?.addonEnabled,
//         //         };
//         //       })
//         //   );
//         // } else {
//         data.styles.push({
//           href: styleHref,
//           // index: i,
//           // addonEnabled: style.if?.addonEnabled,
//         });
//       // }
//     }
//     if (scripts.length) {
//       data.addonsWithUserscripts.push({ addonId, scripts });
//     }
//   });
//   data.globalState = scratchAddons.globalState._target;
//   return data;
//   // regexPattern = "^https:(absolute-regex)" | "^(relative-regex)"
//   // matchesPattern = "*" | regexPattern | Array<wellKnownName | wellKnownMatcher | regexPattern | legacyPattern>
//   function urlMatches(data, scriptOrStyle, addonId) {
//     // Pathname patterns. Make sure NOT to set global flag!
//     // Don't forget ^ and $
//     const WELL_KNOWN_PATTERNS = {
//       projects: /^\/projects\/(?:editor|\d+(?:\/(?:fullscreen|editor))?)\/?$/,
//       projectEmbeds: /^\/projects\/\d+\/embed\/?$/,
//       studios: /^\/studios\/\d+(?:\/(?:projects|comments|curators|activity))?\/?$/,
//       profiles: /^\/users\/[\w-]+\/?$/,
//       topics: /^\/discuss\/topic\/\d+\/?$/,
//       newPostScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add)\/?$/,
//       editingScreens: /^\/discuss\/(?:topic\/\d+|\d+\/topic\/add|post\/\d+\/edit|settings\/[\w-]+)\/?$/,
//       forums: /^\/discuss(?!\/m(?:$|\/))(?:\/.*)?$/,
//       scratchWWWNoProject:
//         /^\/(?:(?:about|annual-report(?:\/\d+)?|camp|conference\/20(?:1[79]|[2-9]\d|18(?:\/(?:[^\/]+\/details|expect|plan|schedule))?)|contact-us|code-of-ethics|credits|developers|DMCA|download(?:\/scratch2)?|educators(?:\/(?:faq|register|waiting))?|explore\/(?:project|studio)s\/\w+(?:\/\w+)?|community_guidelines|faq|ideas|join|messages|parents|privacy_policy(?:\/apps)?|research|scratch_1\.4|search\/(?:project|studio)s|starter-projects|classes\/(?:complete_registration|[^\/]+\/register\/[^\/]+)|signup\/[^\/]+|terms_of_use|wedo(?:-legacy)?|ev3|microbit|vernier|boost|studios\/\d*(?:\/(?:projects|comments|curators|activity))?|components|become-a-scratcher)\/?)?$/,
//     };
//     const WELL_KNOWN_MATCHERS = {
//       isNotScratchWWW: (match) => {
//         const { projects, projectEmbeds, scratchWWWNoProject } = WELL_KNOWN_PATTERNS;
//         // Server errors are neither r2 nor www
//         return !(
//           projects.test(match) ||
//           projectEmbeds.test(match) ||
//           scratchWWWNoProject.test(match) ||
//           /^\/(?:50[03]\/?$|cdn\/)/.test(match)
//         );
//       },
//     };
//     if (scriptOrStyle.if && !matchesIf(scriptOrStyle, addonSettings[addonId])) return false;
//     const url = data.url;
//     const parsedURL = new URL(url);
//     const { matches, _scratchDomainImplied } = scriptOrStyle;
//     const parsedPathname = parsedURL.pathname;
//     const parsedOrigin = parsedURL.origin;
//     const originPath = parsedOrigin + parsedPathname;
//     const matchURL = _scratchDomainImplied ? parsedPathname : originPath;
//     const scratchOrigin = "https://scratch.mit.edu";
//     const isScratchOrigin = parsedOrigin === scratchOrigin;
//     // "*" is used for any URL on Scratch origin
//     if (matches === "*") return isScratchOrigin;
//     // matches becomes RegExp if it is a string that starts with ^
//     // See load-addon-manifests.js
//     if (matches instanceof RegExp) {
//       if (_scratchDomainImplied && !isScratchOrigin) return false;
//       return matches.test(matchURL);
//     }
//     for (const match of matches) {
//       if (match instanceof RegExp) {
//         if (match._scratchDomainImplied && !isScratchOrigin) continue;
//         if (match.test(match._scratchDomainImplied ? parsedPathname : originPath)) {
//           return true;
//         }
//       } else if (Object.prototype.hasOwnProperty.call(WELL_KNOWN_PATTERNS, match)) {
//         if (isScratchOrigin && WELL_KNOWN_PATTERNS[match].test(parsedPathname)) return true;
//       } else if (Object.prototype.hasOwnProperty.call(WELL_KNOWN_MATCHERS, match)) {
//         if (isScratchOrigin && WELL_KNOWN_MATCHERS[match](parsedPathname)) return true;
//       } else if (urlMatchesLegacyPattern(match, parsedURL)) return true;
//     }
//     return false;
//   }
//   function matchesIf(injectable, settings) {
//     // injectable.if is guaranteed to exist
//     // addonEnabled and settings are AND-ed
//     // settings keys are AND-ed
//     // addonEnabled and settings values are OR-ed
//     /**
//      * Formula:
//      * NOT (
//      *  (addonEnabled exists AND all of the addons are disabled) OR
//      *  (settings exists AND there is a setting where none of potential values match)
//      * )
//      * Or,
//      * NOT (
//      *  (addonEnabled AND AND(addons**Dis**abled)) OR
//      *  (settings exists AND OR(AND(settings do **NOT** match)))
//      * )
//      */
//     return !(
//       (injectable.if.addonEnabled?.length &&
//         (Array.isArray(injectable.if.addonEnabled) ? injectable.if.addonEnabled : [injectable.if.addonEnabled]).every(
//           (addon) => !scratchAddons.localState.addonsEnabled[addon]
//         )) ||
//       (injectable.if.settings &&
//         Object.keys(injectable.if.settings).some((settingName) =>
//           (Array.isArray(injectable.if.settings[settingName])
//             ? injectable.if.settings[settingName]
//             : [injectable.if.settings[settingName]]
//           ).every((possibleValue) => settings[settingName] !== possibleValue)
//         ))
//     );
//   }
//   function urlMatchesLegacyPattern(pattern, urlUrl) {
//     const patternUrl = new URL(pattern);
//     // We assume both URLs start with https://scratch.mit.edu
//     const patternPath = patternUrl.pathname.split("/");
//     const urlPath = urlUrl.pathname.split("/");
//     // Implicit slash at the end of the URL path, if it's not there
//     if (urlPath[urlPath.length - 1] !== "") urlPath.push("");
//     // Implicit slash at the end of the pattern, unless it's a wildcard
//     if (patternPath[patternPath.length - 1] !== "" && patternPath[patternPath.length - 1] !== "*") patternPath.push("");
//     while (patternPath.length) {
//       // shift() removes the first item of an array, and returns it
//       const patternItem = patternPath.shift();
//       const urlItem = urlPath.shift();
//       if (patternItem !== urlItem && patternItem !== "*") return false;
//     }
//     return true;
//   }
// }

const periods = [
    {
        id: "15min",
        mins: 15,
    },
    {
        id: "1hour",
        mins: 60,
    },
    {
        id: "8hours",
        mins: 480,
    },
    {
        id: "24hours",
        mins: 1440,
    },
    {
        id: "untilEnabled",
        mins: Infinity,
    },
];
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    id: "unmute",
    title: chrome.i18n.getMessage("unmute"),
    contexts: ["action"],
});
chrome.contextMenus.create({
    id: "mute",
    title: chrome.i18n.getMessage("mute"),
    contexts: ["action"],
});
for (const period of periods) {
    chrome.contextMenus.create({
        id: period.id,
        parentId: "mute",
        title: chrome.i18n.getMessage(period.id),
        contexts: ["action"],
    });
}
(async function () {
    const { muted = false } = await chrome.storage.local.get("muted");
    contextMenuMuted(muted);
})();
chrome.contextMenus.onClicked.addListener(({ parentMenuItemId, menuItemId }) => {
    if (parentMenuItemId === "mute") {
        const period = periods.find(({ id }) => menuItemId === id);
        if (!period)
            throw "Unknown context menu item";
        contextMenuMuted(true);
        if (period.mins !== Infinity)
            chrome.alarms.create("muted", { delayInMinutes: period.mins });
    }
    else if (menuItemId === "unmute") {
        contextMenuMuted(false);
    }
});
function contextMenuMuted(muted) {
    chrome.contextMenus.update("mute", { visible: !muted });
    chrome.contextMenus.update("unmute", { visible: muted });
    chrome.storage.local.set({ muted });
    const versionName = chrome.runtime.getManifest().version_name || "";
    const prerelease = versionName.includes("-prerelease");
    const icon = muted ? "icon-gray" : prerelease ? "icon-blue" : "icon";
    chrome.action.setIcon({
        path: {
            16: `../images/${icon}-16.png`,
            32: `../images/${icon}-32.png`,
        },
    });
}
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "muted") {
        contextMenuMuted(false);
    }
});
