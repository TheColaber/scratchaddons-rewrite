chrome.commands.onCommand.addListener((command) => {
  if (command === "open_settings_page") {
    chrome.runtime.openOptionsPage();
  }
});
