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

var _FilterDropdown = require('./FilterDropdown');

var _FilterDropdown2 = _interopRequireDefault(_FilterDropdown);

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thead = function (_Component) {
    (0, _inherits3.default)(Thead, _Component);

    function Thead() {
        (0, _classCallCheck3.default)(this, Thead);
        return (0, _possibleConstructorReturn3.default)(this, (Thead.__proto__ || (0, _getPrototypeOf2.default)(Thead)).apply(this, arguments));
    }

    (0, _createClass3.default)(Thead, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'thead',
                {
                    className: _Table2.default["k-table-thead"],
                    style: {
                        background: this.props.color && this.props.color.theadColor
                    }
                },
                _react2.default.createElement(
                    'tr',
                    null,
                    this.props.columns.map(function (it) {
                        return _react2.default.createElement(
                            'th',
                            {
                                key: it.key,
                                style: it.thStyle || {}
                            },
                            _react2.default.createElement(
                                'span',
                                null,
                                it.title
                            ),
                            it.filterDropdown ? _react2.default.createElement(_FilterDropdown2.default, { data: it }) : null
                        );
                    })
                )
            );
        }
    }]);
    return Thead;
}(_react.Component);

exports.default = Thead;