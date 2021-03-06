import React, { Component } from 'react'
import Table from '../components/Table/Table'

let dataSource = [
    {
    name: 'joke',
    age: '1',
    sex: 'man',
    address: 'jinhua',
    wallet: {
        money: 500
    }
    },
    {
    name: 'allen',
    age: '2',
    sex: 'man',
    address: 'hangzhou',
    wallet: {
        money: 600
    }
    },
    {
    name: 'linda',
    age: '3',
    sex: 'woman',
    address: 'wenzhou',
    wallet: {
        money: 700
    }
    },
    {
    name: 'bob',
    age: '4',
    sex: 'man',
    address: 'ningbo',
    wallet: {
        money: 800
    }
    }
]

export default class drag extends Component {
    constructor () {
        super()

        this.state = {
            dataSource,
            page: 1,
            switch: false
        }
    }

    click = () => {
        const me = this

        me.setState(
            {
                switch: !me.state.switch
            }
        )
    }

    cb = (data) => {
        const me = this
        console.log(data)
        me.setState(
            {
                dataSource: data
            }
        )
    }

    render () {
        let columns = [
            {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            render (data, record, index) {
                if (record.age === '2') {
                     return <div>
                    <p>31231</p>
                    <p>543</p>
                </div>
                }else {
                    return data
                }
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
            width: '100px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
            width: '100px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'money',
            dataIndex: 'wallet.money',
            key: 'money',
            width: '200px'
            }
        ]

        return (
            <div style={{width: '800px', margin: '100px auto'}}>
                <Table 
                    className="just-test"
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    // header={<div>213</div>}
                    // footer={<div style={{'textAlign': 'center'}}>456</div>}
                    loading={true}
                    canDrag={{'switch': this.state.switch, 'callback': this.cb}}
                    // scroll={{x: '1500px'}}
                />
                <p onClick={this.click}>
                    {
                        this.state.switch
                            ?   '保存'
                            :   '排序'
                    }
                </p>
            </div>
        )
    }
}