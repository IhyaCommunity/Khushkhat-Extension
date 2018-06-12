class Utility {
    static onActiveTab():Promise<browser.tabs.Tab> {
        return new Promise((resolve, reject) => {
            browser.tabs.query({currentWindow: true, active: true})
            .then((tabs) => {
                resolve(tabs[0]);
            }, reject);
        });
    }
}