# 常用算法

数据结构和算法是编程的基础，本节介绍几种常用的排序算法。

## 1、排序算法

> 排序：对一序列对象根据某个关键字排序。

> 评价排序算法的优劣

```
稳定：如果a在b前面，而a=b，排序之后a仍然在b的前面。
内排序：所有的排序操作都在内存完成。
外排序：由于数据太大，因此把数据放在磁盘，而排序通过磁盘和内存的数据传输才能进行。
时间复杂度：一个算法所消耗的时间。
空间复杂度：运行一个程序所需内存的大小。
```

> 排序算法总结

![排序算法](../image/排序算法.jpg)

名词解释：

n:数据规模   k:'桶'的个数  In-place:占用常数内存，不占用额外内存 Out-place:占用额外内存


## 2、冒泡排序

冒泡排序每次比较相邻元素，如果第一个比第二个大，就把它们交换。

> 实现如下：

```
        function bubbleSort(array) {
            for(var i=0; i<array.length; i++) {
                for(var j=0; j<array.length-1-i;j++) {
                    if(array[j+1] < array[j]) {
                        var temp = array[j+1];
                        array[j+1] = array[j];
                        array[j] = temp;
                    }
                }
            }
        }
```


> 算法分析

- 最佳情况：T(n) = O(n)
- 最差情况： T(n) = O(n^2)
- 平均情况: T(n) = O(n^2)

## 3、选择排序

选择排序首先在未排序序列中找到最小元素，存放到排序序列的其实位置，然后，再从剩余末排序元素中继续寻找最小元素，然后放到已排序序列的末尾。

> 实现如下：

```
        function selectSort(array) {
            var index;
            for(var i=0; i<array.length-1; i++) {
                index = i;
                for(var j=i+1; j<array.length; j++) {
                    if(arr[j] < arr[index]) {
                        index = j;
                    }
                }
                var temp = array[i];
                array[i] = array[index];
                array[index] = temp;
            }
        }
```

> 算法分析

 - 最佳情况、最差情况、平均情况均为:T(n) = O(n^2)

## 4、插入排序

插入排序的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从前向后扫描，找到相应的位置插入。插入排序在实现上，通常采用in-place排序，即需要用到O(1)的额外空间，因而在从后向前扫描的过程中，需要把已排序的元素逐步向后挪位，为新元素的插入提供空间。

> 实现如下：

```
        function insertSort(array) {
            for(var i=1; i < array.length; i++) {
                var j = i-1, item = array[i];
                while(j>=0 && array[j]>item) {
                    array[j+1] = array[j];
                    j--;
                }
                array[j+1] = item;
            }
        }
```

> 算法分析

- 最佳情况:T(n) = O(n)
- 最怀情况:T(n) = O(n^2)
- 平均情况: T(n) = O(n^2)

## 5、快速排序

快速排序的基本思想是通过一趟排序将待排序记录分割成独立的两部分，其中一部分记录的关键字比另一部分的关键字小，则可分别对这两部分记录进行排序，已达到整个序列有序。

> 实现如下：

```
        function quickSort(array, left, right) {
            if(left < right) {
                var x=array[right], i=left-1,temp;
                for(var j=left; j<=right; j++) {
                    if(array[j] <= x) {
                        i++;
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
                quickSort(array, left, i-1);
                quickSort(array,i+1,right);
            }

        }
```

> 算法分析：
- 最佳情况: T(n) = O(nlogn)
- 最坏情况: T(n) = O(n^2)
- 平均情况: T(n) = O(nlogn)

## 6、归并排序

归并排序是建立在归并操作上的一种有效排序算法。将已有序的子序列合并，得到完全有序的序列。

> 算法实现

```
        function mergeSort(array) {
            var len = array.length;
            if (len < 2) {
                return array;
            }
            var middle = Math.floor(len / 2);
            var left = array.slice(0, middle);
            var right = array.slice(middle);
            return merge(mergeSort(left), mergeSort(right));
        }
        function merge(left, right) {
            var result = [];
            while (left.length && right.length) {
                if (left[0] <= right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
            while (left.lenghth > 0) {
                result.push(left.shift());
            }
            while (right.length > 0) {
                result.push(right.shift());
            }
            return result;
        }
```

> 算法分析：
- 最佳情况: T(n) = O(n)
- 最坏情况: T(n) = O(nlogn)
- 平均情况: T(n) = O(nlogn)

## 7、二分查找

function binarySearch(target, arr) {
    var start = 0;
    var end = arr.length-1;
    
    while(start < end) {
        var mid = parset((start+end)/2);
        if(arr[mid] === target) {
            return mid;
        } else if(target < arr[mid]) {
            end = mid-1;
        } else {
            start = mid+1;
        }
    }

    return -1;
}

> 算法分析：

- 时间复杂度为: T(n) = O(nlog)

## 8、参考文献

[十大经典排序算法总结](https://juejin.im/post/57dcd394a22b9d00610c5ec8)