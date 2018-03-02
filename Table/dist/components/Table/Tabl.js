'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

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

var _HeadTable = require('./HeadTable');

var _HeadTable2 = _interopRequireDefault(_HeadTable);

var _BodyTable = require('./BodyTable');

var _BodyTable2 = _interopRequireDefault(_BodyTable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pagination = require('@xm/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _FilterDropdown = require('./FilterDropdown');

var _FilterDropdown2 = _interopRequireDefault(_FilterDropdown);

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

var _iconfont = require('../../styles/font/iconfont.scss');

var _iconfont2 = _interopRequireDefault(_iconfont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Component) {
    (0, _inherits3.default)(Table, _Component);

    function Table(props) {
        (0, _classCallCheck3.default)(this, Table);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this));

        _this.renderTable = function () {
            var me = _this;
            var _me$state = me.state,
                columns = _me$state.columns,
                scroll = _me$state.scroll,
                color = _me$state.color,
                onRowMouseEnter = _me$state.onRowMouseEnter,
                onRowMouseLeave = _me$state.onRowMouseLeave,
                onLeftOneClick = _me$state.onLeftOneClick,
                dataSource = _me$state.dataSource,
                canDrag = _me$state.canDrag,
                activeIndex = _me$state.activeIndex;


            var headTable = _react2.default.createElement(_HeadTable2.default, {
                columns: columns,
                scroll: scroll,
                color: color,
                handleBodyScrollLeft: me.handleBodyScrollLeft,
                key: 'headTable'
            });

            var bodyTable = _react2.default.createElement(_BodyTable2.default, {
                columns: columns,
                scroll: scroll,
                color: color,
                dataSource: dataSource,
                handleBodyScrollLeft: me.handleBodyScrollLeft,
                onRowMouseEnter: onRowMouseEnter,
                onRowMouseLeave: onRowMouseLeave,
                onLeftOneClick: onLeftOneClick,
                canDrag: canDrag,
                activeIndex: activeIndex,
                modifyActiveIndex: me.modifyActiveIndex,
                key: 'bodyTable'
            });

            if (scroll && scroll.y) {
                return [headTable, bodyTable];
            } else {
                return [bodyTable];
            }
        };

        _this.modifyActiveIndex = function (value) {
            var me = _this;

            me.setState({
                activeIndex: value
            });
        };

        _this.pageChange = function (page) {
            var me = _this;

            me.setState({
                contentChange: true
            });
            me.state.pagination.onChange(page);
        };

        _this.handleBodyScrollLeft = function (e) {
            if (e.currentTarget !== e.target) {
                return;
            }
            var target = e.target;
            var _this$props$scroll = _this.props.scroll,
                scroll = _this$props$scroll === undefined ? {} : _this$props$scroll;
            var headTable = _this.headTable,
                bodyTable = _this.bodyTable;

            !headTable && (headTable = document.getElementsByClassName('k-table-body-header-dom')[0]);
            !bodyTable && (bodyTable = document.getElementsByClassName('k-table-body-dom')[0]);

            if (target.scrollLeft !== _this.lastScrollLeft && scroll.x) {
                if (target === bodyTable && headTable) {
                    headTable.scrollLeft = target.scrollLeft;
                } else if (target === headTable && bodyTable) {
                    bodyTable.scrollLeft = target.scrollLeft;
                }
            }
            _this.lastScrollLeft = target.scrollLeft;
        };

        var thead = (0, _is2.default)(props.thead, false) ? false : true;
        var loading = (0, _is2.default)(props.loading, false) ? false : true;

        _this.state = {
            className: props.className || '',
            bordered: props.bordered || false,
            columns: props.columns || [],
            dataSource: props.dataSource || [],
            thead: thead,
            header: props.header || null,
            footer: props.footer || null,
            pagination: props.pagination || null,
            loading: loading,
            scroll: props.scroll || null,
            canDrag: props.canDrag || null,
            color: props.color || {},
            onRowMouseEnter: props.onRowMouseEnter || function () {},
            onRowMouseLeave: props.onRowMouseLeave || function () {},
            onLeftOneClick: props.onLeftOneClick || function () {},
            activeIndex: null,
            contentChange: true
        };
        return _this;
    }

    (0, _createClass3.default)(Table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var me = this;

            // //翻页后取消激活索引
            // if (me.props.pagination && !Object.is(me.props.pagination.current, props.pagination.current)) {
            //   me.setState(
            //     {
            //       activeIndex: null
            //     }
            //   )
            // }

            var thead = (0, _is2.default)(props.thead, false) ? false : true;
            var loading = (0, _is2.default)(props.loading, false) ? false : true;

            me.setState({
                className: props.className || '',
                bordered: props.bordered || false,
                columns: props.columns || [],
                dataSource: props.dataSource || [],
                thead: thead,
                header: props.header || null,
                footer: props.footer || null,
                pagination: props.pagination || null,
                loading: loading,
                scroll: props.scroll || null,
                canDrag: props.canDrag || null,
                color: props.color || {},
                onRowMouseEnter: props.onRowMouseEnter || function () {},
                onRowMouseLeave: props.onRowMouseLeave || function () {},
                onLeftOneClick: props.onLeftOneClick || function () {},
                contentChange: false,
                activeIndex: null
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;

            me.setState({
                contentChange: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var me = this;
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(_Table2.default['k-table'], (0, _defineProperty3.default)({}, this.state.className, this.state.className), (0, _defineProperty3.default)({}, _Table2.default['k-table-drag-status'], me.state.canDrag && me.state.canDrag.switch))
                },
                me.state.header ? _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(_Table2.default['k-table-header'], (0, _defineProperty3.default)({}, _Table2.default['k-table-header-border'], me.state.bordered)) },
                    me.state.header
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(_Table2.default['k-table-content'], (0, _defineProperty3.default)({}, _Table2.default['k-table-bordered'], me.state.bordered)) },
                    me.renderTable()
                ),
                me.state.footer ? _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(_Table2.default['k-table-footer'], (0, _defineProperty3.default)({}, _Table2.default['k-table-footer-border'], me.state.bordered)) },
                    me.state.footer
                ) : null,
                me.state.pagination ? _react2.default.createElement(
                    'div',
                    { className: _Table2.default["k-table-pagination"] },
                    _react2.default.createElement(_Pagination2.default, {
                        current: me.state.pagination.current || 1,
                        pageSize: me.state.pagination.pageSize || 10,
                        showQuickJumper: me.state.pagination.showQuickJumper,
                        showInfo: me.state.pagination.showInfo,
                        total: me.state.pagination.total || 0,
                        offset: me.state.pagination.offset || 4,
                        onChange: me.pageChange
                    })
                ) : null,
                me.state.loading && me.state.contentChange ? _react2.default.createElement(
                    'div',
                    { className: _Table2.default["k-table-loading"] },
                    _react2.default.createElement(
                        'div',
                        { className: _Table2.default["k-table-loading-content"] },
                        _react2.default.createElement(
                            'a',
                            { className: _iconfont2.default["k-table-iconfont"] + ' ' + _Table2.default["k-table-loading-icon"] },
                            '\uE622'
                        )
                    )
                ) : null
            );
        }
    }]);
    return Table;
}(_react.Component);

Table.propTypes = {
    className: _react2.default.PropTypes.string,
    bordered: _react2.default.PropTypes.bool,
    columns: _react2.default.PropTypes.array,
    dataSource: _react2.default.PropTypes.array,
    thead: _react2.default.PropTypes.bool,
    header: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    footer: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    pagination: _react2.default.PropTypes.object,
    loading: _react2.default.PropTypes.bool,
    scroll: _react2.default.PropTypes.object,
    canDrag: _react2.default.PropTypes.object,
    color: _react2.default.PropTypes.object,
    onRowMouseEnter: _react2.default.PropTypes.func,
    onRowMouseLeave: _react2.default.PropTypes.func,
    onLeftOneClick: _react2.default.PropTypes.func
};
exports.default = Table;