import { pinQuickLink } from "@/utils/quick-link";

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId });
});

const PIN_THIS_SITE = "PIN_THIS_SITE";
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: PIN_THIS_SITE,
    title: "Pin this site",
    contexts: ["selection", "page", "link"] // Choose where it appears
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case PIN_THIS_SITE: {
      const url = URL.parse(info.pageUrl!);
      if (url)
        pinQuickLink(url.origin).catch(console.error);
      break;
    }
  }
});