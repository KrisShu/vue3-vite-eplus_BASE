<template>
	<div id="login-wrapper" class="login-wrapper flex j-center a-center">
		<div class="flex-con left">
			<img class="center-img" src="../../assets/images/img-2.5D.png" alt="">
			<img class="left-img" src="../../assets/images/bg-Upper-left.png" alt="">
		</div>
		<div class="flex-con right flex a-center">
			<div class="login-container">
				<div class="login-form flex-con">
					<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
						<div class="login-header">
							<img src="../../assets/images/logo.png" alt="">
							<div class="login-form-cap">vue3+vite+elementPlus</div>
							<p class="subtitle"></p>
						</div>

						<div>
							<el-form-item prop="phone">
								<el-input v-model.trim="loginForm.phone" placeholder="账号" class="rule-input-edit"
									prefix-icon="el-icon-user">
								</el-input>
							</el-form-item>

							<el-form-item prop="password">
								<el-input v-model.trim="loginForm.password" type="password" placeholder="密码"
									prefix-icon="el-icon-lock" class="rule-input-edit"
									@keyup.enter.native="handleSubmitLogin">
								</el-input>
							</el-form-item>

							<el-form-item>
								<el-button type="primary" class="login-btn" :loading="hasLoading"
								 @click="handleSubmitLogin(loginFormRef)">
									登录
								</el-button>
							</el-form-item>
							
						</div>
						
					</el-form>
				</div>

				<div class="login-from-item">
					<Vcode 
					:imgs="codeimgs" 
					:show="isShow" 
					:canvasHeight="155" 
					:canvasWidth="305"
					@success="onSuccess"
					@close="onClose" >
					</Vcode>
					
				</div>
			</div>

			<img class="right-img" src="../../assets/images/bg-lower-right.png" alt="">
		</div>
	</div>
</template>

<script setup>
	import { reactive,ref } from 'vue'
	import Vcode from '@/components/vcode/index.vue'
    import Img1 from '@/assets/images/code1.png';
    import Img2 from '@/assets/images/code2.png';
    import Img3 from '@/assets/images/code3.png';
    import Img4 from '@/assets/images/code4.png';
    import Img5 from '@/assets/images/code5.png';
	import Api from '@/apis/index';
	import { aesEncrypt } from "@/utils/crypt"; //加密解密
	import {useRouter} from 'vue-router';
	import {useCommonStore} from '@/store/commonData';
	

	// import { ElMessage } from 'element-plus'
	const router = useRouter()
	const CommonStore = useCommonStore()
	const loginForm = reactive({
		phone:'',
		password:''
	 })
	const loginFormRules = reactive({
		phone: [
			{
				required: true,message: "请输入账号",trigger: "blur"
			}
        ],
		password: [
			{
				required: true,message: "请输入密码",trigger: "blur"
			}
		],
	})
	let hasLoading = ref(false)
	let isShow = ref(false)
	const codeimgs= reactive([Img1, Img2, Img3, Img4, Img5]) 



	const loginFormRef = ref(null)
	const handleSubmitLogin =  (formEl)=>{
		loginFormRef.value.validate((valid,fields)=>{
			if (valid) {
				isShow.value = true
			} else {
			console.log('error submit!', fields)
			}
		})
		
	}
	const onSuccess = (val)=>{
		Api.apiLogin({
			userName: loginForm.phone,
			//需要注意大小写转换 密码需要加密
            password: aesEncrypt(loginForm.password ?.toLowerCase ?.())
		}).then(res=>{
			console.log("res",router)
			CommonStore.token = res.data.userInfo.token
			CommonStore.userInfo = res.data.userInfo
			router.push({
				path:'/',
			})

		})


	}
	const onClose = ()=>{

	}
</script>

<style lang='scss' scoped>
	.left {
		height: 100vh;
		position: relative;

		.center-img {
			position: absolute;
			width: 400px;
			top: 50%;
			right: 24px;
			/* margin-right: 24px; */
			transform: translateY(-50%);
		}

		.left-img {
			position: absolute;
			width: 300px;
			top: 0;
			left: 0;
		}
	}

	.right {
		height: 100vh;
		position: relative;

		.right-img {
			position: absolute;
			width: 180px;
			right: 0;
			bottom: 0;
		}
	}

	.login-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		// min-width: 1200px;
		margin: 0 auto;
		background-size: 1920px 1080px;
	}

	@media screen and (max-width: 1440px) {
		.login-wrapper {
			background-position: center 36%;
		}
	}

	.login-container {
		width: 384px;
		// height: 492px;
	}

	.login-form {
		
		background-color: rgba(255, 255, 255, .8);
		// opacity: .8;
		padding: 30px 30px 15px;
		border-radius: 2px;
		box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.15);

		.login-form-cap {
			font-size: 24px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0E0C0C;
			line-height: 33px;
			margin-top: 19px;
			margin-bottom: 5px;
		}

		.subtitle {
			margin-bottom: 30px;
		}

		.el-form-item {
			margin-bottom: 32px;
		}

		.version {
			text-align: center;
			color: #666;
		}
	}

	.login-btn {
		width: 324px;
		height: 52px;
		border: none;
		width: 100%;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		margin-top: 60px;
	}

	.login-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 14px;

		img {
			width: 100px;
			height: 100px;
		}
	}

	.rule-input ::v-deep {
		.el-input__inner {
			border: 0;
			border-bottom: 1px solid rgba(0, 0, 0, 0.09);
			background-color: transparent;

			&::placeholder {
				color: rgb(173, 170, 170);
			}
		}
	}

	.rule-input-edit ::v-deep {
		.el-input__inner {
			border: 0;
			border-radius: 0px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.09);
			background-color: transparent;

			&::placeholder {
				color: rgb(173, 170, 170);
			}
		}
	}

	.el-form-item {
		margin-bottom: 10px;
	}
</style>