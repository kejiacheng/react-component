'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.clone = clone;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 深拷贝
 * @param {Array|Object} obj 
 */
function clone(obj) {
	if (!obj || (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') return obj;

	var result = void 0;

	if (obj instanceof Array) {
		result = [];
		obj.forEach(function (item, index) {
			result[index] = clone(item);
		});
	} else if (obj instanceof Object) {
		result = {};

		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				result[k] = clone(obj[k]);
			}
		}
	}

	return result;
}