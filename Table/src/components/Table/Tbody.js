import React, { Component } from 'react';
import classNames from 'classnames'
import tableCss from './Table.scss'
import { siblings, hasClass, addClass, removeClass, typeInspect } from './utils'

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
let params = {
    canMove: false,
    target: null,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    placeholderTr: null,
    prevIndex: null
}

//所有tr的offsetTop的数组
let topArr = []
//目标tr的index
let currentPosition = 0
let changedDataSource = null

class Tbody extends Component {
    constructor (props) {
        super(props)

        this.state = {
            dataSource: props.dataSource
        }
    }

    renderContent = () => {
        const me = this
        const {columns, thead} = me.props
        let trArr = []
        const n = (me.props.canDrag && me.props.canDrag.switch) ? Math.random().toString(36).substr(2) : 0
        
        me.state.dataSource.forEach((it, index) => {
            let tdArr = []

            columns.forEach((obj, tdIndex) => {
                const dataIndexArray = obj.dataIndex.split('.')
                let val = ''

                val = dataIndexArray.reduce((key, value) => {
                    return key[value]
                }, it)
             
                tdArr = me.renderTd(tdArr, obj, val, it, index, thead, tdIndex)
            })

            trArr.push(
                <tr
                    className={classNames({'k-table-tr-active': Object.is(me.props.activeIndex, index)})}
                    key={me.props.pagination && me.props.pagination.current ? (((me.props.pagination.current - 1) * (me.props.pagination.pageSize || 10)) + index) : (index)}
                    onMouseEnter={this.trMouseEnter.bind(null, it, index)}
                    onMouseLeave={this.trMouseLeave.bind(null, it, index)}
                    onMouseDown={this.trMouseDown.bind(null, it, index)}
                    onClick={this.trLeftOneClick.bind(null, it, index)}
                    style={
                        {
                            background: `${Object.is(me.props.activeIndex, index) ? me.props.color.clickColor || '#dbf0ff' : '#fff'}`
                        }
                    }
                >
                  {tdArr}
                </tr>
            )
        })

        return trArr
    }

    renderTd = (tdArr, obj, val, it, index, thead, tdIndex) => {
        const me = this
        const returnVal = obj.render && obj.render(val, it, index)

        if (obj.render) {
            if (Object.is(typeInspect(returnVal), '[object Object]') 
                && (Object.is(typeInspect(returnVal.rowSpan), '[object Number]') 
                || Object.is(typeInspect(returnVal.colSpan), '[object Number]'))
            ) {
                if (!(Object.is(returnVal.rowSpan, 0) || Object.is(returnVal.colSpan, 0))) {
                    tdArr.push(
                        <td 
                            style={
                                Object.assign(
                                    {
                                        'width': obj.width || 'auto', 
                                        borderTop: `${(thead || index !== 0) ? '' : '1px solid #e9e9e9'}` 
                                    }, 
                                    obj.tdStyle
                                )
                            }
                            key={obj.key + '' + tdIndex}
                            rowSpan={returnVal.rowSpan}
                            colSpan={returnVal.colSpan}
                        >
                            {
                                returnVal.children
                            }
                        </td>
                    )
                }
            } else {
                tdArr.push(
                    <td 
                        style={
                            Object.assign(
                                {
                                    'width': obj.width || 'auto', 
                                    borderTop: `${(thead || index !== 0) ? '' : '1px solid #e9e9e9'}` 
                                }, 
                                obj.tdStyle
                            )
                        } 
                        key={obj.key + '' + tdIndex}
                    >
                        {
                            returnVal
                        }
                    </td>
                )
            }
        } else {
            tdArr.push(
                <td 
                    style={
                        Object.assign(
                            {
                                'width': obj.width || 'auto', 
                                borderTop: `${(thead || index !== 0) ? '' : '1px solid #e9e9e9'}` 
                            }, 
                            obj.tdStyle
                        )
                    } 
                    key={obj.key + '' + tdIndex}
                >
                    <span>{val}</span>
                </td>
            )
        }

        return tdArr
    }

