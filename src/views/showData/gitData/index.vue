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
                <p>删除分支:</p>
                <p>git branch -d <分支名称></p>
                <p>git branch -D <分支名称></p>
            </div>
            <div>
                <p>删除远程分支：</p>
                <p>git push origin --delete branch_name</p>
            </div>
            <div>
                <p>提交分支</p>
                <p>git push origin branch_name</p>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>
