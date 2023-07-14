

<template>
	<main id="sample">

		<el-button type="primary" size="default" @click="back">返回</el-button>
		
	</main>
</template>
<script setup>

	import { useRouter } from 'vue-router';
	const router = useRouter()
	
	//返回按钮呢
	const back = ()=>{
		router.back()
	}
</script>

<style scoped>
	.logo {
		display: block;
		margin: 0 auto 2rem;
	}

	
</style>