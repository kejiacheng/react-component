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

var test = function (_Component) {
    (0, _inherits3.default)(test, _Component);

    function test() {
        (0, _classCallCheck3.default)(this, test);

        var _this = (0, _possibleConstructorReturn3.default)(this, (test.__proto__ || (0, _getPrototypeOf2.default)(test)).call(this));

        _this.click = function () {
            var me = _this;
            var data = dataSource.slice(0);
            me.setState({
                switch: !me.state.switch
            });
        };

        _this.cb = function (data) {
            var me = _this;
            console.log(data);
            console.log(data = data.slice(1));
            me.setState({
                dataSource: data
            });
        };

        _this.state = {
            dataSource: dataSource,
            page: 1,
            switch: true
        };
        return _this;
    }

    (0, _createClass3.default)(test, [{
        key: 'render',
        value: function render() {
            var columns = [{
                title: 'name1',
                dataIndex: 'name',
                key: 'name',
                width: '200px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'age32',
                dataIndex: 'age',
                key: 'age',
                width: '150px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'sex43',
                dataIndex: 'sex',
                key: 'sex',
                width: '300px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'address23',
                dataIndex: 'address',
                key: 'address',
                width: '200px',
                render: function render(data, record, index) {
                    return data;
                }
            }, {
                title: 'money2',
                dataIndex: 'wallet.money',
                key: 'money',
                width: '200px'
            }];

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Table2.default, {
                    className: 'just-test',
                    bordered: true,
                    columns: columns,
                    dataSource: this.state.dataSource
                    // header={<div>213</div>}
                    // footer={<div style={{'textAlign': 'center'}}>456</div>}
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
                    , thead: false,
                    pagination: {
                        current: this.state.page,
                        pageSize: this.state.pageSize,
                        total: dataSource.length,
                        onChange: this.change,
                        showInfo: true,
                        showQuickJumper: true
                    },
                    canDrag: { 'switch': this.state.switch, 'callback': this.cb }
                }),
                _react2.default.createElement(
                    'p',
                    { onClick: this.click },
                    '\u70B9\u51FB'
                )
            );
        }
    }]);
    return test;
}(_react.Component);

exports.default = test;