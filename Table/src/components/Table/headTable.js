import React, { Component } from 'react';
import { measureScrollbar } from './utils'
import Colgroup from './Colgroup'
import Thead from './Thead'
import tableCss from './Table.scss'

let scrollbar = measureScrollbar('horizontal')

class HeadTable extends Component {
    render() {
        const me = this
        const { handleBodyScrollLeft, scroll, columns, thead, color } = me.props
        return (
            <div 
                className={`${tableCss["k-table-body-header"]} k-table-body-header-dom`}
                onScroll={handleBodyScrollLeft}
                style={
                    {
                        marginBottom: `-${scrollbar}px`
                    }
                }
                key={'headTable'}
            >
                <table style={
                    {
                        'width': scroll && scroll.x ? scroll.x : '100%',
                        'minWidth': scroll && scroll.minX ? scroll.minX : ''
                    }
                }>
                    {<Colgroup columns={columns}/>}
                    {thead ? <Thead columns={columns} color={color} /> : null}
                </table>
            </div>
        );
    }
}

export default HeadTable;