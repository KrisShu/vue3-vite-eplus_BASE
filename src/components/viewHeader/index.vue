<template>
    <header>
        <el-button type="info" @click="changeCollapse">点击</el-button>

        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </header>
</template>

<script setup>
import { useCommonStore } from '@/store/commonData'
import {ref} from 'vue'
    const CommonStore = useCommonStore()
    const changeCollapse = ()=>{
        CommonStore.menuIscollapse = !CommonStore.menuIscollapse
        CommonStore.need = 'test'
    }
</script>
<style lang="scss" scoped>
    header{
        height: 48px;
        background: #FEFEFE;
        box-shadow: 0px 3px 20px 0px rgba(146,170,206,0.29);
        width: 100%;

    }
</style>