const config = require('./serviceConfig');
module.exports = {
  '/testApiPath': {
    local: {
      target: `http://127.0.0.1:${config.port || 9999}`,
      secure: false,
      changeOrigin: true,
      rewrite: {
        '/testApiPath/xx': '/data' // 使用本地mock接口时，将key的路径代理到value的路径
      }
    },
  
    development: {
      target: 'http://web.jituancaiyun.net', // 测试环境接口host
      secure: false,
      changeOrigin: true,
    },

    production: {
      target: 'http://web.jituancaiyun.com', // 线上环境接口host
      secure: false,
      changeOrigin: true,
    }
  }
}