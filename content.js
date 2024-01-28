// content.js
let themeInfo;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runContentScript") {
    if (!themeInfo) {
      const scripts = document.querySelectorAll("script");
      let themeScript;

      scripts.forEach((script) => {
        if (/Shopify\.theme\s*=\s*({[^;]*});/.test(script.textContent)) {
          themeScript = script;
        }
      });

      if (themeScript) {
        themeInfo = extractThemeInfo(themeScript.textContent);
      }
    }

    if (themeInfo) {
      chrome.runtime.sendMessage({ themeInfo });
    }
  }
});

function extractThemeInfo(scriptContent) {
  const themeMatch = scriptContent.match(/Shopify\.theme\s*=\s*({[^;]*});/);
  if (themeMatch && themeMatch[1]) {
    try {
      return JSON.parse(themeMatch[1]);
    } catch (error) {
      console.error("Error parsing Shopify theme information:", error);
    }
  }
  return null;
}
