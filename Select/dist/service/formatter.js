"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiAFormatter = getApiAFormatter;
function getApiAFormatter(data) {
  if (data && data.retcode === 0 && data.data) {
    return data.data;
  }

  return null;
}