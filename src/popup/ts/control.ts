namespace Popup {
    export class Control {

        private static _instance:Control;
    
        protected constructor(protected _base:Base)
        {
            browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
                _base.currentTab = tab[0];
        
                browser.pageAction.getTitle({tabId: _base.currentTab.id}).then((title) => {
                    if (title == _base.TITLE_DISABLE) {
                        this.setUIState(true);
                    }
                });
        
            }, _base.onError);
    
            this._bindEventListeners();
    
        }
    
        public static Instance(base:Base)
        {
            return this._instance || (this._instance = new this(base));
        }
    
        setUIState(state) {
            if (state) {
                this._base.controlButton.classList.add('enable');
                this._base.optionShowButton.disabled = false;
            }
            else {
                this._base.controlButton.classList.remove('enable');
                this._base.optionShowButton.disabled = true;
            }
        }
    
        setOptionState(state) {
            if (state) {
                this._base.optionTab.classList.add('show');
                this._base.controlTab.classList.remove('show');
    
                this._base.optionShowButton.classList.add('hide');
                this._base.optionHideButton.classList.remove('hide');
            }
            else {
                this._base.optionTab.classList.remove('show');
                this._base.controlTab.classList.add('show');
    
                this._base.optionHideButton.classList.add('hide');
                this._base.optionShowButton.classList.remove('hide');
            }
        }
    
        private _bindEventListeners() {
            this._base.controlButton.addEventListener('click', () => {
                this._base.togglePageStyles((state) => {
                    this.setUIState(state);
                });
            });
        
            this._base.optionShowButton.addEventListener('click', () => {
                this.setOptionState(true);
            });
        
            this._base.optionHideButton.addEventListener('click', () => {
                this.setOptionState(false);
            });
        }
    }
}