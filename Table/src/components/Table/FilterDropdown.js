import React, { Component } from 'react'
import classNames from 'classnames'
import './filterDropdown.scss'

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
            <span className="k-table-th-filter">
                <span onClick={this.showFilterDropdown}>
                    {
                        data.filterIcon
                            ? <i className="k-table-arrow-down">{data.filterIcon}</i>
                            : <i className="k-table-iconfont k-table-arrow-down">&#xe604;</i>
                    }
                </span>
                <div 
                    className={classNames(
                        'k-table-th-filter-dropdown',
                        {'k-table-none': !this.state.visible}
                    )}
                    onClick={this.returnBubbling}
                >
                    {data.filterDropdown}
                </div>
            </span>
        )
    }
}