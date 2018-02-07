import React, { Component } from 'react'
import Table from '../components/Table/Table'
import img from '../assets/imgs/public.png'

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

export default class filter extends Component {
    constructor () {
        super()

        this.state = {
            inputValue: '',
            dataSource,
            filterDropdownVisible: false
        }
    }

    inputChange = (e) => {
        const me = this

        me.setState(
            {
                inputValue: e.currentTarget.value
            }
        )
    }

    search = () => {
        const me = this
        const { inputValue } = this.state
        const reg = new RegExp(inputValue, 'gi')

        me.setState(
            {
                dataSource: dataSource.map((it) => {
                    const match = it.age.match(reg)
                    if (!match) {
                        return null
                    }

                    return {
                        ...it,
                        age: (
                            <span>
                                {
                                    it.age.split(reg).map((text, i) => (
                                        i > 0 ? [<span style={{color: 'red'}}>{match[0]}</span>, text] : text
                                    ))
                                }
                            </span>
                        )
                    }
                }).filter(it => !!it),
                filterDropdownVisible: false
            },
            function () {
                console.log(me.state.dataSource)
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
                return data
            }
            },
            {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
            width: '150px',
            filterDropdown: (
                <div style={{background: '#fff', width: '200px', height: '200px'}}>
                <input type="text" onChange={this.inputChange}/>
                <span onClick={this.search}>筛选</span>
                </div>
            ),
            filterIcon: <img  src={img}/>,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                console.log(visible)
                this.setState({
                    filterDropdownVisible: visible,
                });
            },
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
            key: 'money'
            }
        ]

        return (
            <div>
            <Table 
                className="just-test"
                bordered
                columns={columns}
                dataSource={this.state.dataSource}
                header={<div>213</div>}
                footer={<div style={{'textAlign': 'center'}}>456</div>}
                // thead={false}
                loading={true}
                onRowMouseEnter={function (data, index) {console.log(data, index)}}
                onRowMouseLeave={function (data, index) {console.log(data, index)}}
                onLeftOneClick={function (data, index) {console.log(data, index)}}
                // color={{theadColor: 'blue', hoverColor: 'red', clickColor: 'green'}}
                // canDrag={{'switch': true, 'callback': function (data) {console.log(data)}}}
            />
            </div>
        )
    }
}