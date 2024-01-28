// popup.js
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "runContentScript" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.themeInfo) {
    const themeNameElement = document.getElementById("themeName");
    const themeIdElement = document.getElementById("themeId");

    themeNameElement.textContent = request.themeInfo.name || "N/A";
    themeIdElement.textContent = request.themeInfo.id || "N/A";
  }
});
