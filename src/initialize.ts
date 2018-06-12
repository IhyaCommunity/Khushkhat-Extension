/// <reference path="./addon.ts" />

class Initialize {

  constructor() {
    browser.tabs.query({}).then((tabs:browser.tabs.Tab[]) => {
      for (let tab of tabs) {
        this.initializePageAction(tab);
      }
    });

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
      this.initializePageAction(tab);
    });
  }

  protocolIsApplicable(url:string) {
    let anchor =  document.createElement('a');
    anchor.href = url;
  
    return Addon.APPLICABLE_PROTOCOLS.includes(anchor.protocol);
  }

  initializePageAction(tab:browser.tabs.Tab) {
    if (this.protocolIsApplicable(tab.url)) {
      Addon.setUIState(tab, false);
      Addon.initLoadData(tab);
    }
  }

}

new Initialize();