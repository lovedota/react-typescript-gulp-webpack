"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        _super.apply(this, arguments);
    }
    Child.prototype.render = function () {
        return (React.createElement("div", null, "Child"));
    };
    return Child;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Child;

//# sourceMappingURL=child.js.map
