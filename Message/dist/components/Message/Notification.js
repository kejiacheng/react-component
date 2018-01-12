'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./Message.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = Date.now();
var seed = 0;

function getUuid() {
    return 'kNotification_' + now + '_' + seed++;
}

var Notification = function (_Component) {
    (0, _inherits3.default)(Notification, _Component);

    function Notification() {
        (0, _classCallCheck3.default)(this, Notification);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).call(this));

        _this.add = function (noticeProps) {
            var me = _this;
            var arr = me.state.notices;
            var key = noticeProps.key || getUuid();

            if (!arr.filter(function (v) {
                return v.key === key;
            }).length) {
                arr.push(noticeProps);
                var closeTimer = setTimeout(function () {
                    me.remove(key);
                    clearTimeout(closeTimer);
                    closeTimer = null;
                    noticeProps.onClose();
                }, noticeProps.duration * 1000);
            }

            me.setState(function (prevStatus) {
                return {
                    notices: arr
                };
            });
        };

        _this.remove = function (key) {
            var me = _this;

            me.setState(function (prevStatus) {
                return {
                    notices: prevStatus.notices.filter(function (v) {
                        return key !== v.key;
                    })
                };
            });
        };

        _this.renderMessage = function () {
            var me = _this;
            var arr = [];

            me.state.notices.forEach(function (it) {
                arr.push(_react2.default.createElement(
                    'div',
                    { className: 'k-message-notice', key: it.key },
                    _react2.default.createElement(
                        'div',
                        { className: 'k-message-notice-content' },
                        it.content
                    )
                ));
            });

            return arr;
        };

        _this.state = {
            notices: []
        };
        return _this;
    }

    (0, _createClass3.default)(Notification, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'k-message' },
                this.renderMessage()
            );
        }
    }]);
    return Notification;
}(_react.Component);

Notification.newInstance = function newNotificationInstance(properties) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var notification = _reactDom2.default.render(_react2.default.createElement(Notification, null), div);

    return {
        notice: function notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice: function removeNotice(key) {
            notification.remove(key);
        },

        component: notification,
        destroy: function destroy() {
            _reactDom2.default.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    };
};

exports.default = Notification;