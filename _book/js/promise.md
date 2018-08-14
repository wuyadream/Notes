# Promise原理及实现

> 简单来说，`promise`就是一个承诺，承诺本身会做出正确延时或异步操作。承诺会解决`callback`处理异步回调可能产生的调用过早，过晚或调用次数过多过少、吞掉可能出现的错误或异常问题等。另外，承诺只接受首次`resolve()`或`reject()`决议，承诺本省状态改变后就不会再改变，承诺所有通过`then()`注册的回调总是一次异步调用，承诺所有异常总会被捕获抛出。

**严谨地讲，`promise`是一种封装和组合未来值得易于复用的机制，实现关注点分离、异步流程控制、异常冒泡、串行|并行控制等。**

## 1.Promise状态

`promise`的状态必须为以下三种状态之一：等待态(`pengding`)、执行态(`resolved`)和拒绝态(`rejected`)。等待态可以向执行态或拒绝态迁移，一旦改变将一直维持这个状态。

## 2.Promise构造函数

首先，我们看看`promise`构造函数需要做什么事情。

1.初始化`Promise`状态为`pending`。
2.初始化`then()`注册回调函数数组(`then()`方法可被同一个`promise`调用多次)
3.立即执行传入的`fn`函数，传入`Promise`内部`resolve`、`reject`函数。

```
function Promise(fn) {
    // 初始化promise状态
    // 0-pengding
    // 1-resolved
    // 2-rejected
    this._state = 0;
    // promise执行结果
    this._value = null;

    // 注册回调处理数组
    this.deferreds = [];

    // 立即执行fn函数
    try {
        fn(value => {
            resolve(this, value);
        }, reason => {
            reject(this, reason);
        })
    } catch(err) {
        reject(this, err);
    }
}
```

## 3.then函数

`then`方法可以被同一个`promise`调用多次，每次返回新`promise`对象。`then`方法接受两个参数`onResolved`、`onRejected`（可选）。在`promise`被`resolve`或`reject`后，所有`onResolved`或`onRejected`函数须按照其注册顺序依次回调，且调用次数不超过一次。

那么，`then`函数的执行流程大致为：

1.实例化空`promise`对象用来返回，用以保持链式调用。
2.构造`then()`注册回调处理函数体。
3.判断当前`promise`状态，`pending`状态存储延迟处理对象`deferred`，非`pending`状态执行`onResolved`或`onRejected`回调。

```
Promise.prototype.then = function(onResolved, onRejected) {
    // 初始化空promise对象用来返回
    var res = new Promise(function(){});

    // 使用 onResolved，onRejected实例化处理对象Handler
    var deferred = new Handler(onResolved, onRejected, res);

    // 当前状态为pengding，存储延迟处理的对象
    if(this._state === 0) {
        this._deferreds.push(deferred);
        return res;
    }

    // 当前状态不是pengding,调用handleResolved执行onResolved或onRejected回调
    handleResolved(this, deferred);

    // 返回新promise对象，维持链式调用
    return res;
}

// /handler函数封装存储onResolved、onRejected函数和新生成的promise对象
function Handler(onResolved, onRejected, promise) {
    this.onResolved = typeof onResolved === 'function' ? onResolved : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}
```
> 链式调用为什么返回新的`promise`对象？

因为当前的`promise`对象的状态已经转移，无法再改变，会影响后面的回调。


## 4.resolve函数

`promise`实例化时立即执行传入的`fn`函数，同时传递内部`resolve`函数作为参数用来改变`promise`状态。`resolve`函数的执行逻辑大概为：判断并改变当前`promise`状态，存储`resolve()`的`value`值。判断当前是否存在`then()`注册回调函数，若存在则依次异步执行`onResolved`回调。

为使`Promise`的实现更具有通用性，当`value`为存在`then()`方法的`thenable`对象，需要做`Promise Resolution Procedure`处理，规范描述为
`[[Resolve]](promise, x)`,`x`即为后面`value`参数。

具体的处理逻辑如下:

- 如果`promis`e和`x`指向同一对象，以`TypeError`为据拒绝执行`promise`。

- 如果`x`为`promise`，则使`promise`接受`x`的状态。

- 如果`x`为对象或函数：

1.把`x.then`赋值给`then`。
2.如果取`x.then`的值时抛出错误e，则以e为据拒绝`promise`。
3.如果`then`是函数，将`x`作为函数的作用域`this`调用之。
4.如果`x`不是对象或者函数，以`x`为参数执行`promise`。

