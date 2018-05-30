

let fontSelect = optionTab.querySelector('.font-select');

for (let i in fonts) {
    let option = document.createElement('option');

    option.textContent = fonts[i].name;
    option.value = i;

    if (SELECTED_FONT_INDEX == i) {
        option.selected = true;
    }

    fontSelect.appendChild(option);
}

fontSelect.addEventListener('change', (e) => {
    changeFont(fontSelect.value);
});

function changeFont(i) {
    if (isStyleEnable) {
        removeFontFaceStyle();

        if(i > -1) {
            changeFontFace(i);
            applyFontFaceStyle();
            console.log('changed: ' + i);
        }
    }
}

function changeFontSize(fontSize) {
    if (isStyleEnable) {
        browser.tabs.executeScript({
            code: `document.documentElement.style.setProperty('--font-size', '${fontSize}');`
        });
    }
}

