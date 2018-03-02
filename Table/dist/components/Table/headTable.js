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

var _utils = require('./utils');

var _Colgroup = require('./Colgroup');

var _Colgroup2 = _interopRequireDefault(_Colgroup);

var _Thead = require('./Thead');

var _Thead2 = _interopRequireDefault(_Thead);

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollbar = (0, _utils.measureScrollbar)('horizontal');

var HeadTable = function (_Component) {
    (0, _inherits3.default)(HeadTable, _Component);

    function HeadTable() {
        (0, _classCallCheck3.default)(this, HeadTable);
        return (0, _possibleConstructorReturn3.default)(this, (HeadTable.__proto__ || (0, _getPrototypeOf2.default)(HeadTable)).apply(this, arguments));
    }

    (0, _createClass3.default)(HeadTable, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _me$props = me.props,
                handleBodyScrollLeft = _me$props.handleBodyScrollLeft,
                scroll = _me$props.scroll,
                columns = _me$props.columns,
                thead = _me$props.thead,
                color = _me$props.color;

            return _react2.default.createElement(
                'div',
                {
                    className: _Table2.default["k-table-body-header"] + ' k-table-body-header-dom',
                    onScroll: handleBodyScrollLeft,
                    style: {
                        marginBottom: '-' + scrollbar + 'px'
                    },
                    key: 'headTable'
                },
                _react2.default.createElement(
                    'table',
                    { style: {
                            'width': scroll && scroll.x ? scroll.x : '100%',
                            'minWidth': scroll && scroll.minX ? scroll.minX : ''
                        } },
                    _react2.default.createElement(_Colgroup2.default, { columns: columns }),
                    thead ? _react2.default.createElement(_Thead2.default, { columns: columns, color: color }) : null
                )
            );
        }
    }]);
    return HeadTable;
}(_react.Component);

exports.default = HeadTable;