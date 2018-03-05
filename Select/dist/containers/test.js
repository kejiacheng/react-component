"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Select = require("../components/Select");

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _Select2.default.Option;

var componentName = function (_Component) {
    (0, _inherits3.default)(componentName, _Component);

    function componentName() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, componentName);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = componentName.__proto__ || (0, _getPrototypeOf2.default)(componentName)).call.apply(_ref, [this].concat(args))), _this), _this.test = function () {
            console.log(_this.select1);
            console.log(_this.select1.clearData);
            _this.select1.clearData();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(componentName, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log(this.select1);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
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
                        selectClassName: "select",
                        optionClassName: "option",
                        trigger: function trigger() {
                            console.log(123);
                        },
                        inputChange: function inputChange(text) {
                            console.log(text);
                        },
                        ref: function ref(ele) {
                            return _this2.select1 = ele;
                        }
                    },
                    _react2.default.createElement(
                        Option,
                        { value: "1", disabled: true },
                        "123"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2", title: "312312" },
                        "134"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "3" },
                        "13235"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "4" },
                        "1236"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "5" },
                        "1237"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "6" },
                        "1238"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "7" },
                        "1239"
                    )
                ),
                _react2.default.createElement(
                    "h1",
                    { onClick: this.test },
                    "\u6C99\u53D1\u7684\u53D1\u751F\u554A\u5B9E\u6253\u5B9E"
                )
            );
        }
    }]);
    return componentName;
}(_react.Component);

exports.default = componentName;