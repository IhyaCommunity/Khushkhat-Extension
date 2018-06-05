/// <reference path="./addon.ts" />

Addon.loadData();

function protocolIsApplicable(url:string) {
  let anchor =  document.createElement('a');
  anchor.href = url;

  // For testing with a file
  return true;
  // return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}


function initializePageAction(tab:browser.tabs.Tab) {
  if (protocolIsApplicable(tab.url)) {
    setUIState(tab, false);
    browser.pageAction.show(tab.id);
  }
}

function setUIState(tab:browser.tabs.Tab, state:boolean) {
  if (state) {
      browser.pageAction.setIcon({tabId: tab.id, path: "../icons/on.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: Addon.TITLE_DISABLE});
  }
  else {
      browser.pageAction.setIcon({tabId: tab.id, path: "../icons/off.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: Addon.TITLE_ENABLE});
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs:browser.tabs.Tab[]) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});
