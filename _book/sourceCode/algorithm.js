/**
 * created by wuyadream on 2018/08/06
 */

function bubbleSort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (array[j + 1] < array[j]) {
                var temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
    }
}
//bubbleSort(arr);

// 2、选择排序
function selectSort(array) {
    var index;
    for (var i = 0; i < array.length - 1; i++) {
        index = i;
        for (var j = i + 1; j < array.length; j++) {
            if (arr[j] < arr[index]) {
                index = j;
            }
        }
        var temp = array[i];
        array[i] = array[index];
        array[index] = temp;
    }
}
// selectSort(arr);

// 3、插入排序
function insertSort(array) {
    for (var i = 1; i < array.length; i++) {
        var j = i - 1, item = array[i];
        while (j >= 0 && array[j] > item) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = item;
    }
}
// insertSort(arr);


// 4、快速排序
function quickSort(array, left, right) {
    if (left < right) {
        var x = array[right], i = left - 1, temp;
        for (var j = left; j <= right; j++) {
            if (array[j] <= x) {
                i++;
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        quickSort(array, left, i - 1);
        quickSort(array, i + 1, right);
    }

}
// quickSort(arr, 0, arr.length-1);

// 5、归并排序
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