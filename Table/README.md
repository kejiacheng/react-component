### 表格 / Table

#### 使用

使用方法到containers文件夹中看
也可clone代码直接启动看效果

#### API

<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>className</td>
    <td>组件最外层的class</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>bordered</td>
    <td>是否显示边框</td>
    <td>bollean</td>
    <td>false</td>
  </tr>
  <tr>
    <td>columns</td>
    <td>表格列的配置描述，具体项见下表</td>
    <td>array</td>
    <td>-</td>
  </tr>
  <tr>
    <td>dataSource</td>
    <td>数据数组</td>
    <td>array</td>
    <td>-</td>
  </tr>
  <tr>
    <td>header</td>
    <td>表格头部</td>
    <td>reactnode|string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>footer</td>
    <td>表格底部</td>
    <td>reactnode|string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>表格对应页 未填则不显示 若需要则根据pagination组件所需参数配置 当允许拖拽时 不允许使用分页</td>
    <td>object</td>
    <td>-</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>是否显示loading图标</td>
    <td>boolean</td>
    <td>true</td>
  </tr>
  <tr>
    <td>scroll</td>
    <td>是否显示scroll 例{x: '1000px', y: '500px'}</td>
    <td>object</td>
    <td>-</td>
  </tr>
  <tr>
    <td>onRowMouseEnter</td>
    <td>行mouseEnter函数 参数：data（当前行数据）, index（当前行index）, e（当前行e）</td>
    <td>Function (data, index, e)</td>
    <td>noop</td>
  </tr>
  <tr>
    <td>onRowMouseLeave</td>
    <td>行mouseLeave函数 参数：data（当前行数据）, index（当前行index）, e（当前行e）</td>
    <td>Function (data, index, e)</td>
    <td>noop</td>
  </tr>
  <tr>
    <td>onLeftOneClick</td>
    <td>行左鼠标单次点击函数 参数：data（当前行数据），index（当前行index），e（当前行e）</td>
    <td>Function (data, index, e)</td>
    <td>noop</td>
  </tr>
  <tr>
    <td>canDrag</td>
    <td>{switch: bool, callback: func} switch控制是否允许拖拽 callback拖拽完成后回调函数 参数：当前数据排序</td>
    <td>object</td>
    <td>-</td>
  </tr>
  <tr>
    <td>color</td>
    <td>{theadColor: string, hoverColor: string, clickColor: string}</td>
    <td>object</td>
    <td>-</td>
  </tr>
</table>

####Column

<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>title</td>
    <td>列名</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>dataIndex</td>
    <td>dataSource数据对应的key 支持多层级 例a.b.c</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>key</td>
    <td>React唯一key</td>
    <td>width</td>
    <td>-</td>
  </tr>
  <tr>
    <td>width</td>
    <td>列宽度 支持px和%</td>
    <td>string</td>
    <td>-</td>
  </tr>
  <tr>
    <td>filterDropdown</td>
    <td>可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互</td>
    <td>ReactNode</td>
    <td>-</td>
  </tr>
  <tr>
    <td>filterIcon</td>
    <td>自定义 fiter 图标</td>
    <td>ReactNode</td>
    <td>-</td>
  </tr>
  <tr>
    <td>filterDropdownVisible</td>
    <td>用于控制自定义筛选菜单是否可见</td>
    <td>boolean</td>
    <td>-</td>
  </tr>
  <tr>
    <td>onFilterDropdownVisibleChange</td>
    <td>自定义筛选菜单可见变化时调用</td>
    <td>function(visible) {}</td>
    <td>-</td>
  </tr>
  <tr>
    <td>render</td>
    <td>当前值， 当前行值， 当前行索引</td>
    <td>Function (text, record, index)</td>
    <td>-</td>
  </tr>
</table>