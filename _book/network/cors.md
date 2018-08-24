# 跨域

>浏览器的同源策略导致跨域，协议、域名或端口有任意一个不同就形成了跨域，禁止使用XHR对象向不同源的服务器地址发起HTTP请求。同源策略是为了安全考虑，用以防止CSRF攻击。因为每次请求都会带上地址对应的cookie，这样会暴露用户信息。

## 1.怎么解决跨域

#### 1.CORS(cross-origion resource sharing, 跨域资源共享)

需要服务器设置`':Access-Control-Allow-Origin: http://....'`为应用程序部署的域名。默认情况下跨域的请求不会带cookie，所以做如下设置：

客户端设置`xhr.withCredentials = true`，如果使用的是jquery需要设置:

```
$.ajax({
   url: a_cross_domain_url,
   xhrFields: {
      withCredentials: true
   }
});
```

当然只是客户端设置是没用的，服务器也需要设置`reponse header`接受cookie：

```
Access-Control-Allow-Credentials:true
```

当服务器设置了允许发送cookie后，`Access-Control-Allow-Origin`就不再允许使用通配符了，只能指定单一域名。解决方案是服务器维护一个可接受`cookie`的白名单列表，验证`Origin`请求字段后直接将其设置为`Access-Control-Allow-Origin`的值。


####  2.jsonp

基本原理是动态常见`script`标签，然后利用`src`属性进行跨域。动态创建的`script`标签是异步执行的，创建后就会去拉取资源。

举个例子：

```
// 定义一个fun函数
function fun(fata) {
    console.log(data);
};
// 创建一个脚本，并且告诉后端回调函数名叫fun
var body = document.getElementsByTagName('body')[0];
var script = document.gerElement('script');
script.type = 'text/javasctipt';
script.src = 'demo.js?callback=fun';
body.appendChild(script);
```

返回的js脚本会直接执行，就会执行事先已经定义好的fun函数了，并且把数据传入了进来。

```
fn({'name': 'tom'});
```

因为在实际使用的时候，我们用的各种`ajax`库，基本都包含了`jsonp`的封装，不过我们还是要知道一下原理，不然就不知道为什么`jsonp`不能发`post`请求了。

#### 3.服务器代理

服务器是万能的。浏览器有跨域的限制但服务器没有，所以可以由服务器请求跨域的资源再返回给客户端。

#### 4.使用postMeassage()实现页面之间通信

`window.postMessage()`是`HTML5`的api，允许两个窗口之间进行跨域发送消息。可解决页面间的通信和dom跨域的通用方法了。

`window.postMessage()`方法可以安全地实现跨域通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为HTTPS），端口号（443位https的默认值），以及主机（两个页面的Document.domain设置为相同的值）时，这两个脚本才能互相通信。`window.postMessage()`方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全了。

`window.postMessage()`方法被调用时，会在所有页面脚本执行完毕之后向目标窗口派发一个`MessageEvent`消息。该`MessageEvent`消息有四个属性需要注意：

- message：表示该message的类型
- data：是`window.postMessage()`的第一个参数
- origin 是调用方法时调用页面的当前状态
- source 调用方法的窗口信息

> 语法

```
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

参数解释：

- otherWindow 其他窗口的一个引用，比如`frame`的`contentWindow`属性
- message 将要发送给其他Window的数据，它将会被结构化克隆算法序列化。
- targetOrigin 通过窗口的`origin`属性来指定哪些窗口能接收到消息，其值可能是字符串'*'或者一个URI。
- transfer 可选。是一串和`message`同时传递的`Transferable`对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

> 接收方接收消息

其他`window`可以监听派遣的`message`：

```
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  // For Chrome, the origin property is in the event.originalEvent
  // object. 
  // 这里不准确，chrome没有这个属性
  // var origin = event.origin || event.originalEvent.origin; 
  var origin = event.origin
  if (origin !== "http://example.org:8080")
    return;

  // ...
}
```

## 2.哪些标签是可以跨域的

具有src属性的标签都是可以跨域的：img、script、iframe，link。

## 3.参考文献

[跨域的那些事儿](https://zhuanlan.zhihu.com/p/28562290)