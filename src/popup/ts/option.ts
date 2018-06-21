namespace Popup {
    export class Options {

        private static _instance:Options;

        protected constructor(protected _base:Base)
        {
            this.setSelectedSizeText();

            let fonts = Addon.font.fonts;
            for (let i in fonts) {
                let optionTab = document.createElement('option');

                optionTab.textContent = fonts[i].name;
                optionTab.value = i;

                if (Addon.font.selectedIndex == parseInt(i)) {
                    optionTab.selected = true;
                }

                this._fontSelect.appendChild(optionTab);
            }

            this.setSelectedSizeText();
            this._bindEventListener();
        }

        public static Instance(base:Base)
        {
            return this._instance || (this._instance = new this(base));
        }

        private _defaultSizeButton:HTMLButtonElement = document.querySelector('.default-button');
        private _fontSelect:HTMLSelectElement = this._base.optionTab.querySelector('.font-select');

        _bindEventListener() {
            this._fontSelect.addEventListener('change', (e) => {
                this.changeFont(parseInt(this._fontSelect.value));
                Addon.saveData();
            });

            document.querySelector('.decrease-button').addEventListener('click', (e) => {
                let size = Addon.font.selectedSize - 20;
                if (size < 80) return;
                
                Addon.font.selectedSize = size;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
                Addon.saveData();
            });

            document.querySelector('.default-button').addEventListener('click', (e) => {
                Addon.font.selectedSize = Addon.DEFAULT_FONT_SIZE;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
                Addon.saveData();
            });
            
            document.querySelector('.increase-button').addEventListener('click', (e) => {
                let size = Addon.font.selectedSize + 20;
                if (size > 200) return;
                
                Addon.font.selectedSize = size;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
                Addon.saveData();
            });

            this._base.optionclearButton.addEventListener('click', (e) => {
                Addon.clearData(this._base.currentTab).then(() => {
                    this._base.closePopup();
                });
            });
        }

        changeFont(index:number) {
            if (Addon.isEnable) {
                Addon.font.removeFontFaceStyle();
        
                if(index > -1) {
                    Addon.font.selectedIndex = index;
                    Addon.font.changeFontFace();
                }
            }
        }
        
        setSelectedSizeText() {
            this._defaultSizeButton.textContent = Addon.font.selectedSize + '%';
        }
    }
}