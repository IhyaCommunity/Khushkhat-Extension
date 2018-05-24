// import {path} from 'path';
const path =  require('path');

module.exports = {
    mode: 'production',
    entry: {
        background_script: './src/background.js',
        popup: [
            './src/popup/script/control.js', 
            './src/popup/script/option.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/bundle.js'
    }
};
