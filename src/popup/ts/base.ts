/// <reference path="../../addon.ts" />

namespace Popup {
    export class Base {

        private static _instance:Base;

        private constructor() { }
    
        public static get Instance()
        {
            return this._instance || (this._instance = new this());
        }

        currentTab:browser.tabs.Tab;

        isStyleEnable:boolean = false;
    
        controlButton:HTMLButtonElement = document.querySelector('.control-button');
        optionShowButton:HTMLButtonElement = document.querySelector('.option-show-button');
        optionHideButton:HTMLButtonElement = document.querySelector('.option-hide-button');
        optionclearButton:HTMLButtonElement = document.querySelector('.option-clear-button');
        controlTab = document.querySelector('.control');
        optionTab = document.querySelector('.option');

        togglePageStyles(callback:Function) {

            function gotTitle(title) {
                if (title === Addon.TITLE_ENABLE) {
                    this.setUIState(true);
                    Addon.font.applyFontFaceStyle();
                    Addon.font.applyStyle()
                    Addon.font.changeFontSize();

                    callback(true);
                } else {
                    Addon.font.removeStyle()
                    Addon.font.removeFontFaceStyle()
                    this.setUIState(false);

                    callback(false);
                }
            }
    
            var gettingTitle = browser.pageAction.getTitle({tabId: this.currentTab.id});
            gettingTitle.then(gotTitle.bind(this), this.onError);
        }
    
        setUIState(state:boolean) {
            if (state) {
                browser.pageAction.setIcon({tabId: this.currentTab.id, path: "../icons/on.svg"});
                browser.pageAction.setTitle({tabId: this.currentTab.id, title: Addon.TITLE_DISABLE});
    
                this.isStyleEnable = true;
            }
            else {
                browser.pageAction.setIcon({tabId: this.currentTab.id, path: "../icons/off.svg"});
                browser.pageAction.setTitle({tabId: this.currentTab.id, title: Addon.TITLE_ENABLE});
    
                this.isStyleEnable = false;
            }
        }
    
        onError(error) {
            console.log(error);
        }
    }
}