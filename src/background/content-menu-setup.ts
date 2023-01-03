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

(async function () {
  const { muted = false } = await chrome.storage.local.get("muted");
  if (muted) contextMenuMuted();
  else contextMenuUnmuted();
})();

chrome.contextMenus.onClicked.addListener(
  ({ parentMenuItemId, menuItemId }) => {
    if (parentMenuItemId === "mute") {
      const period = periods.find(({ id }) => menuItemId === id);
      if (!period) throw "Unknown context menu item";
      contextMenuMuted();
      muteForMins(period.mins);
    } else if (menuItemId === "unmute") {
      contextMenuUnmuted();
      unmute();
    }
  }
);

let showingMenu: string | null = null;

function contextMenuUnmuted() {
  if (showingMenu === "unmute") chrome.contextMenus.remove("unmute");
  showingMenu = "mute";
  chrome.contextMenus.create({
    id: "mute",
    title: chrome.i18n.getMessage("mute"),
    contexts: ["action"],
  });
  for (const period of periods) {
    chrome.contextMenus.create({
      id: period.id,
      title: chrome.i18n.getMessage(period.id),
      parentId: "mute",
      contexts: ["action"],
    });
  }

  const versionName = chrome.runtime.getManifest().version_name || "";
  const prerelease = versionName.includes("-prerelease");
  chrome.action.setIcon({
    path: {
      16: prerelease ? "../images/icon-blue-16.png" : "../images/icon-16.png",
      32: prerelease ? "../images/icon-blue-32.png" : "../images/icon-32.png",
    },
  });
}

function contextMenuMuted() {
  if (showingMenu === "mute") chrome.contextMenus.remove("mute");
  showingMenu = "unmute";
  chrome.contextMenus.create({
    id: "unmute",
    title: chrome.i18n.getMessage("unmute"),
    contexts: ["action"],
  });
  chrome.action.setIcon({
    path: {
      16: "../images/icon-gray-16.png",
      32: "../images/icon-gray-32.png",
    },
  });
}

function muteForMins(mins: number) {
  if (mins !== Infinity)
    chrome.alarms.create("muted", { delayInMinutes: mins });
  chrome.storage.local.set({ muted: true });
}

function unmute() {
  chrome.storage.local.set({ muted: false });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "muted") {
    unmute();
    contextMenuUnmuted();
  }
});
