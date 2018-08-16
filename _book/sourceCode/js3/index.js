/**
 *  created by wuyadream on 2018/08/10
 */

 // 1.数组去重
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

arr = [NaN, NaN, 0, '0', null, null, 2, 'hello', '2', 3, '3', undefined, undefined];
// console.log(unique(arr));

// 2.查找出重复次数前n名的字符
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
    console.log(string);
    for(i=0; i<n; i++) {
        console.log('top'+(i+1) + ':' + arr[i].char + ',出现次数：' + arr[i].count);
    }
}

// topChar('dbiuwehfbcduibfa2', 3);
//topChar('msmsmskskskmeeq', 3);
// topChar('cnapjwpencp/c.s<', 3);

// 3.交换字符串
function exchange(str1, str2) {
    str1 = {
        a: str1,
        b: str2
    }
    str2 = str1.a;
    str1 = str1.b;
}

// 4.随机生成长度为n的字符串，字符串取值[0-9][a-z][A-Z]
/*   ASCII码：  
     0-9 48-57
     A-Z 65-90
     a-z 97-122 
*/
function getStr(n) {
    function getChar() {
        var n = Math.floor(Math.random()*62); // 向下取整
        if(n < 10) {
            return n; // 0-9       
        } else if (n < 36) {
            return String.fromCharCode(n+55); // A-Z
        } else {
            return String.fromCharCode(n+61); // a-z
        }
    }
    var str = '';
    for(var i=0; i<n; i++) {
        str += getChar();
    }
    return str;
}

console.log(getStr(100));
