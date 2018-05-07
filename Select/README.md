### 选择框 / Select

#### 使用

```js
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
                    <Option value="5">1237</Option>
                    <Option value="6">1238</Option>
                    <Option value="7">1239</Option>
                </Select>
            </div>
        );
    }
}

export default componentName;
```

#### 效果图

### 普通版本

![Alt text](/select.gif)

### 带搜索版本

![Alt text](/select1.gif)


#### API

<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>style</td>
    <td>用户自定义样式,width基本为必设样式;当option使用reactnode时，应注意height的设置</td>
    <td>object</td>
    <td>-</td>
  </tr>
  <tr>
    <td>selectClassName</td>
    <td>选择框的class</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>optionClassName</td>
    <td>选项的class</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td>点击选择框触发的函数，常用于选项具有时效性的场景</td>
    <td>Function ()</td>
    <td>-</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>当选项为空时显示的文字</td>
    <td>string | number</td>
    <td>-</td>
  </tr>
  <tr>
    <td>mode</td>
    <td>选择框样式 （目前2种：1种为基本款，另一种支持搜索）;使用combobox时，option的子元素不支持reactnode</td>
    <td>'default' | 'combobox'</td>
    <td>基本款</td>
  </tr>
  <tr>
    <td>defaultValue</td>
    <td>默认值</td>
    <td>any</td>
    <td>-</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>选项变化后的回调函数</td>
    <td>Function(value, text)</td>
    <td>-</td>
  </tr>
  <tr>
    <td>clear</td>
    <td>是否支持清空选中值</td>
    <td>boolean</td>
    <td>false</td>
  </tr>
  <tr>
    <td>inputChange</td>
    <td>当模式为'combobox'时，input框发生变化的回调</td>
    <td>boolean</td>
    <td>Function(text)</td>
  </tr>
  <tr>
    <td>value</td>
    <td>改变value</td>
    <td>any</td>
    <td>-</td>
  </tr>
</table>

#### Option


<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>disabled</td>
    <td>是否不能被选中</td>
    <td>boolean</td>
    <td>false</td>
  </tr>
  <tr>
    <td>title</td>
    <td>选项的title</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>value</td>
    <td>选项的value;当使用reactnode时，不支持combobox</td>
    <td>any</td>
    <td>-</td>
  </tr>
</table>


#### 方法
<table>
  <tr>
    <td>
      clearData()
    </td>
    <td>
      清除value
    </td>
    <td>
      通过ref调用
    </td>
  </tr>
</table>