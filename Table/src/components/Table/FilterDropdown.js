import React, { Component } from 'react'
import classNames from 'classnames'
import tableCss from './Table.scss'
import iconfontCss from '../../styles/font/iconfont.scss'
import filterDropdownCss from './filterDropdown.scss'

export default class filterDropdown extends Component {
    constructor (props) {
        super(props)
        
        const visible = ('filterDropdownVisible' in props.data)
                            ?   props.data.filterDropdownVisible : false

        this.state = {
            visible
        }               
   
    }

    showFilterDropdown = (e) => {
        const me = this
    
        me.props.data.onFilterDropdownVisibleChange(true) 
 
        e.nativeEvent.stopImmediatePropagation()
    }

    returnBubbling = (e) => {
        e.nativeEvent.stopImmediatePropagation()
    }

    componentWillReceiveProps (props) {
        const me = this

        if ('filterDropdownVisible' in props.data) {
            me.setState(
                {
                    visible: props.data.filterDropdownVisible
                }
            )
        }
    }

    componentDidMount () {
        const me = this
       
        document.addEventListener('click', function () {
            me.props.data.onFilterDropdownVisibleChange(false)
        }) 
    }

    render () {
        const { data } = this.props
        
        return (
            <span className={tableCss["k-table-th-filter"]}>
                <span onClick={this.showFilterDropdown}>
                    {
                        data.filterIcon
                            ? <i className={tableCss["k-table-arrow-down"]}>{data.filterIcon}</i>
                            : <i className={classNames(iconfontCss['k-table-iconfont'], tableCss['k-table-arrow-down'])}>&#xe604;</i>
                    }
                </span>
                <div 
                    className={classNames(
                        tableCss['k-table-th-filter-dropdown'],
                        {[tableCss['k-table-none']]: !this.state.visible}
                    )}
                    onClick={this.returnBubbling}
                >
                    {data.filterDropdown}
                </div>
            </span>
        )
    }
}