'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Message = require('./components/Message/Message');

var _Message2 = _interopRequireDefault(_Message);

var _log = require('./service/log');

var _log2 = _interopRequireDefault(_log);

require('./styles/font/iconfont.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Message2.default.info('123543', 50);
_Message2.default.error('test', 10);
_Message2.default.success('321', 5, function () {
  console.log('success');
});
_log2.default.blue('test');

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  '123'
), document.getElementById('app'));