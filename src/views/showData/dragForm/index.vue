<template>
    <div class="curr-container">
        <el-row class="curr-grid">
            <el-col :span="20">
                <div class="grid-content">
                    <div class="grid-header">
                        <h2>拖拽表单</h2>
                    </div>
                    <div class="grid-body">
                        <el-row class="">
                            <el-col :span="4">
                                <div class="grid-content components-list">
                                    <div class="chunk">
                                        <VueDraggable
                                            ref="el"
                                            :animation="150"
                                            :group="{
                                                name: 'componentsGroup',
                                                pull: 'clone',
                                                put: false,
                                            }"
                                            :sort="false"
                                            v-model="inputComponents"
                                            @clone="onClone"
                                        >
                                            <div
                                                v-for="(
                                                    item, index
                                                ) in inputComponents"
                                                :key="index"
                                                class="components-item"
                                            >
                                                <div class="components-body">
                                                    {{ item.label }}
                                                </div>
                                            </div>
                                        </VueDraggable>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <el-scrollbar class="center-scrollbar">
                                    <el-form
                                        :size="formConf.size"
                                        :label-position="formConf.labelPosition"
                                        :disabled="formConf.disabled"
                                        :label-width="
                                            formConf.labelWidth + 'px'
                                        "
                                    >
                                        <VueDraggable
                                            :animation="150"
                                            group="componentsGroup"
                                            :sort="false"
                                            v-model="inputComponents"
                                        >
                                        </VueDraggable>
                                    </el-form>
                                </el-scrollbar>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ep-bg-purple-light" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { VueDraggable } from 'vue-draggable-plus';
    import { formConf, inputComponents } from '@/utils/generator/config.js';

    const onClone = () => {};
</script>

<style lang="scss" scoped>
    .curr-container {
        width: 100%;
        padding: 0px 10px;
        .curr-grid {
            width: 100%;
            min-height: 500px;
        }

        .components-list {
            padding: 8px;
            box-sizing: border-box;
            height: 100%;
            .components-item {
                display: inline-block;
                width: 48%;
                margin: 1%;
                transition: transform 0ms !important;
            }
        }
        $selectedColor: #f6f7ff;
        $lighterBlue: #409eff;
        .components-body {
            padding: 8px 10px;
            background: $selectedColor;
            font-size: 12px;
            cursor: move;
            border: 1px dashed $selectedColor;
            border-radius: 3px;

            &:hover {
                border: 1px dashed #787be8;
                color: #787be8;
            }
        }
    }
</style>
