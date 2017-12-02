/*
 * param
 * className 样式
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
import './Pagination.scss'

export default class pagination extends Component {
    static propTypes = {
        className: React.PropTypes.string,
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

        this.state = {
            className: props.className || '',
            current: props.current || 1,
            pageSize: props.pageSize || 10,
            showQuickJumper: props.showQuickJumper || true,
            showInfo: props.showInfo || true,
            total: props.total || 0,
            offset: props.offset || 4,
            onChange: props.onChange || function (page) {},
            totalPage: Math.ceil(props.total / props.pageSize)
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
                    'k-pagination-item',
                    {'k-pagination-item-active': Object.is(me.state.current, 1)})}
                onClick={this.page.bind(null, 1)}
            >
              <a className={classNames('k-pagination-item-link')}>1</a>
            </li>
        )

        if (me.state.current - me.state.offset > 1) {
            itemArray.push(
                <li className={classNames('k-pagination-item-omit')}>
                  <a className={classNames('k-pagination-item-link')}>...</a>
                </li>
            )
        }

        for (let i = startPage; i <= endPage; i++) {
            itemArray.push(
                <li className={
                    classNames(
                        'k-pagination-item',
                        {'k-pagination-item-active': Object.is(me.state.current, i)})}
                    onClick={this.page.bind(null, i)}
                >
                  <a className={classNames('k-pagination-item-link')}>{i}</a>
                </li>
            )
        }

        if (me.state.current + me.state.offset < me.state.totalPage) {
            itemArray.push(
                <li className={classNames('k-pagination-item-omit')}>
                  <a className={classNames('k-pagination-item-link')}>...</a>
                </li>
            )
        }

        if (me.state.totalPage > 1) {
            itemArray.push(
                <li className={
                    classNames(
                        'k-pagination-item',
                        {'k-pagination-item-active': Object.is(me.state.current, me.state.totalPage)})}
                    onClick={this.page.bind(null, me.state.totalPage)}
                >
                  <a className={classNames('k-pagination-item-link')}>{me.state.totalPage}</a>
                </li>
            )
        }

        return itemArray
    }

    page = (page) => {
        const me = this

        me.setState(
            {
                current: page
            },
            function () {
                me.state.onChange(me.state.current)
            }
        )
    }

    prev = () => {
        const me = this


        if (Object.is(me.state.current, 1)) {
            return
        }

        me.setState(
            {
                current: --me.state.current
            },
            function () {
                me.state.onChange(me.state.current)
            }
        )
    }

    next = () => {
        const me = this

        if (Object.is(me.state.current, me.state.totalPage)) {
            return
        }

        me.setState(
            {
                current: ++me.state.current
            },
            function () {
                me.state.onChange(me.state.current)
            }
        )
    }

    jumpPage = () => {
        const me = this
        const reg = /^\d+$/
        const val = this.refs['k-pagination-jumper-input'].value

        if (reg.test(val) && +val >= 1 && +val <= me.state.totalPage) {
            me.setState(
                {
                    current: +val
                }
            )
        } else {
            this.refs['k-pagination-jumper-input'].value = ''
        }
    }

    componentWillReceiveProps (props) {
        const me = this

        me.setState(
            {
                className: props.className || '',
                current: props.current || 1,
                pageSize: props.pageSize || 10,
                showQuickJumper: props.showQuickJumper || true,
                showInfo: props.showInfo || true,
                total: props.total || 0,
                offset: props.offset || 4,
                onChange: props.onChange || function (page) {},
                totalPage: Math.ceil(props.total / props.pageSize)
            }
        )
    }


    componentDidMount () {

    }

    render () {
        const me = this
        console.log('test')
        return (
            <ul className={classNames('k-pagination')}>
              <li className=
                      {classNames(
                          'k-pagination-prev',
                          {'k-pagination-disable': Object.is(me.state.current, 1)})
                      }
                  onClick={this.prev}
              >
                <a className={classNames('iconfont', 'k-pagination-item-link')}>&#xe601;</a>
              </li>
                {
                    me.renderPageItem()
                }
              <li className=
                      {classNames(
                          'k-pagination-next',
                          {'k-pagination-disable': Object.is(me.state.current, me.state.totalPage)})
                      }
                  onClick={this.next}
              >
                <a className={classNames('iconfont', 'k-pagination-item-link')}>&#xe72b;</a>
              </li>
              <li className={classNames('k-pagination-info')}>
                <p>
                  共<span className={classNames('k-pagination-info-total-num')}>{me.state.total}</span>条，
                  共<span className={classNames('k-pagination-info-total-page')}>{me.state.totalPage}</span>页
                </p>
              </li>
              <li className={classNames('k-pagination-jumper')}>
                <input ref="k-pagination-jumper-input" className={classNames('k-pagination-jumper-input')} type="text"/>
                <a className={classNames('k-pagination-jumper-bt')} onClick={this.jumpPage}>确定</a>
              </li>
            </ul>
        )
    }
}