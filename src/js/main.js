"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var child_1 = require('./components/child');
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
    }
    Test.prototype.render = function () {
        return (React.createElement("div", null, "Parent: ->", React.createElement(child_1.default, null)));
    };
    return Test;
}(React.Component));
ReactDOM.render(React.createElement(Test, null), document.getElementById('container'));

//# sourceMappingURL=main.js.map
