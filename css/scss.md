# `SCSS`

`SCSS`发源于`Sass`，意思是`Sassy CSS`。这是`sass`官方为了对CSS开发者友好，试图弥合`Sass`和`CSS`之间的鸿沟而推出的全新语法。它的语法只是加了变量、嵌套规则、混入和导入等功能的CSS，熟悉CSS的开发者可以很快开始编码而不需要很长的学习时间。

下面来介绍`SCSS`的详细语法：

## CSS扩展

#### 嵌套规则

`SCSS`允许将一个CSS样式嵌套进另一个样式中，内层样式仅适用于外层样式的选择器范围内。例如：

```
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

编译为:

```
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }
```

这样有助于避免选择器重复，相对于复杂的CSS布局中的多层嵌套选择器要简单得多。

#### 引用父选择器:&

需要直接使用嵌套外层的父选择器时，可以直接使用&字符来明确地表示插入指定父选择器。例如：

```
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```

编译为：

```
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```

`&`将替换为呈现在CSS文件中的父选择器。这意味着，如果你有一个多层嵌套的规则，父选择器将在被`&`替换之前完全分解。

`&`必须出现在的选择器的开头位置，但可以跟随后缀，将被添加到父选择的后面。例如：

```
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```

编译为：

```
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```

#### 嵌套属性

CSS中有一些属性遵循相同的‘命名空间’；比如，`font-family`,`font-size`,和`font-weight`都在`font`命名空间中。`SCSS`为此提供了一个快捷方式：只需要输入一次命名空间，然后再其内部嵌套紫属性。`SCSS`提供`:`来定义命名空间，例如：

```
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

编译为：

```
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

## SassScript

除了普通的CSS属性的语法，`Sass`支持一些扩展，名为`SassScript`。`SassScript`允许属性使用变量，算术和额外功能。`SassScript`可以在任何属性值被使用。

#### 变量: `$`

像下面这样定义一个变量：

```
$width: 5em;
```

然后再属性中引用他们：

```
#main {
  width: $width;
}
```
变量仅在它定义的选择器嵌套层级的范围内可用,定义变量的时候可以后面带上`!global`标志，在这种情况下，变量在任何地方可见。

**由于历史原因，变量名（以及其他所有Sass标识符）可以互换连字符和下划线。例如，如果你定义了一个名为`$main-width`，您可以使用`$main_width`访问它，反之亦然。**

#### 函数@

`SCSS`可以使用`@`符号定义函数，如下例所示：

```
@function double ($number){
    @return $number*2;
}
.text9{
    font-size:double(20px);

```

#### 插值: #{}

通过`#{}`插值语法在选择器和属性名中使用`SassScript`变量：

```
$name: foo;
    $attr: border;
p.#{$name} {
      #{$attr}-color: blue;
}
```

编译为：

```
p.foo {
  border-color: blue; }
```

它也可以使用`#{}`插值语句把`SassScript`插入到属性值中。在大多数情况下，这种做可能还不如使用直接变量来的方便，但使用`#{}`意味着靠近它的运算符都将被视为纯CSS，可以避免各种运算。

## 运算

#### 除法`/`

将`/`解析为除法三种情况。这些涵盖了绝大多数当做除法的案例。它们是：

- 如果该值，或值的任何部分，存储在一个变量中或通过函数返回。
- 如果该值是由括号括起来的，除非这些括号是在一个列表（`list`）外部，并且值是括号内部。
- 如果该值被用作另一个算术表达式的一部分。

例如：

```
p {
  font: 10px/8px;             // 原生的CSS，不作为除法
  $width: 1000px;
      width: $width/2;            // 使用了变量, 作为除法
  width: round(1.5)/2;        // 使用了函数, 作为除法
  height: (500px/2);          // 使用了括号, 作为除法
  margin-left: 5px + 8px/2px; // 使用了 +, 作为除法
  font: (italic bold 10px/8px); // 在一个列表（list）中，括号可以被忽略。
}
```

编译为：

```
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; 
}
```

#### 减法`-`

遵循下面的规则安全地使用`-`：

- 减法的时候，总是在`-`两侧保留空格。
- 当表示一个负数和一个一元负运算符时，在`-`前面加一个空格，后面不加空格。
- 在一个空格隔开的list列表中，你可以将一元负运算符使用括号括起来，比如`10px (-$var)`中。

#### 颜色运算

所有算术运算都支持颜色值，颜色值的运算是分段进行计算的，也就是，依次计算红（red），绿（green），以及蓝（blue）的成分值。例如：

```
p {
  color: #010203 + #040506;
}
```

编译为：

```
p {
  color: #050709; }
```

#### 字符串运算

`+`运算符可用于连接字符串。 **如果带引号的字符串被添加到不带引号的字符串中（也就是说，带引号的字符串在`+`的左侧），那么返回的结果是带引号的字符串。同样，如果一个不带引号的字符串添加到带引号的字符串中（不带引号的字符串在`+`的左侧）那么返回的结果是一个不带引号的字符串。** 例如：

```
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```

编译为：

```
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

#### 布尔运算

支持的布尔运算有`and`,`or`和`not`运算。

#### 圆括号

圆括号可以影响运算的优先级。

## @规则和指令

`SCSS`支持所有的CSS3的@规则以及一些其他特定的Sass指令。

#### @import

允许使用`@import`导入`SCSS`或Sass文件。被导入的全部`SCSS`或`Sass`文件将一起合并到同一个CSS文件中。

#### @media

`SCSS`中的`@media`指令的行为与CSS中一样，只是增加了一点额外的功能：它们可以嵌套在CSS规则。如果一个`@media`指令出现在CSS规则中，它将会冒泡到样式表的顶层，并且包含规则内所有的选择器。例如：

```
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

编译为：

```
.sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .sidebar {
      width: 500px; } }
```

`@media`的查询（queries）也可以相互嵌套。这些查询（queries）在编译时，将会使用`and`操作符号结合。

#### @extend

设计一个页面常常会遇到这种情况：当一个class含有另一个class的所有样式，并且它自己的特定样式。处理这种最常见的方法是在HTML同时使用一个通用样式类和特殊样式类。但是这会带来记忆成本，导致意外的错误。

`@extend`可以避免这些问题，告诉`SCSS`一个选择器的样式应该继承另一选择器。例如：

```
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

编译为：

```
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```

## 控制指令和表达式

#### `@if`

`@if`指令可以控制判断流程。如果`@if`表达式返回值不为`false`或者`null`，那么后面的花括号中的内容就会返回。

```
p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 < 3      { border: 2px dotted; }
  @if null       { border: 3px double; }
}
```

编译为：

```
p {
  border: 1px solid; }
