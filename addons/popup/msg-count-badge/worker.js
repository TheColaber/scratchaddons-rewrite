const ALARM_FETCH_COUNT = "ALARM_FETCH_COUNT";
let session;
async function worker () {
    session = await updateSession();
    updateBadge();
    chrome.alarms.create(ALARM_FETCH_COUNT, {
        delayInMinutes: 5,
        periodInMinutes: 5,
    });
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === ALARM_FETCH_COUNT) {
            updateBadge();
        }
    });
    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
        if (cookie.name === "scratchsessionsid") {
            session = await updateSession();
            updateBadge();
        }
    });
}
async function updateSession() {
    return await (await fetch("https://scratch.mit.edu/session/", {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    })).json();
}
async function updateBadge() {
    if (session.user) {
        const { count } = await (await fetch(`https://api.scratch.mit.edu/users/${session.user.username}/messages/count?timestamp=${Date.now()}`)).json();
        chrome.action.setBadgeText({ text: count.toString() });
        chrome.action.setBadgeBackgroundColor({ color: "#000" });
    }
    else {
        chrome.action.setBadgeText({ text: "" });
    }
}

export { worker as default };
