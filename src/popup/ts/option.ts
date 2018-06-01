namespace Popup {
    export class Options {

        private static _instance:Options;

        protected constructor(protected _base:Base)
        {
            this.setSelectedSizeText();

            let fonts = this._base.font.fonts;
            for (let i in fonts) {
                let optionTab = document.createElement('option');

                optionTab.textContent = fonts[i].name;
                optionTab.value = i;

                if (this._base.font.selectedIndex == parseInt(i)) {
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
                let size = this._base.font.selectedSize - 20;
                if (size < 80) return;
                
                this._base.font.selectedSize = size;
                this._base.font.changeFontSize();
                this.setSelectedSizeText();
            });

            document.querySelector('.default-button').addEventListener('click', (e) => {
                this._base.font.selectedSize = this._base.DEFAULT_FONT_SIZE;
                this._base.font.changeFontSize();
                this.setSelectedSizeText();
            });
            
            document.querySelector('.increase-button').addEventListener('click', (e) => {
                let size = this._base.font.selectedSize + 20;
                if (size > 200) return;
                
                this._base.font.selectedSize = size;
                this._base.font.changeFontSize();
                this.setSelectedSizeText();
            });
        }

        changeFont(index:number) {
            if (this._base.isStyleEnable) {
                this._base.font.removeFontFaceStyle();
        
                if(index > -1) {
                    this._base.font.selectedIndex = index;
                    this._base.font.changeFontFace();
                    this._base.font.applyFontFaceStyle();
                }
            }
        }
        
        setSelectedSizeText() {
            this._defaultSizeButton.textContent = this._base.font.selectedSize + '%';
        }
    }
}