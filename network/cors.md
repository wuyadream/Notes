# 跨域

>浏览器的同源策略导致跨域，协议、域名或端口有任意一个不同就形成了跨域，禁止使用XHR对象向不同源的服务器地址发起HTTP请求。同源策略是为了安全考虑，用以防止CSRF攻击。因为每次请求都会带上地址对应的cookie，这样会暴露用户信息。

## 怎么解决跨域

> 1.CORS(cross-origion resource sharing,跨域资源共享)

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

