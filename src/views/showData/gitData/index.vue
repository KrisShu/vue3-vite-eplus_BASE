<template>
    <div>
        <h1>git相关操作</h1>
        <div>
            <h2>git分支</h2>
            <div>
                <p>查看所有本地分支:</p>
                <p>git branch</p>
            </div>
            <div>
                <p>查看所有远程分支:</p>
                <p>git branch -r</p>
            </div>
            <div>
                <p>创建新分支:</p>
                <p>git branch branch_name</p>
            </div>
            <div>
                <p>创建新分支并自动切换到对应分支:</p>
                <p>git checkout -b branch_name</p>
            </div>
            <div>
                <p>切换分支:</p>
                <p>git checkout branch_name</p>
            </div>
            <div>
                <p>拉取远程分支：</p>
                <p>git fetch origin branch_name</p>
                <p>git pull origin branch_name</p>
            </div>
            <div>
                <p>删除分支:</p>
                <p>git branch -d branch_name</p>
                <p>git branch -D branch_name</p>
            </div>
            <div>
                <p>删除远程分支：</p>
                <p>git push origin --delete branch_name</p>
            </div>
            <div>
                <p>合并分支：</p>
                <p>git checkout 对应的分支名</p>
                <p>git merge 需要合并的分支名</p>
            </div>
            <div>
                <p>提交分支至远程厂库</p>
                <p>git push origin branch_name</p>
            </div>
            <div>
                <h4>git pull</h4>
                <p>
                    git pull 命令用于从远程仓库获取最新的更改并合并到当前分支，
                    它其实是git fetch 和 git merge 的组合。
                </p>
            </div>
            <div>
                <h4>git fetch</h4>
                <p>
                    git fetch
                    命令从远程仓库获取最新的代码到本地，但不会自动合并代码
                </p>
            </div>
            <div>
                <p>
                    ！！！！！！！！！以下内容按实际情况处理！！！不同公司有不同的要求
                </p>
                <p>执行git pull 时会导致git历史混乱</p>
            </div>
            <div>
                <h4>解决方案</h4>
                <p>rebase命令使用</p>
                <p>git pull --rebase</p>
                <div>
                    <p>// git pull默认使用变基操作</p>
                    git config --global pull.rebase true
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>
