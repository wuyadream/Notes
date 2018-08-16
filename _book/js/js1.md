# JavaScript必知必会(一)

## 1.原生js实现路由

前端路由，是指随着浏览器地址栏的变化，展示给用户的页面也不相同。

传统的网页根据用户访问的不同地址，浏览器从服务器获取对应页面内容展示给用户。这样造成服务器压力比较大，而且用户访问速度也会比较慢。在这种场景下，单页面应用出现了。

单页面应用，就是只有一个页面，用户访问一个网址，服务器返回的页面也只有一个。地址栏内容改变显示不同页面由前端路由来实现。

我们通过读取`location.hash`和监听`hashchange`事件来实现路由。

首先定义一个Router对象:

```
function Router() {
    this.currentUrl = '';
    this.routes = {};
}

Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () {};
}

Router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
}

Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
```

然后创建一个实例：

```
var route = new Router();
route.init();
route.route('/', changeContent.bind(null, '/'));
route.route('/route1', changeContent.bind(null, '/route1'));
route.route('/route2', changeContent.bind(null, '/route2'));

function changeContent(text) {
    var el = document.getElementById('hash');
    el.innerHTML = text;
}
```

对应的html为：

```
        <ul>
            <li><a href="#/">/</a></li>
            <li><a href="#/route1">/route1</a></li>
            <li><a href="#/route2">/route2</a></li>
        </ul>
        <h4>路由是：</h4>
        <h4 id="hash"></h4>
```

上面就实现了不同路由展示不同的内容。支持浏览器的前进和后退，很好地解决了前后端分离的问题。

## 2.原生js实现对象属性监听器

可以使用`defineProperty`来实现对象属性的监听。`defineProperty`是ES5属性，大部分的使用场景都没有问题。现在首先来看看它的用法：

```
Object.defineProperty(obj, prop, descriptor)
```

各参数的作用分别是：

`obj`是需要定义属性的那个对象。

`prop`是需要被定义或者修改的属性名。

`descriptor`是定义属性`prop`的描述。

下面来详细看看`descriptor`的各属性可以做什么。

> value 设置属性的值

```
var bob = {};
Object.defineProperty(bob, 'name', {
    value: 'bob'
});

console.log(bob.name); // bob
bob.name = 'Bob';
console.log(bob.name); // 依旧是bob
```

在代码中，我们定义了bob的一个属性name，value为bob。然后试着给name属性赋值Bob，却发现属性没有发生变化。这是为什么？原来只有把`writable`修饰符设置为`true`时，这个属性才能被修改。

> writable 当该属性为true时，该属性的才会被赋值运算符改变。默认为false。

```
var bob = {};
Object.defineProperty(bob, 'name', {
    value: 'bob',
    writable: true
});

console.log(bob.name); // bob
bob.name = 'Bob';
console.log(bob.name); // Bob
```
依然是上面的例子，这次成功修改了bob的name属性。

> enumerable 设置该属性是否是可枚举类型。默认为false。

只有`enumerable`属性设置为`true`时，这个属性才可以用`for(prop in obj)`和`Object.keys()`枚举出来。

```
Object.defineProperty(bob, 'age', {
    value: 18,
    enumerable: true
});

Object.defineProperty(bob, 'math', {
    value: 98,
    enumerable: false
});

for(prop in bob) {
    console.log(prop); // age
}

console.log(Object.keys(bob)); // [age]
```

上面的代码为bob添加了两个属性，一个是可枚举属性age，一个是不可枚举属性math。

> configurable 该属性决定了对象的属性是否可以被删除，以及除writable外的其他特性能不能被修改；并且修改writable时只能修改为false。

```
Object.defineProperty(bob, 'English', {
    value: 80,
    configurable: false
})

Object.defineProperty(bob, 'English', { // 报错
    writable: true
});

Object.defineProperty(bob, 'English', { // 不报错
    writable: false
});

delete bob.English; // 属性不可以被删除

console.log(bob.English); // 80
```

> get 给属性提供的getter方法，如果没有getter则返回undefined，该方法返回值被用作属性值。

> set 给属性提供的setter方法,该方法接受唯一参数，并将该参数的新值分配给该属性。

`get`和`set`属性不能和`value`和`writable`属性一起出现，否则会报错。

```
bob.weight = '45kg';
var weight = bob.weight;

Object.defineProperty(bob, 'weight', {
    enumerable: true,
    get: function () { 
        console.log('读取体重啦');
        return weight;
     },
    set: function (newValue) {
        console.log('监听中...体重改变啦');
        console.log('set: '+newValue);
        weight = newValue;
    }
});

console.log(bob.weight); // 读取体重啦 45kg
bob.weight = '50kg';
console.log(bob.weight); // 监听中...体重改变啦 set: 50kg
```

在上面的代码中，我们为bob的`weight`属性添加了`set`和`get`方法，现在读取和修改属性时都会打印出提示文字。注意，为什么需要一个中间变量`weight`来保存`weight`属性值。因为如果我们直接在`get`或`set`方法里访问`bob.weight`，则又会触发`wegiht`的`get`方法，会导致程序陷入死循环中。

介绍完`defineProperty`的用法，属性对象监听器的写法就呼之欲出啦。我们只需要重写对象属性的set方法，就可以在对象的属性发生变化时调用我们设置的回调函数了。我们来完成一个函数，实现对对象属性的监听。

```
// 定义一个属性监听器
function addPropertyListener(obj, prop, callback) {
    if(obj.hasOwnProperty(prop)) {
        var  value = obj[prop];
        Object.defineProperty(obj, prop, {
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (newValue) {
                value = newValue;
                callback && callback(newValue);
            }
        })
    }
    return false;
}

// 测试一下我们的监听器
bob.height = '182cm';

addPropertyListener(bob, 'height', function(value) {
    console.log('设置身高：'+value);
    console.log('bob.height='+bob.height);
});

bob.height = '160cm'; // 设置身高：160cm  bob.height=160cm
```

我们的监听器已经实现好了，其实，`defineProperty`非常强大，vuejs的数据绑定也是基于该方法实现的。

## 3、参考文献

[原生 js 实现前端路由](https://juejin.im/entry/5887833d8d6d81006cf781b4)

[理解JavaScript的Object.defineProperty()函数](https://segmentfault.com/a/1190000006178220)

