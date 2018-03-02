import React, { Component } from 'react';
import HeadTable from './HeadTable'
import BodyTable from './BodyTable'
import classNames from 'classnames'
import Pagination from '@xm/Pagination'
import FilterDropdown from './FilterDropdown'
import tableCss from './Table.scss'
import iconfontCss from '../../styles/font/iconfont.scss'

class Table extends Component {
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
            contentChange: true
        }
    }

    renderTable = () => {
        const me = this
        const   { 
                    columns, 
                    scroll, 
                    color, 
                    onRowMouseEnter, 
                    onRowMouseLeave,
                    onLeftOneClick,
                    dataSource,
                    canDrag,
                    activeIndex,
                    thead
                } = me.state
        
        const headTable = 
            <HeadTable
                columns={columns}
                scroll={scroll}
                color={color}
                handleBodyScrollLeft={me.handleBodyScrollLeft}
                thead={thead}
                key={'headTable'}
            />

        const bodyTable = 
            <BodyTable
                columns={columns}
                scroll={scroll}
                color={color}
                dataSource={dataSource}
                handleBodyScrollLeft={me.handleBodyScrollLeft}
                onRowMouseEnter={onRowMouseEnter}
                onRowMouseLeave={onRowMouseLeave}
                onLeftOneClick={onLeftOneClick}
                canDrag={canDrag}
                activeIndex={activeIndex}
                modifyActiveIndex={me.modifyActiveIndex}
                thead={thead}
                key={'bodyTable'}
            />    

        if (scroll && scroll.y) {
            return [headTable, bodyTable]
        } else {
            return [bodyTable]
        }
    }

    modifyActiveIndex = (value) => {
        const me = this

        me.setState(
            {
                activeIndex: value
            }
        )
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

    componentWillReceiveProps (props) {
        const me = this
     
        // //翻页后取消激活索引
        // if (me.props.pagination && !Object.is(me.props.pagination.current, props.pagination.current)) {
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

    render() {
        const me = this
        return (
            <div className={classNames(
                tableCss['k-table'],
                {[this.state.className]: this.state.className},
                {[tableCss['k-table-drag-status']]: me.state.canDrag && me.state.canDrag.switch}
                )}
            >
                {
                    me.state.header
                        ?   <div className={classNames(tableCss['k-table-header'], {[tableCss['k-table-header-border']]: me.state.bordered})}>
                                {me.state.header}
                            </div>
                        :   null
                }
                <div className={classNames(tableCss['k-table-content'], {[tableCss['k-table-bordered']]: me.state.bordered})}>
                    {
                        me.renderTable()
                    }
                </div>
                {
                    me.state.footer
                        ?   <div className={classNames(tableCss['k-table-footer'], {[tableCss['k-table-footer-border']]: me.state.bordered})}>
                                {me.state.footer}
                            </div>
                        : null
                }
                {
                    me.state.pagination
                        ?   <div className={tableCss["k-table-pagination"]}>
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
                        ?   <div className={tableCss["k-table-loading"]}>
                                <div className={tableCss["k-table-loading-content"]}>
                                    <a className={`${iconfontCss["k-table-iconfont"]} ${tableCss["k-table-loading-icon"]}`}>&#xe622;</a>
                                </div>
                            </div>
                        : null
                }
            </div>
        );
    }
}

export default Table;