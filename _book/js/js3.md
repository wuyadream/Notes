# JavaScript必知必会(三)

## 数组去重

> ES6解法-set

```
Array.from(new Set(arr))
```

> ES5解法-indexOf

indexOf可以返回该元素第一次出现的位置，根据indexOf()返回的值来判断元素是否重复。

此方法无法去重NaN，因为NaN === NaN的值为false。

将两种方法结合的写法如下：

```
function unique(array) {
    if(Set) {
        return Array.from(new Set(array));
    } else {
        var newArray = [];
        for(var i=0; i<array.length; i++) {
            if(newArray.indexOf(array[i]) === -1) {  // 无法去重NaN
                newArray.push(array[i]);
            }
        }
        // 对NaN进行一次过滤
        var flag = false, length = newArray.length;
        for(i=0; i<length; i++) {
            if(typeof(newArray[i]) === 'number' && newArray[i].toString() === 'NaN') {
                if(flag) {
                    newArray.splice(i,1);
                    length = newArray.length;
                    i--;
                } else {
                    flag = true;
                }
            }
        }
        return newArray;
    }
}
```

## 查找字符串中出重复次数前n名的字符并分别统计其次数

实现如下：

```
function topChar(string, n) {
    var map = {}, arr = [];
    for(var i=0; i<string.length; i++) {
        if(typeof(map[string[i]]) == 'undefined') {
            map[string[i]] = 1;
        } else {
            map[string[i]]++;
        }
    }
    for(i in map) {
        arr.push({
            char: i,
            count: map[i]
        });
    }
    arr.sort(function(a,b) {
        return  b.count - a.count;
    });
    for(i=0; i<n; i++) {
        console.log('top'+(i+1) + ':' + arr[i].char + ',出现次数：' + arr[i].count);
    }
}
```

测试如下：
```
topChar('msmsmskskskmeeq', 3);

top1:s,出现次数：5
top2:m,出现次数：4
top3:k,出现次数：3
```

## a、b两个字符串，不借助其他变量，实现a与b交换

> 法一: ES6结构

```
[a,b] = [b,a];
```

> 法二：将a变成对象，存储两个字符串

```
    a = {
        a: a,
        b: b
    };
    b = a.a;
    a = a.b;
}
```

> 法三：利用位运算符优先级

```
a = [b,b=a][0];
```
上面的代码会先执行b=a,然后执行b=a。

## 随机生成长度为n的字符串，字符串取值[a-z][0-9]

## 参考资料