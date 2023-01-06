<template>
	<div id="home-wrapper">
		<el-container class="home-container flex-wrap">
			<el-aside width="auto">
				<view-aside></view-aside>
			</el-aside>
			<el-container class="mian-container flex-con">
				<el-header>
					<view-header></view-header>
				</el-header>
				<el-main class="home-mian">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
	import viewHeader from '@/components/viewHeader/index.vue'
	import viewAside from '@/components/viewAside/index.vue'

</script>

<style lang="scss" scoped>
.el-header{
	padding: 0;
}
.el-main{
	padding: 0;
}
#home-wrapper{
	width: 100%;
	height: 100vh;
	background: #F0F0F1;
	.home-container{
		width: 100%;
		height: 100%;
		.home-mian{
			padding: 28px;
		}
	}
}
</style>