    trMouseEnter = (data, index, e) => {
        const me = this
    
        if (me.props.canDrag && me.props.canDrag.switch) {
          return
        }
    
        e.currentTarget.style.background = me.props.color.hoverColor || '#ecf6fd'
        siblings(e.currentTarget).forEach(it => {
          if (hasClass(it, 'k-table-tr-active')) {
            it.style.background = me.props.color.clickColor || '#dbf0ff'
          } else {
            it.style.background = '#fff'
          }
        })
    
        me.props.onRowMouseEnter(data, index, e)
    }
    
    trMouseLeave = (data, index, e) => {
        const me = this

        if (me.props.canDrag && me.props.canDrag.switch) {
            return
        }

        if (hasClass(e.currentTarget, 'k-table-tr-active')) {
            e.currentTarget.style.background = me.props.color.clickColor || '#dbf0ff'
        } else {
            e.currentTarget.style.background = '#fff'
        }

        me.props.onRowMouseLeave(data, index, e)
    }
    
    trMouseDown = (data, index, e) => {
        const me = this

        if (!me.props.canDrag || !me.props.canDrag.switch) {
            return
        }

        const currentDom = e.currentTarget
        const currentParentDom = currentDom.parentNode
        currentDom.childNodes.forEach((it) => {
            it.width = it.offsetWidth
        })
        document.addEventListener('mousemove', me.trMouseMove, false)
        document.addEventListener('mouseup', me.trMouseUp, false)

        params.target = currentDom
        params.canMove = true
        params.currentX = e.pageX
        params.currentY = e.pageY
        params.top = currentDom.offsetTop
        params.left = currentDom.offsetLeft
        params.prevIndex = currentDom.rowIndex
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
        let laterIndex = params.placeholderTr.rowIndex
        currentParentDom.removeChild(params.placeholderTr)
        //移动前的index
        let prevIndex = params.target.rowIndex
        // let cloneNode = params.target.cloneNode(true)
        params.target.childNodes.forEach((it) => {
            it.width = 'auto'
        })

        // currentParentDom.insertBefore(params.target, currentParentDom.childNodes[currentPosition])
        // params.target.style.display = 'none'
        // currentParentDom.removeChild(params.target)
        topArr = []
        //移动后的index
        // let laterIndex = params.target.rowIndex
        if (prevIndex < laterIndex) {
            laterIndex--
        }
     
        !changedDataSource && (changedDataSource = [...me.props.dataSource])
        //根据移动前后的index排序dataSource
        let deleteArr = changedDataSource.splice(+prevIndex - 1, 1)
    
        changedDataSource.splice(+laterIndex - 1, 0, deleteArr[0])
       
        me.setState(
            {
                dataSource: changedDataSource
            }
        )
        me.endDrag()
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
            placeholderTr: null,
            prevIndex: null
        }
    }
    
    trLeftOneClick = (data, index, e) => {
        const me = this

        if (me.props.canDrag && me.props.canDrag.switch) {
            return
        }
        
        me.props.modifyActiveIndex(index)
        addClass(e.currentTarget, 'k-table-tr-active')
        e.currentTarget.style.background = me.props.color.clickColor || '#dbf0ff'
        siblings(e.currentTarget).forEach(it => {
            removeClass(it, 'k-table-tr-active')
            it.style.background = '#fff'
        })
        me.props.onLeftOneClick(data, index, e)
    }
    
    endDrag = () => {
        const me = this

        if (!changedDataSource) {
            me.cancelDrag()
            return
        }

        //直接使用changedDataSource 会深拷贝导致变量地址一致
        let arr = [...changedDataSource]
        me.props.modifyActiveIndex(null)
      
        me.props.canDrag.callback(arr)

        // me.setState(
        //     {
        //         dataSource: arr
        //     },
        //     function () {
        //         me.props.canDrag.callback(arr)
        //     }
        // )
    }

    componentWillReceiveProps (props) {
        this.setState(
            {
                dataSource: props.dataSource
            },
             function () {
                changedDataSource = null
             }
        )
    }

    render() {
        return (
            <tbody>
                {
                    this.renderContent()
                }
            </tbody>
        );
    }
}

export default Tbody;