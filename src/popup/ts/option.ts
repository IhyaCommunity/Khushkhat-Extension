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
            });

            document.querySelector('.decrease-button').addEventListener('click', (e) => {
                let size = Addon.font.selectedSize - 20;
                if (size < 80) return;
                
                Addon.font.selectedSize = size;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
            });

            document.querySelector('.default-button').addEventListener('click', (e) => {
                Addon.font.selectedSize = Addon.DEFAULT_FONT_SIZE;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
            });
            
            document.querySelector('.increase-button').addEventListener('click', (e) => {
                let size = Addon.font.selectedSize + 20;
                if (size > 200) return;
                
                Addon.font.selectedSize = size;
                Addon.font.changeFontSize();
                this.setSelectedSizeText();
            });

            this._base.optionclearButton.addEventListener('click', (e) => {
                console.log('Clear');
            });
        }

        changeFont(index:number) {
            if (this._base.isStyleEnable) {
                Addon.font.removeFontFaceStyle();
        
                if(index > -1) {
                    Addon.font.selectedIndex = index;
                    Addon.font.changeFontFace();
                    Addon.font.applyFontFaceStyle();
                }
            }
        }
        
        setSelectedSizeText() {
            this._defaultSizeButton.textContent = Addon.font.selectedSize + '%';
        }
    }
}