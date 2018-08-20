# JavaScript必知必会(四)

## 使用事件委托降低重复的事件绑定

举个例子，如果有一个ul元素，下面有1000个子元素li，每个子元素都需要绑定一个点击事件，应该如何降低重复的事件绑定成本？

使用事件委托的方式，将li元素的点击事件委托给ul元素。

```
var ul = document.getElementsByTagName('ul')[0];
if(ul.addEventListener) {
    ul.addEvenetListener('click', function(e) {
        if(e.target.nodeName.toLowerCase() == 'li') {
            console.log(e.target.innerText);
        }
    }, false) // 第三个参数为false表示在冒泡阶段触发，否则在捕获阶段触发
} else {
    // 兼容IE浏览器,需要注意attachEvent、onclick、srcElement
    ul.attachEvent('onclick', function(e) {
        e = window.event || e;
        var target = e.srcElement;
        if(target.nodeName.toLowerCase() == 'li') {
            console.log(target.innerText);
        }
    })
}
```

## JavaScript内存泄漏

当应用程序不再需要占用内存的时候，由于某些原因，内存没有被回收。JS是一种垃圾回收语言，它会周期性地检查先前分配的你是否可达，帮助开发者管理内存。垃圾回收语言的内存泄漏主要原因是不需要的引用。

现代的垃圾回收器改良了算法，但是本质是相同的：可达内存被标记，其余的被当作垃圾回收。

> 四种常见的JavaScript内存泄漏：

#### 意外的全局变量

```
function a() {
    a = 'hello, world';
}
```

意外创造全局变量却不回收会导致内存泄漏，与全局变量相关的增加内存消耗的一个主因是缓存。缓存是为了重用，缓存必须要有一个大小上限才有用。高内存消耗导致缓存突破上限，因为缓存内容无法回收。

#### 被遗忘的计时器或回调函数

计时器回调函数需要计时器停止才会被没收。

事件绑定的回调函数，移除对象时，要移除绑定的事件。现在浏览器可以做到移除不可达对象。

#### 脱离DON节点的引用

有时，保存`DOM`节点内部数据结构很有用。假如你想快速更新表格的几行内容，把每一行`DOM`存成字典（`JSON`键值对）或者数组很有意义。此时，同样的`DOM`元素存在两个引用：一个在`DOM`树中，另一个在字典中。将来你决定删除这些行时，需要把两个引用都清除。

```
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image'),
    text: document.getElementById('text')
};
function doStuff() {
    image.src = 'http://some.url/image';
    button.click();
    console.log(text.innerHTML);
    // 更多逻辑
}
function removeButton() {
    // 按钮是 body 的后代元素
    document.body.removeChild(document.getElementById('button'));
    // 此时，仍旧存在一个全局的 #button 的引用
    // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。
}
```

#### 闭包

闭包是`JavaScript`开发的一个关键方面：匿名函数可以访问父级作用域的变量。

## 自定义事件

```
// 创建事件
var evt = new CustomEvent('customEvent', {
    'detail': {
        'name': 'linda'
    }
})

// 在元素上监听
el.addEventListrener('customEvent', function(e) {
    console.log('custiom trigger');
    console.log(e.detail);
}, false);

// 触发事件
el.dispatchEvent(evt);
```

## 实现发布-订阅者模式

```
function inArray(arr, target) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i;
		}
	}
	return -1;
}

function Pub() {
	this._sub = {},
	this.subscribe = function(type, callback) {
		this._sub.type = this._sub.type || [];
		if (inArray(this._sub.type, callback) < 0) {
			this._sub.type.push(callback);
		}
    },
    this.unsubscribe = function(type, callback) {
        if(!this._sub.type) {
            return false;
        }
        var index = inArray(this._sub.type, callback);
        if(index >= -1) {
            this._sub.type.splice(index, 1);
        }
    },
	this.public = function(type, event) {
        event.type = type;
		if (this._sub.type) {
            this._sub.type.forEach(function(item, index) {
                item(event);   
            });
		}
	}
}

var pub1 = new Pub();

var sale = function(event) {
    console.log('小红,'+event.type +'特卖了，价格为' + event.price);
}

var sale2 = function(event) {
    console.log('小明,'+event.type +'特卖了，价格为' + event.price);
}

pub1.subscribe('sale', sale);
pub1.subscribe('sale', sale2);

pub1.public('裙子', {
    price: 199
});

pub1.unsubscribe('sale', sale);


pub1.public('裙子', {
    price: 199
});
```

## 参考资料

[使用事件委托减低重复的事件绑定](https://blog.csdn.net/fabulous1111/article/details/79006675)

[4类JavaScript内存泄漏及如何避免](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/)