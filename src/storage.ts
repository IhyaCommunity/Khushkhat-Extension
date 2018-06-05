class TabStorage {

    private static _instance:TabStorage;

    private constructor()
    { }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private _onActiveTab():Promise<browser.tabs.Tab> {
        return new Promise((resolve, reject) => {
            browser.tabs.query({currentWindow: true, active: true})
            .then((tabs) => {
                resolve(tabs[0]);
            }, reject);
        });
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
            this._onActiveTab().then((tab) => {
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
        return this._onActiveTab().then((tab) => {
            let host = this._getHost(tab.url);
            let dataObj = {};

            dataObj[host] = data;
            return browser.storage.local.set(dataObj);
        });
    }
    
    remove():Promise<void> {
        return this._onActiveTab().then((tab) => {
            let host = this._getHost(tab.url);
            return browser.storage.local.remove(host);
        });
    }
    
    clear():Promise<void> {
        return browser.storage.local.clear();
    }
}

class FontData {
    constructor(index:number, size:number) {
        this.index = index;
        this.size = size;
    }
  
    get index():number { return this.index; }
    set index(index: number) { this.index = index }

    get size():number { return this.size; }
    set size(size: number) { this.size = size }
}