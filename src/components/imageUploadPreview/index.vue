<template>
    <el-upload
        :action="action"
		:auto-upload="autoUpload"
        :headers="header"
        :file-list="fileList"
        list-type="picture-card"
        :on-success="uploadSuccess"
        :on-remove="onRemove"
        :limit="limit"
        :class="(fileList.length === limit  || _fileList.length === limit) ? 'uploadHide' : ''"
    >
        <el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>
    
<script setup>
    import { _imageBase, _base } from "@/requests/base";
    import  Api from '@/apis/index'
    import { ref,computed } from 'vue';
    import { Plus } from '@element-plus/icons-vue';
    import {useCommonStore} from '@/store/commonData';
    import {DEEP_CLONE} from '@/utils/common';
    const CommonStore = useCommonStore()
    const widthEle = ref(300)
    const heightEle = ref(300);
    const imageUrl = ref('');
   
    const props = defineProps({
        limit:{
            type:Number,
            default:1
        },
        fileList:{
            type:Array,
            default:[]
        },
        autoUpload:{
            type:Boolean,
            default:true
        },
        // el-upload 原生的属性
		action: {
			default: `${_base}/data/single/fileUpload`,
			type: String
		},
    })
    const header = computed(()=>{
        return { token: CommonStore.token }
    })
  

   const beforeAvatarUpload= (rawFile) => {
        if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('Avatar picture must be JPG format!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!')
            return false
        }
        return true
    }
    
    // 图片自定义上传
    const httpRequest = (e)=>{
        console.log("自定义请求",e)
        const file = e.file
        Api.apiFileUpload({
            file
        }).then(res => {
            console.log("上传图片2222222222222",res)
            if (res.code === 2000) {
                let obj ={
                    name:'test',
                    url: res.data.absolutePath
                }
                fileList.value.push(obj)
            }
        });
    }



    const _fileList = ref([]);
    //没有定义 http-request 会执行的方法
    const uploadSuccess = (res,file)=>{
        if (res.code !== 2000) {
            ElMessage({
                message:res.msg,
                type: 'error',
            })
            return;
        }
            _fileList.value = DEEP_CLONE(props.fileList);
			_fileList.value.push({
				name: file.name,
				url: _imageBase + res.data.fileSavePath,
				uploadUrl: res.data.fileSavePath,
			});
            console.log("11111111112222222",_fileList.value.length,props.fileList.length )
		    disposeBackFileList(_fileList);
    }

    const emits = defineEmits(['getUploadFileInfo'])
    // 向外派发
    const disposeBackFileList = (fileList) =>{
        emits("getUploadFileInfo", {
            fileList
        });
    }

    // 删除触发
    const onRemove = (file,fileList)=>{
        _fileList.value = fileList.map(file => {
            let _fileObj = {
                name: file.name,
                url: file.url,
                uploadUrl: file.uploadUrl
            };
            return _fileObj;
        });
        console.log("11111111112222222",_fileList.value.length,props.fileList.length )
        disposeBackFileList(_fileList);
    }
</script>
    
<style lang="scss">
   .avatar-uploader .el-upload {
    border: 1px dashed #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: .2s;
    }

    .avatar-uploader .el-upload:hover {
        border-color:#409eff;
    }

    .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    }
    .uploadHide{
        .el-upload{
            display: none;
        }
    }

    
</style>