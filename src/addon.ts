/// <reference path="./utility.ts" />
/// <reference path="./font.ts" />
/// <reference path="./storage.ts" />

class Addon {
    static readonly TITLE_ENABLE:string = "Khushkhat Enable";
    static readonly TITLE_DISABLE:string = "Khushkhat Disable";
    static readonly APPLICABLE_PROTOCOLS:Array<string> = ["http:", "https:"];

    static readonly DEFAULT_FONT_INDEX:number = 1;
    static readonly DEFAULT_FONT_SIZE:number = 140;

    static isEnable:boolean = false;

    private static _onError(error) {
        console.log(error);
    }

    static get font():Font {
        return Font.Instance(this.DEFAULT_FONT_INDEX, this.DEFAULT_FONT_SIZE);
    }

    static get tabStorage():TabStorage {
        return TabStorage.Instance;
    }

    static setStatus(tab:browser.tabs.Tab):Promise<void> {
        return new Promise((resolve, reject) => {
            browser.pageAction.getTitle({tabId: tab.id}).then((title:string) => {
                this.isEnable = (title === this.TITLE_DISABLE);
                resolve();
            }, reject);
        });
    }
    
    static setUIState(tab:browser.tabs.Tab, state:boolean) {
        if (state) {
            browser.pageAction.setIcon({tabId: tab.id, path: browser.extension.getURL("icons/on.svg")});
            browser.pageAction.setTitle({tabId: tab.id, title: this.TITLE_DISABLE});
        }
        else {
            browser.pageAction.setIcon({tabId: tab.id, path: browser.extension.getURL("icons/off.svg")});
            browser.pageAction.setTitle({tabId: tab.id, title: this.TITLE_ENABLE});
        }

        browser.pageAction.show(tab.id);
    }

    static setStyleState(state:boolean) {

        if (state) {
            Addon.font.applyStyle();
            Addon.font.changeFontSize();
            Addon.font.changeFontFace();
        } else {
            Addon.font.removeStyle();
            Addon.font.removeFontFaceStyle();
        }
    }

    static toggleStyle(tab, callback?:Function) {
        this.isEnable = !this.isEnable;
        
        this.setUIState(tab, this.isEnable);
        this.setStyleState(this.isEnable);
        this.saveData();

        if (callback) callback(this.isEnable);
    }

    static saveData():Promise<void> {
        let data:FontData = new FontData(
            this.font.selectedIndex,
            this.font.selectedSize,
            this.isEnable
        );

        return this.tabStorage.setData(data)
            .catch(this._onError);
    }

    static initLoadData(tab):Promise<void> {
        return new Promise((resolve, reject) => {
            Addon.tabStorage.getData().then((data:FontData) => {
                if (data.isEnable) {
                    this.setUIState(tab, data.isEnable);
                }

                this.font.selectedIndex = data.index;
                this.font.selectedSize = data.size;
                this.isEnable = data.isEnable;
                
                this.setStyleState(data.isEnable);

                resolve();
            }, reject);
        });
    }

    static loadData(tab):Promise<void> {
        return new Promise((resolve, reject) => {
            Addon.tabStorage.getData().then((data:FontData) => {
                console.log(data);
                
                this.font.selectedIndex = data.index;
                this.font.selectedSize = data.size;
                this.isEnable = data.isEnable;

                resolve();
            }, reject);
        });
    }
}