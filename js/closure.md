# 闭包

闭包，就是能够读取其他函数内部变量的函数，是将函数内外连接起来的一座桥梁。

> 闭包的作用主要有两个:
> 1.读取函数内部的变量
> 2.让变量始终保持在内存中。

下面来看一个闭包：

```
　function f1(){

　　　var n=999;

　　　nAdd=function(){n+=1}

　　　function f2(){
　　　　　alert(n);
　　　}

　　　return f2;

　　}

　var result=f1();

　result(); // 999

　nAdd();

　result(); // 1000
```

在这段代码中，result实际就是闭包f2函数。它运行了两次，一个值是999，第二次是1000。这就证明了，函数f1中的局部变量一直存在于内存中，并没有在f1调用后被清除了。

## 注意事项

使用闭包的时候需要注意：

1.闭包对内存的消耗很大，因为闭包会使得函数中的变量都被保存在内存中。所以不能滥用闭包，可能会造成网页性能问题。解决方法是，在退出函数前，将不使用的局部变量删除。

2.闭包会在父函数外部，改变父函数内部的值。

## 自测题

如果你能理解下面两段代码的运行结果，应该就算能理解闭包的运行机制了。

代码片段一：

```
　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};

　　　　}

　　};

　　alert(object.getNameFunc()()); 
```

答案是`The Window`。

代码片段二：

```
　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};

　　alert(object.getNameFunc()());
```

答案是`My Object`。

## 参考文献

[学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
