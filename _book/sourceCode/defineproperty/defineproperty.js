// value
var bob = {};
Object.defineProperty(bob, 'name', {
    value: 'bob'
});

console.log(bob.name); // bob
bob.name = 'Bob';
console.log(bob.name); // 依旧是bob

// writable
var bob = {};
Object.defineProperty(bob, 'name', {
    value: 'bob',
    writable: true
});

console.log(bob.name); // bob
bob.name = 'Bob';
console.log(bob.name); // Bob

// enumerable
Object.defineProperty(bob, 'age', {
    value: 18,
    enumerable: true
});

Object.defineProperty(bob, 'math', {
    value: 98,
    enumerable: false
});

for(prop in bob) {
    console.log(prop); // age
}

console.log(Object.keys(bob)); // [age]

// configurable
Object.defineProperty(bob, 'English', {
    value: 80,
    configurable: false
})

/* Object.defineProperty(bob, 'English', { // 报错
    writable: true
}); */

Object.defineProperty(bob, 'English', { // 不报错
    writable: false
});

delete bob.English; // 属性不可以被删除

console.log(bob.English); // 80

// get、set
bob.weight = '45kg';
var weight = bob.weight;

Object.defineProperty(bob, 'weight', {
    enumerable: true,
    get: function () { 
        console.log('读取体重啦');
        return weight;
     },
    set: function (newValue) {
        console.log('监听中...体重改变啦');
        console.log('set: '+newValue);
        weight = newValue;
    }
});

console.log(bob.weight); // 读取体重啦 45kg
bob.weight = '50kg';
console.log(bob.weight); // 监听中...体重改变啦 set: 50kgbob.weight = '45kg';

// listener
function addPropertyListener(obj, prop, callback) {
    if(obj.hasOwnProperty(prop)) {
        var  value = obj[prop];
        Object.defineProperty(obj, prop, {
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (newValue) {
                value = newValue;
                callback && callback(newValue);
            }
        })
    }
    return false;
}

bob.height = '182cm';

addPropertyListener(bob, 'height', function(value) {
    console.log('设置身高：'+value);
    console.log('bob.height='+bob.height);
});

bob.height = '160cm';