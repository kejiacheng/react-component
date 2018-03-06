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
var Option_1 = require("./Option");
var classNames = require("classnames");
// import './Select.scss'
// import '../styles/font/iconfont.scss'
var selectCss = require('./Select.scss');
var iconfontCss = require('../styles/font/iconfont.scss');
var inputChangeShouldCB = true;
var Select = (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        _this.clearData = function (e) {
            var me = _this;
            var targetInput = document.querySelector('.k-select-search-input-dom');
            me.setState({
                selectedValue: null,
                selectedText: ''
            }, function () {
                me.props.onChange && me.props.onChange('', '');
                if (me.props.mode === 'combobox') {
                    targetInput.value = '';
                }
            });
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        };
        _this.showOptionWrapper = function (e) {
            var me = _this;
            var trigger = me.props.trigger;
            trigger && trigger();
            me.setState({
                optionWrapperShow: true
            });
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        };
        _this.inputChangeEvent = function (e) {
            var me = _this;
            var inputChange = me.props.inputChange;
            var text = e.currentTarget.value;
            inputChange && inputChange(text);
            me.setState({
                selectedValue: null,
                selectedText: text
            });
            if (inputChangeShouldCB) {
                me.props.onChange && me.props.onChange(null, text);
                inputChangeShouldCB = false;
            }
        };
        _this.optionClick = function (value, text, disabled, e) {
            if (disabled) {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                return;
            }
            var me = _this;
            var targetInput = document.querySelector('.k-select-search-input-dom');
            me.setState({
                selectedValue: value,
                selectedText: text,
                optionWrapperShow: false
            }, function () {
                me.props.onChange && me.props.onChange(value, text);
                inputChangeShouldCB = true;
                if (me.props.mode === 'combobox') {
                    targetInput.value = me.state.selectedText;
                }
            });
        };
        var selectedText = '';
        React.Children.forEach(props.children, function (child) {
            if (child.props.value === props.defaultValue) {
                selectedText = child.props.children;
            }
        });
        _this.state = {
            selectedValue: props.defaultValue,
            selectedText: selectedText,
            optionWrapperShow: false
        };
        return _this;
    }
    Select.prototype.componentDidMount = function () {
        var me = this;
        document.addEventListener('click', function () {
            me.setState({
                optionWrapperShow: false
            });
        });
    };
    Select.prototype.render = function () {
        var me = this;
        var _a = me.props, style = _a.style, children = _a.children, placeholder = _a.placeholder, mode = _a.mode, defaultValue = _a.defaultValue, clear = _a.clear, selectClassName = _a.selectClassName, optionClassName = _a.optionClassName;
        return React.createElement("div", { className: classNames(selectCss['k-select'], selectCss[selectClassName], (_b = {}, _b[selectCss['k-select-active']] = me.state.optionWrapperShow, _b)), style: style },
            React.createElement("div", { className: classNames(selectCss['k-select-show-selected-area']), onClick: this.showOptionWrapper },
                placeholder
                    ? React.createElement("div", { className: selectCss["k-select-placeholder"], style: me.state.selectedText === ''
                            ? {}
                            : {
                                display: 'none'
                            } }, placeholder)
                    : null,
                clear
                    ? React.createElement("i", { className: iconfontCss["k-select-iconfont"] + " " + selectCss["k-select-clear"], onClick: me.clearData, style: mode === 'combobox'
                            ? { right: 8 }
                            : {} }, "\uE63D")
                    : null,
                mode === undefined || mode === 'default'
                    ? [
                        React.createElement("div", { className: selectCss["k-select-selected-value"], key: "text" }, me.state.selectedText),
                        React.createElement("i", { className: classNames(iconfontCss['k-select-iconfont'], selectCss['k-select-arrow']), key: "icon" }, "\uE726")
                    ]
                    : null,
                mode === 'combobox'
                    ? React.createElement("div", { className: selectCss["k-select-search"] },
                        React.createElement("input", { className: selectCss["k-select-search-input"] + " k-select-search-input-dom", type: "text", defaultValue: me.state.selectedText, onChange: me.inputChangeEvent }))
                    : null),
            React.createElement("ul", { className: selectCss["k-select-option-wrapper"], style: me.state.optionWrapperShow
                    ? {}
                    : {
                        display: 'none'
                    } }, React.Children.map(children, function (child) {
                var isSelected = false;
                if (child.props.value === me.state.selectedValue) {
                    isSelected = true;
                }
                if (mode === 'combobox') {
                    if (child.props.children.indexOf(me.state.selectedText) === -1) {
                        return '';
                    }
                }
                return React.cloneElement(child, {
                    isSelected: isSelected,
                    optionClick: me.optionClick,
                    optionClassName: optionClassName
                });
            })));
        var _b;
    };
    Select.Option = Option_1.default;
    return Select;
}(React.Component));
exports.default = Select;
//# sourceMappingURL=Select.js.map