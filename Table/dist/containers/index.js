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

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drag = function (_Component) {
    (0, _inherits3.default)(drag, _Component);

    function drag() {
        (0, _classCallCheck3.default)(this, drag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (drag.__proto__ || (0, _getPrototypeOf2.default)(drag)).call(this));

        _this.state = {
            page: 1
        };
        return _this;
    }

    (0, _createClass3.default)(drag, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { style: { textAlign: 'center', marginTop: '100px' } },
                _react2.default.createElement(
                    'p',
                    { style: { marginTop: '10px' } },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: './common' },
                        'common'
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { style: { marginTop: '10px' } },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: './drag' },
                        'drag'
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { style: { marginTop: '10px' } },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: './filter' },
                        'filter'
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { style: { marginTop: '10px' } },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: './pagination' },
                        'pagination'
                    )
                )
            );
        }
    }]);
    return drag;
}(_react.Component);

exports.default = drag;