import React, { Component } from 'react';
import Select from "../components/Select";
let testCss = require('./test.scss')
let Option = Select.Option
class componentName extends Component {
    constructor () {
        super()

        this.state = {
            value: '1'
        }
    }

    componentDidMount () {
        console.log(this.select1)
    }

    
    test = () => {
        console.log(this.select1)
        console.log(this.select1.clearData)
        this.select1.clearData()
    }

    to2 = () => {
        this.setState(
            {
                value: '2'
            }
        )
    }

    to3 = () => {
        this.setState(
            {
                value: '3'
            }
        )
    }

    render() {
        let options = [
            {
                value: 1,
                disalbled: true,
                children:    <div style={{height: 50, lineHeight: '50px'}}>
                                dasdas
                            </div>
            },
            {
                value: 2,
                children:    <div style={{height: 50, lineHeight: '50px'}}>
                                dasdas
                            </div>
            },
            {
                value: 3,
                children:    123
            }
        ]
        return (
            <div>
                <Select 
                    style={{width: 200}} 
                    placeholder={321} 
                    onChange={
                        function (value, text) {
                            console.log(value, text) 
                        }
                    }
                    clear={true}
                    selectClassName="select"
                    optionClassName="option"
                    trigger={function () {console.log(123)}}
                    inputChange={function (text){console.log(text)}}
                    ref={ele => this.select1 = ele}
                    value={this.state.value}
                >
                    {
                        options.map((it) => {
                            return <Option value={it.value} disabled={it.disalbled} key={it.value}>
                                {it.children}
                            </Option>
                        })
                    }
                </Select> 
                <Select 
                    style={{width: 200}} 
                    placeholder={321} 
                    mode="combobox" 
                    onChange={
                        function (value, text) {
                            console.log(value) 
                            console.log(text)
                        }
                    }
                    clear={true}
                    trigger={function () {console.log(123)}}
                    inputChange={function (text){console.log(text)}}
                    value={this.state.value}
                >
                    <Option value="4">1236</Option> 
                    <Option value="5">1237</Option>
                    <Option value="6">1238</Option>
                    <Option value="7">1239</Option>
                    <Option value="7">1340</Option>
                    <Option value="7">1341</Option>
                </Select> 
                <h1 onClick={this.test}>沙发的发生啊实打实</h1>
                <h2 onClick={this.to2}>设置为2</h2>
                <h3 onClick={this.to3}>设置为3</h3>
            </div>
        );
    }
}

export default componentName;