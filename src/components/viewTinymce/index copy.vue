<template>
    <main id="sample">
        <!-- <Editor 
            api-key="a94r1ceu8tg6960ypaxlvbj7r1epkd4myx82lmkzj4j8bath" 
            :init="init" 
        /> -->
        <!--   :modelValue="editorVal" -->
    </main>

    <el-input 
    :value="editorVal" 
  
    @input="$emit('update:editorVal', $event?.target?.value)"></el-input>
    
   
</template>
    
<script setup>
    // import Editor from '@tinymce/tinymce-vue'//引入组件
    // //配置菜单按钮
	// const init = {
    //     width: '100%',
    //     height: props.height,
	// 	language_url: '/tinymce/zh_CN.js', //引入语言包文件
	// 	language: 'zh_CN', //语言类型
	// 	plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave',
	// 	toolbar:'fullscreen undo redo restoredraft  | forecolor backcolor bold italic underline fontselect fontsizeselect  | formatselect  |\
	// 			alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | cut copy paste pastetext| blockquote subscript superscript removeformat  | code selectall | indent2em lineheight formatpainter axupimgs |\
    //             table image media charmap emoticons hr pagebreak insertdatetime print preview ',
	// 	fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
	// 	font_formats:'微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
	// 	menu: { //顶部菜单管理
	// 	  edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
	// 	  insert: { title: '插入', items: 'link image  |  hr' },
	// 	  view: { title: '查看', items: 'visualaid' },
		 
	// 	},
	// 	images_upload_handler: (blobInfo, success, failure) => {
	// 	  const img = 'data:image/jpeg;base64,' + blobInfo.base64();
	// 	  success(img);
	// 	},
	// }

    const props = defineProps({
        // modelValue:String,
        editorVal: {//富文本的内容
            type: String,
            default:''
        },
        height:{//富文本的高度
            type:Number,
            default:600
        }

    })
    console.log("propsprops",props.editorVal)
    // onMounted(() => {
    //     console.log("111111111")
    //     tinymce.init({}); // 初始化富文本
    // });
    
    defineEmits(['update:editorVal'])
    const inputEvent = (e)=>{
        console.log("77777777777777")
        // props.editorVal = e.target.value
    }


</script>
    
<style lang="scss" scoped>
   
</style>