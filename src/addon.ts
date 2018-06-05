/// <reference path="./font.ts" />
/// <reference path="./storage.ts" />

class Addon {
    static readonly TITLE_ENABLE:string = "Khushkhat Enable";
    static readonly TITLE_DISABLE:string = "Khushkhat Disable";
    static readonly APPLICABLE_PROTOCOLS:string[] = ["http:", "https:"];

    static readonly DEFAULT_FONT_INDEX:number = 0;
    static readonly DEFAULT_FONT_SIZE:number = 140;

    static get font():Font {
        return Font.Instance;
    }

    static get tabStorage():TabStorage {
        return TabStorage.Instance;
    }
    
    private static _onError(error) {
        console.log(error);
    }

    static loadData() {
        this.tabStorage.getData().then((data) => {
            console.log(data);
        }, this._onError);
    }

    changeFontSize() {

    }
}