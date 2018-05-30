let defaultSizeButton = document.querySelector('.default-button');
setSelectedSizeText();

let fontSelect = optionTab.querySelector('.font-select');

for (let i in fonts) {
    let option = document.createElement('option');

    option.textContent = fonts[i].name;
    option.value = i;

    if (selectedFontIndex == i) {
        option.selected = true;
    }

    fontSelect.appendChild(option);
}

fontSelect.addEventListener('change', (e) => {
    changeFont(fontSelect.value);
});

document.querySelector('.decrease-button').addEventListener('click', (e) => {
    let size = selectedFontSize - 20;
    if (size < 80) return;
    
    selectedFontSize = size;
    changeFontSize(selectedFontSize);
    setSelectedSizeText();
});

document.querySelector('.default-button').addEventListener('click', (e) => {
    selectedFontSize = DEFAULT_FONT_SIZE;
    changeFontSize(selectedFontSize);
    setSelectedSizeText();
});

document.querySelector('.increase-button').addEventListener('click', (e) => {
    let size = selectedFontSize + 20;
    if (size > 200) return;
    
    selectedFontSize = size;
    changeFontSize(selectedFontSize);
    setSelectedSizeText();
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

function setSelectedSizeText() {
    defaultSizeButton.textContent = selectedFontSize + '%';
}
