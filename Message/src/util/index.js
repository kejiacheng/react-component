/**
 * 深拷贝
 * @param {Array|Object} obj 
 */
export function clone(obj) {
	if (!obj || typeof obj !== 'object') return obj;

	let result;

	if (obj instanceof Array) {
		result = [];
		obj.forEach((item, index) => {
			result[index] = clone(item);
		});
	} else if (obj instanceof Object) {
		result = {};

		for(let k in obj) {
			if (obj.hasOwnProperty(k)) {
				result[k] = clone(obj[k]);
			}
		}
	}

	return result;
}