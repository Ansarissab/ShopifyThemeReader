// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runContentScript") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "runContentScript" });
    });
  }
});
