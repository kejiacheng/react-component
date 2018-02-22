### 选择框 / Select

#### 使用

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
    <td>用户自定义样式,width基本为必设样式</td>
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
    <td>选择框样式 （目前2种：1种为基本款，另一种支持搜索）</td>
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
    <th>disabled</th>
    <th>是否不能被选中</th>
    <th>boolean</th>
    <th>false</th>
  </tr>
  <tr>
    <th>title</th>
    <th>选项的title</th>
    <th>string</th>
    <th>-</th>
  </tr>
  <tr>
    <th>value</th>
    <th>选项的value</th>
    <th>any</th>
    <th>-</th>
  </tr>
</table>