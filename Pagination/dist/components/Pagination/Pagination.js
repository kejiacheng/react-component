'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pagination = require('./Pagination.scss');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _iconfont = require('../../styles/font/iconfont.scss');

var _iconfont2 = _interopRequireDefault(_iconfont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* param
* current 当前页 默认为1
* pageSize 每页数据量 默认为10
* showQuickJumper 是否显示快速跳转 默认显示
* showInfo 是否显示页面组件信息 默认显示
* total 数据总量 默认为0
* offset 左右偏移量 默认为4
* onChange 页面变化函数 参数(当前页)
*/
var inputDom = null;

var pagination = function (_Component) {
  (0, _inherits3.default)(pagination, _Component);

  function pagination(props) {
    (0, _classCallCheck3.default)(this, pagination);

    var _this = (0, _possibleConstructorReturn3.default)(this, (pagination.__proto__ || (0, _getPrototypeOf2.default)(pagination)).call(this));

    _this.renderPageItem = function () {
      var me = _this;

      var itemArray = [];
      //除了首页的起始页数
      var startPage = me.state.current - me.state.offset + 1 > 1 ? me.state.current - me.state.offset + 1 : 2;
      //除了尾页的尾页数
      var endPage = me.state.current + me.state.offset - 1 < me.state.totalPage ? me.state.current + me.state.offset - 1 : me.state.totalPage - 1;

      itemArray.push(_react2.default.createElement(
        'li',
        { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item'], (0, _defineProperty3.default)({}, _Pagination2.default['k-pagination-item-active'], (0, _is2.default)(me.state.current, 1))),
          onClick: _this.page.bind(null, 1),
          key: '1'
        },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-link']) },
          '1'
        )
      ));

      if (me.state.current - me.state.offset > 1) {
        itemArray.push(_react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-omit']), key: 'frontOmit' },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-link']) },
            '...'
          )
        ));
      }

      for (var i = startPage; i <= endPage; i++) {
        itemArray.push(_react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item'], (0, _defineProperty3.default)({}, _Pagination2.default['k-pagination-item-active'], (0, _is2.default)(me.state.current, i))),
            onClick: _this.page.bind(null, i),
            key: i
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-link']) },
            i
          )
        ));
      }

      if (me.state.current + me.state.offset < me.state.totalPage) {
        itemArray.push(_react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-omit']), key: 'laterOmit' },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-link']) },
            '...'
          )
        ));
      }

      if (me.state.totalPage > 1) {
        itemArray.push(_react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item'], (0, _defineProperty3.default)({}, _Pagination2.default['k-pagination-item-active'], (0, _is2.default)(me.state.current, me.state.totalPage))),
            onClick: _this.page.bind(null, me.state.totalPage),
            key: me.state.totalPage
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-item-link']) },
            me.state.totalPage
          )
        ));
      }

      return itemArray;
    };

    _this.page = function (page) {
      var me = _this;

      if ((0, _is2.default)(page, me.state.current)) {
        return;
      }

      me.state.current = page;
      me.state.onChange(me.state.current);
    };

    _this.prev = function () {
      var me = _this;

      if ((0, _is2.default)(me.state.current, 1)) {
        return;
      }

      me.state.current = --me.state.current;
      me.state.onChange(me.state.current);
    };

    _this.next = function () {
      var me = _this;

      if ((0, _is2.default)(me.state.current, me.state.totalPage)) {
        return;
      }

      me.state.current = ++me.state.current;
      me.state.onChange(me.state.current);
    };

    _this.jumpPage = function (e) {
      var me = _this;
      var reg = /^\d+$/;
      var inputDom = e.currentTarget.parentNode.querySelectorAll('input')[0];
      var val = inputDom.value;

      if (reg.test(val) && +val >= 1 && +val <= me.state.totalPage) {
        me.state.current = +val;
        me.state.onChange(me.state.current);
        inputDom.value = '';
      } else {
        inputDom.value = '';
      }
    };

    _this.focus = function (e) {
      var me = _this;

      !inputDom && (inputDom = e.currentTarget);

      addEventListener('keydown', me.addEnterEvent);
    };

    _this.blur = function () {
      var me = _this;

      removeEventListener('keydown', me.addEnterEvent);
    };

    _this.addEnterEvent = function (e) {
      var me = _this;
      var reg = /^\d+$/;

      if (e && (0, _is2.default)(e.keyCode, 13)) {
        if ((0, _is2.default)(+inputDom.value, me.state.current)) {
          inputDom.value = '';
          return;
        }

        if (reg.test(inputDom.value) && +inputDom.value >= 1 && +inputDom.value <= me.state.totalPage) {
          me.state.current = +inputDom.value;
          me.state.onChange(me.state.current);
          inputDom.value = '';
        } else {
          inputDom.value = '';
        }
      }
    };

    var pageSize = props.pageSize || 10;

    _this.state = {
      current: props.current || 1,
      pageSize: pageSize,
      showQuickJumper: props.showQuickJumper,
      showInfo: props.showInfo,
      total: props.total || 0,
      offset: props.offset || 4,
      onChange: props.onChange || function () {},
      totalPage: Math.ceil(props.total / pageSize) || 0
    };
    return _this;
  }

  //添加回车事件


  (0, _createClass3.default)(pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var me = this;

      var pageSize = props.pageSize || 10;

      me.setState({
        current: props.current || 1,
        pageSize: pageSize,
        showQuickJumper: props.showQuickJumper,
        showInfo: props.showInfo,
        total: props.total || 0,
        offset: props.offset || 4,
        onChange: props.onChange || function () {},
        totalPage: Math.ceil(props.total / pageSize) || 0
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {

      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var me = this;

      return _react2.default.createElement(
        'ul',
        { className: (0, _classnames2.default)(_Pagination2.default['k-pagination']) },
        _react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-prev'], (0, _defineProperty3.default)({}, _Pagination2.default['k-pagination-disable'], (0, _is2.default)(me.state.current, 1))),
            onClick: this.prev
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_iconfont2.default['k-pagination-iconfont'], _Pagination2.default['k-pagination-item-link']) },
            '\uE601'
          )
        ),
        me.renderPageItem(),
        _react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-next'], (0, _defineProperty3.default)({}, _Pagination2.default['k-pagination-disable'], (0, _is2.default)(me.state.current, me.state.totalPage))),
            onClick: this.next
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_iconfont2.default['k-pagination-iconfont'], _Pagination2.default['k-pagination-item-link']) },
            '\uE72B'
          )
        ),
        (0, _is2.default)(me.state.showInfo, undefined) || me.state.showInfo ? _react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-info']) },
          _react2.default.createElement(
            'p',
            null,
            '\u5171',
            _react2.default.createElement(
              'span',
              { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-info-total-num']) },
              me.state.total
            ),
            '\u6761\uFF0C \u5171',
            _react2.default.createElement(
              'span',
              { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-info-total-page']) },
              me.state.totalPage
            ),
            '\u9875'
          )
        ) : null,
        (0, _is2.default)(me.state.showQuickJumper, undefined) || me.state.showQuickJumper ? _react2.default.createElement(
          'li',
          { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-jumper']) },
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)(_Pagination2.default['k-pagination-jumper-input']),
            type: 'text',
            onFocus: this.focus,
            onBlur: this.blur
          }),
          _react2.default.createElement(
            'span',
            { className: (0, _classnames2.default)(_Pagination2.default['k-pagination-jumper-bt']), onClick: this.jumpPage },
            '\u786E\u5B9A'
          )
        ) : null
      );
    }
  }]);
  return pagination;
}(_react.Component);

pagination.propTypes = {
  current: _react2.default.PropTypes.number,
  pageSize: _react2.default.PropTypes.number,
  showQuickJumper: _react2.default.PropTypes.bool,
  showInfo: _react2.default.PropTypes.bool,
  total: _react2.default.PropTypes.number,
  offset: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func
};
exports.default = pagination;