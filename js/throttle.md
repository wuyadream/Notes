# 函数节流和防抖

## 函数节流

在规定的单位时间内，只能有一次触发事件的回调函数执行，如果在同一单位时间内某事件被触发多次，只能一次生效。**适合大量事件按时间做平均分配触发。**

> 函数实现

```
function throttle(fn, interval) {
    let _lastTime = null;

    return function() {
        let _nowTime =  new Date().getTime();
        if(_nowTime - _lastTime > interval || !_lastTime) {
            fn();
            _lastTime = _nowTime;
        }
    }
}

let fn = () => {
    console.log('boom');
}

setTinterval(throttle(fn,1000),10) // 每1秒打印一个boom
``` 

> 应用场景：

1.游戏中的刷新频率
2.DOM元素拖拽
3.Canvas画笔功能

## 防抖

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。**适合多次时间一次响应的情况。**

> 函数实现

```
function debounce(fn, wait) {
    vr timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, wait);
    }
}

let fn = () => {
    console.log('boom');
}

setTnterval(debounce(fn, 500), 1000) // 第一次在1500ms后触发，之后每1000ms触发一次

setInterval(debounce(fn, 2000), 1000) // 不会触发
```

> 应用场景

1.给按钮加函数防抖防止表单多次提交
2.对于输入框连续输入进行AJAX验证
3.判断scroll是否滑到底部

## 参考文献

[轻松理解JS函数节流和函数防抖](https://juejin.im/post/5a35ed25f265da431d3cc1b1)