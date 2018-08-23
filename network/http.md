# HTTP协议
HTTP（HyperText Transfer Protocol，超文本传输协议）是建立在应用层的协议，是万维网数据通信的基础，负责服务器到客户端之间的数据传输。一般模式是客户端发送请求，服务器响应客户端发送的请求来完成数据交互。HTTP并没有规定必须使用它的层或它支持的层，尽管TCP/IP协议栈目前使用最多，但是任何能够提供可靠传输的协议都可以被使用。

## 1、HTTP的特征

- 采用客户端/服务器的模式
 
- HTTP最初的设计目的是提供一种发布和接受HTML页面的方法，所以HTTP是**无连接无状态**的协议。

- HTTP对传输的数据类型没有限制，使用灵活。

- HTTP协议的默认端口是80。

## 2、HTTP请求响应模型
HTTP采用B/S模式，客户端发出请求，服务器响应请求。

![HTTP的客户端-服务器模型](../image/HTTP的客户端-服务器模型.jpg)

## 3、HTTP工作过程

在浏览器的地址栏输入`www.google.com`会发生什么呢？有哪些工作在我们看不见的地方进行呢？

> 第一步：地址解析

当浏览器拿到`www.google.com`这个url时,并不知道应该去哪里请求资源。所以会发出DNS请求解析这个url，获得服务器的IP地址。

> 第二步：封装HTTP请求报文

拿到主机IP地址后，浏览器会把请求url的协议、主机号、端口号和资源路径结合本机的信息封装成一个HTTP请求包。

> 第三步：封装TCP包，建立TCP连接

在HTTP到达TCP后，TCP需要先和服务器建立连接，建立连接时采用TCP三次握手的方式。当TCP建立好连接之后，将收到的HTTP报文加上TCP报文的首部信息，组装成新的TCP报文。

> 第四步：客户端发送请求

此时，客户端发送一个请求给服务器，请求的信息主要包括统一资源标识符，版本协议号以及MIME信息。

> 第五步：服务器响应

服务器收到请求，经过处理后会返回响应信息，主要包括状态行、协议版本号和状态码、MIME信息等。

> 第六步：关闭TCP连接

一般情况下，服务器返回响应后会关闭TCP连接。但是如果在浏览器或服务器的头部信息中加入`Connection:keep-alive`后，TCP连接将会保持到会话结束。保持连接的做法节省了每次请求建立连接的时间和带宽成本。


## 4、报文结构

基本有状态行、请求头和正文信息组成。

> 请求信息

```
 POST / HTTP/1.1
 Host: www.example.com
 User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)
 Gecko/20050225 Firefox/1.0.1
 Content-Type: application/x-www-form-urlencoded
 Content-Length: 40
 Connection: Keep-Alive

 sex=man&name=Professional  
```

> 响应报文

```
HTTP/1.1 200 OK

Server:Apache Tomcat/5.0.12
Date:Mon,6Oct2003 13:23:42 GMT
Content-Length:112

<html>...
```

## 5、请求方法
HTTP/1.1协议中定义了八种方法来操作指定资源


|方法名|主要用途|
|:----|:----|
|GET|像指定的资源发出“显式”请求，只会读取数据，不会产生副作用|
|HEAD|请求资源的元信息或元数据|
|POST|向指定资源提交数据，请求服务器处理|
|PUT|向指定资源上传最新内容|
|DELETE|请求服务器删除URI指定的资源|
|OPTIONS|请求该资源支持的HTTP方法|
|CONNECT|HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器|

> GET和POST请求的区别

1.GET在浏览器回退时是无害的，而POST会再次提交请求。

2.GET请求的url地址可以被保存到书签，而POST不可以。

3.GET请求会被浏览器主动cache，而POST不会，除非手动设置。

4.GET请求只能进行URL编码，而POST支持多种编码方式。

5.GET请求参数会保留在浏览器历史记录里，而POST参数不会被保留。

6.GET请求在URL中传送的参数是有长度限制(4k,IE是2k)的，而POST没有。

7.GET只接受ASCII字符，而POST没有限制。

8.POST比GET更安全，因为GET的参数直接暴露在URL上，所以不能用来传递敏感信息。

9.GET的参数通过URL传递，POST的参数放在body中。

10.GET产生一个TCP数据包,POST产生两个TCP数据包(firefox只发送一次)。


