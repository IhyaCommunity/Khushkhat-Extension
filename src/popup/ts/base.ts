/// <reference path="./font.ts" />

namespace Popup {
    export class Base {

        readonly TITLE_ENABLE:string = 'Khushkhat Enable';
        readonly TITLE_DISABLE:string = 'Khushkhat Disable';
    
        readonly DEFAULT_FONT_INDEX:number = 0;
        readonly DEFAULT_FONT_SIZE:number = 140;

        private static _instance:Base;

        private constructor() {
            this.font = Font.Instance;
        }
    
        public static get Instance()
        {
            return this._instance || (this._instance = new this());
        }
    
        font:Font;
    
        isStyleEnable:boolean = false;
    
        currentTab = null;
    
        controlButton:HTMLButtonElement = document.querySelector('.control-button');
        optionShowButton:HTMLButtonElement = document.querySelector('.option-show-button');
        optionHideButton:HTMLButtonElement = document.querySelector('.option-hide-button');
        optionclearButton:HTMLButtonElement = document.querySelector('.option-clear-button');
        controlTab = document.querySelector('.control');
        optionTab = document.querySelector('.option');

        togglePageStyles(callback:Function) {

            function gotTitle(title) {
                if (title === this.TITLE_ENABLE) {
                    this.setUIState(true);
                    this.font.applyFontFaceStyle();
                    this.font.applyStyle()
                    this.font.changeFontSize();

                    callback(true);
                } else {
                    this.font.removeStyle()
                    this.font.removeFontFaceStyle()
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
                browser.pageAction.setTitle({tabId: this.currentTab.id, title: this.TITLE_DISABLE});
    
                this.isStyleEnable = true;
            }
            else {
                browser.pageAction.setIcon({tabId: this.currentTab.id, path: "../icons/off.svg"});
                browser.pageAction.setTitle({tabId: this.currentTab.id, title: this.TITLE_ENABLE});
    
                this.isStyleEnable = false;
            }
        }
    
        onError(error) {
            console.log(error);
        }
    }
}