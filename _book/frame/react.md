# React

React作为目前最流行三大前端框架之一,作为一个前端，了解其设计思想和使用方式是很重要的。

## JSX

在react中推荐使用JSX来描述用户界面，它是一种JavaScript的语法扩展，在JavaScript内部实现。

使用时需要注意以下几点：

- 在JSX中js表达式需要包含在大括号里。
- JSX可以在`if`和`for`语句中使用，赋值给变量，当做参数传入，作为返回值都可以。
- 使用引号来定义以字符串为值的属性，使用大括号来定义以js表达式为值的属性。
- JSX的标签是可以嵌套的，如果是闭合的标签，需要在结尾处使用`/>`。
- React DOM使用小驼峰命名来定义属性名称，class变成了className。
- JSX自带方注入攻击。

从本质上讲，JSX只是为React.createElement(component, props, ...children)方法提供的语法糖。

## 组件

组件可以将UI切割分成些独立、可复用的不减，这样你就只需专注于构建每一个单独的部件。

定义组件时需注意：
- 组件的名称必须以大写字母开头。
- 组件不能修改props。
- 组件之间的数据流是自顶向下或单向数据流。任何状态始终由某个特定组件所有，并且从该状态导出的任何数据或UI只能影响树种下方的组件。

## 事件处理

React元素的事件处理和DOM元素的处理有一点语法上的不同：

- React事件绑定属性采用驼峰写法，而不是小写。
- 使用JSX语法时，传入一个函数作为事件处理函数，而不是一个字符串。
- 不能通过返回`false`阻止默认行为，只能调用`preventDefault`。

传统的HTML:

```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React元素的写法：

```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

## 列表的Keys

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。一个元素的Keys最好是在这个列表中拥有一个独一无二的字符串。

如何列表需要重新排序的话，不建议使用索引来进行排序，但是这样会导致渲染很慢，这是React的差异算法决定的。

数组元素中使用的Key在其兄弟之间应该是独一无二的。但是并不需要全局唯一，生成两个不同的数组时可以使用相同的键。

## 表单

HTML表单元素本身就保留一些内部状态。在React中，会构造一个处理提交表单并可访问用户输入表单数据的函数。React使用一种称为'受控组件'的技术。

在HTML中，`<input>`,`<textarea>`和`<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。在React中，可变的状态通常保存在组件的状态属性中，并且只能用`setState()`方法进行更新。

## 组合和继承

React具有强大的组合模型，建议使用组合而不是继承来复用组件之间的代码。

下面是几种常见的可以使用组合方式来解决的问题：

#### 包含关系

一些组件不能提前知道它们的子组件是什么。这对于`Sidebar`或`Dialog`这类通用容器尤其常见。对于这类组件，可以使用`children`属性将子元素直接传递到输出。

#### 特殊实例

有时，某些组件可以认为是其他组件的特殊实例。在React中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。

## 使用prop-types进行类型检查

随着应用日渐庞大，你可以通过类型检查捕获大量错误。使用前需要配置特殊的`propTypes`属性：

```
import propTypes from 'prop-types';
class Greeting extends React.Compoment {
  render() {
    return (
      <h1>Hell0, {this.prop.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
当name属性传递了无效值时，JavaScript控制台将会打印出警告。处于性能原因，propTypes只在开发模式下进行检查。

propType不仅可以验证各种类型的传入参数，还可以限制单个子代、设置默认的属性值。

## 参考文献

[React文档](https://react.docschina.org/docs/introducing-jsx.html)






