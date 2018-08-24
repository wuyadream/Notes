# Node.js

Node.js是运行在服务器端的JavaScript。

## 事件循环

Node.js是单进程单线程的应用程序，但是几乎每个api都会支持回调函数，大量的回调函数形成大量的并发。Node.js进入了一个循环，不断地处理回调函数直到待执行函数队列为空。

## 错误优先的回调函数

错误优先的回调函数用于传递错误和数据。第一个餐数据始终应该是一个错误对象，用于检查程序是否发生了错误，其余的参与用于传递数据。例如：

```
fs.readfile('input.txt', function(err, data) {
    if(err) {
        // handle error
    } else {
        // do something
    }
})
```

## 如何避免回调地狱

1.模块化：将回调函数分割成独立的函数

2.使用promise

## 参考文献

[10个常见的Node.js面试题](http://www.admin10000.com/document/6715.html)

