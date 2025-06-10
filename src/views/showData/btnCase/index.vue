<template>
    <div>
        <div>
            <h3>问题描述</h3>
            <p>
                在日常开发中会涉及到各种按钮请求，测试人员经常怼着一个按钮狂点不止。这样导致很多数据重复提交！
            </p>
            <h4>解决方案</h4>
            <p>1.防抖 => debounce函数</p>
            <p>2.按钮Loading</p>
        </div>

        <el-divider content-position="left">按钮案例</el-divider>
        <el-divider content-position="left">防抖案例</el-divider>
        <el-button @click="handleClick">防抖按钮</el-button>
        <el-divider content-position="left">按钮Loading案例</el-divider>
        <el-button type="primary" :loading="hasLoading" @click="handleClick2"
            >按钮Loading</el-button
        >
        <el-button type="primary" :loading="hasLoading" @click="handleClick2"
            >按钮Loading2</el-button
        >
        <p>如果很多地方要用到提交，是不是每个页面都去写一个loading变量啊！</p>

        <customBtn
            type="primary"
            :onClick="handleClick3"
            label="按钮Loading3"
        ></customBtn>
    </div>
</template>

<script setup>
    import customBtn from './customBtn.vue';
    import { ref } from 'vue';
    const debounce = (fn, delay, immediately = false) => {
        let timer = null;
        let called = false;
        return function (...args) {
            if (immediately && !called) {
                fn.apply(this, args);
                called = true;
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (!immediately) {
                    fn.apply(this, args);
                }
                called = false;
            }, delay);
        };
    };

    const handleClick = debounce(
        () => {
            setTimeout(() => {
                console.log('防抖按钮被点击了');
            }, 1000);
        },
        1000,
        true,
    );

    const hasLoading = ref(false);
    const handleClick2 = () => {
        hasLoading.value = true;
        setTimeout(() => {
            hasLoading.value = false;
            console.log('按钮Loading被点击了');
        }, 2000);
    };

    const handleClick3 = async () => {
        // 模拟异步操作
        // const res = await new Promise(function (resolve, reject) {
        //     setTimeout(function () {
        //         console.log('First');
        //         resolve('success');
        //     }, 2000);
        // });
        const res = await new Promise(resolve => {
            setTimeout(() => {
                resolve('success');
            }, 2000);
        });
        // new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve('success');
        //     }, 2000);
        // });
        // console.log('按钮Loading3被点击了');
        // 这里可以处理异步操作的结果
        // 例如：更新状态、发送请求等
    };
</script>

<style></style>
