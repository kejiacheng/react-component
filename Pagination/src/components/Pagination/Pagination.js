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
import React, { Component } from 'react'
import classNames from 'classnames'
import PaginationCss from './Pagination.scss'
import iconfontCss from '../../styles/font/iconfont.scss'

let inputDom = null

export default class pagination extends Component {
  static propTypes = {
    current: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    showQuickJumper: React.PropTypes.bool,
    showInfo: React.PropTypes.bool,
    total: React.PropTypes.number,
    offset: React.PropTypes.number,
    onChange: React.PropTypes.func
  }

  constructor (props) {
    super()

    let pageSize = props.pageSize || 10

    this.state = {
      current: props.current || 1,
      pageSize: pageSize,
      showQuickJumper: props.showQuickJumper,
      showInfo: props.showInfo,
      total: props.total || 0,
      offset: props.offset || 4,
      onChange: props.onChange || function () {},
      totalPage: Math.ceil(props.total / pageSize) || 0
    }
  }

  renderPageItem = () => {
    const me = this

    let itemArray = []
    //除了首页的起始页数
    let startPage = me.state.current - me.state.offset + 1 > 1
                      ? me.state.current - me.state.offset + 1
                      : 2
    //除了尾页的尾页数
    let endPage = me.state.current + me.state.offset - 1 < me.state.totalPage
                    ? me.state.current + me.state.offset - 1
                    : me.state.totalPage - 1

    itemArray.push(
      <li className={
        classNames(
            PaginationCss['k-pagination-item'],
          {[PaginationCss['k-pagination-item-active']]: Object.is(me.state.current, 1)})}
          onClick={this.page.bind(null, 1)}
          key="1"
      >
        <div className={classNames(PaginationCss['k-pagination-item-link'])}>1</div>
      </li>
    )

    if (me.state.current - me.state.offset > 1) {
      itemArray.push(
        <li className={classNames(PaginationCss['k-pagination-item-omit'])} key="frontOmit">
          <div className={classNames(PaginationCss['k-pagination-item-link'])}>...</div>
        </li>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      itemArray.push(
        <li className={
          classNames(
              PaginationCss['k-pagination-item'],
            {[PaginationCss['k-pagination-item-active']]: Object.is(me.state.current, i)})}
            onClick={this.page.bind(null, i)}
            key={i}
        >
          <div className={classNames(PaginationCss['k-pagination-item-link'])}>{i}</div>
        </li>
      )
    }

    if (me.state.current + me.state.offset < me.state.totalPage) {
      itemArray.push(
        <li className={classNames(PaginationCss['k-pagination-item-omit'])} key="laterOmit">
          <div className={classNames(PaginationCss['k-pagination-item-link'])}>...</div>
        </li>
      )
    }

    if (me.state.totalPage > 1) {
      itemArray.push(
        <li className={
          classNames(
              PaginationCss['k-pagination-item'],
            {[PaginationCss['k-pagination-item-active']]: Object.is(me.state.current, me.state.totalPage)})}
            onClick={this.page.bind(null, me.state.totalPage)}
            key={me.state.totalPage}
        >
          <div className={classNames(PaginationCss['k-pagination-item-link'])}>{me.state.totalPage}</div>
        </li>
      )
    }

    return itemArray
  }

  page = (page) => {
    const me = this

    if (Object.is(page, me.state.current)) {
      return
    }

    me.state.current = page
    me.state.onChange(me.state.current)
  }

  prev = () => {
    const me = this


    if (Object.is(me.state.current, 1)) {
      return
    }

    me.state.current = --me.state.current
    me.state.onChange(me.state.current)
  }

  next = () => {
    const me = this

    if (Object.is(me.state.current, me.state.totalPage)) {
      return
    }

    me.state.current = ++me.state.current
    me.state.onChange(me.state.current)
  }

  jumpPage = (e) => {
    const me = this
    const reg = /^\d+$/
    const inputDom = e.currentTarget.parentNode.querySelectorAll('input')[0]
    const val = inputDom.value

    if (reg.test(val) && +val >= 1 && +val <= me.state.totalPage) {
      me.state.current = +val
      me.state.onChange(me.state.current)
      inputDom.value = ''
    } else {
        inputDom.value = ''
    }
  }

  focus = (e) => {
    const me = this
    
    !inputDom && (inputDom = e.currentTarget)

    addEventListener('keydown', me.addEnterEvent)
  }

  blur = () => {
    const me = this

    removeEventListener('keydown', me.addEnterEvent)
  }

  //添加回车事件
  addEnterEvent = (e) => {
    const me = this
    const reg = /^\d+$/
   
    if (e && Object.is(e.keyCode, 13)) {
      if (Object.is(+inputDom.value, me.state.current)) {
        inputDom.value = ''
        return
      }

      if (reg.test(inputDom.value) && +inputDom.value >= 1 && +inputDom.value <= me.state.totalPage) {
        me.state.current = +inputDom.value
        me.state.onChange(me.state.current)
        inputDom.value = ''
      } else {
          inputDom.value = ''
      }
    }
  }

  componentWillReceiveProps (props) {
    const me = this

    let pageSize = props.pageSize || 10

    me.setState(
      {
        current: props.current || 1,
        pageSize: pageSize,
        showQuickJumper: props.showQuickJumper,
        showInfo: props.showInfo,
        total: props.total || 0,
        offset: props.offset || 4,
        onChange: props.onChange || function () {},
        totalPage: Math.ceil(props.total / pageSize) || 0
      }
    )
  }

  shouldComponentUpdate (props, state) {

    return true
  }

  componentDidMount () {

  }

  render () {
    const me = this

    return (
      <ul className={classNames(PaginationCss['k-pagination'])}>
        <li className=
              {classNames(
                  PaginationCss['k-pagination-prev'],
                {[PaginationCss['k-pagination-disable']]: Object.is(me.state.current, 1)})
              }
            onClick={this.prev}
        >
          <div className={classNames(iconfontCss['k-pagination-iconfont'], PaginationCss['k-pagination-item-link'])}>&#xe601;</div>
        </li>
        {
          me.renderPageItem()
        }
        <li className=
              {classNames(
                  PaginationCss['k-pagination-next'],
                {[PaginationCss['k-pagination-disable']]: Object.is(me.state.current, me.state.totalPage)})
              }
            onClick={this.next}
        >
          <div className={classNames(iconfontCss['k-pagination-iconfont'], PaginationCss['k-pagination-item-link'])}>&#xe72b;</div>
        </li>
        {
          Object.is(me.state.showInfo, undefined) || me.state.showInfo
            ? <li className={classNames(PaginationCss['k-pagination-info'])}>
                <p>
                  共<span className={classNames(PaginationCss['k-pagination-info-total-num'])}>{me.state.total}</span>条，
                  共<span className={classNames(PaginationCss['k-pagination-info-total-page'])}>{me.state.totalPage}</span>页
                </p>
              </li>
            : null
        }
        {
          Object.is(me.state.showQuickJumper, undefined) || me.state.showQuickJumper
              ? <li className={classNames(PaginationCss['k-pagination-jumper'])}>
                  <input
                      className={classNames(PaginationCss['k-pagination-jumper-input'])}
                      type="text"
                      onFocus={this.focus}
                      onBlur={this.blur}
                  />
                  <span className={classNames(PaginationCss['k-pagination-jumper-bt'])} onClick={this.jumpPage}>确定</span>
                </li>
            : null
        }

      </ul>
    )
  }
}