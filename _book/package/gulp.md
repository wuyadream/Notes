# 1.gulp

gulp是ES5系代码常用的打包工具(当然也可以打包ES6代码)，其易懂的API、强大的插件库基本可以满足各个场景下的打包需求。

## 2.准备工作

1.全局安装gulp

```
npm install --global gulp
```

2.作为项目的开发依赖(devDependencies)安装

```
npm install --save-dev gulp
```

3.在项目根目录下创建一个名为`gulpfile.js`的文件

```
var gulp = require('gulp');
gulp.task('default', function() {
    // 将你默认的任务代码放在这里
})
```

4.运行gulp

```
gulp
```

然后，默认的名为`default`的任务就会被运行。

## 3.gulp API

#### 1.gulp.src(globs [,options])

输出符合所提供的匹配模式(glob)或者匹配模式的数组的文件。将返回stream，该stream可以被piped到别的插件中。

```
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```

参数解释

1.globs

类型：`String`或`Array`

所要读取的glob或者包含globs的数组。

2.options

类型：`Object`

通过 glob-stream 所传递给 node-glob 的参数。除了 node-glob 和 glob-stream 所支持的参数外，gulp 增加了一些额外的选项参数：

3.options.buffer

类型：`Boolean` 默认值为`true`

如果该项被设置为 `false`，那么将会以stream方式返回 `file.contents` 而不是文件buffer的形式。这在处理一些大文件的时候将会很有用。

4.options.read

类型：`Boolean` 默认值为`true`

如果该项被设置为 `false`， 那么 `file.contents` 会返回空值（null），也就是并不会去读取文件。

5.options.base

类型：`String` 默认值：将会加在glob之前

如, 请想像一下在一个路径为 `client/js/somedir` 的目录中，有一个文件叫 `somefile.js` ：

```
gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
```

#### 2.gulp.dest(path[, options])

将pipe进来的流写进文件，并且重新输出所有数据。因此你可以将它pipe到多个文件夹，如果文件夹不存在则会自动创建。

```
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```

文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。

参数解释

1.path

类型：`String` 或 `Function`

文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径。

2.options

类型：`Object`

3.options.cwd

类型：`String` 默认值：`process.cwd()`

输出目录的`cwd`参数，只在所给的输出目录是相对路径时有效。

4.options.mode

类型：`String` 默认值：`0777`

八进制权限字符，用以定义所有在输出目录所创建的目录的权限。

#### 3.gulp.task(name[,deps], fn)

定义一个任务。

```
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
```

参数解释

1.name

类型：`String`

任务的名字，尽量不要使用空格。

2.deps

类型：`Array`

定义该任务依赖的任务数组，这些任务会在当前任务运行之前完成。

注意：确保所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。

3.fn

类型: `Function`

该函数定义任务所要执行的一些操作。通常来说，它会是这种形式；`gulp.src().pipe(someplugin())`。

**异步任务支持**

任务异步执行的写法：

> 接受一个callback

```
// 在 shell 中执行一个命令
var exec = require('child_process').exec;
gulp.task('jekyll', function(callback) {
  // 编译 Jekyll
  exec('jekyll build', function(err) {
    if (err) return callback(err); // 返回 error
    callback(); // 完成 task
  });
});
```

> 返回一个stream

```
gulp.task('somename', function() {
  var stream = gulp.src('client/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
  return stream;
});
```

> 返回一个 promise

```
var Q = require('q');

gulp.task('somename', function() {
  var deferred = Q.defer();

  // 执行异步的操作
  setTimeout(function() {
    deferred.resolve();
  }, 1);

  return deferred.promise;
});
```

注意：task在默认情况下将以最大的并发数执行，也就是说，gulp会一次性运行所有的task并且不会做任何等待。如果你想要创造一个序列化的task队列，并以特定的顺序执行，需要做两件事：

- 给出一个提示，来告知task什么时候执行完毕。

- 再给出一个提示，表示一个task依赖另一个task的完成。

假设现在又两个task，one 和 two，你希望它们按照顺序执行，那么，代码将是：

```
var gulp = require('gulp');

gulp.task('one', function(callback) {
    // do something
    callback(err); // 如果err不是null或undefined,会停止执行，表示执行失败。
});

gulp.task('two', ['one'], function() {
    // do something after finishing one
});

gulp.task('default', ['one', 'two']);
```

#### 4.gulp.watch(glob, [,opts], tasks)

监视文件，在文件发生改动时候做一些事情。它总会返回一个 `EventEmitter` 来触发 `change` 事件。

参数解释

1.glob

类型：`String` Or `Array`

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

2.opts

类型： `Array`

传给[gaze](https://github.com/shama/gaze)的参数。

3.tasks

类型：`Array`

需要在文件变动后执行的一个或者多个通过`gulp.task()`创建的task的名字。

```
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

#### 5.gulp.watch(glob[, opts, cb])

参数解释

1.glob

类型：`String` Or `Array`

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

2.opts

类型： `Array`

传给[gaze](https://github.com/shama/gaze)的参数。

3.cb(event)

类型: `Function`

每次变动需要执行的`callback`。

```
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
callback会被传入一个名为`event`的对象。这个对象描述了所监控到的变动：

event.type

类型：`String`

发生的变动类型：`added`, `changed` 或者 `deleted`。

event.path

类型：`String`

触发该事件的文件的路径。

## 4.常用插件

|插件名|插件作用|插件用法|
|---|---|---|
|gulp-eslint|检查代码格式|eslint()、format()|
|gulp-concat|将文件合并到新文件中|concat()|
|run-sequence|顺序执行gulp的task|runSequence([...])|
|gulp-order|顺序读取文件|order([...])|
|gulp-uglify|压缩js的插件|uglify()|
|gulp-clean-css|压缩css|cleanCSS()|
|gulp-htmlmin|压缩html文件|htmlmin()|
|gulp-imagemin|压缩图片|imagemin()|
|imagemin-pngquant|配合gulp-imagemin使用|use:[imageminPngquant()]|
|gulp-autoprefixer|为css做兼容处理|autoprefixer()|
|gulp-rev|为文件添加hash后缀|rev()|
|gulp-rev-collector|用gulp-rev生成的文件名替换旧的文件名|revCollector()|

## 5.与ES6相关的插件

#### 1.gulp-babel

安装

```
npm install --save-dev gulp-babel babel-core babel-preset-env
```

使用

```
const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);
```

如需使用ES6的新特性，还需要安装transform-runtime插件。

```
npm install --save-dev babel-plugin-transform-runtime
```

使用

```
const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest('dist'))
);
```



