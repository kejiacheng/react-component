'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = ['orange', 'red', 'blue', 'gray', 'green'];
var Log = {};

colors.forEach(function (color) {
  Log[color] = function () {
    if (process.env.NODE_ENV !== 'production') {
      var _console;

      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var args = rest;
      if (typeof args[0] === 'string') {
        args[0] = '%c ' + args[0];
        args.splice(1, 0, 'color:' + color + ';font-size:14px');
      }

      window.console && (_console = console).log.apply(_console, args);
    }
  };
});

exports.default = Log;