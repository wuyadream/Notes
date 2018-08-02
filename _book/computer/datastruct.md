# 数据结构

## 哈希表

哈希表也叫散列函数，它对不同的输入值得到一个固定长度的消息摘要。理想的哈希函数对于不同的输入应该产生不同的结果，同时散列结果应当具有同一性和雪崩效应。

在js中，object属性的实现就是hash表，因此只要在object上简单封装方法，就可以使用object管理实现高效的hashtable了。

```
function HashTable() {
    var size = 0;
    var entry = new Object();

    this.add = function (key , value) {
        if(!this.containsKey(key))
        {
            size ++ ;
        }
        entry[key] = value;
    }

    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    this.remove = function ( key ) {
        if( this.containsKey(key) && ( delete entry[key] ) )
        {
            size --;
        }
    }

    this.containsKey = function ( key ) {
        return (key in entry);
    }

    this.containsValue = function ( value ) {
        for(var prop in entry)
        {
            if(entry[prop] == value)
            {
                return true;
            }
        }
        return false;
    }

    this.getValues = function () {
        var values = new Array();
        for(var prop in entry)
        {
            values.push(entry[prop]);
        }
        return values;
    }

    this.getKeys = function () {
        var keys = new Array();
        for(var prop in entry)
        {
            keys.push(prop);
        }
        return keys;
    }

    this.getSize = function () {
        return size;
    }

    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}
```

## 队列

队列是FIFO的有序集合，新增加的元素放在队尾，要移除的元素在队列的顶部。

```

```

## 栈

## 链表

## 平衡二叉树

## 参考文档

[哈希表(hashtable)的javascript简单实现](https://www.cnblogs.com/hyl8218/archive/2010/01/18/1650589.html)
