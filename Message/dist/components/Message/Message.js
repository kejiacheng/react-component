'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Message.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * param
 * content 内容 默认为空
 * duration 持续时间 默认为3s
 * onClose 结束回调函数 默认空函数
 */
var messageInstance = void 0;
var key = 1;

var getMessageInstance = function getMessageInstance() {
    messageInstance = messageInstance || _Notification2.default.newInstance();

    return messageInstance;
};

var notice = function notice(content) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var type = arguments[2];
    var onClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var iconType = {
        info: _react2.default.createElement(
            'a',
            { className: (0, _classnames2.default)('iconfont', 'k-message-icon') },
            '\uE61F'
        ),
        success: _react2.default.createElement(
            'a',
            { className: (0, _classnames2.default)('iconfont', 'k-message-icon') },
            '\uE619'
        ),
        error: _react2.default.createElement(
            'a',
            { className: (0, _classnames2.default)('iconfont', 'k-message-icon') },
            '\uE647'
        ),
        warning: _react2.default.createElement(
            'a',
            { className: (0, _classnames2.default)('iconfont', 'k-message-icon') },
            '\uE644'
        )
    }[type];

    var instance = getMessageInstance();

    instance.notice({
        key: key,
        duration: duration,
        content: _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('k-message-custom-content', 'k-message-' + type) },
            iconType,
            _react2.default.createElement(
                'span',
                null,
                content
            )
        ),
        onClose: onClose
    });

    return function () {
        var target = key++;

        return function () {
            instance.removeNotice(target);
        };
    }();
};

exports.default = {
    info: function info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    warning: function warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    }
};