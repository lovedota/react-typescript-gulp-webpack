'use strict';

let source = './src',
    sourceApp = `${source}/js/`;

module.exports = {
    sourceApp: `${source}/app/`,
    tsOutputPath: `./build`,
    allJavaScript: ['./build/**/*.js'],
    allTypeScript: `${sourceApp}/**/*.{ts,tsx}`,
    typings: './typings',
    libraryTypeScriptDefinitions: './typings/**/*.ts',
    dist: `./build`
};
