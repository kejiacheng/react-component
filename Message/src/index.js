import React from 'react'
import ReactDOM from 'react-dom'
import message from './components/Message/Message'
import Log from './service/log'
import './styles/font/iconfont.scss'
message.info('123543', 50)
message.error('test', 10)
message.success('321', 5, function () {console.log('success')})
Log.blue('test')

ReactDOM.render((<div>123</div>), document.getElementById('app'))