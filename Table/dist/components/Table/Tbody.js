'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Table = require('./Table.scss');

var _Table2 = _interopRequireDefault(_Table);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* canMove 能否移动
* target 目标tr
* left 目标tr距离table左的距离
* top 目标tr距离table上的的距离
* currentX 鼠标在x的位置
* currentY 鼠标在y的位置
* placeholderTr 占位空白tr
* prevIndex 移动前的索引
* */
var params = {
    canMove: false,
    target: null,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    placeholderTr: null,
    prevIndex: null

    //所有tr的offsetTop的数组
};var topArr = [];
//目标tr的index
var currentPosition = 0;
var changedDataSource = null;

var Tbody = function (_Component) {
    (0, _inherits3.default)(Tbody, _Component);

    function Tbody(props) {
        (0, _classCallCheck3.default)(this, Tbody);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tbody.__proto__ || (0, _getPrototypeOf2.default)(Tbody)).call(this, props));

        _this.renderContent = function () {
            var me = _this;
            var _me$props = me.props,
                columns = _me$props.columns,
                thead = _me$props.thead;

            var trArr = [];
            var n = me.props.canDrag && me.props.canDrag.switch ? Math.random().toString(36).substr(2) : 0;

            me.state.dataSource.forEach(function (it, index) {
                var tdArr = [];

                columns.forEach(function (obj, tdIndex) {
                    var dataIndexArray = obj.dataIndex.split('.');
                    var val = '';

                    val = dataIndexArray.reduce(function (key, value) {
                        return key[value];
                    }, it);

                    tdArr = me.renderTd(tdArr, obj, val, it, index, thead, tdIndex);
                });

                trArr.push(_react2.default.createElement(
                    'tr',
                    {
                        className: (0, _classnames2.default)({ 'k-table-tr-active': (0, _is2.default)(me.props.activeIndex, index) }),
                        key: me.props.pagination && me.props.pagination.current ? (me.props.pagination.current - 1) * (me.props.pagination.pageSize || 10) + index : index,
                        onMouseEnter: _this.trMouseEnter.bind(null, it, index),
                        onMouseLeave: _this.trMouseLeave.bind(null, it, index),
                        onMouseDown: _this.trMouseDown.bind(null, it, index),
                        onClick: _this.trLeftOneClick.bind(null, it, index),
                        style: {
                            background: '' + ((0, _is2.default)(me.props.activeIndex, index) ? me.props.color.clickColor || '#dbf0ff' : '#fff')
                        }
                    },
                    tdArr
                ));
            });

            return trArr;
        };

        _this.renderTd = function (tdArr, obj, val, it, index, thead, tdIndex) {
            var me = _this;
            var returnVal = obj.render && obj.render(val, it, index);

            if (obj.render) {
                if ((0, _is2.default)((0, _utils.typeInspect)(returnVal), '[object Object]') && ((0, _is2.default)((0, _utils.typeInspect)(returnVal.rowSpan), '[object Number]') || (0, _is2.default)((0, _utils.typeInspect)(returnVal.colSpan), '[object Number]'))) {
                    if (!((0, _is2.default)(returnVal.rowSpan, 0) || (0, _is2.default)(returnVal.colSpan, 0))) {
                        tdArr.push(_react2.default.createElement(
                            'td',
                            {
                                style: (0, _assign2.default)({
                                    'width': obj.width || 'auto',
                                    borderTop: '' + (thead || index !== 0 ? '' : '1px solid #e9e9e9')
                                }, obj.tdStyle),
                                key: obj.key + '' + tdIndex,
                                rowSpan: returnVal.rowSpan,
                                colSpan: returnVal.colSpan
                            },
                            returnVal.children
                        ));
                    }
                } else {
                    tdArr.push(_react2.default.createElement(
                        'td',
                        {
                            style: (0, _assign2.default)({
                                'width': obj.width || 'auto',
                                borderTop: '' + (thead || index !== 0 ? '' : '1px solid #e9e9e9')
                            }, obj.tdStyle),
                            key: obj.key + '' + tdIndex
                        },
                        returnVal
                    ));
                }
            } else {
                tdArr.push(_react2.default.createElement(
                    'td',
                    {
                        style: (0, _assign2.default)({
                            'width': obj.width || 'auto',
                            borderTop: '' + (thead || index !== 0 ? '' : '1px solid #e9e9e9')
                        }, obj.tdStyle),
                        key: obj.key + '' + tdIndex
                    },
                    _react2.default.createElement(
                        'span',
                        null,
                        val
                    )
                ));
            }

            return tdArr;
        };

        _this.trMouseEnter = function (data, index, e) {
            var me = _this;

            if (me.props.canDrag && me.props.canDrag.switch) {
                return;
            }

            e.currentTarget.style.background = me.props.color.hoverColor || '#ecf6fd';
            (0, _utils.siblings)(e.currentTarget).forEach(function (it) {
                if ((0, _utils.hasClass)(it, 'k-table-tr-active')) {
                    it.style.background = me.props.color.clickColor || '#dbf0ff';
                } else {
                    it.style.background = '#fff';
                }
            });

            me.props.onRowMouseEnter(data, index, e);
        };

        _this.trMouseLeave = function (data, index, e) {
            var me = _this;

            if (me.props.canDrag && me.props.canDrag.switch) {
                return;
            }

            if ((0, _utils.hasClass)(e.currentTarget, 'k-table-tr-active')) {
                e.currentTarget.style.background = me.props.color.clickColor || '#dbf0ff';
            } else {
                e.currentTarget.style.background = '#fff';
            }

            me.props.onRowMouseLeave(data, index, e);
        };

        _this.trMouseDown = function (data, index, e) {
            var me = _this;

            if (!me.props.canDrag || !me.props.canDrag.switch) {
                return;
            }

            var currentDom = e.currentTarget;
            var currentParentDom = currentDom.parentNode;
            currentDom.childNodes.forEach(function (it) {
                it.width = it.offsetWidth;
            });
            document.addEventListener('mousemove', me.trMouseMove, false);
            document.addEventListener('mouseup', me.trMouseUp, false);

            params.target = currentDom;
            params.canMove = true;
            params.currentX = e.pageX;
            params.currentY = e.pageY;
            params.top = currentDom.offsetTop;
            params.left = currentDom.offsetLeft;
            params.prevIndex = currentDom.rowIndex;
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
            var laterIndex = params.placeholderTr.rowIndex;
            currentParentDom.removeChild(params.placeholderTr);
            //移动前的index
            var prevIndex = params.target.rowIndex;
            // let cloneNode = params.target.cloneNode(true)
            params.target.childNodes.forEach(function (it) {
                it.width = 'auto';
            });

            // currentParentDom.insertBefore(params.target, currentParentDom.childNodes[currentPosition])
            // params.target.style.display = 'none'
            // currentParentDom.removeChild(params.target)
            topArr = [];
            //移动后的index
            // let laterIndex = params.target.rowIndex
            if (prevIndex < laterIndex) {
                laterIndex--;
            }

            !changedDataSource && (changedDataSource = [].concat((0, _toConsumableArray3.default)(me.props.dataSource)));
            //根据移动前后的index排序dataSource
            var deleteArr = changedDataSource.splice(+prevIndex - 1, 1);

            changedDataSource.splice(+laterIndex - 1, 0, deleteArr[0]);

            me.setState({
                dataSource: changedDataSource
            });
            me.endDrag();
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
                placeholderTr: null,
                prevIndex: null
            };
        };

        _this.trLeftOneClick = function (data, index, e) {
            var me = _this;

            if (me.props.canDrag && me.props.canDrag.switch) {
                return;
            }

            me.props.modifyActiveIndex(index);
            (0, _utils.addClass)(e.currentTarget, 'k-table-tr-active');
            e.currentTarget.style.background = me.props.color.clickColor || '#dbf0ff';
            (0, _utils.siblings)(e.currentTarget).forEach(function (it) {
                (0, _utils.removeClass)(it, 'k-table-tr-active');
                it.style.background = '#fff';
            });
            me.props.onLeftOneClick(data, index, e);
        };

        _this.endDrag = function () {
            var me = _this;

            if (!changedDataSource) {
                me.cancelDrag();
                return;
            }

            //直接使用changedDataSource 会深拷贝导致变量地址一致
            var arr = [].concat((0, _toConsumableArray3.default)(changedDataSource));
            me.props.modifyActiveIndex(null);

            me.props.canDrag.callback(arr);

            // me.setState(
            //     {
            //         dataSource: arr
            //     },
            //     function () {
            //         me.props.canDrag.callback(arr)
            //     }
            // )
        };

        _this.state = {
            dataSource: props.dataSource
        };
        return _this;
    }

    (0, _createClass3.default)(Tbody, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({
                dataSource: props.dataSource
            }, function () {
                changedDataSource = null;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'tbody',
                null,
                this.renderContent()
            );
        }
    }]);
    return Tbody;
}(_react.Component);

exports.default = Tbody;