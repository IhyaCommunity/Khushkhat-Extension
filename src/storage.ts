class TabStorage {

    private static _instance:TabStorage;

    private constructor()
    { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private _getHost(url:string):string {
        let anchor =  document.createElement('a');
        anchor.href = url;

        if (anchor.host.length <= 0) {
            throw new URIError('Unable to get hostname from the URL');
        }

        return anchor.host;
    }

    getData():Promise<FontData> {
        return new Promise((resolve, reject) => {
            Utility.onActiveTab().then((tab) => {
                let host = this._getHost(tab.url);
                return browser.storage.local.get(host);
            })
            .then((value) => {
                if (Object.keys(value).length === 0) {
                    reject('No stored value found');
                    return;
                }

                resolve(value[Object.keys(value)[0]]);
            });
        });
    }
    
    setData(data:FontData):Promise<void> {
        return Utility.onActiveTab().then((tab) => {
            let host = this._getHost(tab.url);
            let dataObj = {};

            dataObj[host] = data;
            return browser.storage.local.set(dataObj);
        });
    }
    
    remove():Promise<void> {
        return Utility.onActiveTab().then((tab) => {
            let host = this._getHost(tab.url);
            return browser.storage.local.remove(host);
        });
    }
    
    clear():Promise<void> {
        return browser.storage.local.clear();
    }
}

class FontData {
    constructor(index:number, size:number, isEnable:boolean) {
        this.index = index;
        this.size = size;
        this.isEnable = isEnable;
    }

    index:number;
    size:number;
    isEnable:boolean;
}