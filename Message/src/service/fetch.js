import $ from 'jquery'
import Log from './log'

// 一些获取数据的方式，默认使用的是jquery，如果没有兼容ie的问题，换成其他的
export default function get (url, param, formatter) {
  Log.gray('开始请求：', url, param)

  return new Promise((resolve, reject) => {

    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(param)
    }).then(data => {
      Log.green('请求结束：', url, data)

      if (formatter && typeof formatter === 'function') {
        data = formatter(data)
      }

      data ? resolve(data) : reject()
    }, e => {
      Log.red('请求失败：', url, e)
      reject(e)
    })
  })
}