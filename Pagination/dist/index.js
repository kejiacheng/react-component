'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Pagination = require('./components/Pagination/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _log = require('./service/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log2.default.blue('test');

_reactDom2.default.render(_react2.default.createElement(_Pagination2.default, { current: 1, total: 50, onChange: function onChange(page) {
    console.log(page);
  } }), document.getElementById('app'));