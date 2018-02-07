### 消息 / Message

#### 使用

#### API

三种方法 info error success

每个方法三个参数 内容，时间，回调方法

message.info('123543', 50)

message.error('test', 10)

message.success('321', 5, function () {console.log('success')})  