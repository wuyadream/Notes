# 动画

CSS3提供了丰富的样式用以制作动画。下面详解介绍一下这些属性。

## transition

设置语法：

```
transition: property duration timing-function delay;
```

|属性值|描述|可选值|
|---|---|---|
|transition-property|过渡效果CSS属性的名称|属性名称，如width|
|transition-duration|完成过渡效果需要的时间|数值，单位为秒或毫秒|
|transition-timing-function|速度效果的速度曲线|
|transition-delay|过渡效果从何时开始|

其中，timing-function的取值有如下可选项：

|值|描述|
|---|---|
|linear|规定以相同速度开始至结束的过渡效果|
|ease|慢速开始，然后变快，然后慢速结束的过渡效果|
|ease-in|慢速开始的过渡效果|
|ease-in-out|慢速开始和慢速结束的过渡效果|
|cubic-bezier(n,n,n,n)|在cybic-bezier函数中定义自己的值。可能的值是0至1之间的数值。|


目前，各大浏览器已经支持无前缀的transition，所以可以很安全地使用。

并不是所有属性都支持transition，它需要明确知道开始状态和结束状态的具体数值，才能计算出中间状态。而且它不能反复发生，除非一再触发。

## CSS Animation

animation为了解决transition的问题而出现。

设置语法：

```
animation: name duration timing-function delay iteration-count direction;
```

|属性值|描述|
|---|---|
|animation-name|需要绑定到选择器的`keyframe`名称|
|animation-duration|动画花费的时间|
|animation-timing-function|动画的速度曲线|
|animation-delay|动画开始之前的延迟|
|animation-iteration-count|动画的次数|
|animation-direction|是否应该轮流反向播放动画,取值有normal、alternate|

目前，IE 10和Firefox（>= 16）支持没有前缀的animation，而chrome不支持，所以必须使用webkit前缀。

## transform

Transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。

主要属性有：

|属性值|描述|
|---|---|
|none|定义不进行转换。|
|matrix(n,n,n,n,n,n)|定义 2D 转换，使用六个值的矩阵。|
|matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)|定义 3D 转换，使用 16 个值的 4x4 矩阵。|
|translate(x,y)|定义 2D 转换。|
|translate3d(x,y,z)|定义 3D 转换。|
|translateX(x)|定义转换，只是用 X 轴的值。|
|translateY(y)|定义转换，只是用 Y 轴的值。|
|translateZ(z)|定义 3D 转换，只是用 Z 轴的值。|
|scale(x[,y]?)|定义 2D 缩放转换。|
|scale3d(x,y,z)|定义 3D 缩放转换。|
|scaleX(x)|通过设置 X 轴的值来定义缩放转换。|
|scaleY(y)|通过设置 Y 轴的值来定义缩放转换。|
|scaleZ(z)|通过设置 Z 轴的值来定义 3D 缩放转换。|
|rotate(angle)|	定义 2D 旋转，在参数中规定角度。|
|rotate3d(x,y,z,angle)|	定义 3D 旋转。|
|rotateX(angle)|定义沿着 X 轴的 3D 旋转。|
|rotateY(angle)|定义沿着 Y 轴的 3D 旋转。|
|rotateZ(angle)|定义沿着 Z 轴的 3D 旋转。|
|skew(x-angle,y-angle)|定义沿着 X 和 Y 轴的 2D 倾斜转换。|
|skewX(angle)|定义沿着 X 轴的 2D 倾斜转换。|
|skewY(angle)|定义沿着 Y 轴的 2D 倾斜转换。|
|perspective(n)|为 3D 转换元素定义透视视图。|
