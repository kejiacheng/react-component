'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Table = require('../components/Table/Table');

var _Table2 = _interopRequireDefault(_Table);

var _public = require('../assets/imgs/public.png');

var _public2 = _interopRequireDefault(_public);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSource = [{
    name: 'joke',
    age: '10',
    sex: 'man',
    address: 'jinhua',
    wallet: {
        money: 500
    }
}, {
    name: 'allen',
    age: '12',
    sex: 'man',
    address: 'hangzhou',
    wallet: {
        money: 600
    }
}, {
    name: 'linda',
    age: '1',
    sex: 'woman',
    address: 'wenzhou',
    wallet: {
        money: 700
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}];

var filter = function (_Component) {
    (0, _inherits3.default)(filter, _Component);

    function filter() {
        (0, _classCallCheck3.default)(this, filter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (filter.__proto__ || (0, _getPrototypeOf2.default)(filter)).call(this));

        _this.inputChange = function (e) {
            var me = _this;

            me.setState({
                inputValue: e.currentTarget.value
            });
        };

        _this.search = function () {
            var me = _this;
            var inputValue = _this.state.inputValue;

            var reg = new RegExp(inputValue, 'gi');

            me.setState({
                dataSource: dataSource.map(function (it) {
                    var match = it.age.match(reg);
                    if (!match) {
                        return null;
                    }

                    return (0, _extends3.default)({}, it, {
                        age: _react2.default.createElement(
                            'span',
                            null,
                            it.age.split(reg).map(function (text, i) {
                                return i > 0 ? [_react2.default.createElement(
                                    'span',
                                    { style: { color: 'red' } },
                                    match[0]
                                ), text] : text;
                            })
                        )
                    });
                }).filter(function (it) {
                    return !!it;
                }),
                filterDropdownVisible: false
            }, function () {
                console.log(me.state.dataSource);
            });
        };

        _this.state = {
            inputValue: '',
            dataSource: dataSource,
            filterDropdownVisible: false
        };
        return _this;
    }

    (0, _createClass3.default)(filter, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var columns = [{
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: '200px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'age',
                dataIndex: 'age',
                key: 'age',
                width: '150px',
                filterDropdown: _react2.default.createElement(
                    'div',
                    { style: { background: '#fff', width: '200px', height: '200px' } },
                    _react2.default.createElement('input', { type: 'text', onChange: this.inputChange }),
                    _react2.default.createElement(
                        'span',
                        { onClick: this.search },
                        '\u7B5B\u9009'
                    )
                ),
                filterIcon: _react2.default.createElement('img', { src: _public2.default }),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: function onFilterDropdownVisibleChange(visible) {
                    console.log(visible);
                    _this2.setState({
                        filterDropdownVisible: visible
                    });
                },
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'sex',
                dataIndex: 'sex',
                key: 'sex',
                width: '100px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: '100px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'money',
                dataIndex: 'wallet.money',
                key: 'money'
            }];

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Table2.default, {
                    className: 'just-test',
                    bordered: true,
                    columns: columns,
                    dataSource: this.state.dataSource,
                    header: _react2.default.createElement(
                        'div',
                        null,
                        '213'
                    ),
                    footer: _react2.default.createElement(
                        'div',
                        { style: { 'textAlign': 'center' } },
                        '456'
                    )
                    // thead={false}
                    , loading: true,
                    onRowMouseEnter: function onRowMouseEnter(data, index) {
                        console.log(data, index);
                    },
                    onRowMouseLeave: function onRowMouseLeave(data, index) {
                        console.log(data, index);
                    },
                    onLeftOneClick: function onLeftOneClick(data, index) {
                        console.log(data, index);
                    }
                    // color={{theadColor: 'blue', hoverColor: 'red', clickColor: 'green'}}
                    // canDrag={{'switch': true, 'callback': function (data) {console.log(data)}}}
                })
            );
        }
    }]);
    return filter;
}(_react.Component);

exports.default = filter;