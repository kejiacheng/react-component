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

var _Table = require('../components/Table/Table');

var _Table2 = _interopRequireDefault(_Table);

require('./common.css');

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

var common = function (_Component) {
    (0, _inherits3.default)(common, _Component);

    function common() {
        (0, _classCallCheck3.default)(this, common);

        var _this = (0, _possibleConstructorReturn3.default)(this, (common.__proto__ || (0, _getPrototypeOf2.default)(common)).call(this));

        _this.state = {
            dataSource: dataSource,
            page: 1
        };
        return _this;
    }

    (0, _createClass3.default)(common, [{
        key: 'render',
        value: function render() {
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
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'sex',
                dataIndex: 'sex',
                key: 'sex',
                width: '700px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: '500px',
                render: function render(data, record, index) {
                    return data;
                },

                thStyle: {
                    borderColor: 'red'
                },
                tdStyle: {
                    borderColor: 'green'
                }
            }, {
                title: 'money',
                dataIndex: 'wallet.money',
                key: 'money',
                width: '500px'
            }];

            return _react2.default.createElement(
                'div',
                { style: { width: '800px', margin: '100px auto', height: '300px' } },
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
                    ),
                    loading: true,
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
                    // scroll={{x: '100%', y: '100px', minX: '1200px', minY: '70px'}}
                    , scroll: { x: '1200px', y: '100px' }
                })
            );
        }
    }]);
    return common;
}(_react.Component);

exports.default = common;