/**
 *  created by wuyadream on 2018/08/08
 *  js继承方式集合
 */

 // 1.借用构造函数-在子类型的构造函数的内部调用超类型构造函数
 function Father() {
    this.colors = ['green', 'blue', 'red'];
    this.sayHello = function() {
        console.log('father hello');
    }
}

function Son() {
    Father.call(this); // 继承Father，并且支持向父类构造函数传递参数
}

var instance1 = new Son();
instance1.colors.push('black');
console.log(instance1.colors); // ['green', 'blue', 'red', 'black]
instance1.sayHello(); // father hello

var instance2 = new Son();
console.log(instance2.colors); // ['green', 'blue', 'red']

// 2.组合继承
function Father(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Father.prototype.sayName = function() {
    console.log(this.name);
}

function Son(name, age) {
    Father.call(this, name); // 继承实例属性，第一次调用Father()
    this.age = age; 
}

Son.prototype = new Father(); // 继承父类方法，第二次调用Father()
Son.prototype.sayAge = function() {
    console.log(this.age);
}

var instance1 = new Son('louis', 5);
instance1.colors.push('black');
console.log(instance1.colors); // ['red', 'blue', 'green', 'black']
instance1.sayName(); // louis
instance1.sayAge(); // 5

var instance2 = new Son('zhang', 10);
console.log(instance2.colors); // ['red', 'blue', 'green', 'black']
instance2.sayName(); // zhang
instance2.sayAge(); // 10

// 3.原型继承
function object(o) { // 先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。
    function F() {};
    F.prototype = o;
    return new F();
}

var person = {
    friends: ['Van', 'Louis', 'Nick']
};

var anotherPerson = object(person);
anotherPerson.friends.push('Rob');
var yetAnotherPerson = object(person);
yetAnotherPerson.friends.push('Style');
console.log(person.friends); //  ["Van", "Louis", "Nick", "Rob", "Style"]


var person = {
    name: 'Louis'
}

var anotherPerson = Object.create(person, {
    name: {
        value: 'Rob'
    }
}); 

console.log(anotherPerson.name); // Rob


// 4.寄生式继承
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function createAnother(original) {
    var clone = object(original); // 通过调用object函数创建一个新对象
    clone.sayHi = function () { // 以某种方式增强这个对象
        console.log('hi');
    }
    return clone; // 最后返回这个对象
}

var person = {
    name: 'bob'
};

anotherPerson = createAnother(person);
console.log(anotherPerson.name); // bob
anotherPerson.sayHi(); // hi


 // 5.寄生组合式继承
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function extend(subClass, superClass) {
    var prototype = object(superClass.prototype); // 创建对象
    prototype.constructor = subClass; // 增强对象
    subClass.prototype = prototype; // 指定对象
}

function Father(name) {
    this.name = name;
}

Father.prototype.sayName = function () {
    console.log(this.name);
}

function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

extend(Son, Father);

Son.prototype.sayAge = function() {
    console.log(this.age);
}

var instance1 = new Son('Lious', 20);
instance1.sayName(); // Lious
instance1.sayAge(); // 20

// 5.1 扩展寄生组合式继承

function extend(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    if(superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

function Father(name) {
    this.name = name;
}

Father.prototype.sayName = function () {
    console.log(this.name);
}

function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

extend(Son, Father);

Son.prototype.sayAge = function() {
    console.log(this.age);
}

var instance1 = new Son('Lious', 20);
instance1.sayName(); // Lious
instance1.sayAge(); // 20 


// 6.ES6 class继承
class Father {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

class Son extends Father {
    constructor(name, age) {
        super(name); // 需先调用父类型的构造函数
        this.age = age;
    }

    sayAge() {
        console.log(this.age);
    }
}

var instance1 = new Son('Lious', 20);
instance1.sayName(); // Lious
instance1.sayAge(); // 20
