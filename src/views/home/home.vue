<template>
    <div class="home">
        <div id="main1"></div>
        <!-- 数据集 -->
        <div id="main2"></div>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    import * as echarts from 'echarts/core';
    // 引入柱状图图表，图表后缀都为 Chart
    import { BarChart } from 'echarts/charts';
    // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
    import {
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        LegendComponent,
    } from 'echarts/components';
    // 标签自动布局、全局过渡动画等特性
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
    import { CanvasRenderer } from 'echarts/renderers';
    // 注册必须的组件
    echarts.use([
        TitleComponent,
        LegendComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        BarChart,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer,
    ]);
    onMounted(() => {
        init();
        init2();
    });

    /**
     * 在系列中设置数据
     */
    const init = () => {
        // 接下来的使用就跟之前一样，初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main1'));
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例',
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        });
    };

    /**
     *在数据集中设置数据
     * 可以把把数据集（dataset）的行或列映射为系列（series）
     */
    const init2 = () => {
        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', '2012', '2013', '2014', '2015'],
                    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
                ],
            },
            xAxis: [
                { type: 'category', gridIndex: 0 },
                { type: 'category', gridIndex: 1 },
            ],
            yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
            grid: [{ bottom: '55%' }, { top: '55%' }],
            series: [
                // 这几个系列会出现在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                {
                    type: 'bar',
                    seriesLayoutBy: 'row',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                {
                    type: 'bar',
                    seriesLayoutBy: 'row',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                {
                    type: 'bar',
                    seriesLayoutBy: 'row',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                // 这几个系列会出现在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
                {
                    type: 'bar',
                    seriesLayoutBy: 'column',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
                {
                    type: 'bar',
                    seriesLayoutBy: 'column',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
                {
                    type: 'bar',
                    seriesLayoutBy: 'column',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
                {
                    type: 'bar',
                    seriesLayoutBy: 'column',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
            ],
        };
        option && myChart.setOption(option);
    };
</script>
<style lang="scss">
    .home {
        width: 100%;
        height: calc(100vh - 104px);
        background-color: antiquewhite;
    }
    #main1 {
        background-color: burlywood;
    }

    #main1,
    #main2 {
        width: 100%;
        height: 50%;

        //   min-width: 31.25rem;

        // max-height: 500px;
    }
    #main2 {
        background-color: lightblue;
    }
</style>
