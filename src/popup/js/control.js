const TITLE_ENABLE = "Khushkhat Enable";
const TITLE_DISABLE = "Khushkhat Disable";
const CSS = {cssOrigin: 'user', file: "/style/Jameel-Noori-Nastaleeq.css"};

var currentTab = null,
controlButton = document.querySelector('.control-button'),
optionShowButton = document.querySelector('.option-show-button'),
optionHideButton = document.querySelector('.option-hide-button'),
controlTab = document.querySelector('.control'),
optionTab = document.querySelector('.option');

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
        optionShowButton.disabled = false;

        browser.pageAction.setIcon({tabId: currentTab.id, path: "../icons/on.svg"});
        browser.pageAction.setTitle({tabId: currentTab.id, title: TITLE_DISABLE});
    }
    else {
        controlButton.classList.remove('enable');
        optionShowButton.disabled = true;

        browser.pageAction.setIcon({tabId: currentTab.id, path: "../icons/off.svg"});
        browser.pageAction.setTitle({tabId: currentTab.id, title: TITLE_ENABLE});
    }
}

function togglePageStyles(tab) {

    function gotTitle(title) {
      if (title === TITLE_ENABLE) {
        setUIState(true);
        browser.tabs.insertCSS(CSS);
        browser.tabs.executeScript({
            code: `document.documentElement.style.setProperty('--font-size', '140%');`
        });
      } else {
        setUIState(false);
        browser.tabs.removeCSS(CSS);
      }
    }

    var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
    gettingTitle.then(gotTitle);
}

controlButton.addEventListener('click', () => {
    togglePageStyles(currentTab);
});

function setOptionState(state) {
    if (state) {
        optionTab.classList.add('show');
        controlTab.classList.remove('show');

        optionShowButton.classList.add('hide');
        optionHideButton.classList.remove('hide');
    }
    else {
        optionTab.classList.remove('show');
        controlTab.classList.add('show');

        optionHideButton.classList.add('hide');
        optionShowButton.classList.remove('hide');
    }
}

optionShowButton.addEventListener('click', () => {
    setOptionState(true);
});

optionHideButton.addEventListener('click', () => {
    setOptionState(false);
});