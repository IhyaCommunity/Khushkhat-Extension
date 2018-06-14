namespace Popup {
    export class Base {

        private static _instance:Base;

        private constructor() {
            this._bindEventListeners();
        }
    
        public static get Instance() {
            return this._instance || (this._instance = new this());
        }

        private backUITab:UITab = UITab.None;
        currentTab:browser.tabs.Tab;

        navigation:HTMLDivElement = document.querySelector('.navigation');
        infoShowButton:HTMLButtonElement = document.querySelector('.info-show-button');
        infoHideButton:HTMLButtonElement = document.querySelector('.info-hide-button');
        controlButton:HTMLButtonElement = document.querySelector('.control-button');
        optionShowButton:HTMLButtonElement = document.querySelector('.option-show-button');
        optionHideButton:HTMLButtonElement = document.querySelector('.option-hide-button');
        optionclearButton:HTMLButtonElement = document.querySelector('.option-clear-button');
        infoTab = document.querySelector('.info');
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

        private _bindEventListeners() {
            this.infoShowButton.addEventListener('click', (e) => {

                if (this.controlTab.classList.contains('show')) {
                    this.controlTab.classList.remove('show');
                    this.backUITab = UITab.Control;
                }
                else if (this.optionTab.classList.contains('show')) {
                    this.optionTab.classList.remove('show');
                    this.backUITab = UITab.Option;
                }

                this.navigation.classList.add('hide');
                this.infoTab.classList.add('show');
            });

            this.infoHideButton.addEventListener('click', (e) => {
                this.infoTab.classList.remove('show');

                if (this.backUITab == UITab.Control) {
                    this.controlTab.classList.add('show');
                }
                else if (this.backUITab == UITab.Option) {
                    this.optionTab.classList.add('show');
                }

                this.navigation.classList.remove('hide');
            });
        }
    }

    enum UITab {
        None,
        Info,
        Control,
        Option
    }
}