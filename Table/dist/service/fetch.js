'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = get;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 一些获取数据的方式，默认使用的是jquery，如果没有兼容ie的问题，换成其他的
function get(url, param, formatter) {
  _log2.default.gray('开始请求：', url, param);

  return new _promise2.default(function (resolve, reject) {

    _jquery2.default.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      dataType: 'json',
      data: (0, _stringify2.default)(param)
    }).then(function (data) {
      _log2.default.green('请求结束：', url, data);

      if (formatter && typeof formatter === 'function') {
        data = formatter(data);
      }

      data ? resolve(data) : reject();
    }, function (e) {
      _log2.default.red('请求失败：', url, e);
      reject(e);
    });
  });
}