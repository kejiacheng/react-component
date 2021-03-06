import React from 'react'
import {render} from 'react-dom'
import Table from './components/Table/Table'
import Pagination from '@xm/Pagination'
import Log from './service/log'
import img from './assets/imgs/public.png'
import Routes from  './route/index'

console.log(Routes)

render(
  <div><Routes/></div>,
  document.getElementById('app')
)

// Log.blue('test')
// let columns = [
//     {
//       title: 'name',
//       dataIndex: 'name',
//       key: 'name',
//       width: '200px',
//       filterDropdown: (
//         <div>
//           312
//         </div>
//       ),
//       filterIcon: <img  src={img}/>,
//       filterDropdownVisible: false,
//       render (data, record, index) {
//         return data + ' test'
//       }
//     },
//     {
//       title: 'age',
//       dataIndex: 'age',
//       key: 'age',
//       width: '150px',
//       filterDropdown: (
//         <div style={{background: '#fff', width: '200px', height: '200px'}}>
//           <input type="text" onChange={function () {
//             const me = this

//             console.log(this.state)
//           }}/>
//         </div>
//       ),
//       render (data, record, index) {
//         return data + ' test'
//       }
//     },
//     {
//       title: 'sex',
//       dataIndex: 'sex',
//       key: 'sex',
//       width: '100px',
//       render (data, record, index) {
//         return data + ' test'
//       }
//     },
//     {
//       title: 'address',
//       dataIndex: 'address',
//       key: 'address',
//       width: '100px',
//       render (data, record, index) {
//         return data + ' test'
//       }
//     },
//     {
//       title: 'money',
//       dataIndex: 'wallet.money',
//       key: 'money'
//     }
//   ]

// let dataSource = [
//     {
//       name: 'joke',
//       age: 10,
//       sex: 'man',
//       address: 'jinhua',
//       wallet: {
//         money: 500
//       }
//     },
//     {
//       name: 'allen',
//       age: 12,
//       sex: 'man',
//       address: 'hangzhou',
//       wallet: {
//         money: 600
//       }
//     },
//     {
//       name: 'linda',
//       age: 1,
//       sex: 'woman',
//       address: 'wenzhou',
//       wallet: {
//         money: 700
//       }
//     },
//     {
//       name: 'bob',
//       age: 15,
//       sex: 'man',
//       address: 'ningbo',
//       wallet: {
//         money: 800
//       }
//     }
//   ]

// ReactDOM.render((
//     <div style={{"width": "1000px", "margin": "0 auto"}}>
//         <Table 
//             className="just-test"
//             bordered
//             columns={columns}
//             dataSource={dataSource}
//             header={<div>213</div>}
//             footer={<div style={{'textAlign': 'center'}}>456</div>}
//             // thead={false}
//             loading={true}
//             pagination={
//             {
//                 current: 1,
//                 pageSize: 4,
//                 total: 58,
//                 onChange: function (page) {console.log(page)},
//                 showInfo: false,
//                 showQuickJumper: false
//             }
//             }
//             onRowMouseEnter={function (data, index) {console.log(data, index)}}
//             onRowMouseLeave={function (data, index) {console.log(data, index)}}
//             onLeftOneClick={function (data, index) {console.log(data, index)}}
//             // color={{theadColor: 'blue', hoverColor: 'red', clickColor: 'green'}}
//             // canDrag={{'switch': true, 'callback': function (data) {console.log(data)}}}
//         />
//     </div>
    
// ), document.getElementById('app'))