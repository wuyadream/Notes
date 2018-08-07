# 原型链与继承

## 原型链

#### 概念

ECMAScript只支持实现继承，是依靠原型链来实现的。

> 每个构造函数（constructor）都有一个原型对象（prototype），原型对象都包含一个指向构造函数的指针，而实例（instance）都包含一个指向原型对象的内部指针。当试图引用对象（实例instance）的某个属性，会首先在对象内部寻找该属性，如果找不到，会在对象的原型（`instance.__proto__`）里去找这个属性。j

如果让原型对象指向另一个类型的实例，那么有趣的事情就发生了。

即：`constructor1.prototype = instance2`。其中`instance2`是`constructor2`的一个实例。

此时，我们生成一个实例 `instance1 = new constructor1();`。然后尝试在instance1中查找某个属性`p`：

1.首先，程序会在`instance1`内部属性查找一遍。

2.接着会在`instance1.__proto__(constructor1.prototype)`中查找一遍，而`constructor1.prototype`实际是`instance2`，也就是会在`instance2`的内部属性中查找`p`。

3.如果`instance2`也没有内部属性`p`，程序会继续在`instance2.__proto__(constructor2.prototype)`中寻找，如果还没有找到，会一直向上寻找，直至`Object`的原型对象。

> 搜索轨迹：`instance1-->instance2-->constructor2.prototype...-->Object.prototype`

这种搜索的轨迹，形似一条长链，又因为`prototype`在查找中充当链接的作用，于是把这种实例与原型的链条叫做**原型链**。

可以通过`instanceOf`操作符和`isPrototypeOf()`方法可以判断实例和原型的关系。

`instanceOf`操作符，只要是原型链中出现过的构造函数，结果都会返回true。

`isPrototypeOf()`只要是原型链中出现过的原型，结果都会返回true。

#### 原型链的问题

然而，原型链并不完美，它有以下两个问题：

> 问题一：当原型链中包含引用类型值的原型时，该引用类型值会被所有的实例共享。

> 问题二：在创建子类型时，不能向超类型的构造函数中传递参数。

为此，实践中很少单独使用原型链，通常会有采取其他方法来弥补原型链的不足。

## js继承的方式与实现

## 参考文献

JavaScript高级程序设计

[详解JS原型链与继承](http://louiszhai.github.io/2015/12/15/prototypeChain/)