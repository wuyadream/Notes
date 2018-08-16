# Ajax

## XMlHttpRequest对象

XMlHttpRequest是Ajax的基础，所有现代浏览器都支持XMLHttpRequest对象。

创建XMLHttpRequest对象：

```
var xhr;
if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    // IE5,IE6
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
```

## open(method, url, async)

规定请求的类型、URL以及是否异步处理请求。

method：请求的类型；GET或POST
url：文件在服务器的位置
async：true（异步）或false（同步）

## send(string)

将请求发送到服务器。

string：POST请求发送的数据。

## setRequestHeader(header, value)

设置请求的HTTP报文头。

header: 规定头的名称
value：规定头的值

## resopnseText(resopnseXML)

来自服务器的响应。

resopnseText：获得字符串形式的响应数据
resopnseXML：获得XML形式的响应数据

## onreadystatechange事件

当请求发送到服务器时，我们可以通过以下属性来监控请求状态的变化：

|属性|描述|
|---|---|
|onreadystatechange|存储函数，每当readyState属性变化时，就会调用该函数|
|readyState|请求的状态。0：请求未初始化; 1：服务器已建立连接；2：请求已接收； 3：请求处理中； 4：请求已完成|
|status|http协议状态码|

## 请求实例

function getXhr() {
    if(window.XMLHttpRequest) {
        return new window.XMLHttpRequest();
    } else {
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}

#### 1.实现get方法

```
function get(url) {
    return new Promise((resolve, rejetct) => {
        let xhr = getXhr();
        xhr.open('GET',url,true);

        xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200) {
                    resolve(this.responseText, this);
                } else {
                    let reason = {
                        code: this.status,
                        response: this.response
                    };
                    reject(reason, this);
                }
            }
        };

        xhr.send();
    });
}
```

#### 2.实现post方法

```
function post(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = getXhr();
        xhr.open('post',url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText), this);
                } else {
                    var reason = {
                        code: this.status,
                        response: this.response
                    }
                    reject(reason, this);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    });
}
```