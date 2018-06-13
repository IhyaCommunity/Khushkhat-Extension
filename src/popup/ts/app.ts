/// <reference path="../../addon.ts" />
/// <reference path="./base.ts" />
/// <reference path="./control.ts" />
/// <reference path="./option.ts" />

class App {
    private static _instance:App;

    control:Popup.Control;
    options:Popup.Options;

    private constructor() {
        let base = Popup.Base.Instance;
        base.loadData().then(()=> {
            this.control = Popup.Control.Instance(base);
            this.options = Popup.Options.Instance(base);
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

let app:App = App.Instance;