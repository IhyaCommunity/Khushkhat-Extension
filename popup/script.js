const TITLE_ENABLE = "Khushkhat Enable";
const TITLE_DISABLE = "Khushkhat Disable";
const CSS = {cssOrigin: 'user', file: "/css/style.css"};

var currentTab = null;
var controlButton = document.querySelector('.control-button');

function onError(error) {
    console.log(error);
}

browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
    currentTab = tab[0];

    browser.pageAction.getTitle({tabId: currentTab.id}).then((title) => {
        if (title == TITLE_DISABLE) {
            setUIState(true);
        }
    });

}, onError);

function setUIState(state) {
    if (state) {
        controlButton.classList.add('enable');

        browser.pageAction.setIcon({tabId: currentTab.id, path: "../icons/on.svg"});
        browser.pageAction.setTitle({tabId: currentTab.id, title: TITLE_DISABLE});
    }
    else {
        controlButton.classList.remove('enable');

        browser.pageAction.setIcon({tabId: currentTab.id, path: "../icons/off.svg"});
        browser.pageAction.setTitle({tabId: currentTab.id, title: TITLE_ENABLE});
    }
}

function toggleStyles(tab) {

    function gotTitle(title) {
      if (title === TITLE_ENABLE) {
        setUIState(true);
        browser.tabs.insertCSS(CSS);
      } else {
        setUIState(false);
        browser.tabs.removeCSS(CSS);
      }
    }

    var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
    gettingTitle.then(gotTitle);
}

controlButton.addEventListener('click', () => {
    toggleStyles(currentTab);
});
