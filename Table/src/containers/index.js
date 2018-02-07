import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class drag extends Component {
    constructor () {
        super()

        this.state = {
            page: 1
        }
    }

    render () {

        return (
            <div style={{textAlign: 'center', marginTop: '100px'}}>
                <p style={{marginTop: '10px'}}><Link to="./common">common</Link></p>
                <p style={{marginTop: '10px'}}><Link to="./drag">drag</Link></p>
                <p style={{marginTop: '10px'}}><Link to="./filter">filter</Link></p>
                <p style={{marginTop: '10px'}}><Link to="./pagination">pagination</Link></p>
            </div>
        )
    }
}