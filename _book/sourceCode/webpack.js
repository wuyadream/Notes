/**
 *  created by wuyadream on 20180814
 */
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