/// <reference path="./base.ts" />
/// <reference path="./control.ts" />
/// <reference path="./option.ts" />

class App {
    private static _instance:App;

    control:Popup.Control;
    options:Popup.Options;

    private constructor()
    {
        this.control = Popup.Control.Instance(Popup.Base.Instance);
        this.options = Popup.Options.Instance(Popup.Base.Instance);
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}

let app:App = App.Instance;