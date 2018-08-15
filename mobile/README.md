# 移动端开发

## 1.viewport标签

移动端开发，第一件事就是设置`viewport`，`viewport`是专为手机浏览器设计的一个meta标签。

> 1.为什么要使用`viewport`？

有些屏幕很小的智能机，分辨率却可以做得很大，比如小米4的分辨率是1920*1080，比许多电脑桌面还要大，传统桌面网站直接放在手机上阅读时，桌面就会显得非常小，阅读体验非常差。需要一种将原始视图在手机上放大的机制，使用`viewport`标签就可以解决这个问题。

```
<meta name="viewport" content="width=device-width,initial-scale=1">
```
`width=device-width`表示此宽度不依赖原始像素，而依赖屏幕宽度。

`initial-scale=1`表示初始缩放比例是1。

此外，`viewport`还有几个属性：

|属性名|属性含义|
|--|--|
|maximum-scale|允许缩放的最大比率|
|minimum-scale|允许缩放的最小比率|
|user-scalable|是否允许手动缩放,值为0表示不允许缩放|

## 2.统一浏览器样式

在移动端各个浏览器展示的风格不尽相同，需要统一设置。

使用`normalize.css`,它在默认的HTML元素样式上提供了跨浏览器的高度一致性。

`normalize`相比之前 `cCSS Reset` 方案，有以下优点：

保护有用的默认样式、一般化的样式、修复浏览器自身的bug、优化css可用性。

`normalize.css`对HTML5元素、排版、列表、嵌入的内容、表单和表格都进行了一般化。尽管这个项目基于一般化的原则，但我们还是在合适的地方使用了更实用的默认值。

## 3.布局方案-rem布局

`rem`是`CSS3`新引入的单位，在pc端可能会有兼容的问题，对移动端比较友好。简而言之就是通过动态设置`html`根元素的`fontsize`，等比缩放元素大小来自适应移动设备。

> 方案原理：

1. 根据设备的dpr(设置像素比，比如`dpr=2`时，表示1个css像素由2*2个物理像素点组成)动态设置html的`font-size(50*dpr)`。
2. 根据设备的dpr调整页面的缩放值`(1/dpr)`，进而达到高清的效果。

> 方案代码

```
'use strict';

/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
const win = window;
export default win.flex = (normal, baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  const scale = normal ? 1 : 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
  doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
};

flex(false,100,1); // 默认1rem=100px
```

> 方案优势

- 引用简单，布局方便
- 根据设备屏幕的dpr自动设置最合适的高清缩放
- 保证了不同设备下视觉体验的一致性
- 解决了1px问题

> 如何使用

`rem`只适用于固定尺寸（其他布局依靠百分比和flex来完成），此方案默认`1rem=100px`，所以布局的时候可以完全按照设计师给你的效果图(640或750)写各种尺寸啦。

比如你在效果图上的一个按钮元素长55px 宽37px，可以直接这样写样式：

```
.btn {
    width: 0.55rem;
    height: 0.37rem;
}
```

## 4.图片方案

> 对于`<img>`标签引入的图片高清解决方案

1.使用`srcset`属性

`srcset`是HTML5新提供的`img`属性，可以指定一系列用户代理可能使用的图像，浏览器会根据屏幕大小决定展示的图片。

```
<img src="mdn-logo-sm.png" 
      alt="MDN" 
      srcset="mdn-logo-HD.png 2x">
```

`src属性时1x候选项。`

2.使用js异步加载图片

```
<img id=img data-src1x="xxx@1x.jpg data-src2x="xxx@2x.jpg" data-src3x="xxx@3x.jpg"/>
```

```
var dpr = window.devicePixelRatio;
if(dpr >3) {
    dpr = 3;
}
var imgSrc = $('#img').data('src'+dpr+'x');
var img = new Image();
img.src = imgSrc;
img.onload = function(imgObj) {
    $('#img').remove().prepend(imgObj); // 替换img对象
}
```

> 对于背景图片的高清解决方案

1.使用`media query`来处理

```
/* 普通屏(设备像素比率小于等于1)使用1倍图 */
.img {
    background-image: url(img_1x.png);
}

/* 高清显示屏(设备像素比率大于等于2)使用2倍图 */
@media only screen and (-webkit-min-device-pixel-ratio:2) {
    .img {
        background-image: url(img_2x.png);
    }
}

/* 高清显示屏(设备像素比率大于等于3)使用3倍图 */
@media only screen and (-webkit-min-device-pixel-ration:3) {
    .img {
        background-image: url(img_3x.png);
    }
}
```

2.使用`image-set`来处理(存在兼容问题)

```
.image {
    background-image: url(1x.png); /* 不支持image-set的情况下显示 */
    background: -webkit-image-set(
        url(1x.png) 1x, /* 支持image-set的浏览器的普通屏幕下 */
        url(1x.png) 2x, /* 支持image-set的浏览器的2倍Retina屏幕 */
        url(1x.png) 3x, /* 支持image-set的浏览器的3倍Retina屏幕 */
    )

}
```

## 5.1px问题

什么是1px问题？

> 高度为1px的一条线，在手机上看着很粗？

因为这个1px，在某些设备上(比如 iphone5s, dpr=2)，就是用了横竖都是2的物理像素矩阵(即 2X2=4 个物理像素)来显示这个1px，导致在这个设备上，这条线看起来很粗。

1.使用CSS3的`scaleY(0.5)`来解决问题

比如：解决div的`border-top`的1px问题

```
@media only screen and (-webkit-min-device-pixel-ratio:2) {
    div:before {
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
    }
}
```

但是这种方法只能解决直线的问题，涉及圆角之类的就无能为力了。

2.页面缩放解决问题

将`initial-scale`设置为`1/dpr`,那么1px就能展示成1X1的像素矩阵了。(具体实践方法前面已经提到)

## 6.横竖屏显示问题

1.js检测横竖屏

js获取屏幕旋转方向：`window.orientation`

- 0 正常方向
- -90 屏幕顺时针旋转90度
- 90 屏幕逆时针旋转90度
- 180 屏幕旋转180度

检测代码如下：

```
window.addEvenetListener('onorientationchange' in window : 'orientationchange': 'resize', function() {
    if(window.orientation == 190 || window.orientation == 0) {
        console.log('竖屏状态');
    }
    if(window.orientation == 90 || window.orientation == -90) {
        console.log('横屏状态');
    }
}, false);
```

2.css判断横竖屏

```
@media screen and (orientation: portrait) {
    /*竖屏*/
}

@media screen and (orientation: landscape) {
    /*横屏*/
}
```

也可以写在同一个文件里通过`link`标签的`media`来筛选：

```
<link rel="stylesheet" media="all and (orientation: portarit)" href="portrait.css">

<link rel="stylesheet" media="all and (orientation: landscape)" href="landscape.css">
```

## 7.参考资料

[什么是Viewport Meta（width详解）及在手机上的应用](http://ourjs.com/detail/54c73ba2232227083e00001a)

[手机端页面自适应解决方案—rem布局进阶版](https://www.jianshu.com/p/985d26b40199)

[移动端H5解惑-页面适配](https://github.com/sunmaobin/sunmaobin.github.io/issues/28)