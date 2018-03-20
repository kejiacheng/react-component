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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSource = [{
    name: 'joke',
    age: '1',
    sex: 'man',
    address: 'jinhua',
    wallet: {
        money: 500
    }
}, {
    name: 'allen',
    age: '2',
    sex: 'man',
    address: 'hangzhou',
    wallet: {
        money: 600
    }
}, {
    name: 'linda',
    age: '3',
    sex: 'woman',
    address: 'wenzhou',
    wallet: {
        money: 700
    }
}, {
    name: 'bob',
    age: '4',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
}];

var drag = function (_Component) {
    (0, _inherits3.default)(drag, _Component);

    function drag() {
        (0, _classCallCheck3.default)(this, drag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (drag.__proto__ || (0, _getPrototypeOf2.default)(drag)).call(this));

        _this.click = function () {
            var me = _this;

            me.setState({
                switch: !me.state.switch
            });
        };

        _this.cb = function (data) {
            var me = _this;
            console.log(data);
            me.setState({
                dataSource: data
            });
        };

        _this.state = {
            dataSource: dataSource,
            page: 1,
            switch: false
        };
        return _this;
    }

    (0, _createClass3.default)(drag, [{
        key: 'render',
        value: function render() {
            var columns = [{
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: '200px',
                render: function render(data, record, index) {
                    if (record.age === '2') {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'p',
                                null,
                                '31231'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '543'
                            )
                        );
                    } else {
                        return data;
                    }
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
                key: 'money',
                width: '200px'
            }];

            return _react2.default.createElement(
                'div',
                { style: { width: '800px', margin: '100px auto' } },
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
                    canDrag: { 'switch': this.state.switch, 'callback': this.cb }
                    // scroll={{x: '1500px'}}
                }),
                _react2.default.createElement(
                    'p',
                    { onClick: this.click },
                    this.state.switch ? '保存' : '排序'
                )
            );
        }
    }]);
    return drag;
}(_react.Component);

exports.default = drag;