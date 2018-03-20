"use strict";

var _for = require("babel-runtime/core-js/symbol/for");

var _for2 = _interopRequireDefault(_for);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
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
var currentValue = null;
var Select = /** @class */function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        _this.isOptionTarget = false;
        _this.clearData = function (e) {
            var me = _this;
            var targetInput = document.querySelector('.k-select-search-input-dom');
            me.setState({
                selectedValue: null,
                selectedText: ''
            }, function () {
                me.props.onChange && me.props.onChange('', '');
                currentValue = null;
                if (me.props.mode === 'combobox') {
                    targetInput.value = '';
                }
            });
            e && e.stopPropagation();
            e && e.nativeEvent.stopImmediatePropagation();
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
        _this.hideOptionWrapper = function (e) {
            var me = _this;
            if (!me.isOptionTarget) {
                me.setState({
                    optionWrapperShow: false
                });
            }
        };
        _this.inputChangeEvent = function (e) {
            var me = _this;
            var inputChange = me.props.inputChange;
            var text = e.currentTarget.value;
            inputChange && inputChange(text);
            me.setState({
                selectedValue: null,
                selectedText: text
            }, function () {
                currentValue = null;
            });
            if (inputChangeShouldCB) {
                me.props.onChange && me.props.onChange(null, text);
                inputChangeShouldCB = false;
            }
        };
        _this.optionMouseDown = function (e) {
            if (e.button === 0) {
                _this.isOptionTarget = true;
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
                currentValue = value;
                me.isOptionTarget = false;
                if (me.props.mode === 'combobox') {
                    targetInput.value = me.state.selectedText;
                }
            });
        };
        var selectedText = '';
        var value = props.defaultValue || props.value;
        React.Children.forEach(props.children, function (child) {
            if (child.props.value === value) {
                selectedText = child.props.children;
            }
        });
        currentValue = value;
        _this.state = {
            selectedValue: value,
            selectedText: selectedText,
            optionWrapperShow: false
        };
        return _this;
    }
    Select.prototype.componentWillReceiveProps = function (props) {
        var me = this;
        if ('value' in props && props.value !== currentValue) {
            var text_1 = '';
            React.Children.forEach(props.children, function (child) {
                if (child.props.value === props.value) {
                    text_1 = child.props.children;
                }
            });
            me.setState({
                selectedValue: props.value,
                selectedText: text_1
            }, function () {
                currentValue = props.value;
                me.props.onChange(props.value, text_1);
                if (props.mode === 'combobox') {
                    var targetInput = document.querySelector('.k-select-search-input-dom');
                    targetInput.value = text_1;
                }
            });
        }
    };
    Select.prototype.componentDidMount = function () {
        var me = this;
    };
    Select.prototype.render = function () {
        var me = this;
        var _a = me.props,
            style = _a.style,
            children = _a.children,
            placeholder = _a.placeholder,
            mode = _a.mode,
            defaultValue = _a.defaultValue,
            clear = _a.clear,
            selectClassName = _a.selectClassName,
            optionClassName = _a.optionClassName;
        return React.createElement("div", { className: classNames(selectCss['k-select'], selectClassName, (_b = {}, _b[selectCss['k-select-active']] = me.state.optionWrapperShow, _b)), style: style }, React.createElement("div", { className: classNames(selectCss['k-select-show-selected-area']),
            // onClick={this.showOptionWrapper.bind(null, 'xixi')}
            onFocus: this.showOptionWrapper, onBlur: this.hideOptionWrapper, tabIndex: -1 }, placeholder ? React.createElement("div", { className: selectCss["k-select-placeholder"], style: me.state.selectedText === '' ? {} : {
                display: 'none'
            } }, placeholder) : null, clear ? React.createElement("i", { className: iconfontCss["k-select-iconfont"] + " " + selectCss["k-select-clear"], onClick: me.clearData, style: mode === 'combobox' ? { right: 8 } : {} }, "\uE63D") : null, mode === undefined || mode === 'default' ? me.state.selectedText.$$typeof === (0, _for2.default)('react.element') ? [React.createElement("div", { className: selectCss["k-select-selected-reactnode-value"], key: "text" }, me.state.selectedText), React.createElement("i", { className: classNames(iconfontCss['k-select-iconfont'], selectCss['k-select-arrow']), key: "icon" }, "\uE726")] : [React.createElement("div", { className: selectCss["k-select-selected-value"], key: "text" }, me.state.selectedText), React.createElement("i", { className: classNames(iconfontCss['k-select-iconfont'], selectCss['k-select-arrow']), key: "icon" }, "\uE726")] : null, mode === 'combobox' ? React.createElement("div", { className: selectCss["k-select-search"] }, React.createElement("input", { className: selectCss["k-select-search-input"] + " k-select-search-input-dom", type: "text", defaultValue: me.state.selectedText, onChange: me.inputChangeEvent })) : null), React.createElement("ul", { className: selectCss["k-select-option-wrapper"], style: me.state.optionWrapperShow ? {} : {
                display: 'none'
            } }, React.Children.map(children, function (child) {
            var isSelected = false;
            if (child.props.value === me.state.selectedValue) {
                isSelected = true;
            }
            if (mode === 'combobox') {
                if (child.props.children.$$typeof === (0, _for2.default)('react.element')) {
                    throw '在使用combobox时，不得使用reactnode';
                }
                if (child.props.children.indexOf(me.state.selectedText) === -1) {
                    return '';
                }
            }
            return React.cloneElement(child, {
                isSelected: isSelected,
                optionClick: me.optionClick,
                optionMouseDown: me.optionMouseDown,
                optionClassName: optionClassName
            });
        })));
        var _b;
    };
    Select.Option = Option_1.default;
    return Select;
}(React.Component);
exports.default = Select;
//# sourceMappingURL=Select.js.map