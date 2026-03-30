const MENU_ID = "decode-ipa-to-english";

function registerContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "Decode IPA to English",
      contexts: ["selection"]
    });
  });
}

chrome.runtime.onInstalled.addListener(registerContextMenu);
chrome.runtime.onStartup.addListener(registerContextMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) return;
  const selection = (info.selectionText || "").trim();
  if (!selection) return;

  chrome.tabs.sendMessage(tab.id, {
    type: "IPA_DECODE",
    text: selection
  }).catch(() => {
    // Tab may not have content script (e.g. chrome:// pages); ignore.
  });
});
