# JavaScript必知必会(二)

## js阻止事件冒泡及默认事件，兼容IE

#### 事件兼容

除IE外浏览器的事件是event,IE浏览器事件是window.event。

#### 防止冒泡

w3c的方法是event.stopPropagation(),IE则是使用event.cancelBubble=true来防止冒泡。所以阻止冒泡的正确写法是：

```
function stopBubble(e) {
    if(e && e.stopPropagtion) {
        e.stopPropagtion();
    } else {
        window.event.cancelBubble = true;
    }
}
```

## 实现一个JQuery插件

## js实现测试接口请求耗时

## 参考文献