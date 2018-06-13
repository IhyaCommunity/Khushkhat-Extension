namespace Popup {
    export class Base {

        private static _instance:Base;

        private constructor() { }
    
        public static get Instance() {
            return this._instance || (this._instance = new this());
        }

        currentTab:browser.tabs.Tab;

        controlButton:HTMLButtonElement = document.querySelector('.control-button');
        optionShowButton:HTMLButtonElement = document.querySelector('.option-show-button');
        optionHideButton:HTMLButtonElement = document.querySelector('.option-hide-button');
        optionclearButton:HTMLButtonElement = document.querySelector('.option-clear-button');
        controlTab = document.querySelector('.control');
        optionTab = document.querySelector('.option');

        onError(error) {
            console.log(error);
        }

        loadData():Promise<void> {
            return new Promise<void>((resolve, reject)=> {
                Utility.onActiveTab().then((tab) => {
                    this.currentTab = tab;
    
                    Addon.loadData(tab).then(() => resolve());
    
                }, this.onError);
            });
        }

        closePopup() {
            window.close();
        }
    }
}