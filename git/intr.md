# Git简介

Git一种版本控制工具，常用于多人协作的场景。最早的Git是在Linux上开发的，很长一段时间内，Git只能在Linux和Unix系统上跑，后来被移植到了Windows上，现在已经支持Linux、Unix、Mac和Windows几大平台了。

## 创建版本库

版本库就是仓库(repositort)，可以理解为是一个目录，这个目录下的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都可以追踪，以便任何时刻都可以追踪历史，或者还原某个时刻的版本。

执行以下命令行既可创建一个版本库：

```
$ mkdir learngit
$ cd learngit
$ pwd
/Uers/develop/learngit
$ git init
$ ls -ah
```
`pwd`命令用于显示当前目录。
`ls -ah`用于展示隐藏目录，`.git`目录默认是隐藏的。

## 添加文件到版本库

```
git add <file>
git commit -m <message>
```

## 查看版本库状态

`git status`命令可以查询当前版本库的状态。
`git diff`命令可以查看修改文件的详细信息。
`git log`命令查看已提交记录。
`git reflog`查看每一次的提交命令。

## 版本回退

在Git中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`,上上个版本就是`HEAD^^`,向上100个版本自然不能再如此写，写成`HEAD~100`。

```
git reset --hard HEAD^ 回退到上一个版本
git reset --hard commit_id 回退到指定版本
git reflog 查看提交历史，以确定要回到哪个版本
```

## 工作区和暂存区

> 工作区

工作区就是电脑里的目录，之前创建的`learngit`文件夹就是一个工作区。

> 版本库

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage的暂存区，还要Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

把文件往Git版本库添加的时候，是分两步执行的：

`git add`命令把把文件修改添加到暂存区；

`git commit`命令把暂存区的所有内容提交到当前分支。、

Git与其他版本管理工具不同的时它追踪并管理的是修改，而不是文件。

## 撤销修改

`git checkout --file` 丢弃工作区的修改，让文件回到最近一次`git commit`或`git add`的状态。
`git reset HEAD <file>` 撤销暂存区的修改到工作区。其中，`HEAD`表示最新版本。

## 删除文件

删除一个文件，手动删除或使用`rm file`命令即可删除文件，然后使用命令`git rm file`或`git add file`就可以把把对文件的修改移动到暂存区。然后提交到版本库即可。

如果删错文件，版本库里还有可以使用`git checkout --test.txt`命令将工作区的版本替换为版本库里的版本。如果一个文件已经被提交到版本库，那就永远不用担心误删，但是要小心，你只能恢复文件到最新版本，会丢失最近一次提交后你修改的内容。

## 远程仓库

Git的远程仓库一般都是一个24小时开机的服务器，供多人协作时提交和拉取代码。

`git remote add origin git@github.com:xxxx`关联远程仓库。
`git push`把本地版本库的内容推送到远程仓库。
`git push -u origin master`关联并推送`master`分支，之后可以使用简化命令。
`git clone`克隆一个本地库。

Git支持多种协议，包括`https`，但`https`速度较慢，而且每次推送都必须输入口令。


## 分支管理

分支就像平行世界，互不干扰地进行，在合并分支的时候将一个分支的内容一同写进另一分支。

`git checkout -b <name>` 创建分支并切换到该分支。相当于`git branch <name>`和`git checkout <name>`两个命令。

`git branch`列出所有分支，当前分支前会标记一个`*`号。

`git checkout <name>`切换到某个分支。

`git merge <name>`将指定分支合并到当前分支。

`gti branch -d <name>`删除指定分支。

## 参考文献

[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

