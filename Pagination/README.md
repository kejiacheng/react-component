### 分页 / Pagination

#### 使用

#### API

<table>
    <tr>
        <th>参数</td>
        <th>说明</td>
        <th>类型</td>
        <th>默认值</td>
    </tr>
    <tr>
        <td>current</td>
        <td>当前页</td>
        <td>number</td>
        <td>1</td>
    </tr>
    <tr>
        <td>pageSize</td>
        <td>每页条数</td>
        <td>number</td>
        <td>10</td>
    </tr>
    <tr>
        <td>showQuickJumper</td>
        <td>是否可以快速跳转至某页</td>
        <td>boolean</td>
        <td>true</td>
    </tr>    
    <tr>
        <td>showInfo</td>
        <td>是否显示页面组件信息</td>
        <td>boolean</td>
        <td>true</td>
    </tr> 
    <tr>
        <td>total</td>
        <td>数据总量</td>
        <td>number</td>
        <td>0</td>
    </tr>    
    <tr>
        <td>offset</td>
        <td>左右偏移量</td>
        <td>number</td>
        <td>4</td>
    </tr>    
    <tr>
        <td>onChange</td>
        <td>页面变化函数,参数为当前页</td>
        <td>Function(page)</td>
        <td>noop</td>
    </tr>        
</table>