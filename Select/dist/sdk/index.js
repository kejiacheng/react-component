'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiA = getApiA;

var _fetch = require('../service/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _api = require('../service/api');

var _api2 = _interopRequireDefault(_api);

var _formatter = require('../service/formatter');

var Formatter = _interopRequireWildcard(_formatter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getApiA(param) {
  return (0, _fetch2.default)(_api2.default.testApiA, param, Formatter.getApiAFormatter);
}