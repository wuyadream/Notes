# 移动端开发技巧

## 1.点击300ms延迟

由于移动端支持双击放大，所以在用户碰触页面之后，需要等待一段时间来判断是不是双击动作，等待的这段时间大约是300ms。

> 解决方案一：设置viewport标签

如下设置便可以消除延迟：

```
<meta name="viewport" content="width=device-width;initial-scale=1.0;user-scalable=no">
```

> 解决方案二：使用fastclick

`fastclick`通过检测手指点击时的`touchstart`事件和`touchend`事件之间的移动距离来判断滚动还是点击，通过DOM自定义事件，立即触发一个模拟`click`事件，并把浏览器在300ms之后真正触发的`click`事件阻止掉。

> 解决方案三：使用css禁用双击缩放功能

```
html {
    touch-action: manipulation; /* 只允许进行滚动和持续缩放操作 */
}
```

## 2.移动端点击穿透问题

问题现象：点击mask蒙层上的关闭按钮，蒙层消失后触发了按钮下面元素的click事件。

> 解决方案一：只用touch

最简单、完美的解决方案。

把页面所有的click全部换成touch事件，需要特别注意a标签，它的href也是click，需要去掉换成js控制跳转。

> 解决方案二： 使用fastclick

引入`fastClick.js`之后需要在`body`上实例化`FastClick`,并全部监听`clic`k事件。

```
/* 在document.body实例化FastClick */
if(document.addEvenetListener) {
    document.addEvenetListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false)
}
```

## 3.移动端滚动穿透问题

移动端当有`fixed`蒙层遮罩时，在屏幕上滑动能够滑动背景下的内容，这就是滚动穿透问题。

解决方案原理：禁用body的滚动条，由于滚动条的位置会丢失，所以需要在展示弹窗之前保存滚动条的位置，隐藏弹窗时恢复滚动条的位置。

首先定义class来禁用滚动条

```
.modal-open {
    position:fixed;
    height: 100%;
}
```

然后完成保存并恢复滚动条的工作：

```
/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');
```

然后在弹出层显示时调用`ModalHelper.afterOpen()`，在隐藏弹出层时调用`ModalHelper.beforeClose()`。

## 4.参考资料
