'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Pagination = require('@xm/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

require('./Table.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* canMove 能否移动
* target 目标tr
* left 目标tr距离table左的距离
* top 目标tr距离table上的的距离
* currentX 鼠标在x的位置
* currentY 鼠标在y的位置
* placeholderTr 占位空白tr
* */
/*
 * param
 * className
 * bordered 是否显示边框 默认为无
 * columns 表格列配置项
 * columns {
 *  title        列名
 *  dataIndex    dataSource数据对应的key 支持多层级 例a.b.c
 *  key          React唯一key
 *  width        列宽度 支持px和%
 *  render       数据复杂渲染函数      未填则直接渲染值
 * }
 * dataSource 数据来源
 * header 表格头部 来渲染字符串和react元素
 * footer 表格头部 来渲染字符串和react元素
 * pagination 表格对应页 未填则不显示 若需要则根据pagination组件所需参数配置 当允许拖拽时 不允许使用分页
 * loading 数据未加载时是否显示loading 默认显示
 * scroll 表格是否显示scroll 例{x: '1000px', y: '500px'}
 * onRowMouseEnter 行mouseEnter函数 参数：data（当前行数据）, index（当前行index）, e（当前行e）
 * onRowMouseLeave 行mouseLeave函数 参数：data（当前行数据）, index（当前行index）, e（当前行e）
 * onLeftOneClick 行左鼠标单次点击函数 参数：data（当前行数据），index（当前行index），e（当前行e）
 * canDrag{switch: bool, callback: func} switch控制是否允许拖拽 callback拖拽完成后回调函数 参数：当前数据排序
 */
var params = {
  canMove: false,
  target: null,
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  placeholderTr: null

  //所有tr的offsetTop的数组
};var topArr = [];
//目标tr的index
var currentPosition = 0;
var changedDataSource = void 0;

var timer300 = void 0;

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this));

    _this.setWidth = function () {
      var me = _this;
      var colArr = [];

      me.state.columns.forEach(function (it) {
        colArr.push(_react2.default.createElement('col', { style: { 'width': '' + (it.width || 'auto'), 'minWidth': '' + (it.width || 'auto') }, key: it.key }));
      });

      return colArr;
    };

    _this.renderThead = function () {
      var me = _this;
      var thArr = [];

      me.state.columns.forEach(function (it) {
        thArr.push(_react2.default.createElement(
          'th',
          { key: it.key },
          _react2.default.createElement(
            'span',
            null,
            it.title
          )
        ));
      });

      return thArr;
    };

    _this.renderTbody = function () {
      var me = _this;
      var trArr = [];
      var n = Math.random().toString(36).substr(2);

      me.state.dataSource.forEach(function (it, index) {
        var tdArr = [];

        me.state.columns.forEach(function (obj) {
          var dataIndexArray = obj.dataIndex.split('.');
          var val = '';

          val = dataIndexArray.reduce(function (key, value) {
            return key[value];
          }, it);

          tdArr.push(obj.render && _react2.default.createElement(
            'td',
            { style: { 'width': obj.width || 'auto' }, key: obj.key },
            obj.render(val, it, index)
          ) || _react2.default.createElement(
            'td',
            { style: { 'width': obj.width || 'auto' }, key: obj.key },
            _react2.default.createElement(
              'span',
              null,
              val
            )
          ));
        });

        trArr.push(_react2.default.createElement(
          'tr',
          {
            className: (0, _classnames2.default)({ 'k-table-tr-active': (0, _is2.default)(me.state.activeIndex, index) }),
            key: n + index,
            onMouseEnter: _this.trMouseEnter.bind(null, it, index),
            onMouseLeave: _this.trMouseLeave.bind(null, it, index),
            onMouseDown: _this.trMouseDown.bind(null, it, index),
            onClick: _this.trLeftOneClick.bind(null, it, index)
          },
          tdArr
        ));
      });

      return trArr;
    };

    _this.trMouseEnter = function (data, index, e) {
      var me = _this;

      if (me.state.isDraging) {
        return;
      }

      me.state.onRowMouseEnter(data, index, e);
    };

    _this.trMouseLeave = function (data, index, e) {
      var me = _this;

      if (me.state.isDraging) {
        return;
      }

      me.state.onRowMouseLeave(data, index, e);
    };

    _this.trMouseDown = function (data, index, e) {
      var me = _this;

      if (!me.state.isDraging) {
        return;
      }

      var currentDom = e.currentTarget;
      var currentParentDom = currentDom.parentNode;

      document.addEventListener('mousemove', me.trMouseMove, false);
      document.addEventListener('mouseup', me.trMouseUp, false);

      params.target = currentDom;
      params.canMove = true;
      params.currentX = e.pageX;
      params.currentY = e.pageY;
      params.top = currentDom.offsetTop;
      params.left = currentDom.offsetLeft;
      currentPosition = currentDom.rowIndex;

      topArr = [];
      currentParentDom.childNodes.forEach(function (it) {
        topArr.push(it.offsetTop);
      });

      params.placeholderTr = document.createElement('tr');
      params.placeholderTr.style.height = currentDom.offsetHeight + 'px';

      currentParentDom.insertBefore(params.placeholderTr, currentDom.nextSibling);
      currentDom.style.position = 'absolute';
      currentDom.style.top = params.top + 'px';
      currentDom.style.left = params.left + 'px';
    };

    _this.trMouseMove = function (e) {
      if (params.canMove) {
        var me = _this;
        var currentParentDom = params.target.parentNode;
        var nowX = e.pageX;
        var nowY = e.pageY;
        var disX = nowX - params.currentX;
        var disY = nowY - params.currentY;
        var left = parseInt(params.left) + disX;
        var top = parseInt(params.top) + disY;

        params.target.style.left = left + 'px';
        params.target.style.top = top + 'px';

        if (top < topArr[currentPosition - 1]) {
          var cloneNode = params.placeholderTr.cloneNode(true);
          currentParentDom.removeChild(params.placeholderTr);
          currentParentDom.insertBefore(cloneNode, currentParentDom.childNodes[currentPosition - 1]);
          params.placeholderTr = cloneNode;
          --currentPosition;
        }

        if (top > topArr[currentPosition]) {
          var _cloneNode = params.placeholderTr.cloneNode(true);
          currentParentDom.removeChild(params.placeholderTr);
          currentParentDom.insertBefore(_cloneNode, currentParentDom.childNodes[currentPosition + 1]);
          params.placeholderTr = _cloneNode;
          ++currentPosition;
        }
      }
    };

    _this.trMouseUp = function (e) {
      var me = _this;
      var currentParentDom = params.target.parentNode;

      params.target.style.top = params.placeholderTr.offsetTop + 'px';
      params.target.style.left = params.placeholderTr.offsetLeft + 'px';
      params.target.style.position = 'static';
      currentParentDom.removeChild(params.placeholderTr);
      //移动前的index
      var prevIndex = params.target.rowIndex;
      var cloneNode = params.target.cloneNode(true);
      currentParentDom.insertBefore(cloneNode, currentParentDom.childNodes[currentPosition]);
      // params.target.style.display = 'none'
      currentParentDom.removeChild(params.target);
      topArr = [];
      //移动后的index
      var laterIndex = cloneNode.rowIndex;

      !changedDataSource && (changedDataSource = [].concat((0, _toConsumableArray3.default)(me.state.dataSource)));
      //根据移动前后的index排序dataSource
      var deleteArr = changedDataSource.splice(+prevIndex - 1, 1);
      changedDataSource.splice(+laterIndex - 1, 0, deleteArr[0]);

      params.canMove = false;
      me.initParams();

      document.removeEventListener('mousemove', me.trMouseMove, false);
      document.removeEventListener('mouseup', me.trMouseUp, false);
    };

    _this.initParams = function () {
      params = {
        canMove: false,
        target: null,
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        placeholderTr: null
      };
    };

    _this.trLeftOneClick = function (data, index, e) {
      var me = _this;

      if (me.state.isDraging) {
        return;
      }

      me.setState({
        activeIndex: index
      });
      me.state.onLeftOneClick(data, index, e);
    };

    _this.startDrag = function () {
      var me = _this;

      me.setState({
        isDraging: true
      });
    };

    _this.endDrag = function () {
      var me = _this;

      if (!changedDataSource) {
        me.cancelDrag();
        return;
      }

      //直接使用changedDataSource 会深拷贝导致变量地址一致
      var arr = [].concat((0, _toConsumableArray3.default)(changedDataSource));
      me.setState({
        isDraging: false,
        dataSource: arr,
        activeIndex: null
      }, function () {
        me.state.canDrag.callback(me.state.dataSource);
      });
    };

    _this.cancelDrag = function () {
      var me = _this;

      changedDataSource = null;
      me.setState({
        isDraging: false
      });
    };

    _this.pageChange = function (page) {
      var me = _this;

      me.setState({
        show300: true
      }, function () {
        setTimeout(function () {
          me.setState({
            show300: false
          });
        }, 300);
      });

      me.state.pagination.onChange(page);
    };

    var thead = (0, _is2.default)(props.thead, false) ? false : true;
    var loading = (0, _is2.default)(props.loading, false) ? false : true;

    _this.state = {
      className: props.className || '',
      bordered: props.bordered || false,
      columns: props.columns || [],
      dataSource: props.dataSource || [],
      thead: thead,
      header: props.header || null,
      footer: props.footer || null,
      pagination: props.pagination || null,
      loading: loading,
      scroll: props.scroll || null,
      canDrag: props.canDrag || null,
      onRowMouseEnter: props.onRowMouseEnter || function () {},
      onRowMouseLeave: props.onRowMouseLeave || function () {},
      onLeftOneClick: props.onLeftOneClick || function () {},
      activeIndex: null,
      isDraging: false,
      show300: true
    };
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var me = this;

      if (me.props.pagination && !(0, _is2.default)(me.props.pagination.current, props.pagination.current)) {
        me.setState({
          activeIndex: null
        });
      }

      var thead = (0, _is2.default)(props.thead, false) ? false : true;
      var loading = (0, _is2.default)(props.loading, false) ? false : true;

      me.setState({
        className: props.className || '',
        bordered: props.bordered || false,
        columns: props.columns || [],
        dataSource: props.dataSource || [],
        thead: thead,
        header: props.header || null,
        footer: props.footer || null,
        pagination: props.pagination || null,
        loading: loading,
        scroll: props.scroll || null,
        canDrag: props.canDrag || null,
        onRowMouseEnter: props.onRowMouseEnter || function () {},
        onRowMouseLeave: props.onRowMouseLeave || function () {},
        onLeftOneClick: props.onLeftOneClick || function () {}
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var me = this;

      timer300 = setTimeout(function () {
        me.setState({
          show300: false
        });
      }, 300);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(timer300);
    }
  }, {
    key: 'render',
    value: function render() {
      var me = this;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('k-table', (0, _defineProperty3.default)({}, this.state.className, this.state.className), { 'k-table-drag-status': this.state.isDraging })
        },
        me.state.header || me.state.canDrag && me.state.canDrag.switch ? _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('k-table-header', { 'k-table-header-border': me.state.bordered }) },
          me.state.header,
          _react2.default.createElement(
            'span',
            { className: 'k-table-drag-bt' },
            me.state.canDrag && me.state.canDrag.switch ? me.state.isDraging ? _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { onClick: this.endDrag, style: { 'marginRight': '20px' } },
                '\u4FDD\u5B58'
              ),
              _react2.default.createElement(
                'span',
                { onClick: this.cancelDrag },
                '\u53D6\u6D88'
              )
            ) : _react2.default.createElement(
              'span',
              { onClick: this.startDrag },
              '\u6392\u5E8F'
            ) : null
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('k-table-content', { 'k-table-bordered': me.state.bordered }) },
          _react2.default.createElement(
            'div',
            { className: 'k-table-body' },
            _react2.default.createElement(
              'table',
              { style: {
                  'width': me.state.scroll ? me.state.scroll.x : '100%',
                  'height': me.state.scroll ? me.state.scroll.y : 'auto'
                } },
              _react2.default.createElement(
                'colgroup',
                null,
                me.setWidth()
              ),
              me.state.thead ? _react2.default.createElement(
                'thead',
                { className: 'k-table-thead' },
                _react2.default.createElement(
                  'tr',
                  null,
                  me.renderThead()
                )
              ) : null,
              _react2.default.createElement(
                'tbody',
                { className: 'k-table-tbody' },
                !me.state.show300 ? me.renderTbody() : null
              )
            ),
            me.state.loading && !me.state.dataSource.length && me.state.show300 ? _react2.default.createElement(
              'div',
              { className: 'k-table-loading' },
              _react2.default.createElement(
                'a',
                { className: 'iconfont k-table-loading-icon' },
                '\uE622'
              )
            ) : null,
            !me.state.show300 && !me.state.dataSource.length ? _react2.default.createElement(
              'p',
              { className: 'k-table-no-content' },
              '\u6682\u65E0\u5185\u5BB9'
            ) : null
          )
        ),
        me.state.footer ? _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('k-table-footer', { 'k-table-footer-border': me.state.bordered }) },
          me.state.footer
        ) : null,
        me.state.pagination && (!me.state.canDrag || !me.state.canDrag.switch) ? _react2.default.createElement(
          'div',
          { className: 'k-table-pagination' },
          _react2.default.createElement(_Pagination2.default, {
            current: me.state.pagination.current || 1,
            pageSize: me.state.pagination.pageSize || 10,
            showQuickJumper: me.state.pagination.showQuickJumper,
            showInfo: me.state.pagination.showInfo,
            total: me.state.pagination.total || 0,
            offset: me.state.pagination.offset || 4,
            onChange: me.pageChange
          })
        ) : null
      );
    }
  }]);
  return Table;
}(_react.Component);

Table.propTypes = {
  className: _react2.default.PropTypes.string,
  bordered: _react2.default.PropTypes.bool,
  columns: _react2.default.PropTypes.array,
  dataSource: _react2.default.PropTypes.array,
  thead: _react2.default.PropTypes.bool,
  header: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  footer: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  pagination: _react2.default.PropTypes.object,
  loading: _react2.default.PropTypes.bool,
  scroll: _react2.default.PropTypes.object,
  canDrag: _react2.default.PropTypes.object,
  onRowMouseEnter: _react2.default.PropTypes.func,
  onRowMouseLeave: _react2.default.PropTypes.func,
  onLeftOneClick: _react2.default.PropTypes.func
};
exports.default = Table;