import React from 'react'
import ReactDOM from 'react-dom'
import Pagination from './components/Pagination/Pagination'
import Log from './service/log'


Log.blue('test')

ReactDOM.render((<Pagination current={1}  total={50} onChange={function(page){console.log(page)}}/>), document.getElementById('app'))