import React from 'react'
import ReactDOM from 'react-dom'
import Pagination from './components/Pagination/Pagination'
import Log from './service/log'


Log.blue('test')

ReactDOM.render((<Pagination current={1} pageSize={10} total={50} onChange={function(){console.log(1)}}/>), document.getElementById('app'))