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

chrome.contextMenus.onClicked.addListener(
  ({ parentMenuItemId, menuItemId }) => {
    if (parentMenuItemId === "mute") {
      const period = periods.find(({ id }) => menuItemId === id);
      if (!period) throw "Unknown context menu item";
      contextMenuMuted(true);
      if (period.mins !== Infinity)
        chrome.alarms.create("muted", { delayInMinutes: period.mins });
    } else if (menuItemId === "unmute") {
      contextMenuMuted(false);
    }
  }
);

function contextMenuMuted(muted: boolean) {
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
