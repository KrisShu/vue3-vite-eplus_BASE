<template>
    <div>
        <h1>grid展示</h1>
        <div class="grid-container">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
            <div class="grid-item">7</div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss">
    .grid-container {
        width: 800px;
        border-radius: 10px;
        background-color: antiquewhite;
        height: 500px;
        display: grid;
        // grid-template-columns: 100px 100px; //2列
        // grid-template-rows: 100px 100px 100px; //3行

        // 使用 repeat 统一设置值，第一个参数为重复数量，第二个参数是重复值
        // grid-template-columns: repeat(2, 20%); //2列
        // grid-template-rows: repeat(3, 20%); //3行

        //自动填充是根据容器尺寸，自动设置元素尺寸
        // grid-template-columns: repeat(auto-fit, 33.3%);
        // grid-template-rows: repeat(auto-fit, 100px);

        //单位组合 使用 fr 单位设置元素在空间中所占的比例
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(auto-fit, 100px);
        // row-gap: 30px; //行间距
        // column-gap: 30px; //列间距
        gap: 30px; //行间距和列间距统一设置
        // border: 1px solid #ff0808;

        .grid-item {
            // padding: 20px;
            border: 1px solid #ff0808;
            background-color: #aad933;
            background-clip: content-box;
        }
    }
</style>
