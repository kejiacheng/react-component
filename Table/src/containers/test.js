import React, { Component } from 'react';
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

class test extends Component {
    constructor () {
        super()

        this.state = {
            dataSource,
            page: 1,
            switch: true
        }
    }

    click = () => {
        const me = this
        let data =    dataSource.slice(0)
        me.setState(
            {
                switch: !me.state.switch
            }
        )
    }

    cb = (data) => {
        const me = this
        console.log(data)
        console.log(data = data.slice(1))
        me.setState(
            {
                dataSource: data
            }
        )
    }

    render() {
        let columns = [
            {
            title: 'name1',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'age32',
            dataIndex: 'age',
            key: 'age',
            width: '150px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'sex43',
            dataIndex: 'sex',
            key: 'sex',
            width: '300px',
            render (data, record, index) {
                return data
            }
            },
            {
            title: 'address23',
            dataIndex: 'address',
            key: 'address',
            width: '200px',
            render (data, record, index) {
                return data
            },
            // thStyle: {
            //     borderColor: 'red'
            // },
            // tdStyle: {
            //     borderColor: 'green'
            // }
            },
            {
            title: 'money2',
            dataIndex: 'wallet.money',
            key: 'money',
            width: '200px',
            }
        ]

        return (
            <div>
                <Table
                    className="just-test"
                    bordered={true}
                    columns={columns}
                    dataSource={this.state.dataSource}
                    // header={<div>213</div>}
                    // footer={<div style={{'textAlign': 'center'}}>456</div>}
                    loading={true}
                    onRowMouseEnter={function (data, index) {console.log(data, index)}}
                    onRowMouseLeave={function (data, index) {console.log(data, index)}}
                    onLeftOneClick={function (data, index) {console.log(data, index)}}
                    // color={{theadColor: 'blue', hoverColor: 'red', clickColor: 'green'}}
                    thead={false}
                    pagination={
                        {
                            current: this.state.page,
                            pageSize:  this.state.pageSize,
                            total: dataSource.length,
                            onChange: this.change,
                            showInfo: true,
                            showQuickJumper: true
                        }
                    }
                    canDrag={{'switch': this.state.switch, 'callback': this.cb}}
                />

                <p onClick={this.click}>点击</p>
            </div>
        );
    }
}

export default test;