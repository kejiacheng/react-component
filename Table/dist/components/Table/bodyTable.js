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

var _Colgroup = require('./Colgroup');

var _Colgroup2 = _interopRequireDefault(_Colgroup);

var _Thead = require('./Thead');

var _Thead2 = _interopRequireDefault(_Thead);

var _Tbody = require('./Tbody');

var _Tbody2 = _interopRequireDefault(_Tbody);

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BodyTable = function (_Component) {
    (0, _inherits3.default)(BodyTable, _Component);

    function BodyTable() {
        (0, _classCallCheck3.default)(this, BodyTable);
        return (0, _possibleConstructorReturn3.default)(this, (BodyTable.__proto__ || (0, _getPrototypeOf2.default)(BodyTable)).apply(this, arguments));
    }

    (0, _createClass3.default)(BodyTable, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _me$props = me.props,
                handleBodyScrollLeft = _me$props.handleBodyScrollLeft,
                scroll = _me$props.scroll,
                columns = _me$props.columns,
                dataSource = _me$props.dataSource,
                color = _me$props.color,
                onRowMouseEnter = _me$props.onRowMouseEnter,
                onRowMouseLeave = _me$props.onRowMouseLeave,
                onLeftOneClick = _me$props.onLeftOneClick,
                activeIndex = _me$props.activeIndex,
                modifyActiveIndex = _me$props.modifyActiveIndex,
                canDrag = _me$props.canDrag,
                thead = _me$props.thead;


            return _react2.default.createElement(
                'div',
                {
                    className: _Table2.default["k-table-body"] + ' k-table-body-dom',
                    onScroll: handleBodyScrollLeft,
                    style: {
                        overflowX: '' + (scroll && scroll.x ? 'auto' : 'visible'),
                        overflowY: '' + (scroll && scroll.y ? 'scroll' : 'visible'),
                        maxHeight: '' + (scroll && scroll.y ? scroll.y : ''),
                        minHeight: '' + (scroll && scroll.minY ? scroll.minY : '')
                    },
                    key: 'bodyTable'
                },
                _react2.default.createElement(
                    'table',
                    { style: {
                            'width': scroll && scroll.x ? scroll.x : '100%',
                            'minWidth': scroll && scroll.minX ? scroll.minX : ''
                        } },
                    _react2.default.createElement(_Colgroup2.default, { columns: columns }),
                    thead ? scroll && scroll.y ? null : _react2.default.createElement(_Thead2.default, { columns: columns, color: color }) : null,
                    _react2.default.createElement(_Tbody2.default, {
                        dataSource: dataSource,
                        columns: columns,
                        color: color,
                        onRowMouseEnter: onRowMouseEnter,
                        onRowMouseLeave: onRowMouseLeave,
                        onLeftOneClick: onLeftOneClick,
                        activeIndex: activeIndex,
                        modifyActiveIndex: modifyActiveIndex,
                        canDrag: canDrag,
                        thead: thead
                    })
                )
            );
        }
    }]);
    return BodyTable;
}(_react.Component);

exports.default = BodyTable;