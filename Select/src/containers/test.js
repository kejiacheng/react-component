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
        return (
            <div>
                <Select 
                    style={{width: 200}} 
                    placeholder={321} 
                    // mode="combobox" 
                    // defaultValue="1"
                    onChange={
                        function (value, text) {
                            console.log(value) 
                            console.log(text)
                        }
                    }
                    clear={true}
                    selectClassName="select"
                    optionClassName="option"
                    trigger={function () {console.log(123)}}
                    inputChange={function (text){console.log(text)}}
                    ref={ele => this.select1 = ele}
                    value={this.state.value}
                    // defaultValue={"1"}
                >
                    <Option value="1" disabled={true}>
                        <div style={{height: 50, lineHeight: '50px'}}>
                            dasdas
                        </div>
                    </Option>  
                    <Option value="2" title={"312312"}>
                        <div style={{height: 30}}>
                            tetetet
                        </div>
                    </Option>
                    <Option value="3">
                        <div style={{height: 50, lineHeight: '50px'}}>
                            dasdas
                        </div>
                    </Option> 
                    <Option value="4">1236</Option> 
                    <Option value="5">1237</Option>
                    <Option value="6">1238</Option>
                    <Option value="7">1239</Option>
                </Select> 
                <h1 onClick={this.test}>沙发的发生啊实打实</h1>
                <h2 onClick={this.to2}>设置为2</h2>
                <h3 onClick={this.to3}>设置为3</h3>
            </div>
        );
    }
}

export default componentName;