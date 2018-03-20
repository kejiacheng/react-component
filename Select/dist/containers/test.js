'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('../components/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testCss = require('./test.scss');
var Option = _Select2.default.Option;

var componentName = function (_Component) {
    (0, _inherits3.default)(componentName, _Component);

    function componentName() {
        (0, _classCallCheck3.default)(this, componentName);

        var _this = (0, _possibleConstructorReturn3.default)(this, (componentName.__proto__ || (0, _getPrototypeOf2.default)(componentName)).call(this));

        _this.test = function () {
            console.log(_this.select1);
            console.log(_this.select1.clearData);
            _this.select1.clearData();
        };

        _this.to2 = function () {
            _this.setState({
                value: '2'
            });
        };

        _this.to3 = function () {
            _this.setState({
                value: '3'
            });
        };

        _this.state = {
            value: '1'
        };
        return _this;
    }

    (0, _createClass3.default)(componentName, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(this.select1);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Select2.default,
                    {
                        style: { width: 200 },
                        placeholder: 321
                        // mode="combobox" 
                        // defaultValue="1"
                        , onChange: function onChange(value, text) {
                            console.log(value);
                            console.log(text);
                        },
                        clear: true,
                        selectClassName: 'select',
                        optionClassName: 'option',
                        trigger: function trigger() {
                            console.log(123);
                        },
                        inputChange: function inputChange(text) {
                            console.log(text);
                        },
                        ref: function ref(ele) {
                            return _this2.select1 = ele;
                        },
                        value: this.state.value
                        // defaultValue={"1"}
                    },
                    _react2.default.createElement(
                        Option,
                        { value: '1', disabled: true },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 50, lineHeight: '50px' } },
                            'dasdas'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '2', title: "312312" },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 30 } },
                            'tetetet'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '3' },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 50, lineHeight: '50px' } },
                            'dasdas'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '4' },
                        '1236'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '5' },
                        '1237'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '6' },
                        '1238'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '7' },
                        '1239'
                    )
                ),
                _react2.default.createElement(
                    _Select2.default,
                    {
                        style: { width: 200 },
                        placeholder: 321
                        // mode="combobox" 
                        // defaultValue="1"
                        , onChange: function onChange(value, text) {
                            console.log(value);
                            console.log(text);
                        },
                        clear: true,
                        selectClassName: 'select',
                        optionClassName: 'option',
                        trigger: function trigger() {
                            console.log(123);
                        },
                        inputChange: function inputChange(text) {
                            console.log(text);
                        },
                        ref: function ref(ele) {
                            return _this2.select1 = ele;
                        },
                        value: this.state.value
                        // defaultValue={"1"}
                    },
                    _react2.default.createElement(
                        Option,
                        { value: '1', disabled: true },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 50, lineHeight: '50px' } },
                            'dasdas'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '2', title: "312312" },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 30 } },
                            'tetetet'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '3' },
                        _react2.default.createElement(
                            'div',
                            { style: { height: 50, lineHeight: '50px' } },
                            'dasdas'
                        )
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '4' },
                        '1236'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '5' },
                        '1237'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '6' },
                        '1238'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '7' },
                        '1239'
                    )
                ),
                _react2.default.createElement(
                    'h1',
                    { onClick: this.test },
                    '\u6C99\u53D1\u7684\u53D1\u751F\u554A\u5B9E\u6253\u5B9E'
                ),
                _react2.default.createElement(
                    'h2',
                    { onClick: this.to2 },
                    '\u8BBE\u7F6E\u4E3A2'
                ),
                _react2.default.createElement(
                    'h3',
                    { onClick: this.to3 },
                    '\u8BBE\u7F6E\u4E3A3'
                )
            );
        }
    }]);
    return componentName;
}(_react.Component);

exports.default = componentName;