


### 接口配置
在`src/service`文件夹中配置接口地址与通道

`api.js`用来罗列所有的服务端接口地址

```js
export default {
  testApiA: '/testApiPath/xx/a',
  testApiB: '/testApiPath/xx/b'
}
```

`fetch.js`用来提供与服务端请求的通道，比如使用`jquery.ajax`，也可以使用其他的
```js  
import $ from 'jquery';
import Log from './log';

// 一些获取数据的方式，默认使用的是jquery，如果没有兼容ie的问题，换成其他的
export default function get(url, param, formatter) {
  Log.gray('开始请求：', url, param);

  return new Promise((resolve, reject) => {

    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(param)
    }).then(data => {
      Log.green('请求结束：', url, data);
  
      if (formatter && typeof formatter === 'function') {
        data = formatter(data);
      }
  
      data ? resolve(data) : reject();
    }, e => {
      Log.red('请求失败：', url, e);
      reject(e);
    });
  });
}
```

`formatter.js`用来处理每个接口在服务端返回之后的数据，将无效的数据去除或者多层嵌套的数据提取出来，业务层只需要关心需要的数据即可
```js 
export function getApiAFormatter(data) {
  if (data && data.retcode === 0 && data.data) {
    return data.data;
  }

  return null;
}
```

`log.js`用不同的颜色在控制台中打印，也作为打印日志的统一入口，可以在发布上线时全局关闭，增加埋点等



在`/src/sdk`中配置业务中要用到的接口，**让所有的接口在这里统一管理与呈现，方便维护与阅读**

```js 
import Fetch from '../service/fetch';
import API from '../service/api';
import * as Formatter from '../service/formatter';

export function getApiA(param) {
  return Fetch(API.testApiA, param, Formatter.getApiAFormatter);
}
// 更多接口...
```

在业务中只需要引入`/src/sdk/index.js`文件，即可直接使用
```js
import { getApiA } from './src/sdk';

getApiA().then(data => {
	//do something
});
```

### 本地mock接口配置
本地的mock接口在`/src/data`文件夹下配置，新建文件时，文件名要与在`/src/service/api.js`中testApiA: '/testApiPath/xx/`a`'一致，方便代理
```js
// a.json
{
  "retCode": 0,
  "data": {
	"hello": "world"
  }
}
```

### 服务与代理配置

#### serviceConfig.js
`serviceConfig.js`中包含了开启本地服务的一些配置

| 配置项      |     说明 |   默认值   |
| :-------- | :--------| :------: |
| `port`    |   开启本地服务用到的端口 |  `9999`  |
| `title`    |  运行项目后，页面的标题 |  `页面标题`  |


#### proxy.js
`proxy.js`中包含了一些服务代理的配置

| 配置项      |     说明 |   默认值   |
| :-------- | :--------| :------: |
|  `/testApiPath`    |   服务端路径，比如服务端的接口路径都是在`http://a.b.c/testApiPath`下面的，那么可以将`/testApiPath`提取出来作为服务代理的入口 |    |
| `/testApiPath.local`    |  代理到本地的配置 |   |
| `/testApiPath.local.target`    |  代理到本地的目标路径 |   `http://127.0.0.1:${port}` |
| `/testApiPath.local.secure`    |  默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器，将此项设置为`false`可以接受HTTPS |  `false`  |
| `/testApiPath.local.changeOrigin`    |  如果代理前的接口地址的域名与代理后的域名不一样，比如`http://localhost:9999/data.json => http://a.b.c/testApiPath/data` ，则需要将此项设置为`true`|   `true` |
| `/testApiPath.local.rewrite`    |  如果服务端的地址与本地mock的接口地址无法匹配上，需要通过`rewrite`来配置<br>比如服务端接口地址`http://a.b.c/testApiPath/xx/abc`<br>本地接口地址`http://127.0.0.1:9999/data/abc.json` <br> 则需要将`/testApiPath/xx`rewrite到`/data`|   `'/testApiPath/xx': '/data'` |
| `/testApiPath.dev`    |  代理到测试环境的配置 |   |
| `/testApiPath.local.target`    |  代理到测试环境的目标路径 |  |
| `/testApiPath.local.secure`    |  默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器，将此项设置为`false`可以接受HTTPS |  `false`  |
| `/testApiPath.local.changeOrigin`    |  如果代理前的接口地址的域名与代理后的域名不一样，比如`http://localhost:9999/data.json => http://a.b.c/testApiPath/data` ，则需要将此项设置为`true`|   `true` |
| `/testApiPath.online`    |  代理到测试环境的配置 |   |


### 项目运行

项目运行有3中环境

| 命令      |     说明 |  
| :-------- | :--------| 
| `npm run startlocal`    |   开启本地服务，并且将代理指向到`本地`接口 |
| `npm run startdev`    |   开启本地服务，并且将代理指向到`测试环境`的接口 |
| `npm run startie`    |   开启本地服务，并且将代理指向到`测试环境`的接口，并且支持在IE中运行 |
| `npm run startonline`    |   开启本地服务，并且将代理指向到`线上环境`的接口 |
| `npm run start`    |   同`npm run startdev` |
| `npm run babel`    |   在模块开发完之后，需要将es6的语法转成es5的语法才能提供出去给其他人使用，运行此命令，就会在将`/src`下的所有文件复制到`/dist`下，并且js已经转成es5  ，此时可以运行`xnpm publish`发布npm包给其他人使用|
