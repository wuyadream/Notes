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

## 参考资料

[使用事件委托减低重复的事件绑定](https://blog.csdn.net/fabulous1111/article/details/79006675)