> 条件GET

HTTP条件GET时HTTP协议为了减少不必要的带宽浪费，提出的一种方案。当客户端之前已经访问过某网站，并打算再次访问网站时，客户端向服务器发一个包询问是否在上一次访问网站的时间后修改了页面，如果没有更新，就继续使用本地缓存，如果发生了更新则返回更新后的网页。下面是一个实例：
```
请求报文：
 GET / HTTP/1.1  
 Host: www.sina.com.cn:80  
 If-Modified-Since:Thu, 4 Feb 2010 20:39:13 GMT  
 Connection: Close  

响应报文：
 HTTP/1.0 304 Not Modified  
 Date: Thu, 04 Feb 2010 12:38:41 GMT  
 Content-Type: text/html  
 Expires: Thu, 04 Feb 2010 12:39:41 GMT  
 Last-Modified: Thu, 04 Feb 2010 12:29:04 GMT  
 Age: 28  
 X-Cache: HIT from sy32-21.sina.com.cn  
 Connection: close 
```

## 6、POST请求编码格式

|编码格式|作用|
|---|---|
|application/x-www-form-urlencoded|默认提交方式,提交的数据按照key1=value1&key2=value2的方式编码,key和value都进行了URL转码|
|multipart/form-data|上传文件时使用的方式|
|application/json|传输主体是序列化后的JSON字符串|
|text/xml|传输主体是xml格式的内容|


## 7、状态码

所有HTTP响应的第一行都是状态航，分别是HTTP协议版本号，3位数字组成的状态码，以及描述状态的短语，用空格隔开。

状态代码的第一个数字代表当前响应的类型：

|状态码|状态消息|
|:---|:---|
|1XX消息|请求已被服务器接收，继续处理|
|2XX成功|请求已被服务器接收、理解并接受|
|3XX重定向|需要后续操作才能完成这一请求|
|4XX请求错误|请求含有语法错误或者无法被正常执行|
|5XX服务器错误|服务器在处理正确请求时发生错误|

应该注意的几个状态码：

|状态码|状态消息|
|:---|:---|
|200|请求成功|
|301|永久重定向|
|302|暂时重定向|
|304|请求成功，文件未改变，可使用缓存|
|401|请求未经授权|
|403|服务器收到请求，但是拒绝服务|
|404|请求失败|
|500|服务器发生不可预期的错误|
|503|服务器暂时不能处理客户端的请求|

## 8、HTTP缓存机制

为了减少网络带宽消耗的、降低服务器压力和加快页面打开速度，HTTP缓存诞生了。

> 1.在HTTP报文中与缓存相关的首部

#### 通用首部字段（客户端和服务器均可设置的首部字段）

|字段名称|作用|备注|
|:---|:---|:---|
|Cache-Control|控制缓存的行为|http1.1产物，优先级高于Pragma、Expires|
|Pragma|值为'no-cache'时禁用缓存|http1.0产物,设置在客户端时仅有IE才能识别，设置在服务器响应报文首部时可禁用缓存，优先级高于Expires|

#### 请求首部字段

|字段名称|作用|备注|
|:---|:---|:---|
|if-Match|比较ETag是否一致|如果没有匹配到Tag则返回412，否则忽略|
|if-None-Match|比较ETag是否不一致|没有匹配上需要重新发送资源，否则返回304和响应报头|
|if-Modified-Since|比较资源最后更新的时间是否一致|如果与服务器的最后修改时间一致，则返回304和响应报文|
|if-Unmodified-Since|比较资源最后更新的时间是否不一致|如果最后修改时间不一致，则返回412状态码|

#### 响应首部字段

|字段名称|作用|备注|
|:---|:---|:---|
|ETag|资源的匹配信息|用于告知浏览器资源的'标识'信息|

#### 实体首部字段

|字段名称|作用|备注|
|:---|:---|:---|
|Expires|实体主体的过期时间|http1.0产物，值是一个GMT时间，表示资源的过期时间，仅IE能识别，设置在响应报文首部可以在任何浏览器中作用，但时间是相对服务器时间，如果修改客户端时间则无意义|
|Last-Modified|资源最后一次修改的时间|标记资源最后更改的时间|

> 2.Cache-Control

由于`Expires时间是相对服务器而言，无法保证和客户端时间统一`的问题，http1.1新增了Cache-Control来指定缓存过期的时间，可用于请求报文和响应报文首部。其优先级高于Pragma和Expires。

