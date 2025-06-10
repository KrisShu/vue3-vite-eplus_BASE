<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-wrap"
        text-color="#fff"
        :unique-opened="true"
        :collapse="CommonStore.menuIscollapse"
        @select="handleSelect"
        :default-active="onRoutes"
        router
    >
        <template v-for="(menu, index) in menuList" :key="index">
            <el-sub-menu v-if="menu?.children" :index="menu.path">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>{{ menu.name }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                        v-for="(menuC, indexC) in menu.children"
                        :key="indexC"
                        :index="menuC.path"
                    >
                        {{ menuC.name }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.path">
                <el-icon><icon-menu /></el-icon>
                <template #title>{{ menu.name }}</template>
            </el-menu-item>
        </template>
    </el-menu>
</template>
<script setup>
    import { ref, reactive, inject, computed } from 'vue';
    import { useCommonStore } from '@/store/commonData';
    import { menuList } from '@/utils/commonData';
    import { useRouter, useRoute } from 'vue-router';
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue';
    const CommonStore = useCommonStore();
    const router = useRouter();
    const route = useRoute();
    console.log('12', route);
    const onRoutes = computed(() => {
        let activePath = route.meta?.activeMenu
            ? route.meta?.activeMenu
            : route.path;
        return activePath;
    });
    // const onRoutes = ref('')
    const handleSelect = (key, keyPath) => {
        console.log(key, keyPath);
        // onRoutes.value = key
    };
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath);
    };
</script>
<style lang="scss">
    .el-menu-wrap {
        &:not(.el-menu--collapse) {
            width: 180px;
        }
        height: 100%;
        // background: #bfbfbf;
        box-shadow: 3px 0px 20px 0px rgba(146, 170, 206, 0.29);
    }
</style>
