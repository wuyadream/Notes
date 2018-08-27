# 图片懒加载

## 1.懒加载

**图片懒加载即延迟加载。**

当访问一个页面的时候，先把`img`元素的路径替换为占位图。只有当图片出现在现在浏览器的可视区域内时，才设置图片的真正路径，让图片显示出来，这就是图片懒加载。

## 2.懒加载原理与实现

> 原理

页面中的`img`元素，如果没有`src`属性，浏览器就不会发出请求去下载图片，只有设置了图片路径，浏览器才会发送请求。

懒加载的原理就是先在页面中把所有的图片统一使用一张占位符进行占位，把真正的路径保存在元素的`data-\*`属性上，需要用到的时候取出来设置`src`。

## 3.懒加载实现过程

#### 1.html 结构

```
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<img class="imgLazyLoad" data-src="http://office.qq.com/images/title.jpg" />
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```

其中，`img`标签的`data-src`属性上面保存着我们后面需要动态加载的图片地址，初始化图片没有设置`src`(也可设置为占位图地址)。

#### 2.js 代码

js是重头戏，来一步步完成。

> 1.首先把代码封装到自执行函数里面，也就是：

```
(function(){})();
```

这么做的主要原因是生成一个新的执行上下文环境，防止里面的变量污染全局环境。

> 2.声明变量

- `imgList` 保存所有图片节点的数组
- `delay` 防抖函数的时间间隔
- `offset` 设置图片距离可视区域多远时加载的距离

> 3.监听`scroll`事件，执行防抖函数

```
function imgLoad(selector) {
    var _selector = selector || '.imgLazyLoad';
    let nodes = document.querySelectorAll(_selector);
    imgList = Array.apply(null, nodes);
    window.addEvenetListener('scroll', debounce(loadImg, delay), false);
}
```

> 4.声明防抖函数

```
function debounce(fn, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}
```

函数防抖的目的是防止因短时间内多次触发回调事件而导致的浏览器掉帧、性能下降的问题。

函数防抖的原理是设置一个执行间隔，如果该执行间隔内再次调用函数则重新计时，直到满足一个完整的间隔内没有调用此函数的条件，那么此函数被执行。

> 5.加载图片

```
function loadImg() {
    for(let i=0; i < imgList.length; i++) {
        if(isShow(imgList[i])) {
            imgList[i].src = imgList.getAttribute('data-src');
            imgList.splice(i, 1);
            i--;
        }
    }
}
```

将判断出需要加载的图片对象 `src`置为`data-src`的值，同时在`imgList`中删掉该对象，避免重复加载。

> 6.判断图片是否显示

```
function isShow(el) {
    let coords = el.getBoundingClientRect(); // 返回元素在可视窗口内的坐标
    let clientHeight = (document.documentElement.clientHeight || window.innerHeight) + parseFloat(offset);
    return (coords.left >=0 && coords.top <= clientHeight);
}
```

当图片出现在浏览器可视窗口内时展示图片。

> 7.执行代码：

组合上面的代码后，最后执行的代码为：

```
(function () {
    var imgList = [], delay=350, offset=50;

    // 入口函数，通过选择器获得imgList，调用loadImg()加载函数
    function imgLoad(selector) {
    var _selector = selector || '.imgLazyLoad';
    let nodes = document.querySelectorAll(_selector);
    imgList = Array.apply(null, nodes);
    window.addEvenetListener('scroll', debounce(loadImg, delay), false);
    }

    // 防抖函数，控制函数执行频次
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var context = this;
            var args = arguments;
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }

    // 加载图片
    function loadImg() {
        for(let i=0; i < imgList.length; i++) {
            if(isShow(imgList[i])) {
                imgList[i].src = imgList.getAttribute('data-src');
                imgList.splice(i, 1);
                i--;
            }
        }
    }

    // 判断元素是否在可视区域
    function isShow(el) {
        let coords = el.getBoundingClientRect(); // 返回元素在可视窗口内的坐标
        let clientHeight = (document.documentElement.clientHeight || window.innerHeight) + parseFloat(offset);
        return (coords.left >=0 && coords.top <= clientHeight);
    }

    imgLoad('.imgLazyLoad');
})();
```

## 4.参考文献

[懒加载和预加载](https://www.jianshu.com/p/4876a4fe7731)

[web 前端图片懒加载实现原理](https://juejin.im/entry/594a483061ff4b006c12cea1)
