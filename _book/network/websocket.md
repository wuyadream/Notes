# WebSocket协议

WebScoket是在单个TCP连接上进行全双工的协议。它的出现只要是为了解决服务器推送的问题。在HTTP/2出现之前，很多网站为了实现推送都采用轮询技术。由浏览器对服务器发出HTTP请求，然后由服务器返回最新的数据给浏览器。这种模式的缺点显而易见-客户端需要不断地向服务器发出请求，浪费了服务器和带宽资源。

在轮询技术中，较新的技术是Comet。但是Comet采用长连接来实现双向通信，会消耗服务器资源。

## 1、WebSocket的优点

WebSocket的出现，解决了普遍存在的服务器推送问题。具有以下优点：

```
（一）减少控制开销。websocket的协议头部只有2-10字节。
（二）更强的实时性。websocket的连接时全双工的，所以服务器可以随时主动给客户端下发数据。
（三）保持连接状态。websocket是有状态的协议，建立连接之后的通信都可以省略部分状态信息。
（四）支持二进制帧。
（五）可以支持扩展。Websocket定义了扩展，用户可以扩展协议、实现部分自定义的子协议。
（六）更好的压缩效率。
（七）没有同源限制，客户端可以与任意服务器通信。
```

## 2、客户端API

> WebSocket构造函数

```
var ws = new WebSocket('ws://localhost:8080');
```

执行上面的语句之后，客户端就会与服务器进行连接。

> webSocket.readyState

webSocket.readyState返回实例对象的当前状态，共有四种。

- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

> webSocket.onopen

实例对象的onopen属性，用于指定连接成功后的回调函数。

```
ws.onopen = function() {
    ws.send('Hello, Server');
}
```

> webSocket.onclose

实例对象的onclose属性，用于指定连接关闭后的回调函数。

```
ws.onclose = function(event) {
console.log(event.code);
}
```

> webSocket.onmessage

实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。服务器的数据可能是文本(blob对象)，也可能是二进制数据(ArrayBuffer对象)。

```
ws.onmessage = function(event) {
    if(typeof event.data === String) {
        // blob对象
    }
    if(event.data instanceof ArrayBuffer) {
        // ArrayBuffer对象
    }
}
```

> webSocket.send()

实例对象的send()方法用于向服务器发送数据。

```
ws.send('hello,server');
```

> webSocket.bufferedAmount

实例对象的bufferedAmount属性，表示还有多少个字节的二进制数据没有发出去。它可以用来判断是否结束。

```
var data = new ArrayBuffer(100000);
ws.send(data);
if(ws.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送未结束
}
```

> webSocke.onerror

实例对象的onerror属性，用于指定报错时的回调函数。

```
ws.onerror = function() {
    // handle error event
}
```



## 3、参考文献

[维基百科-WebSocket](https://zh.wikipedia.org/wiki/WebSocket)

[WebSocket教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

