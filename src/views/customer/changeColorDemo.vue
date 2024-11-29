<template>
    <div class="aaa">
        <button @click="change">切换按钮</button>
        <div class="content">文字内容展示</div>
    </div>
</template>

<script setup>
    import { ref, reactive, toRefs, onMounted } from 'vue';
    const flag = ref(false);
    onMounted(() => {
        window.document.documentElement.setAttribute('data-theme', 'light'); // 进入页面默认颜色
    });
    const change = () => {
        // 切换按钮
        flag.value = !flag.value;
        if (flag.value) {
            window.document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            window.document.documentElement.setAttribute('data-theme', 'light');
        }
    };
</script>

<style lang="scss" scoped>
    @import '@/styles/handle.scss';
    .aaa {
        width: 500px;
        height: 500px;
        // background_color对应handle.scss 文件中的属性，'bg-color' 对应theme.scss中的属性
        @include background_color('bg-color');
        @include font_color('font-color');
    }
</style>
