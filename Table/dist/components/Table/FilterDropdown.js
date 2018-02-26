'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

var _iconfont = require('../../styles/font/iconfont.scss');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _filterDropdown = require('./filterDropdown.scss');

var _filterDropdown2 = _interopRequireDefault(_filterDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterDropdown = function (_Component) {
    (0, _inherits3.default)(filterDropdown, _Component);

    function filterDropdown(props) {
        (0, _classCallCheck3.default)(this, filterDropdown);

        var _this = (0, _possibleConstructorReturn3.default)(this, (filterDropdown.__proto__ || (0, _getPrototypeOf2.default)(filterDropdown)).call(this, props));

        _this.showFilterDropdown = function (e) {
            var me = _this;

            me.props.data.onFilterDropdownVisibleChange(true);

            e.nativeEvent.stopImmediatePropagation();
        };

        _this.returnBubbling = function (e) {
            e.nativeEvent.stopImmediatePropagation();
        };

        var visible = 'filterDropdownVisible' in props.data ? props.data.filterDropdownVisible : false;

        _this.state = {
            visible: visible
        };

        return _this;
    }

    (0, _createClass3.default)(filterDropdown, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var me = this;

            if ('filterDropdownVisible' in props.data) {
                me.setState({
                    visible: props.data.filterDropdownVisible
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;

            document.addEventListener('click', function () {
                me.props.data.onFilterDropdownVisibleChange(false);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.props.data;


            return _react2.default.createElement(
                'span',
                { className: _Table2.default["k-table-th-filter"] },
                _react2.default.createElement(
                    'span',
                    { onClick: this.showFilterDropdown },
                    data.filterIcon ? _react2.default.createElement(
                        'i',
                        { className: _Table2.default["k-table-arrow-down"] },
                        data.filterIcon
                    ) : _react2.default.createElement(
                        'i',
                        { className: (0, _classnames2.default)(_iconfont2.default['k-table-iconfont'], _Table2.default['k-table-arrow-down']) },
                        '\uE604'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)(_Table2.default['k-table-th-filter-dropdown'], (0, _defineProperty3.default)({}, _Table2.default['k-table-none'], !this.state.visible)),
                        onClick: this.returnBubbling
                    },
                    data.filterDropdown
                )
            );
        }
    }]);
    return filterDropdown;
}(_react.Component);

exports.default = filterDropdown;