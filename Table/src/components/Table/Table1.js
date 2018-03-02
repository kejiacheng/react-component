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
 * color{theadColor: string, hoverColor: string, clickColor: string}
 */
import React, { Component } from 'react'
import classNames from 'classnames'
import Pagination from '@xm/Pagination'
import FilterDropdown from './FilterDropdown'
import { measureScrollbar } from './utils'
import headTable from './headTable'
import bodyTable from './bodyTable'
import tableCss from './Table.scss'
import iconfontCss from '../../styles/font/iconfont.scss'

/*
* canMove 能否移动
* target 目标tr
* left 目标tr距离table左的距离
* top 目标tr距离table上的的距离
* currentX 鼠标在x的位置
* currentY 鼠标在y的位置
* placeholderTr 占位空白tr
* */
let params = {
  canMove: false,
  target: null,
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  placeholderTr: null
}

//所有tr的offsetTop的数组
let topArr = []
//目标tr的index
let currentPosition = 0
let changedDataSource

let scrollbar = measureScrollbar('horizontal')

export default class Table extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    bordered: React.PropTypes.bool,
    columns: React.PropTypes.array,
    dataSource: React.PropTypes.array,
    thead: React.PropTypes.bool,
    header: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    footer: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    pagination: React.PropTypes.object,
    loading: React.PropTypes.bool,
    scroll: React.PropTypes.object,
    canDrag: React.PropTypes.object,
    color: React.PropTypes.object,
    onRowMouseEnter: React.PropTypes.func,
    onRowMouseLeave: React.PropTypes.func,
    onLeftOneClick: React.PropTypes.func
  }

  constructor (props) {
    super()

    const thead = Object.is(props.thead, false) ? false: true
    const loading = Object.is(props.loading, false) ? false : true

    this.state = {
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
      color: props.color || {},
      onRowMouseEnter: props.onRowMouseEnter || function () {},
      onRowMouseLeave: props.onRowMouseLeave || function () {},
      onLeftOneClick: props.onLeftOneClick || function () {},
      activeIndex: null,
      isDraging: false,
      contentChange: true
    }
  }

  setWidth = () => {
    const me = this
    let colArr = []

    me.state.columns.forEach((it) => {
      colArr.push(
        <col style={{'width': `${it.width || 'auto'}`,'minWidth': `${it.width || 'auto'}`}} key={it.key}/>
      )
    })

    return colArr
  }

  renderThead = () => {
    const me = this
    let thArr = []

    me.state.columns.forEach((it) => {
      thArr.push(
        <th 
          key={it.key}
          style={it.thStyle || {}}
        >
          <span>{it.title}</span>
          {
            it.filterDropdown
              ? <FilterDropdown data={it} />
              : null
          }
        </th>
      )
    })

    return thArr
  }

  renderTbody = () => {
    const me = this
    let trArr = []
    const n = (me.state.canDrag && me.state.canDrag.switch) ? Math.random().toString(36).substr(2) : 0
   
    me.state.dataSource.forEach((it, index) => {
      let tdArr = []

      me.state.columns.forEach((obj) => {
        const dataIndexArray = obj.dataIndex.split('.')
        let val = ''

        val = dataIndexArray.reduce((key, value) => {
          return key[value]
        }, it)

        tdArr.push(
          obj.render &&
          <td style={{'width': obj.width || 'auto'}} key={obj.key} style={obj.tdStyle || {}}>{obj.render(val, it, index)}</td> ||
          <td style={{'width': obj.width || 'auto'}} key={obj.key} style={obj.tdStyle || {}}><span>{val}</span></td>
        )
      })
    
      trArr.push(
        <tr
          className={classNames({'k-table-tr-active': Object.is(me.state.activeIndex, index)})}
          key={me.props.pagination && me.props.pagination.current ? (n + ((me.props.pagination.current - 1) * (me.props.pagination.pageSize || 10)) + index) : (n + index)}
          onMouseEnter={this.trMouseEnter.bind(null, it, index)}
          onMouseLeave={this.trMouseLeave.bind(null, it, index)}
          onMouseDown={this.trMouseDown.bind(null, it, index)}
          onClick={this.trLeftOneClick.bind(null, it, index)}
          style={
            {
              background: `${Object.is(me.state.activeIndex, index) ? me.state.color.clickColor || '#dbf0ff' : '#fff'}`
            }
          }
        >
          {tdArr}
        </tr>
      )
    })

    return trArr
  }

  trMouseEnter = (data, index, e) => {
    const me = this

    if (me.state.isDraging) {
      return
    }

    e.currentTarget.style.background = me.state.color.hoverColor || '#ecf6fd'
    me.siblings(e.currentTarget).forEach(it => {
      if (me.hasClass(it, 'k-table-tr-active')) {
        it.style.background = me.state.color.clickColor || '#dbf0ff'
      } else {
        it.style.background = '#fff'
      }
    })

    me.state.onRowMouseEnter(data, index, e)
  }

  trMouseLeave = (data, index, e) => {
    const me = this

    if (me.state.isDraging) {
      return
    }

    if (me.hasClass(e.currentTarget, 'k-table-tr-active')) {
      e.currentTarget.style.background = me.state.color.clickColor || '#dbf0ff'
    } else {
      e.currentTarget.style.background = '#fff'
    }

    me.state.onRowMouseLeave(data, index, e)
  }

  trMouseDown = (data, index, e) => {
    const me = this

    if (!me.state.isDraging) {
      return
    }

    const currentDom = e.currentTarget
    const currentParentDom = currentDom.parentNode

    document.addEventListener('mousemove', me.trMouseMove, false)
    document.addEventListener('mouseup', me.trMouseUp, false)

    params.target = currentDom
    params.canMove = true
    params.currentX = e.pageX
    params.currentY = e.pageY
    params.top = currentDom.offsetTop
    params.left = currentDom.offsetLeft
    currentPosition = currentDom.rowIndex

    topArr = []
    currentParentDom.childNodes.forEach(it => {
      topArr.push(it.offsetTop)
    })

    params.placeholderTr = document.createElement('tr')
    params.placeholderTr.style.height = currentDom.offsetHeight + 'px'

    currentParentDom.insertBefore(params.placeholderTr, currentDom.nextSibling)
    currentDom.style.position = 'absolute'
    currentDom.style.top = params.top + 'px'
    currentDom.style.left = params.left + 'px'
  }

  trMouseMove = (e) => {
    if (params.canMove) {
      const me = this
      const currentParentDom = params.target.parentNode
      let nowX = e.pageX
      let nowY = e.pageY
      let disX = nowX - params.currentX
      let disY = nowY - params.currentY
      let left = parseInt(params.left) + disX
      let top = parseInt(params.top) + disY

      params.target.style.left = left + 'px'
      params.target.style.top = top + 'px'

      if (top < topArr[currentPosition - 1]) {
        let cloneNode = params.placeholderTr.cloneNode(true)
        currentParentDom.removeChild(params.placeholderTr)
        currentParentDom.insertBefore(cloneNode, currentParentDom.childNodes[currentPosition - 1])
        params.placeholderTr = cloneNode
        --currentPosition
      }

      if (top > topArr[currentPosition]) {
        let cloneNode = params.placeholderTr.cloneNode(true)
        currentParentDom.removeChild(params.placeholderTr)
        currentParentDom.insertBefore(cloneNode, currentParentDom.childNodes[currentPosition + 1])
        params.placeholderTr = cloneNode
        ++currentPosition
      }
    }
  }

  trMouseUp = (e) => {
    const me = this
    const currentParentDom = params.target.parentNode

    params.target.style.top =  params.placeholderTr.offsetTop + 'px'
    params.target.style.left =  params.placeholderTr.offsetLeft + 'px'
    params.target.style.position = 'static'
    currentParentDom.removeChild(params.placeholderTr)
    //移动前的index
    let prevIndex = params.target.rowIndex
    let cloneNode = params.target.cloneNode(true)
    currentParentDom.insertBefore(cloneNode, currentParentDom.childNodes[currentPosition])
    // params.target.style.display = 'none'
    currentParentDom.removeChild(params.target)
    topArr = []
    //移动后的index
    let laterIndex = cloneNode.rowIndex

    !changedDataSource && (changedDataSource = [...me.state.dataSource])
    //根据移动前后的index排序dataSource
    let deleteArr = changedDataSource.splice(+prevIndex - 1, 1)
    changedDataSource.splice(+laterIndex - 1, 0, deleteArr[0])

    params.canMove = false
    me.initParams()

    document.removeEventListener('mousemove', me.trMouseMove, false)
    document.removeEventListener('mouseup', me.trMouseUp, false)
  }

  initParams = () => {
    params = {
      canMove: false,
      target: null,
      left: 0,
      top: 0,
      currentX: 0,
      currentY: 0,
      placeholderTr: null
    }
  }

  trLeftOneClick = (data, index, e) => {
    const me = this

    if (me.state.isDraging) {
      return
    }
 
    me.state.activeIndex = index
    me.addClass(e.currentTarget, 'k-table-tr-active')
    e.currentTarget.style.background = me.state.color.clickColor || '#dbf0ff'
    me.siblings(e.currentTarget).forEach(it => {
      me.removeClass(it, 'k-table-tr-active')
      it.style.background = '#fff'
    })
    me.state.onLeftOneClick(data, index, e)
  }

  startDrag = () => {
    const me = this

    me.setState(
      {
        isDraging: true
      }
    )
  }

  endDrag = () => {
    const me = this

    if (!changedDataSource) {
      me.cancelDrag()
      return
    }

    //直接使用changedDataSource 会深拷贝导致变量地址一致
    let arr = [...changedDataSource]
    me.setState(
      {
        isDraging: false,
        dataSource: arr,
        activeIndex: null
      },
      function () {
        me.state.canDrag.callback(me.state.dataSource)
      }
    )
  }

  cancelDrag = () => {
    const me = this

    changedDataSource = null
    me.setState(
      {
        isDraging: false
      })
  }

  pageChange = (page) => {
    const me = this

    me.setState(
      {
        contentChange: true
      }
    )
    me.state.pagination.onChange(page)
  }

  handleBodyScrollLeft = (e) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target;
    const { scroll = {} } = this.props;
    let { headTable, bodyTable } = this;
    !headTable && (headTable = document.getElementsByClassName('k-table-body-header-dom')[0])
    !bodyTable && (bodyTable = document.getElementsByClassName('k-table-body-dom')[0])

    if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
      if (target === bodyTable && headTable) {
        headTable.scrollLeft = target.scrollLeft;
      } else if (target === headTable && bodyTable) {
        bodyTable.scrollLeft = target.scrollLeft;
      }
    }
    this.lastScrollLeft = target.scrollLeft;
  }

  renderHeadTable = () => {
    const me = this

    const headTable = <div 
    className={`${tableCss["k-table-body-header"]} k-table-body-header-dom`}
    onScroll={me.handleBodyScrollLeft}
    style={
      {
        marginBottom: `-${scrollbar}px`
      }
    }
  >
    <table style={
      {
        'width': me.state.scroll && me.state.scroll.x ? me.state.scroll.x : '100%',
        'minWidth': me.state.scroll && me.state.scroll.minX ? me.state.scroll.minX : ''
      }
    }>
      <colgroup>
        {
          me.setWidth()
        }
      </colgroup>
      <thead>
        {
          me.renderThead()
        }
      </thead>
    </table>
  </div>

  return headTable
  }

  renderbodyTable = () => {
    const me = this

    const bodyTable = <div 
    className={`${tableCss["k-table-body"]} k-table-body-dom`}
    onScroll={me.handleBodyScrollLeft}
    style={
      {
        overflowX: `${me.state.scroll && me.state.scroll.x ? 'auto' : 'visible'}`,
        overflowY: `${me.state.scroll && me.state.scroll.y ? 'scroll' : 'visible'}`,
        maxHeight: `${me.state.scroll && me.state.scroll.y ? me.state.scroll.y : ''}`,
        minHeight: `${me.state.scroll && me.state.scroll.minY ? me.state.scroll.minY : ''}`
      }
    }
  >
    <table style={
      {
        'width': me.state.scroll && me.state.scroll.x ? me.state.scroll.x : '100%',
        'minWidth': me.state.scroll && me.state.scroll.minX ? me.state.scroll.minX : ''
      }
    }>
      <colgroup>
        {
          me.setWidth()
        }
      </colgroup>
      {
        me.state.thead && !(me.state.scroll && me.state.scroll.y)
          ? <thead 
              className={tableCss["k-table-thead"]}
              style={{
                background: me.state.color && me.state.color.theadColor
              }}
            >
              <tr>
                {
                  me.renderThead()
                }
              </tr>
            </thead>
          : null
      }
      <tbody className={tableCss["k-table-tbody"]}>
        {
          me.renderTbody()
        }
      </tbody>
    </table>
    {
      (!me.state.dataSource.length)
        ? <p className={tableCss["k-table-no-content"]}>暂无内容</p>
        : null
    }
  </div>

    return bodyTable
  }

  siblings = (obj) => {
    let _nodes = []
    let elem = obj
    let _elem = obj
    while ((_elem = _elem.previousSibling)){
        if(_elem.nodeType === 1){
            _nodes.push(_elem);
        }
    }
    while ((elem = elem.nextSibling)){
        if(elem.nodeType === 1){
            _nodes.push(elem);

        }
    }

    return _nodes;
  }

  hasClass = (obj, cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
  }

  addClass = (obj, cls) => {
    const me = this
  
    if (!me.hasClass(obj,cls)) obj.className += " " + cls;  
  }

  removeClass = (obj, cls) => {
    const me = this

    if (me.hasClass(obj, cls)) {  
	    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	  }  
  }

  componentWillReceiveProps (props) {
    const me = this
 
    // //翻页后取消激活索引
    // if (me.props.pagination && !Object.is(me.props.pagination.current, props.pagination.current)) {
    //   console.log(123)
    //   me.setState(
    //     {
    //       activeIndex: null
    //     }
    //   )
    // }

    const thead = Object.is(props.thead, false) ? false: true
    const loading = Object.is(props.loading, false) ? false : true

    me.setState(
      {
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
        color: props.color || {},
        onRowMouseEnter: props.onRowMouseEnter || function () {},
        onRowMouseLeave: props.onRowMouseLeave || function () {},
        onLeftOneClick: props.onLeftOneClick || function () {},
        contentChange: false,
        activeIndex: null
      }
    )
  }

  componentDidMount () {
    const me = this

    me.setState(
      {
        contentChange: false
      }
    )
  }

  componentWillUnmount () {
    
  }

  render () {
    const me = this

    return (
      <div className={classNames(
             tableCss['k-table'],
             {[this.state.className]: this.state.className},
             {[tableCss['k-table-drag-status']]: this.state.isDraging}
             )
            }
      >
        {
          me.state.header || me.state.canDrag && me.state.canDrag.switch
            ? <div className={classNames(tableCss['k-table-header'], {[tableCss['k-table-header-border']]: me.state.bordered})}>
                {me.state.header}
                <span className={tableCss['k-table-drag-bt']}>
                   {
                     me.state.canDrag && me.state.canDrag.switch
                      ? me.state.isDraging
                          ? <span>
                              <span onClick={this.endDrag} style={{'marginRight': '20px'}}>保存</span>
                              <span onClick={this.cancelDrag}>取消</span>
                            </span>
                          : <span onClick={this.startDrag}>排序</span>
                      : null
                    
                   }
                </span>
              </div>
            : null
        }
        <div className={classNames(tableCss['k-table-content'], {[tableCss['k-table-bordered']]: me.state.bordered})}>
          {
            me.state.scroll && me.state.scroll.y 
              ? me.renderHeadTable()
              : null
          }
          {
            me.renderbodyTable()
          }
        </div>
        {
          me.state.footer
            ? <div className={classNames(tableCss['k-table-footer'], {[tableCss['k-table-footer-border']]: me.state.bordered})}>
                {me.state.footer}
              </div>
            : null
        }
        {
          me.state.pagination && (!me.state.canDrag || !me.state.canDrag.switch)
            ? <div className={tableCss["k-table-pagination"]}>
                <Pagination
                  current={me.state.pagination.current || 1}
                  pageSize={me.state.pagination.pageSize || 10}
                  showQuickJumper={me.state.pagination.showQuickJumper}
                  showInfo={me.state.pagination.showInfo}
                  total={me.state.pagination.total || 0}
                  offset={me.state.pagination.offset || 4}
                  onChange={me.pageChange}
                />
              </div>
            : null
        }
        {
          (me.state.loading && me.state.contentChange)
            ? <div className={tableCss["k-table-loading"]}>
                <div className={tableCss["k-table-loading-content"]}>
                  <a className={`${iconfontCss["k-table-iconfont"]} ${tableCss["k-table-loading-icon"]}`}>&#xe622;</a>
                </div>
              </div>
            : null
        }
      </div>
    )
  }
}