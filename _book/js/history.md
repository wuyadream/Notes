# History Api

HTML5新增的`History API`可以实现无刷新更改地址栏链接，配合`AJAX`可以做到无刷新跳转。

## 1.pushState(stateObj, title, url)

`stateObj`: 状态对象是一个js对象，通过`pushState()`创建新的历史记录条目。无论用户什么时候导航到新状态，`popstate`事件会触发，且该事件的`state`属性包含该历史记录条目状态对象的副本。

`title`: 标题。当前基本上所有浏览器都会忽略这个参数。

`url`: 新的历史`URL`记录。

这个函数会把`url`压入浏览器访问记录。

举个例子：

```
let state = {
    id: 2,
    name: 'profile
};

window.history.pushState(state, 'My Profile', "/profile/");
```

注意`pushState()`绝对不会触发`hashchange`事件，即使新的`URL`与旧的`URL`仅哈希不同也是如此。

## 2.replaceState(stateObj, title, url)

各参数含义与`pushState()`相同，使用也非常相似，区别在于`replaceState()`是修改了当前历史记录项而不是新建一个。但这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录。

`replaceState()`的使用场景在于为了响应用户操作，你想要更新状态对象`state`或者当前历史记录的URL。

举个例子：

假设 `http://mozilla.org/foo.html` 执行了如下`JavaScript`代码：

```
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html"); 
```
然后，假设`http://mozilla.org/bar.html`执行了如下 `JavaScript`：

```
history.replaceState(stateObj, 'page 3', 'bar2.html');
```

这将会导致地址栏显示`http://mozilla.org/bar2.html`，但是浏览器并不会去加载`bar2.html` ,甚至都不需要检查 `bar2.html` 是否存在。

假设现在用户重新导向到了`http://www.microsoft.com`，然后点击了回退按钮。这里，地址栏会显示`http://mozilla.org/bar2.html`。假如用户再次点击回退按钮，地址栏会显示`http://mozilla.org/foo.html`，完全跳过了`bar.html`。

## 3.popstate事件

当用户点击浏览器前进、后退按钮时，就会触发`popstate`事件。可以监听该事件做出反应：

```
window.addEventListener('popstate', function(e) {
    var state = e.state; // 该state对象是pushState或ReplaceState时注入的stateObj
    // ...
})
```

## 4.应用：全站AJAX，并使浏览器能够抓取AJAX页面

假设一个页面左侧是若干导航链接，右侧是内容，同时导航时只有右侧的内容需要更新，那么刷新整个页面无疑是浪费的。这时我们可以使用`AJAX`来拉取右面的数据。但是如果仅仅这样，地址栏是不会改变的，用户无法前进、后退，也无法收藏当前页面或者把当前页面分享给他人；搜索引擎抓取也有困难。这时，就可以使用`HTML5`的`History API`来解决这个问题。

思路：首先绑定`click`事件。当用户点击一个链接时，通过`preventDefault()`函数防止默认的行为（页面跳转），同时读取链接的地址（如果有`jQuery`，可以写成`$(this).attr('href')`），把这个地址通过pushState塞入浏览器历史记录中，再利用 AJAX 技术拉取（如果有 jQuery，可以使用$.get方法）这个地址中真正的内容，同时替换当前网页的内容。

为了处理用户前进、后退，我们监听`popstate`事件。当用户点击前进或后退按钮时，浏览器地址自动被转换成相应的地址，同时`popstate`事件发生。在事件处理函数中，我们根据当前的地址抓取相应的内容，然后利用`AJAX`拉取这个地址的真正内容，呈现，即可。

最后，整个过程是不会改变页面标题的，可以通过直接对`document.title`赋值来更改页面标题。

## 5.参考文献

[Manipulating the browser history](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

[HTML5简介（三）：利用 History API 无刷新更改地址栏](https://www.renfei.org/blog/html5-introduction-3-history-api.html)
