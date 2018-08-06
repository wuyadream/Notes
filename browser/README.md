# 浏览器

一个前端开发工程师打交道最多的就是浏览器，本节记录和浏览器相关的知识。

## 1、主流浏览器

|浏览器|内核|前缀|
|--|--|--|
|IE|Trident|-ms-|
|Firefox|Gecko|-moz-|
|Chrome|WebKit|-webkit-|
|Safari|WebKit|-webkit-|
|Opera|Presto|-o-|

针对浏览器前缀的兼容问题，建议在构建项目时使用`autoprefixer`,该工具可以为css补全所有的前缀。
