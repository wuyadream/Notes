# Vuejs

Vuejs是一套用于构建用户界面的渐进式框架。

## Vuejs的生命周期

先放一张官方图：

![vue生命周期](../image/vuelife.png)

vue的生命周期中会有很多的钩子函数提供给我们进行操作，分别是：

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforDestroy
- destoryed

#### 1.在beforeCreate和created钩子函数之间的生命周期

在这个生命周期之间，进行了**初始化事件、进行数据的监听**，可以看到created的时候数据已经和data属性进行绑定。此时，this.$el值还是空值，并没有进行初始化。

#### 2.created钩子函数和beforeMount间的生命周期

首先，**会判断对象是否有el选项。如果有的话就继续向下编译，如果没有el选项，则停止编译，也就意味着停止了生命周期**，直到该vue实例上调用vm.$mount(el)。

然后，会接着判断template参数选项：

1. 如果vue实例对象中有template参数选项，则将其作为模板编译成render函数。
2. 如果没有template选项，则将外部HTML作为模板编译。
3. 可以看到template中模块的优先级要高于outer HTML的优先级。

vue需要通过el找到对应的outer template，所以el的判断要在template之前了。

#### 3.beforeMount和mounted钩子函数间的生命周期

此时给vue实例对象添加$el成员，并且替换掉挂载的DOM元素。

#### 4.mounted

挂载vue实例的数据到html中。将占位符替换为data中的内容。

#### 5.beforeupdate和updated钩子之间的生命周期

当vue实例的data发生数据改变时，会触发组件重新渲染，先后调用`beforeupdate`和`updated`钩子函数。在这个生命周期内，会根据vue实例上的data来更新dom展示的值。

#### 6.beforeDestroy和destroy钩子函数间的生命周期

在这段时间内，会把vue实例销毁，解绑与vue实例绑定的东西，移除事件监听器，所有的子实例也会被销毁。

## 双向数据绑定实现原理

实现数据绑定的方法主要有三种：

1.发布-订阅者

这种模式是通过订阅事件、发布事件来实现数据和视图的绑定的。`backbone.js`就是使用这种方式实现的。

2.脏值检查

`angularjs`是通过脏检查的方式对比数据是否有变更，决定是否更新视图。

3.数据劫持

vuejs则是采用数据劫持结合发布-订阅的方式来实现双向绑定的。通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

Vuejs数据绑定的具体步骤：

1、实现Observer
将需要观察的数据对象进行递归遍历，包括子属性对象的属性，都通过`defineProperty`劫持属性的`setter`和`getter`方法。实现一个消息订阅器，维护一个订阅者的数组，数据变动触发`notify`，再调用订阅者的`update()`方法。

2、实现Complie
complie解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。

3、实现Watcher
Watcher订阅者是`Observer`和`Compile`之间通信的桥梁。它主要的工作是将指令绑定的数据添加订阅，接收属性变化的通知，调用`update()`方法，触发`Compile()`绑定的回调，实现视图更新。

4、实现MVVM
MVVM作为数据绑定的入口，整合`Observer`、`Complie`和`Watcher`三者，通过`Observer`来监听自己的`model`数据变化，通过`Compile`来解析模板指令，最终利用`Watcher`搭起`Obersve`r和`Complile`的桥梁。

## virtual DOM

virtual DOM是对DOM操作进行优化的一种方案，频繁操作DOM是对性能的极大浪费。虚拟DOM使用js来完成这些频繁操作来降低性能损耗。它使用简单对象存储dom的一些关键参数，dom值的改变都暂时写进虚拟DOM。在改变dom之前，会先比较虚拟dom的数据，如果需要改变，才会将改变应用在真实dom上。这样就能仅使用一次dom操作反应出一段时间间隔内发生的所有dom变化。

## 组件data为什么必须是函数

因为组件可以复用，每个实例都需要维护一份私有的data，所以需要每个组件都return一个新的data对象。如果共享data，各实例间会互相影响。

## 组件通信间如何通信

父子组件通信机制：父组件通过Prop向子组件传递数据，子组件通过emit事件向父组件发送信息。
父子组件和父孙通信：provide/inject(2.2.0新增， 主要为高阶插件/组件库提供用例)。
复杂情况: Vuex

## 怎么动态添加组件

- is
- render

## vue-loader

vue-loader是一个webpack的loader，可以把vue组件转化成JavaScript模块。

特性：

- 允许Vue组件使用其他的webpack loader，例如对`<style>`使用`Sass`和对`<template>`使用Jade;
- 对vue文件中的自定义节点使用loader进行处理;
- 把`<style>`和`<template>`中的静态资源当做模块来对待，并使用`webpack loader`进行处理;
- 模拟出每个组件的CSS作用域；
- 支持开发阶段的热重载。

## Vue SSR基本原理

SSR(服务器端渲染),服务器生成html发送到客户端，客户端接管html并将其挂载到DOM上。服务器渲染的优点：

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
- 缩短请求和渲染的时间，特别对于缓慢的网络情况或运行缓慢的设备。

缺点：
- 开发条件的限制，浏览器的特定代码只能在生命周期钩子函数使用。
- 构建部署需要nodejs server环境。
- 更多的服务器端负载。

Nuxt.js 支持SSR的Vuejs通用应用框架。

## 对Vue.js的template编译的理解

template首先会被编译成抽象语法树、经过generate得到render函数，render的返回值是VNode。

## vuex

`Vuex`是一个专为`Vue.js`应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

`Vuex`也集成到`Vue`的官方调试工具`devtools extension`，提供了诸如零配置的`time-travel`调试、状态快照导入导出等高级调试功能。

当我们应用需要**多个组件共享状态**时，单向数据流的简洁性很容易被破坏，通过传参的方式来通信会非常地繁琐。Vuex把共享状态提取出来集中管理，形成一颗状态树。

## Vue I18n的原理

在Vue组件上注册i18n实例，使用指令绑定的形式动态更新。

## Vue Router的原理

1.hash+hashchange事件
2.pushState()+popstate事件

todo..

[vue-router原理剖析](https://juejin.im/post/5b08c9ccf265da0dd527d98d)

## 参考资料

[你应该要知道的Vue.js](https://github.com/Alvin-Liu/Blog/issues/13)