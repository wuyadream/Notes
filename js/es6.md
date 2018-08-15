# ES6

> ECMAScript 6.0（以下简称 ES6）是2015 年 6 月正式发布的 JavaScript 语言标准。它的目标是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为**企业级开发语言**。 下面就来介绍几个ES6的新特性。

## 1.块级作用域的`let`和`const`

`let`用来声明变量，用法类似于`var`,改变的是`let`声明的变量只在声明的代码块中有效。

```
{
    let a = 10;
    var b = 1;
}
a // error
b // 1
```

`const`是一个只读常量，一旦声明，常量的值就不能被改变，其作用域同`let`一样，也是块级作用域。

```
const PI = 3.1415;
PI // 3.1415

PI = 3; // error
```

修改一个常量的值会报错。

## 2.解构赋值

> ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

数组的结构赋值是这样的：

```
let [a, b, c] = [1, 2, 3];
a // 1
b // 2
c // 3
```

本质上，这是一种`模式匹配`。只要等号两边的模式相同，左边的变量就会被赋予对应的值。如果结构不成功则变量的值为`undefined`。

```
let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [foo] = [];
foo // 结构不成功，值为undefined
```

对象的解构赋值：和数组稍有不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

解构的出现让很多操作变得容易起来。

> 交换变量的值

```
let x = 1;
let y = 2;

[x, y] = [y, x];
```

> 提取JSON数据

```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

> 函数参数的默认值

```
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

## 3.默认参数

ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

```
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```

这个方法在多数情况下是适用的，但是当传入的y是一个false值时，则会被认为没有传入参数。例如：

```
log('Hello', 0); //  Hello World，传入的参数0失效
```

ES6允许为函数的参数设置默认值，即直接写在参数定义后面。

```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

## 4.箭头函数

简单使用：

```
var f = v => v;

等同于
var f = function(v) {
    return v;
}
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。 

```
var f = () => 5;
// 等同于
var f = function () { return 5 };
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。 

```
var sum = (num1, num2) => {
    return num1 + num2;
}
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。 

```
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

箭头函数体内的`this`对象，就是**定义时所在的对象，不再是使用时所在的对象。**

```
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

## 5.模板表达式和多行字符串

在ES5中，如果想要拼接字符串和变量需要这样写：

```
var age = 18;
var str = 'I am ' + age + ' years lod';
```

ES6提供了新语法-在反引号包裹的字符串中，使用${NAME}引入变量。那拼接字符串可以这样写：

```
var str = `I am ${age} years old`;
```

同时，反引号包裹的字符串还支持换行。

```
var str = `I am ${age} years old, 
and my name id Linda`;

// 等同于
var str = 'I am ' + age + ' years lod' +
'and my name id Linda';
```
##  6.Promise对象

`Promise`是异步编程的一种解决方案，最早由社区提出来并实现。简单来说，`Promise`是一个容器，里面保存着某个未来才会结束的事件结果，它具有以下两个特点：

- 状态不收外界影响，只有异步操作的结果可以决定其状态，其他任何操作都无法改变这个状态。
- 一旦改变状态，就不会再改变了。任何时候都可以得到这个结果。

`Promise`也有一些缺点：

- 无法取消`Promise`,一旦新建就会立即执行，无法中途取消。
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
- 当处于`penging`状态时无法得知目前进展到了哪一个阶段。

创建一个`Promise`实例：

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});

// 也可写作下面这样(推荐写法)
promise.then(function(value) {
  // success
}).catch(function(err) {
    // error
});
```

## 7.Class定义类

在之前，生成实例对象的传统方法是通过构造函数，但这种写法跟传统的面向对象语言差异很大。ES6提供了更接近传统语言的写法，引入了`class`关键字，用来定义类。

```
//ES5写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// ES6写法
class Point {
    constructor(x,y) {  // 构造函数
        this.x = x;
        this.y = y;
    }
    toString() { // 定义类的方法时，不需要加上function关键字，方法之间也不需要逗号分隔
        return `(${this.x},${this.y})`;
    }
}
var p = new Point(1,2);
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。 

```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

Class可以通过`extends`关键字实现继承。

```
class ColorPoint extends Point { // ColorPoint继承Pointl类
    constructor(x, y, color) {
        super(x,y); // 调用父类的constructor方法
        this.color = color;
    }
    toString() {
        return this.color + '  ' + super.toString();
    }
}
```

上面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。 

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。 

## 8.模块（module）体系

ES6在语言标准的层面上实现了模块功能，设计思想是尽量地静态化，使得编译时就能确定模块的依赖关系以及输入和输出的变量。模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。 

#### export命令

一个模块是一个独立的文件，外部无法获取文件内部的变量。如果希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。基本语法如下：

```
// profile.js

// 输出变量
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 输出变量的另一种写法
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

// 输出函数和类
export function multiply(x, y) {
  return x * y;
};
```

最后，`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，`import`命令也是如此。 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。 

#### import命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。 

```
// main.js
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```
import { lastName as surname } from './profile.js';
```

注意，`import`命令具有提升效果，会提升到整个模块的头部，首先执行。 由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。 

不想指定模块名称时可使用`export default`命令，为模块指定默认输出。

```
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```



