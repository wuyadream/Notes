# flv

flv的全称是Flash Video，即专门给flash播放器提供的播放格式，具有结构简单、清晰的优点。新的video标签不支持flv格式，人们开始把web视频播放的重点放在mp4或者hls上，但是随着直播的兴起，flv迎来的一轮生机。

## 常用直播方案

首先，横向对比一下可用的直播方案：

|协议|http-flv|rtmp|hls|dash|
|----|----|----|----|-----|
|传输层|http|tcp|http|http|
|视频格式|flv|flv tag|Ts文件|Mp4、3gp、web|
|延时|低|低|很高|高|
|数据分段|连续流|连续流|切片文件|切片文件|
|原生video|不支持|不支持|部分支持|极少支持|
|服务器编程难易|简单|一般|一般+|中等|

## flv播放方案

flv的编码格式决定了只需要一个MetaData以及音频Track各自的Header就可以在任意时间点播放，正好满足直播的需求，是理想的解决方案。

下面看一下前端播放flv的过程：

![flv播放过程](../image/flv播放过程.jpg)

从流程图可以看此，flv的播放过程就是从flv中提取元信息、音视频header以及数据，然后转码成fmp4盒子结构，再通过MSE交给video的过程。因为flv是流式结构，数据被拆分成多个tag，可以方便地做数据封装。这意味着，将一段flv tag数据封装成一个独立的moof_mdat盒子对交给MSE处理是很方便的事情。

## 数据加载

数据加载直播和点播两种模式。

#### 点播

针对点播的数据获取，采用Range参数来作为分段的控制参数。如：


```
Request Headers:
Origin: http://xxxx
Range:bytes=100000-3987705
User-Agent:Mozilla/5.0
```

上面的请求表示向服务器请求一个flv文件的100000到3987705个字节的数据，服务器收到响应后需要能够根据Range参数正确返回这段数据。


#### 直播

直播的方式和点播不同，直播的过程是推流->服务端格式编码->终端播放的一个过程。这样的话，我们不可以像点播时加载数据了，因为服务器实际上保存的是一个文件流，不断有数据推送到服务器，播放器也不存在缓存一段数据的情况，而是不断向服务器请求，只要新的流到达服务器，播放器就要拿到这一段进行解码播放，达到推流和拉流同步进行的一个直播效果。为了实现这种效果，在播放器内，使用fetch+streanReader，简单实现如下：

```
function resolve(reader) {
    reader.read().then(result => {
        callback(result.done ? undefined : result.value);
        resolve(reader);
    });
}
fetch(config).then(res => {
    const reader = res.body.getReader();
    resolve(reader);
});
```

我们通过一个reader递归地从流里面读取数据，再将数据交给解码器处理。


## 播放时跳转

播放时点击进度条跳转是