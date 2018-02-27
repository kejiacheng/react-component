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

var _Table = require('../components/Table/Table');

var _Table2 = _interopRequireDefault(_Table);

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
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}, {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
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

var pagination = function (_Component) {
    (0, _inherits3.default)(pagination, _Component);

    function pagination() {
        (0, _classCallCheck3.default)(this, pagination);

        var _this = (0, _possibleConstructorReturn3.default)(this, (pagination.__proto__ || (0, _getPrototypeOf2.default)(pagination)).call(this));

        _this.change = function (page) {
            var me = _this;

            var data = dataSource.slice((page - 1) * me.state.pageSize, (page - 1) * me.state.pageSize + 10);
            console.log(data);

            me.setState({
                page: page,
                dataSource: data
            });
        };

        _this.textareaChange = function (e) {
            console.log(e.currentTarget.value);
            dataSource[0].age = 11;
            _this.setState({
                dataSource: dataSource
            });
        };

        _this.state = {
            dataSource: dataSource,
            page: 1,
            pageSize: 10
        };
        return _this;
    }

    (0, _createClass3.default)(pagination, [{
        key: 'render',
        value: function render() {
            var me = this;
            var columns = [{
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: '200px',
                render: function render(data, record, index) {
                    return _react2.default.createElement('textarea', { onChange: me.textareaChange });
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
                { style: { width: '800px', margin: '100px auto' } },
                _react2.default.createElement(_Table2.default, (0, _defineProperty3.default)({
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
                    pagination: {
                        current: this.state.page,
                        pageSize: this.state.pageSize,
                        total: dataSource.length,
                        onChange: this.change,
                        showInfo: true,
                        showQuickJumper: true
                    }
                }, 'loading', true))
            );
        }
    }]);
    return pagination;
}(_react.Component);

exports.default = pagination;