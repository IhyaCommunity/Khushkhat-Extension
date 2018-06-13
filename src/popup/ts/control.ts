namespace Popup {
    export class Control {

        private static _instance:Control;
    
        protected constructor(protected _base:Base)
        {
            if (Addon.isEnable) {
                this.setUIState(true);
            }
            
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
                this._base.optionclearButton.classList.remove('hide');
            }
            else {
                this._base.optionTab.classList.remove('show');
                this._base.controlTab.classList.add('show');
    
                this._base.optionHideButton.classList.add('hide');
                this._base.optionclearButton.classList.add('hide');
                this._base.optionShowButton.classList.remove('hide');
            }
        }
    
        private _bindEventListeners() {
            this._base.controlButton.addEventListener('click', () => {
                Addon.toggleStyle(this._base.currentTab, (state) => {
                    this.setUIState(state);
                    Addon.saveData();
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