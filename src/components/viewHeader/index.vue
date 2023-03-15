<template>
    <div class="header flex j-between a-center">
        <img style="cursor: pointer;" @click="changeCollapse" src="@/assets/images/menu-collapse.png" alt="">
        <div class="header-right-wrap flex a-center">
             <!-- 消息中心 -->
             <div class="header-inform">
                <el-popover
                    placement="top-start"
                    title="Title"
                    :width="200"
                    trigger="hover"
                    content="this is content, this is content, this is content"
                >
                    <template #reference>
                        <div style="cursor: pointer;" class="flex a-center">
                            <el-icon class="bell-icon"><Bell /></el-icon>
                            <span class="role-name">消息中心</span>
                            <el-icon><ArrowDown /></el-icon>
                        </div>
                    </template>
                </el-popover>
            </div>
            <!-- 帮助 -->
            <div class="header-help">
                <el-popover
                    placement="top-start"
                    title="Title"
                    :width="200"
                    trigger="hover"
                    content="this is content, this is content, this is content"
                >
                    <template #reference>
                        <div style="cursor: pointer;" class="flex a-center">
                            <span class="role-name">帮助</span>
                            <el-icon><ArrowDown /></el-icon>
                        </div>
                    </template>
                </el-popover>
            </div>
            <!-- 角色 -->
            <div class="header-role">
                <el-popover
                    placement="top-start"
                    :width="100"
                    trigger="hover"
                >
                    <template #reference>
                        <div style="cursor: pointer;" class="flex a-center">
                            <el-avatar
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            />
                            <span class="role-name">{{CommonStore.userInfo.username}}</span>
                            <el-icon><ArrowDown /></el-icon>

                        </div>
                    </template>
                    <template #>
                        <p @click="logout" class="header-role-logout">退出登录</p>
                    </template>

                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCommonStore } from '@/store/commonData'
import { ArrowDown,Bell} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router';

    const router = useRouter()
    const CommonStore = useCommonStore()
    const changeCollapse = ()=>{
        CommonStore.menuIscollapse = !CommonStore.menuIscollapse
        CommonStore.need = 'test'
    }

    const logout = ()=>{
        localStorage.clear();//清空所有
        router.replace({
            path:'/login'
        })
    }
</script>
<style lang="scss" scoped>

    .header{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 24px;
        background-color: white;
        .role-name{
            margin: 0 8px;
            font-size: 14px;
            color: #6E7175;
        }
        
        .header-help{
            margin: 0 36px;
        }
        :deep(.el-icon){
            font-size: 14px;
            color: #303133;
            &.bell-icon{
                font-size: 16px;
            }
        }
    }
    .header-role-logout{
            width: 100%;
            cursor: pointer;
            text-align: center;
            &:hover{
                font-weight: bold;
            }
    }
</style>