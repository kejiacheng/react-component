'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _index = require('../containers/index');

var _index2 = _interopRequireDefault(_index);

var _common = require('../containers/common');

var _common2 = _interopRequireDefault(_common);

var _filter = require('../containers/filter');

var _filter2 = _interopRequireDefault(_filter);

var _drag = require('../containers/drag');

var _drag2 = _interopRequireDefault(_drag);

var _pagination = require('../containers/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _test = require('../containers/test');

var _test2 = _interopRequireDefault(_test);

var _combine = require('../containers/combine');

var _combine2 = _interopRequireDefault(_combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(
        _reactRouterDom.HashRouter,
        null,
        _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _index2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/common', component: _common2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/filter', component: _filter2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/drag', component: _drag2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/pagination', component: _pagination2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/test', component: _test2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/combine', component: _combine2.default })
        )
    );
};