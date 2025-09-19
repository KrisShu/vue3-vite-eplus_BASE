<template>
    <div class="aaa">
        <h2>方案一</h2>
        <button @click="change">切换按钮</button>
        <div class="content">文字内容展示 sss</div>
    </div>

    <div class="bbb">
        <h2>
            方案二
            <span style="font-size: 12px">修改的是element的主题色</span>
        </h2>
        <el-button @click="changeColor">切换主题色</el-button>
        <el-color-picker v-model="color" />

        <p class="text">
            字体颜色
            <svg-icon iconClass="data"></svg-icon>
        </p>
        <el-input
            v-model="input"
            style="width: 240px"
            placeholder="Please input"
        />
        <el-button type="primary">按钮</el-button>
        <el-button type="success">按钮</el-button>
        <div class="bgColor"></div>
    </div>
</template>

<script setup>
    import { ref, reactive, toRefs, onMounted } from 'vue';
    import { handleThemeStyle } from '@/utils/theme';
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
    const changeColor = () => {
        const theme = color.value;
        handleThemeStyle(theme);
    };
    const color = ref('#39c3f1ff');
    const input = ref('');
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

    .bbb {
        width: 500px;
        height: 500px;
        border: 1px solid red;
        border-radius: 8px;
    }
    .bgColor {
        background-color: var(--el-color-primary); /* ✅ 使用主题色 */
        width: 100%;
        height: 50px;
    }

    .text {
        color: var(--el-color-primary); /* ✅ 使用主题色 */
    }
</style>
