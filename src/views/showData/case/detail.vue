

<template>
	<main id="sample">
		<Editor api-key="a94r1ceu8tg6960ypaxlvbj7r1epkd4myx82lmkzj4j8bath" 
		:init="init" />
	</main>
</template>
<script setup>
	import Editor from '@tinymce/tinymce-vue'
	//配置菜单按钮
	const init = {
		language_url: '/tinymce/zh_CN.js', //引入语言包文件
		language: 'zh_CN', //语言类型
		plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave',
		toolbar:'fullscreen undo redo restoredraft  | forecolor backcolor bold italic underline fontselect fontsizeselect  | formatselect  |\
				alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | cut copy paste pastetext| blockquote subscript superscript removeformat  | code selectall | indent2em lineheight formatpainter axupimgs |\
                table image media charmap emoticons hr pagebreak insertdatetime print preview ',
		fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
		font_formats:'微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
		menu: { //顶部菜单管理
		  edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
		  insert: { title: '插入', items: 'link image  |  hr' },
		  view: { title: '查看', items: 'visualaid' },
		 
		},
		images_upload_handler: (blobInfo, success, failure) => {
		  const img = 'data:image/jpeg;base64,' + blobInfo.base64();
		  success(img);
		},
	}
</script>

<style scoped>
	.logo {
		display: block;
		margin: 0 auto 2rem;
	}

	@media (min-width: 1024px) {
		#sample {
			display: flex;
			flex-direction: column;
			place-items: center;
			width: 1000px;
		}
	}
</style>