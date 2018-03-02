import React, { Component } from 'react';
import FilterDropdown from './FilterDropdown'
import tableCss from './Table.scss'

class Thead extends Component {
    render() {
        return (
            <thead
                className={tableCss["k-table-thead"]}
                    style={{
                    background: this.props.color && this.props.color.theadColor
                }}
            >
                <tr>
                    {
                        this.props.columns.map((it) => {
                            return  <th 
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
                        })
                    }
                </tr>
            </thead>
        );
    }
}

export default Thead;