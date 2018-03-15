import React, { Component } from 'react'
import Table from '../components/Table/Table'
import './common.css'

let dataSource = [
    {
    name: 'joke',
    age: '10',
    sex: 'man',
    address: 'jinhua',
    wallet: {
        money: 500
    }
    },
    {
    name: 'allen',
    age: '12',
    sex: 'man',
    address: 'hangzhou',
    wallet: {
        money: 600
    }
    },
    {
    name: 'linda',
    age: '1',
    sex: 'woman',
    address: 'wenzhou',
    wallet: {
        money: 700
    }
    },
    {
    name: 'bob',
    age: '15',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
    }
]

export default class common extends Component {
    constructor () {
        super()

        this.state = {
            dataSource,
            page: 1
        }
    }

    delete = (index) => {
        const me = this
        let arr = me.state.dataSource
        arr.splice(index, 1)
        console.log(arr)
        me.setState(
            {
                dataSource: arr
            }
        )
    }

    render () {
        const me = this
        let columns = [
            {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
            width: '150px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'sex',
            dataIndex: 'sex',
            key: 'sex',
            width: '700px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
            width: '500px',
            render (data, record, index) {
                return data
            },
            thStyle: {
                borderColor: 'red'
            },
            tdStyle: {
                borderColor: 'green'
            }
            },
            {
            title: 'money',
            dataIndex: 'wallet.money',
            key: 'money',
            width: '500px',
            render (data, record, index) {
                return <span data-index="index" onClick={me.delete.bind(null, index)}>删除</span>
            }
            }
        ]

        return (
            <div style={{width: '800px', margin: '100px auto', height: '300px'}}>
                <Table 
                    className="just-test"
                    bordered={true}
                    columns={columns}
                    dataSource={this.state.dataSource}
                    header={<div>213</div>}
                    footer={<div style={{'textAlign': 'center'}}>456</div>}
                    loading={true}
                    onRowMouseEnter={function (data, index) {console.log(data, index)}}
                    onRowMouseLeave={function (data, index) {console.log(data, index)}}
                    onLeftOneClick={function (data, index) {console.log(data, index)}}
                    // color={{theadColor: 'blue', hoverColor: 'red', clickColor: 'green'}}
                    // scroll={{x: '100%', y: '100px', minX: '1200px', minY: '70px'}}
                    // scroll={{x: '1200px', y: '100px'}}
                />
            </div>
        )
    }
}