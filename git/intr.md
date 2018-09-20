# Git简介

Git一种版本控制工具，常用于多人协作的场景。最早的Git是在Linux上开发的，很长一段时间内，Git只能在Linux和Unix系统上跑，后来被移植到了Windows上，现在已经支持Linux、Unix、Mac和Windows几大平台了。

## 1.创建版本库

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

## 2.添加文件到版本库

```
git add <file>
git commit -m <message>
```

## 3.查看版本库状态

`git status`命令可以查询当前版本库的状态。

`git diff`命令可以查看修改文件的详细信息。

`git log`命令查看已提交记录。

`git reflog`查看每一次的提交命令。

## 4.版本回退

在Git中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`,上上个版本就是`HEAD^^`,向上100个版本自然不能再如此写，写成`HEAD~100`。

```
git reset --hard HEAD^ 回退到上一个版本
git reset --hard commit_id 回退到指定版本
git reflog 查看提交历史，以确定要回到哪个版本
```

## 5.工作区和暂存区

> 工作区

工作区就是电脑里的目录，之前创建的`learngit`文件夹就是一个工作区。

> 版本库

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage的暂存区，还要Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

把文件往Git版本库添加的时候，是分两步执行的：

`git add`命令把把文件修改添加到暂存区；

`git commit`命令把暂存区的所有内容提交到当前分支。、

Git与其他版本管理工具不同的时它追踪并管理的是修改，而不是文件。

## 6.撤销修改

`git checkout --file` 丢弃工作区的修改，让文件回到最近一次`git commit`或`git add`的状态。

`git reset HEAD <file>` 撤销暂存区的修改到工作区。其中，`HEAD`表示最新版本。

## 7.删除文件

删除一个文件，手动删除或使用`rm file`命令即可删除文件，然后使用命令`git rm file`或`git add file`就可以把把对文件的修改移动到暂存区。然后提交到版本库即可。

如果删错文件，版本库里还有可以使用`git checkout --test.txt`命令将工作区的版本替换为版本库里的版本。如果一个文件已经被提交到版本库，那就永远不用担心误删，但是要小心，你只能恢复文件到最新版本，会丢失最近一次提交后你修改的内容。

## 8.远程仓库

Git的远程仓库一般都是一个24小时开机的服务器，供多人协作时提交和拉取代码。

`git remote add origin git@github.com:xxxx`关联远程仓库。

`git push`把本地版本库的内容推送到远程仓库。

`git push -u origin master`关联并推送`master`分支，之后可以使用简化命令。

`git clone`克隆一个本地库。

Git支持多种协议，包括`https`，但`https`速度较慢，而且每次推送都必须输入口令。


## 9.分支管理

分支就像平行世界，互不干扰地进行，在合并分支的时候将一个分支的内容一同写进另一分支。

`git checkout -b <name>` 创建分支并切换到该分支。相当于`git branch <name>`和`git checkout <name>`两个命令。

`git branch`列出所有分支，当前分支前会标记一个`*`号。

`git checkout <name>`切换到某个分支。

`git merge <name>`将指定分支合并到当前分支。

`gti branch -d <name>`删除指定分支。

`git log --graph --pretty=oneline --abbrev-commit`展示分支的合并情况。

> 分支管理策略

通常，Git会使用`Fast forward`模式，在这种模式下，删除分支后，会丢掉分支信息。如果强制禁用`Fast forward`模式，Git会在merge时生成一个新的commit，这样就可以在分支历史上看出分支信息了。在合并分支时，带上`--no-ff`即可禁用`Fast forward`模式。因为合并需要创建一个新的commit，还应该带上`-m`参数，例如：`git merge --no-ff -m "merge no-ff" dev`表示在当前分支合并dev分支。

在实际开发中，应该按照几个基本原则进行分支的管理：

1.`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

2.`dev`分支时用于开发的，即不稳定分支。到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支上发布1.0版本；

3.在实际开发中，团队中每个人都拥有自己的分支，并不时地往`dev`分支上合并即可。在合并的时候加上`--no-ff`参数就可以保留分支历史，而`Fast forward`合并时就看不出来曾经做过合并。

> Bug分支

在Git中，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

`git stash`可以保存工作现场，以后可恢复现场继续工作。

`git stash list`查看保存的工作现场。

`git stash apply`恢复工作区，`git stash drop`删除stash内容。这两句指令也可以用一句达到目的`git stash pop`：恢复工作区并删除stash的内容。

多次使用stash时，恢复的时候，先用`git stash list`查看，然后用命令`git stash apply stash@{0}`恢复指定的stash。

> Feature分支

在开发中，每增加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后删除feature分支。

如果要丢弃一个没有被合并过非分支，可以通过`git branch -D <name>`强行删除。

> 多人协作

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。

`git remote`查看远程库的信息，`git remote -v`显示更详细的信息。

`git push origin <name>`把分支推向远程仓库的指定分支。

`git check -b <name> origin/<name>` 创建本地分支并和远程分支关联，本地和远程分支的名称最好一致。

`git pull`从远程拉取抓取分支。

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <name> origin/<name>`。

> Rebase

Git有一种称为rebase的操作，有人把它翻译成“变基”。把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。

`git rebase`命令可以把本地未提交的分叉提交历史整理成直线，但会修改本地的分叉提交。

rebase的目的是使得我们在查看历史提交变化时更容易，因为分叉的提交需要三方对比。

## 10.解决冲突

当Git无法自动合并时，必须首先解决冲突，解决完冲突后再提交，合并完成。

解决冲突的办法是把Git自动合并失败的文件手动编辑为我们希望的内容，再提交。

`git log --graph`命令可以看到分支合并图。

## 11.标签管理

Git标签是版本库的快照，它其实是指向某个commit的指针，所以，创建和删除标签都是瞬间完成的。在实际开发过程中，发布一个版本时，我们通常先在版本库打一个标签，这就唯一确定了打标签时刻的版本。

`git tag <name>`在当前分支上添加一个标签。

`git tag <name> <commit-id>`为历史提交添加标签。

`git tag`查看标签，标签按照字母顺序排序，并非时间顺序。

`git show <tag-name>`查看标签详细信息。

`git tag -a <name> -m <tag-desc>`创建有说明的标签。

`git tag -d <name>`删除某个本地标签。

`git push origin <name>`推送标签至远程仓库。

`git push origin --tag`一次性推送全部未推送的本地标签。

`git push origin :refs/tags/<name>`删除远程仓库的标签，删除前需先在本地删除。

## 12.自定义Git

`git config --global color.ui true`Git会适当地显示不同的颜色让输出更醒目。

> 忽略文件

使用`.gitignore`文件忽略文件。

`git add -f <file>`强制添加文件至暂存区。

`git check-ignore`可以`.gitignore`文件检查写错的规则。

> 配置别名

`git config --global alias.st status`使用`st`表示`status`。

> 配置文件

在配置Git时，如果加上`--global`参数是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。每个仓库的配置文件放在`.git/config`文件中。

## 13.参考文献

[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

