# JavaScript必知必会(二)

## 1.js阻止事件冒泡及默认事件，兼容IE

#### 1.事件兼容

除IE/Opera外浏览器的事件是`event`,IE/Opera浏览器事件是`window.event`。

#### 2.防止冒泡

w3c的方法是`event.stopPropagation()`,IE则是使用`event.cancelBubble=true`来防止冒泡。所以阻止冒泡的正确写法是：

```
function stopBubble(e) {
    if(e && e.stopPropagtion) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}
```

#### 3.阻止默认行为

w3c的方法是`event.preventDefault()`,IE则是使用`event.returnValue=false`来阻止默认行为。所以阻止默认行为的兼容写法是；

```
function stopDefault(e) {
    if(e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    return false;
}
```

## 2.实现一个jQuery插件

jQuery插件就是用来扩展jQuery原型对象的一个方法，简单来说就是jquery插件就是jQuery的一个方法。那么，编写一个jQuery插件，我们需要注意什么呢？

> 1.给`$.fn`绑定函数，实现插件的代码逻辑；
>
> 2.插件函数最后要`return this;`以支持链式调用；
>
> 3.插件函数要有默认值，绑定在`$.fn.<pluginName>.defaults`上；
>
> 4.用户在调用时可传入设定值以覆盖默认值。

下面我们就是实现一个放大字体的函数`fontLarger()`,默认增加的步长为`2`，也支持用户传入步长值。

```
$.fn.fontLarger = function(options) {
    var opts = $.extend({}, $.fn.fontLarger.defaults, options); // 合并参数
    var fontObj = getFontSize(this);
    this.css('font-size', fontObj.size + opts.step + fontObj.unit);
    return this; // 返回jquery对象支持链式操作
}

$.fn.fontLarger.defaults = { // 默认参数
    step: 2 // 默认步长为2
};

getFontSize = function(el) {
    var size = parseFloat(el.css('font-size'));
    var unit = el.css('font-size').slice(-2);
    return {size: size, unit: unit};
}
```

上面我们就实现了一个简单的jquery插件了，而且用户还可以通过下面的方法修改默认值。

```
$.fn.fontLarger.defaults.step = 3; // 全局修改默认值
```

## 3.js实现测试接口请求耗时

有两种方法可以得到js程序的耗时，第一种方法是记录开始和结束时间戳，然后计算出差值。第二种方法是使用`console.time()`函数定义一个计时器，得到程序执行消耗的时间。

> 法一：使用时间戳获得接口请求耗时

```
     var startTimeStamp = new Date().getTime();
     $.get('http//...', function(result) {
        var timeStamp = new Date().getTime() - startTimeStamp;
        console.log('请求耗时：'+ timeStamp + 'ms');
    })
```

> 法二：使用`console.time()`函数获得接口耗时

```
    console.time('request'); // 定义计时器
    $.get('http//...', function(result) {
        console.timeEnd('request'); // 结束计时器
    })

```

## 4.参考文献

[JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)