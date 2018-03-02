import React, { Component } from 'react';
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'
import tableCss from './Table.scss'

class BodyTable extends Component {
    render() {
        const me = this
        const   { 
                    handleBodyScrollLeft, 
                    scroll, 
                    columns, 
                    dataSource, 
                    color,
                    onRowMouseEnter,
                    onRowMouseLeave,
                    onLeftOneClick,
                    activeIndex,
                    modifyActiveIndex,
                    canDrag,
                    thead
                } = me.props
                
        return (
            <div 
                className={`${tableCss["k-table-body"]} k-table-body-dom`}
                onScroll={handleBodyScrollLeft}
                style={
                    {
                        overflowX: `${scroll && scroll.x ? 'auto' : 'visible'}`,
                        overflowY: `${scroll && scroll.y ? 'scroll' : 'visible'}`,
                        maxHeight: `${scroll && scroll.y ? scroll.y : ''}`,
                        minHeight: `${scroll && scroll.minY ? scroll.minY : ''}`
                    }
                }
                key={'bodyTable'}
            >
                <table style={
                    {
                        'width': scroll && scroll.x ? scroll.x : '100%',
                        'minWidth': scroll && scroll.minX ? scroll.minX : ''
                    }
                }>
                    {<Colgroup columns={columns}/>}
                    {
                        thead
                            ?   scroll && scroll.y ? null : <Thead columns={columns} color={color}/>
                            :   null
                        
                    }
                    {
                        <Tbody
                            dataSource={dataSource}
                            columns={columns}
                            color={color}
                            onRowMouseEnter={onRowMouseEnter}
                            onRowMouseLeave={onRowMouseLeave}
                            onLeftOneClick={onLeftOneClick}
                            activeIndex={activeIndex}
                            modifyActiveIndex={modifyActiveIndex}
                            canDrag={canDrag}
                            thead={thead}
                        />
                    }
                </table>
            </div>
        );
    }
}

export default BodyTable;