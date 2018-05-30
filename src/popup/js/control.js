const TITLE_ENABLE = "Khushkhat Enable";
const TITLE_DISABLE = "Khushkhat Disable";

let isStyleEnable = false;

let fonts = [
    {
        id: 'Jameel-Noori-Nastaleeq',
        name: 'Jameel Noori Nastaleeq'
    },
    {
        id: 'Noori-Khushkhat',
        name: 'Noori Khushkhat'
    },
    {
        id: 'Urdu-Naskh-Asiatype',
        name: 'Urdu Naskh Asiatype'
    }
];

const DEFAULT_FONT_INDEX = 0;
const DEFAULT_FONT_SIZE = 140;

let selectedFontIndex = 0;
let selectedFontSize = 140;

let fontFaceCss = {cssOrigin: 'user', file: getFontFaceStyle(selectedFontIndex)};
let fontCss = {cssOrigin: 'user', file: `/style/font.css`};

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

        isStyleEnable = true;
    }
    else {
        controlButton.classList.remove('enable');
        optionShowButton.disabled = true;

        browser.pageAction.setIcon({tabId: currentTab.id, path: "../icons/off.svg"});
        browser.pageAction.setTitle({tabId: currentTab.id, title: TITLE_ENABLE});

        isStyleEnable = false;
    }
}

function togglePageStyles(tab) {

    function gotTitle(title) {
        if (title === TITLE_ENABLE) {
            setUIState(true);
            applyFontFaceStyle();
            browser.tabs.insertCSS(fontCss);
            changeFontSize(selectedFontSize);
        } else {
            browser.tabs.removeCSS(fontCss);
            removeFontFaceStyle()
            setUIState(false);
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

function changeFontSize(fontSize) {
    browser.tabs.executeScript({
        code: `document.documentElement.style.setProperty('--font-size', '${fontSize}%');`
    });
}

function applyFontFaceStyle() {
    browser.tabs.insertCSS(fontFaceCss);
}

function removeFontFaceStyle() {
    browser.tabs.removeCSS(fontFaceCss);
}

function changeFontFace(i) {
    fontFaceCss.file = getFontFaceStyle(i);
}

function getFontFaceStyle(i) {
    return `/style/${fonts[i].id}.css`;
}

optionShowButton.addEventListener('click', () => {
    setOptionState(true);
});

optionHideButton.addEventListener('click', () => {
    setOptionState(false);
});