# CSS知识点(一)

## css清除浮动

> 当非IE浏览器下，当容器的高度为`auto`，且容器的内容中有浮动(`float`为`left`或`right`)的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

> 清除浮动方法一：使用带`clear`属性的空元素

在浮动元素后使用一个空元素如`<div style="clear:both"></div>`属性即可清除浮动。

> 清除浮动方法二：使用CSS的`overflow`属性

给浮动元素的容器添加`overflow:hidden;`或`overflow:auto;`可以清除浮动，另外在IE6还需要触发`hasLayout`，例如为父元素设置容器宽高或设置`zoom:1`。添加以下样式：

```
.clear {
    overflow: hidden;
    *zoom: 1; // IE6, IE7，触发hasLayout属性
}
```

> 清除浮动方法三：使用邻接元素处理

给浮动元素后面的元素添加clear样式,该元素有内容:

```
.clear {
    clear:both
}
```

> 清除浮动方法四：使用`:after`伪元素(推荐使用)

给浮动元素的容器增加一个类`clearfix`:

```
.clearfix:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
}
.clearfix {
    zoom: 1;
}
```

## position取值

|取值|含义|
|---|---|
|static|默认值，不会被特殊定位，包含在文档流中|
|relative|可以设置`top`、`right`、`bottom`、`left`属性使其偏离正常位置。不会脱离文档流，不影响其他元素|
|fixed|固定定位，相对于视窗来定位，可以设置`top`、`right`、`bottom`、`left`属性来指定元素位置，元素会脱离文档流|
|position|相对于最近的“`positioned`”（非`static`定位）祖先元素定位。如果元素没有“`positioned`”祖先元素，那么它会相对于文档的body定位，元素会脱离文档流|


## z-index不生效的场景有哪些 

> z-index设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是处于堆叠顺序较低元素的前面。注意，z-index仅能在定位元素(relative、fiexed、position)上生效。



## 不定宽高元素垂直水平居中 

## css实现一个占屏幕宽度50%的正方形 

## HSL色彩模型是什么，在CSS中如何使用

## 参考文献

[CSS-清除浮动](https://segmentfault.com/a/1190000004865198)