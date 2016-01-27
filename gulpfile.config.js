'use strict';

let source = './src',
    sourceApp = `${source}/js/`;

module.exports = {
    tsOutputPath: `./build`,
    allJavaScript: ['./build/**/*.js'],
    allTypeScript: `${sourceApp}/**/*.{ts,tsx}`,
    entry: `${sourceApp}/main.tsx`,
    typings: './typings',
    libraryTypeScriptDefinitions: './typings/**/*.ts',
    dist: `./public/assets`
};
