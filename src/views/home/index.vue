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
					<el-scrollbar>
						<el-config-provider :locale="locale">
							<router-view></router-view>
						</el-config-provider>
					</el-scrollbar>

					
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
 	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	import viewHeader from '@/components/viewHeader/index.vue'
	import viewAside from '@/components/viewAside/index.vue'

	let  locale = zhCn

</script>

<style lang="scss" scoped>
.el-header{
	padding: 0;
	height: 48px !important;
	background: #FEFEFE;
	box-shadow: 0px 3px 20px 0px rgba(146,170,206,0.29);
	width: 100%;
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
			padding: 28px 0px;
		}
	}
}
</style>