作为请求首部时，常用的值是：

|字段取值|说明|
|:----|:----|
|no-cache|告诉（代理）服务器不直接使用缓存，要求向原服务器发起请求|
|no-store|所有内容不会被保存到缓存或Internet临时文件中|
|only-if-cached|希望获取缓存内容，不用向原服务器去请求|
|max-age|缓存有效期，单位是秒|

作为响应首部时，常用的值是；

|字段取值|说明|
|:----|:----|
|public|任何情况下都得缓存该资源|
|private|返回报文中全部或部分数据仅开放给某些用户，指定用户可缓存|
|no-cache|不直接使用缓存，向服务器发起（新鲜度校验）请求|
|no-store|所有内容不会保存到缓存或Internet临时文件中|
|only-if-cached|希望获取缓存内容，不用向原服务器发起请求|
|must-revalidate|当前资源一定是向原服务器发去验证请求的|

Cache-Control的值可以自由组合可选值，但是也有些限制，比如no-cache就不能和max-age、max-fresh、max-stale一起搭配使用。

3.缓存实践

在项目中，需要设置Expires来兼容旧的浏览器，使用Cache-Control来精准地利用缓存，然后开启ETag和Last-Modified功能进一步复用缓存较少流量。

4.资源缓存机制

以上的Expires、Cache-Control字段属于强制缓存，Last-Modified等需要验证的字段属于对比缓存。执行顺序是：

**对比强制缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求可直接使用缓存，超过过期时间则需要执行比较缓存策略。**
**对于比较缓存，将缓存信息的ETag和Lsat-Modified通过请求发送给服务器，由服务器校验，返回304状态码可直接使用缓存。**

![浏览器缓存机制](../image/浏览器缓存机制.png)

5.用户操作行为与缓存

|用户操作|Expries/Cache-Control|Last-Modified/Etag|
|---|---|---|
|地址栏回车|有效|有效|
|页面链接跳转|有效|有效|
|新开窗口|有效|有效|
|前进后退|有效|有效|
|F5刷新|无效|有效|
|Ctrl+F5强制刷新|无效|无效|

通过上表可以发现，当用户按下F5刷新时，会忽略Expries/Cache-Control的设置，再次发送请求去服务器，而Last-Modified/Etag还是有效的，服务器会根据情况判断返回304还是200。而当用户按下Ctrl和F5进行强制刷新时，所有的缓存机制都将失效，重新从服务器拉取资源。

6.不能被缓存的请求

无法被浏览器缓存的请求：

```
1.HTTP信息头中包含Cache-Control:no-cache,pragma:no-cache,或Cache-Control:max-age=0等告诉浏览器不用缓存请求。
2.需要根据Cookie，认证信息等决定输入内容的动态请求是不能缓存的。
3.经过HTTPS安全加密的请求。也有人测试发现，IE在头部加入Cache-Control:max-age信息，firefox在头部加入Cache-Control:Public之后，能够对HTTPS的资源进行缓存。
4.POST请求无法缓存。
5.HTTP响应头不包含Last-Modified/Etag，也不包含Cache-Control/Expires请求无法被缓存。
```

## 9、HTTP/1.0、HTTP/1.1与HTTP/2.0

|HTTP版本|特点|改进点|
|:---|:---|:---|
|HTTP/1.0|可以发送任何格式的内容，支持GET、POST、HEAD命令，增加头信息|增加了内容的格式、命令、报头|
|HTTP/1.1|支持持久连接、管道机制、分块传输编码，增加了五个新命令|增加了持久连接、分块传输编码和PUT、PATCH、HEAD、OPTIONS、DELETE命令|
|HTTP/2.0|头信息和数据体采用二进制编码，支持TCP复用，采用数据流返回数据，头信息压缩，服务器推送|支持TCP复用、服务器推送|


## 10、参考文献

[彻底弄懂HTTP缓存机制及原理](http://www.cnblogs.com/chenqf/p/6386163.html)

[浅谈浏览器http的缓存机制](https://www.cnblogs.com/vajoy/p/5341664.html)

[Web缓存机制系列](http://www.alloyteam.com/2012/03/web-cache-2-browser-cache/#prettyPhoto)

[HTTPS的七个误解](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)
