/**
 * created by wuyadream on 2018/08/10
 * js实现测试请求接口的耗时
 */

 function requestFile1() {
     var startTimeStamp = new Date().getTime();
     $.get('//g.danale.net/bms/data/v1/dict_region_codes_zh-cn.json', function(result) {
        var timeStamp = new Date().getTime() - startTimeStamp;
        console.log('请求耗时：'+ timeStamp + 'ms'); // 39ms,chrome浏览器展示30ms
    })
}

function requestFile2() {
    console.time('request');
    $.get('//g.danale.net/bms/data/v1/dict_region_codes_zh-cn.json', function(result) {
        console.timeEnd('request'); // 37ms,chrome浏览器展示30ms
    })
}