/**
 * created by wuaydream on 20180822
 */

var formatPhone = (phone, n) => {
    phone = phone.toString();
    var head = Math.floor((11-n)/2);
    var tail = 11 - n - head;
    var str = new Array(n+1).join('*');
    str = '$1' + str + '$2';
    var reg = new RegExp( '^(\\d{'+head+'})\\d{'+n+'}(\\d{'+tail+'})$');
    return phone.replace(reg, str);
}

console.log(formatPhone('12345678901', 4)); // 123****8901
console.log(formatPhone('12345678901', 3)); // 1234***8901

