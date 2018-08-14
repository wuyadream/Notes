# CSS知识点(二)

## canvas和svg的区别

1. canvas是HTML5提供的新标签，通过JavaScript来绘制2D图形，绘制的图形是标量图，改变尺寸时则需要重新绘制。因为其是标量图，可以引入或保存为.png或.jpg的图像。不支持事件处理，也不能被引擎抓取，适合做图像密集的游戏。

2. svg的历史要比canvas长十多年，是一个使用XML描述2D图形的语言。其绘制的图像是矢量图，放大不会失真，适合带有大型渲染区域的应用程序，不能引入或保存为.png或.jpg的图像。支持事件处理器，也可以被引擎抓取。复杂度高会减慢渲染速度。

## px、em和rem的区别

#### px

px像素。1px是显示器屏幕上的一个逻辑像素。

#### em

em的值并不固定，它会继承父级元素的字体大小。

#### rem

rem是CSS3新增的一个相对单位(root em, 根em)。使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。

## css精灵的使用及作用

`CSSS Sprites`把多张图片拼合成一张图片，在利用css的`background-image`、`background-repeat`、`background-position`的组合进行背景定位，`background-position`可以用数字精确地定位出背景图片在布局盒子对象位置。CSS精灵适合拼接多张小图片，不适合处理大图片。
```
.sprite {
    background: url("./sprite.png") no-repeat;
    background-size: 200px 200px;
}
.sprite-icon1 {
    height: 20px;
    width: 20px;
    background-position: 0 0;
}
.sprite-icon2 {
    height: 20px;
    width: 20px;
    background-position: -20px 0;
}
```
