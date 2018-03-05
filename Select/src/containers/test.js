import React, { Component } from 'react';
import Select from "../components/Select";
let Option = Select.Option
class componentName extends Component {

    componentDidMount () {
        console.log(this.select1)
    }

    test = () => {
        console.log(this.select1)
        console.log(this.select1.clearData)
        this.select1.clearData()
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
                >
                    <Option value="1" disabled={true}>123</Option>  
                    <Option value="2" title={"312312"}>134</Option>
                    <Option value="3">13235</Option> 
                    <Option value="4">1236</Option> 
                    <Option value="5">1237</Option>
                    <Option value="6">1238</Option>
                    <Option value="7">1239</Option>
                </Select> 
                <h1 onClick={this.test}>沙发的发生啊实打实</h1>
            </div>
        );
    }
}

export default componentName;