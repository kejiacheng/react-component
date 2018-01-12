'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Table = require('./components/Table/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Pagination = require('@xm/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _log = require('./service/log');

var _log2 = _interopRequireDefault(_log);

require('./styles/font/iconfont.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log2.default.blue('test');
var columns = [{
  title: 'name',
  dataIndex: 'name',
  key: 'name',
  width: '200px',
  render: function render(data, record, index) {
    return data + ' test';
  }
}, {
  title: 'age',
  dataIndex: 'age',
  key: 'age',
  width: '150px',
  render: function render(data, record, index) {
    return data + ' test';
  }
}, {
  title: 'sex',
  dataIndex: 'sex',
  key: 'sex',
  width: '100px',
  render: function render(data, record, index) {
    return data + ' test';
  }
}, {
  title: 'address',
  dataIndex: 'address',
  key: 'address',
  width: '100px',
  render: function render(data, record, index) {
    return data + ' test';
  }
}, {
  title: 'money',
  dataIndex: 'wallet.money',
  key: 'money'
}];

var dataSource = [
  // {
  //   name: 'joke',
  //   age: 10,
  //   sex: 'man',
  //   address: 'jinhua',
  //   wallet: {
  //     money: 500
  //   }
  // },
  // {
  //   name: 'allen',
  //   age: 12,
  //   sex: 'man',
  //   address: 'hangzhou',
  //   wallet: {
  //     money: 600
  //   }
  // },
  // {
  //   name: 'linda',
  //   age: 1,
  //   sex: 'woman',
  //   address: 'wenzhou',
  //   wallet: {
  //     money: 700
  //   }
  // },
  // {
  //   name: 'bob',
  //   age: 15,
  //   sex: 'man',
  //   address: 'ningbo',
  //   wallet: {
  //     money: 800
  //   }
  // }
];

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { style: { "width": "1000px", "margin": "0 auto" } },
  _react2.default.createElement(_Table2.default, {
    className: 'just-test',
    bordered: true,
    columns: columns,
    dataSource: dataSource,
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
    pagination: {
      current: 1,
      pageSize: 4,
      total: 58,
      onChange: function onChange(page) {
        console.log(page);
      },
      showInfo: false,
      showQuickJumper: false
    },
    onRowMouseEnter: function onRowMouseEnter(data, index) {
      console.log(data, index);
    },
    onRowMouseLeave: function onRowMouseLeave(data, index) {
      console.log(data, index);
    },
    onLeftOneClick: function onLeftOneClick(data, index) {
      console.log(data, index);
    }
    // canDrag={{'switch': true, 'callback': function (data) {console.log(data)}}}
  })
), document.getElementById('app'));