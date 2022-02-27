require('./general-polyfill');

if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}

require('whatwg-fetch');

require('@babel/polyfill');

Object.assign = require('object-assign');

if (window.ResizeObserver === undefined) {
    const ResizeObserver = require("resize-observer-polyfill").default;
    window.ResizeObserver = ResizeObserver;
}