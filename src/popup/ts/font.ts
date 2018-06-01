class Font {

    private static _instance:Font;

    private constructor()
    {

    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    selectedIndex:number = 0;
    selectedSize:number = 140;

    fontFaceCss = {
        cssOrigin: browser.extensionTypes.CSSOrigin.user, 
        file: this._getFontFaceStyle()
    };
    
    fontCss = {
        cssOrigin: browser.extensionTypes.CSSOrigin.user, 
        file: `/style/font.css`
    };

    get fonts():FontObject[] {

        let fonts:FontObject[] = [
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

        return fonts;
    }

    changeFontSize() {
        browser.tabs.executeScript({
            code: `document.documentElement.style.setProperty('--font-size', '${this.selectedSize}%');`
        });
    }
    
    applyFontFaceStyle() {
        browser.tabs.insertCSS(this.fontFaceCss);
    }

    applyStyle() {
        browser.tabs.insertCSS(this.fontCss);
    }
    
    removeFontFaceStyle() {
        browser.tabs.removeCSS(this.fontFaceCss);
    }

    removeStyle() {
        browser.tabs.removeCSS(this.fontCss);
    }
    
    changeFontFace() {
        this.fontFaceCss.file = this._getFontFaceStyle();
    }
    
    _getFontFaceStyle() {
        return `/style/${this.fonts[this.selectedIndex].id}.css`;
    }
}

interface FontObject {
    id:string;
    name:string;
}