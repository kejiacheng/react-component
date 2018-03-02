import React, { Component } from 'react';

class Colgroup extends Component {
    render() {
        return (
            <colgroup>
                {
                    this.props.columns.map((it) => 
                        <col style={{'width': `${it.width || 'auto'}`,'minWidth': `${it.width || 'auto'}`}} key={it.key}/>
                    )
                }
            </colgroup>
        );
    }
}

export default Colgroup;