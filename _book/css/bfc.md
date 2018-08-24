# BFC（Block Formatting Context）

## BFC(块级格式化上下文)

> 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的块级格式化上下文。
> 
> 在一个块级格式化上下文里，盒子从包含块的顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。两个相邻的块级盒子的垂直外边距会发生叠加。
>
> 在块级格式化上下文中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

只有`Block-level box`(display:block|table)可以参与创建BFC， 它规定了内部的Block-level Box如何布局，并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素。

> BFC特性：

1.内部的Box会在垂直方向，从顶部开始一个接一个地放置。
2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加。
3.每个元素的`margin box`的左边， 与包含块`border box`的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4.BFC的区域不会与`float box`叠加。
5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
6.计算BFC的高度时，浮动元素也参与计算。

## 产生BFC

> 1.如何触发BFC：

```
1.float 除了none以外的值
2.overflow 除了visible 以外的值（hidden，auto，scroll）
3.display (table-cell，table-caption，inline-block, flex, inline-flex)
4.position值为（absolute，fixed）
5.fieldset元素
```

## 什么时候使用BFC

> 1.解决margin叠加的问题

两个div垂直叠放，上一个div的margin-bottom会和下一个div的margin-top叠在一起，导致两个div的间隔小于设置的margin之和。要解决这个问题，可以给叠加的元素添加一个父元素，让它触发FBC。

> 2.用于布局

就是元素的左外边距会触碰到包含块容器的做外边框，就算存在浮动也会如此。利用BFC不与浮动盒子叠加的给叠加的元素设置BFC父元素，让其不与浮动元素叠加。

> 3.用于清除浮动，计算BFC高度

利用BFC的第六条特性：计算BFC的高度时，浮动元素也参与计算。如果想要计算浮动元素的高度，可以将父元素设置为BFC元素。

## 参考文献

[CSS之BFC详解](http://www.html-js.com/article/1866)