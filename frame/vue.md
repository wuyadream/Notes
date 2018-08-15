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

## 虚拟DOM