```
function resolve(promise, value) {
    // 非pengding状态不可转移状态
    if(promise._state !== 0) return;

    // promise和value指向同一对象
    if(value === promise) {
        return reject(promise, new TypeError('A promise cannot be resolveed with itself.'));
    }

    // 如果value为Promise,则使promise接受value的状态
    if(value && value instanceOf Promise && value.then === promise.then) {
        var deferreds = promise._deferreds;
        if(value._state === 0) {
            // value是pending状态，将promise._deferreds传递给value._deferreds
            value._deferreds.push(...deferreds);
        } else if(deferreds.length !== 0) {
            // value为非pending状态，使用value作为当前的promise，执行then注册回调处理
            for(var i=0; i<deferreds.length; i++) {
                handleResolved(value, deferreds[i]);
            }
            // 清空then注册回调处理数组
            value._deferreds = [];
        }
        return;
    }

    // value是对象或函数,当value是具有then方法的对象时，调用then
    if(value &&(typeof value === 'object' || typeof value === 'function')) {
        try {
            var then = value.then;
        } catch(err) {
            return reject(promise, err);
        }

        // 如果then是函数，则将value作为函数的作用域this调用之
        if(typeof then === 'function') {
            try {
                then.call(value,function(value) {
                    resolve(promise, value);
                }, function(reason) {
                    reject(promise, reason);
                })
            } catch(err) {
                reject(promise, err);
            }
            return;
        }
    }

    // 改变promise内部的状态为resolved
    promise._state = 1;
    promise._value = value;

    // promise存在then注册回调函数
    if(promise._deferreds.length != 0) {
        for(var i=0; i<promise._deferreds.length; i++) {
            handleResolved(promise, promise._deferreds[i]);
        }
        // 清空then注册回调处理函数
        promise._deferreds = [];
    }
}
```

`resolve`函数逻辑较为复杂，主要是集中处理`value`值的多种可能。如果`value`为`promise`且状态为`pending`时，须使`promise`接受`value`的状态。在`value`状态为`pending`时，简单将`promise`的`deferreds`回调处理数组赋予`value.deferreds`变量。非`pending`状态，使用`value`内部值回调`promise`注册的`deferreds`。

如果`value`为`thenable`对象，以`value`作为函数的作用域`this`调用之，同时回调调用内部`resolve()`、`reject()`函数。

其他情形则以`value`为参数执行`promise`，调用`onResolved`和`onRejected`处理函数。

## 5.reject函数

`promise`内部的私有方法`reject`相较于`resolve`逻辑就简单多了，如下所示：

```
function reject(promise, reason) {
    // 非pending状态不可改变
    if(promise._state !== 0) return;

    // 改变内部状态为reject
    promise._state = 2;
    promise._value = reason;

    // 判断是否存在then()注册回调处理
    if(promise._deferreds.length !== 0) {
        // 异步执行回调函数
        for(var i=0; i<promise._deferreds.length; i++) {
            handleResolved(promise,promise._deferreds[i]);
        }
        promise._deferreds = [];
    }
}
```

## 6.handleResolved函数

在此之前，我们多次调用了`handleResolved`函数却还没实现，那么此函数到底做了哪些事情呢？

`handleResolved`函数具体会根据`promise`当前状态判断调用`onResolved`、`onRejected`，处理`then()`注册回调为空的情形，以及维护链式`then()`函数后续调用。具体实现如下：

function handleResolved(promise, deferred) {
    // 异步注册回调
    asyncFn(function() {
        var cb = promise._state === 1? deferred.onResolved: deferred.onRejected;

        // 传递注册回调函数为空的情况
        if(cb === null) {
            if(promise._state === 1) {
                resolve(deferred.promise, promise._value);
            } else {
                reject(deferred.promise, promise._value);
            }
            return;
        }

        // 执行注册回调操作
        try {
            var res = cb(promise._value);
        } catch(err) {
            reject(deferred.promise, err);
        }

        // 处理链式then()注册函数调用
        resolve(deferred.promise, res);
    });
}

具体处理注册回调函数`cb`为空情形，如下面实例。判断当前回调`cb`为空时，使用`deferred.promise`作为当前`promise`,结合`value`调用后续处理函数继续往后执行，实现值穿透空处理函数往后传递。

```
Promise.resolve(233)
.then()
.then(function(value) {
    console.log(value);
})
```

实现`then`函数的链式调用，只需要在`Promise.prototype.then()`处理函数中返回新的`promise`实例即可。但除此之外，还需要依次调用`then`注册的回调处理函数。如`handleResolved`函数最后一句`resolve(deferred.promise,res)`所示。

## 7.基于Promise，原生js实现ajax

`XMLHttpRequest`的`readyState`属性表示这个请求所处的状态：

|值|状态|描述|
|---|---|---|
|0|UNSENT|open()方法还未被调用|
|1|OPENED|open()方法已经被调用|
|2|HEADERS_RECEIVED|send()方法已经被调用,响应头和响应状态已经返回|
|3|LOADING|正在下载响应体|
|4|DONE|请求过程已经完毕|

#### 1.实现get方法

function get(url) {
    return new Promise((resolve, rejetct) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);

        xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200) {
                    resolve(this.responseText, this);
                } else {
                    let reason = {
                        code: this.status,
                        response: this.response
                    };
                    reject(reason, this);
                }
            }
        };

        xhr.send();
    });
}

#### 2.实现post方法

```
function post(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('post',url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText), this);
                } else {
                    var reason = {
                        code: this.status,
                        response: this.response
                    }
                }
            }
        };

        xhr.send(JSON.stringify(data));
    });
}
```

## 8.参考文献

[解读Promise内部实现原理](https://juejin.im/post/5a30193051882503dc53af3c#heading-11)

[Promises/A+](https://promisesaplus.com/)

[剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)

[使用Promise封装简单Ajax方法](https://blog.csdn.net/qq_35844177/article/details/75217681)