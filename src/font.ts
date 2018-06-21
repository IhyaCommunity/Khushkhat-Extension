class Font {

    private static _instance:Font;

    private constructor(public selectedIndex:number, public selectedSize:number) {
    }

    public static Instance(selectedIndex:number, selectedSize:number) {
        return this._instance || (this._instance = new this(selectedIndex, selectedSize));
    }

    get fontFaceCss():browser.extensionTypes.InjectDetails {
        return {
            cssOrigin: browser.extensionTypes.CSSOrigin.user,
            file: this._getFontFaceStyle()
        };
    }

    get fontCss():browser.extensionTypes.InjectDetails {
        return {
            cssOrigin: browser.extensionTypes.CSSOrigin.user,
            file: browser.extension.getURL("style/font.css")
        };
    }

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
    
    applyFontFaceStyle() {
        browser.tabs.insertCSS(this.fontFaceCss);
    }

    removeFontFaceStyle() {
        browser.tabs.removeCSS(this.fontFaceCss);
    }

    applyStyle() {
        browser.tabs.insertCSS(this.fontCss);
    }
    
    removeStyle() {
        browser.tabs.removeCSS(this.fontCss);
    }

    changeFontSize() {
        browser.tabs.executeScript({
            code: `document.documentElement.style.setProperty('--font-size', '${this.selectedSize}%');`
        });
    }

    changeFontFace() {
        this.removeFontFaceStyle();
        this.fontFaceCss.file = this._getFontFaceStyle();
        this.applyFontFaceStyle();
    }

    private _getFontFaceStyle() {
        return browser.extension.getURL(`style/${this.fonts[this.selectedIndex].id}.css`);
    }
}

interface FontObject {
    id:string;
    name:string;
}