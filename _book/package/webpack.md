# webpack

webpack是一个静态模块打包器。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。

## 1.基本概念

现在webpack的最新版本已经是4.x了，经过迭代，现在webpack是高度可配置的。使用webpack之前需要了解四个**核心概念**。

#### 1.入口[entry]

**入口起点指示webpack应该使用哪个模块来作为构建起内部依赖图的开始。**进入入口起点后，`webpack`会找出有哪些模块和库是入口起点（直接和间接）依赖的。

每个依赖项随即被处理，最后输出到称之为`bundles`的文件中。

可以通过在`webpack`配置中配置`entry`属性，来指定一个入口起点（或多个入口起点）。默认值为`./src`。

单入口的写法：

```
const config = {
    entry: './src/main.js'
};

module.exports = config;
```

多入口的写法：

```
const config = {
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
        pageThree: './src/pageThree/index.js'
    }
};
```

#### 2.出口[output]

**output**属性告诉`webpack`在哪里输出它所创建的`bundles`，以及如何命名这些文件，默认值为`./dist`。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。注意：入口可能有多个，但是出口只有一个。

单个入口：

```
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

多个入口：

```
const condig = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname +  '/dist'
    }
};
```

#### 3.loader

**loader**让`webpack`能够去处理那些非`JavaScript`文件（`webpack`自身只理解`JavaScript`）。`loader`可以将所有类型的文件转换为` webpack` 能够处理的有效模块，然后你就可以利用`webpack`的打包能力，对它们进行处理。

本质上，`webpack loader`将所有类型的文件，转换为应用程序的依赖图（和最终的`bundle`）可以直接引用的模块。

在更高层面，在`webpac` 的配置中`loader`有两个目标：

1. `test`属性，用于标识出应该被对应的 `loader` 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 `loader`。

在应用程序中有三种方式使用`loader`:

> 1.配置:在webpack.config.js文件中指定loader(推荐用法)

```
const config = {
    module: {
        rules: [
            {test: /\.css$/, use: [
                {loader: 'style-loader'},
                {loader: 'css-loader',
                 options: {
                     modules: true
                 }}
            ]}
        ]
    }
}
```

> 2.内联 在import语句中指定loader


使用`!`将资源中的`loader`分开。分开的每个部分都相对于当前目录解析。通过`?`来传递参数，下面的`modules`就是`css-loader`的参数。

```
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

> 3.通过CLI使用loader

```
webpack --module-bind jade-loader --module-bind 'css-style-loader!css-loader'
```

这会对`.jade`文件使用`jade-loader`，对`.css`文件使用`style-loader`和`css-loader`。

#### 4.插件[plugins]

`loader`被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。**插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。**

想要使用一个插件，你只需要 `require()` 它，然后把它添加到`plugins`数组中。多数插件可以通过选项(`option`)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用`new`操作符来创建它的一个实例。

配置

由于插件可以携带参数/选项，你必须在`webpack`配置中，向`plugins`属性传入`new`实例。

```
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlwebpackPlugin({
            template: './src/index.html'
        })
    ]
}

module.exports = config;
```

#### 5.模式

通过选择`development` 或 `production` 之中的一个，来设置`mode`参数，你可以启用相应模式下的`webpack`内置的优化。

```
module.exports = {
  mode: 'production'
};
```

## 2.一个完整的配置

```
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 将文件从js中分离
var CommonChunkPlugin = webpack.optimize.CommonChunkPlugin; // 将公共模块抽离合成文件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成替换哈希文件名的HTML
var OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin; // 优化模块的ID分配，用的多的模块ID更小
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; // 压缩JS代码
var cleanWebpackPlugin = require('clean-webpack-plugin'); // 清除文件
var path = require('path');

const config = {
    // 上下文
    context: path.resolve(__dirname, 'src'),
    // 入口
    entry: {
        a: './a.js',
        b: './b.js',
        vendor: ['./c.js', 'd.js']
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash:16].js',
        publicPath: 'https://cdn.example.com/xxx/',
        sourceMapFilename: '[file].map'
    },
    devtool: '#source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        hot: true,
        host: '0.0.0.0',
        port: '8884'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                           loader: 'css-loader',
                           options: {
                              modules: true
                            }
                        }, {
                            loader: 'postcss-loader'
                        }, {
                            loader: 'less-loader'
                        }
                ]
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(woff|woff2|eot)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mintype: 'application/font-woff'
                }
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mintype: 'application/font-woff'
                }
            },
            {
                test: /\.eot$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mintype: 'image/svg+xml'
                }
            }

        ]
    },
    plugins: [
        // 公共模块
        new CommonChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            chunks: ['a', 'b'] // 只使用这些入口chunk
        }),
        // 清除多余文件
        new cleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true, // 打印日志
            dry: false
        }),
        // 设置抽离出的css文件名
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true,
            disable: false,
            allChunks: true
        }),
        // 定义全局变量
        new webpack.definePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        }),
        // 生成HTML文件，资源文件会被set进去
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
        // 热加载组件
        new webpack.HotModuleReplacementPlugin(),
        // 优化模块ID分配
        new OccurrenceOrderPlugin(),
        // 压缩js
        new UglifyJsPlugin(),
    ],
    // 定义不会被打包的依赖
    externals: {
        jquery: 'jQuery',
        react: 'react'
    }
};

module.exports = config;
```

## 3.参考文献

[webpack中文文档](https://www.webpackjs.com/concepts/)

[Webpack 常用配置总结](https://toutiao.io/posts/fiq8wd/preview)