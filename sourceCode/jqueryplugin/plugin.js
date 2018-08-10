/**
 * created by wuyadream on 2018/08/10
 * 实现一个简单的jquery插件放大字体
 */

$.fn.fontLarger = function(options) {
    var opts = $.extend({}, $.fn.fontLarger.defaults, options);
    var fontObj = getFontSize(this);
    this.css('font-size', fontObj.size + opts.step + fontObj.unit);
    return this; // 返回jquery对象支持链式操作
}

$.fn.fontLarger.defaults = { // 默认参数
    step: 2
};

getFontSize = function(el) {
    // console.log(el.css('font-size'));
    var size = parseFloat(el.css('font-size'));
    var unit = el.css('font-size').slice(-2);
    return {size: size, unit: unit};
}

function clickBtn(target) {
    // console.log(target);
    var el = $(target);
    el.fontLarger({step:3});
}