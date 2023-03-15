

<template>
	<main id="sample">
		<Editor api-key="a94r1ceu8tg6960ypaxlvbj7r1epkd4myx82lmkzj4j8bath" 
		:init="init" />
	</main>
</template>
<script setup>
	import Editor from '@tinymce/tinymce-vue'
	const init = {
		language_url: '/tinymce/zh_CN.js', //引入语言包文件
		language: 'zh_CN', //语言类型
		plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave',
		toolbar:'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs'
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