```

`@if`语句后面可以跟多个`@else if`语句和一个`@else`语句。 如果`@if`语句失败，`SCSS`将逐条尝试`@else if`语句，直到有一个成功，或如果全部失败，那么会执行`@else`语句。

#### `@for`

`@for`指令重复输出一组样式。对于每次重复，计数器变量用于调整输出结果。该指令有两种形式：`@for $var from <start> through <end>` 和 `@for $var from <start> to <end>`。注意关键字`through`和`to`的区别。`$var`可以是任何变量名，比如`$i`;`<start>` 和 `<end>`是应该返回整数的`SassScript`表达式。当`<start>`比`<end>`大的时候，计数器将递减，而不是增量。

`@for`语句将设置`$var`为指定的范围内每个连续的数值，并且每一次输出的嵌套样式中使用`$var`的值。对于`from ... through`的形式，范围包括`<start>`和`<end>`的值，但`from ... to`的形式从`<start>开`始运行，但不包括`<end>`的值。

使用`through`语法：

```
@for $i from 1 through 3 {
      .item-#{$i} { width: 2em * $i; }
}
```

编译为：

```
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

#### @each

`@each`指令通常格式是`@each $var in <list or map`>。`$var`可以是任何变量名，像`$length`或者`$name`，和`<list or map>`是一个返回列表（`list`）或`map`的`SassScript`表达式。例如：

```
@each $animal in puma, sea-slug, egret, salamander {
      .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
  }
}
```

编译为：

```
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

## 混入指令

混入指令可以实现代码复用的功能。混入(mixin)通过`@mixin`指令定义。在它后面跟混入的名称和任选的`arguments`（参数），以及混入的内容块。

```
@mixin text6 {
    height:50px;
    left:20px;
}
.text6M{
    @include text6;
}
//这里的mixin就是定义一个可以复用的代码段，当然我们也可以给它传递一个参数，就像这样一样：
@mixin text66($height){
    height:$heigth;
    left:20px;
}
.text6N{
    @include text66(100px);

```

## 参考文献

[Sass (3.4.21) 中文文档](http://www.css88.com/doc/sass/)

[SCSS语法介绍](https://blog.csdn.net/wangcuiling_123/article/details/78239486)