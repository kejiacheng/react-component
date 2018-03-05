"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
var React = require("react");
var classNames = require("classnames");
require("./Option.scss");
var optionCss = require('./Option.scss');
var Option = (function (_super) {
    __extends(Option, _super);
    function Option() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Option.prototype.render = function () {
        var _a = this.props, value = _a.value, disabled = _a.disabled, title = _a.title, children = _a.children, isSelected = _a.isSelected, optionClick = _a.optionClick, optionClassName = _a.optionClassName;
        return React.createElement("li", { className: classNames(optionCss['k-option'], (_b = {}, _b[optionCss['k-option-selected']] = isSelected, _b), optionCss[optionClassName], (_c = {}, _c[optionCss['k-option-disabled']] = disabled, _c)), onClick: optionClick.bind(null, value, children, disabled), title: title, key: value }, children);
        var _b, _c;
    };
    return Option;
}(React.Component));
exports.default = Option;
//# sourceMappingURL=Option.js.map