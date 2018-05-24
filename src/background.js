TITLE_ENABLE = "Khushkhat Enable";
TITLE_DISABLE = "Khushkhat Disable";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;

  // For testing with a file
  return true;
  // return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    setUIState(tab, false);
    browser.pageAction.show(tab.id);
  }
}

function setUIState(tab, state) {
  if (state) {
      browser.pageAction.setIcon({tabId: tab.id, path: "../icons/on.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_DISABLE});
  }
  else {
      browser.pageAction.setIcon({tabId: tab.id, path: "../icons/off.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_ENABLE});
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});
