<template>
    <div class="enter-tag-wrap uni-width-100">
        <el-input class="" @keyup.enter.native="inputEnter" v-model="inputVal" :placeholder="placeholder" />
        <template v-if="tags.length">
            <el-tag
                v-for="tag in tags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
            >
                {{ tag }}
            </el-tag>
        </template>
    </div>
</template>
    
<script setup>
    import {ref} from 'vue'
    const inputVal = ref('');
    const props = defineProps({
        tags:{
            type:Array,
            default:[]
        },
        origin:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:'请输入标签内容'
        }
    })
    const emits = defineEmits(['dispatchTags']);

    const inputEnter = ()=>{
        console.log(inputVal.value)
        if(!inputVal.value) return;
        if(!props.tags.includes(inputVal.value)){
             props.tags.push(inputVal.value)
        }
       
        inputVal.value = '';
        commonEmit();


    }
    // 关闭tag
    const handleClose =(tag)=>{
        props.tags.splice(props.tags.indexOf(tag), 1)
        commonEmit();
    }
    const commonEmit = ()=>{
        emits('dispatchTags',{
            origin:props.origin,
            val:props.tags
        })
    }
</script>
    
<style lang="scss" scoped>
.enter-tag-wrap{
    .el-tag{
        margin-right: 10px;
    }
}
   
    
</style>