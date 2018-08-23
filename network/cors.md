# 跨域

>浏览器的同源策略导致跨域，协议、域名或端口有任意一个不同就形成了跨域，禁止使用XHR对象向不同源的服务器地址发起HTTP请求。同源策略是为了安全考虑，用以防止CSRF攻击。因为每次请求都会带上地址对应的cookie，这样会暴露用户信息。

## 怎么解决跨域

> 1.CORS(cross-origion resource sharing, 跨域资源共享)

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

当服务器设置了允许发送cookie后，Access-Control-Allow-Origin就不再允许使用通配符了，只能指定单一域名。解决方案是服务器维护一个可接受cookie的白名单列表，验证`Origin`请求字段后直接将其设置为`Access-Control-Allow-Origin`的值。


> 2.jsonp

基本原理是动态常见script标签，然后利用src属性进行跨域。动态创建的script标签是异步执行的，创建后就会去拉取资源。

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

因为在实际使用的时候，我们用的各种ajax库，基本都包含了jsonp的封装，不过我们还是要知道一下原理，不然就不知道为什么jsonp不能发post请求了。

> 3.服务器代理

服务器是万能的。浏览器有跨域的限制但服务器没有，所以可以由服务器请求跨域的资源再返回给客户端。

> 4.使用postMeassage实现页面之间通信

window.postMessage是HTML5的api，允许两个窗口之间进行跨域发送消息。可解决页面间的通信和dom跨域的通用方法了。

## 哪些标签是可以跨域的

具有src属性的标签都是可以跨域的：img、script、iframe，link。

## 参考文献

[跨域的那些事儿](https://zhuanlan.zhihu.com/p/28562290)