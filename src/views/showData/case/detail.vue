<template>
	<div class="uni-form-wrap uni-pd20">
		<!-- 踩坑: ref和model绑定的值命名不能一样  例如：ref="caseForm"  :model="caseForm" 需修改为以下格式-->
		<el-form ref="caseFormRef" label-position="top" :rules="caseFormRules" :model="caseForm" hide-required-asterisk>
			<div class="uni-form-contain flex">
				<div class="flex-con uni-form-content">
					<div class="uni-form-item">
						<el-row :gutter="40">
							<el-col :lg="12">
								<el-form-item prop="title" ref="title">
									<!-- vue3 具名插槽  语法：v-slot:插槽名 。 vue2:  slot="插槽名" -->
									<template v-slot:label>
										<div class="uni-label">
											<span class="label-cap">案例标题</span>
											<span class="label-desc label-red">(必填)</span>
										</div>
									</template>
									<el-input v-model="caseForm.title" placeholder="请输入案例标题"></el-input>
								</el-form-item>
							</el-col>

							<el-col :lg="12">
								<el-form-item prop="categoryCode" ref="categoryCode">
									<template v-slot:label>
										<div class="uni-label">
											<span class="label-cap">案例类别</span>
											<span class="label-desc label-red">(必填)</span>
										</div>
									</template>
									<el-select v-model="caseForm.categoryCode" placeholder="请选择案例类别" clearable
										class="uni-wid-100">
										<el-option v-for="meta in metaData['meta100011']" :key="meta.id"
											:value="meta.code" :label="meta.name" :disabled="meta.disabled">
											{{ meta.name }}</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :lg="12">
								<el-form-item prop="country" ref="country">
									<template v-slot:label>
										<div class="uni-label">
											<span class="label-cap">城市</span>
											<span class="label-desc label-red">(必填)</span>
										</div>
									</template>
									<el-input v-model:editorVal="caseForm.country" placeholder="请输入城市"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!-- 案例介绍 -->
					<div class="uni-form-item">
						<el-tabs v-model="activeName" class="rewrite-tabs">
							<el-tab-pane label="案例介绍" name="xmys">
								
									<view-tinymce v-model="caseForm.contentJs"></view-tinymce>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="uni-form-right">
					<div class="uni-form-item">
						<div class="uni-form-title">案例图片</div>
						<el-form-item ref="img" prop="img">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">案例封面</span>
									<span class="label-desc label-red">(必传)</span>
									<span class="label-proposal">建议图片大小在200kb以内</span>
								</div>
							</template>
							<image-upload-preview @getUploadFileInfo="getUploadFileInfo"></image-upload-preview>
							<!-- <view-upload-image-preview :fileList="imageShowList" :cropImageMinSize="cutSize"
								origin="imageShowList" @getUploadFileInfo="getUploadFileInfo">
							</view-upload-image-preview> -->
						</el-form-item>
						<el-form-item prop="imgAlt" ref="imgAlt">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">案例封面Alt属性</span>
								</div>
							</template>
							<el-input v-model="caseForm.imgAlt" placeholder="请输入封面Alt属性"></el-input>
						</el-form-item>
					</div>

					<div class="uni-form-item">
						<div class="uni-form-title">SEO 设置</div>
						<el-form-item prop="seoTitle" ref="seoTitle">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">seo 标题</span>
								</div>
							</template>
							<el-input v-model="caseForm.seoTitle" placeholder="请输入seo标题"></el-input>
						</el-form-item>
						<el-form-item prop="seoKeywords" ref="seoKeywords">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">seo 关键字</span>
								</div>
							</template>
							<el-input v-model="caseForm.seoKeywords" placeholder="请输入seo关键字"></el-input>
						</el-form-item>
						<el-form-item prop="seoDescription" ref="seoDescription">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">seo 描述</span>
								</div>
							</template>
							<el-input v-model="caseForm.seoDescription" placeholder="请输入seo描述"></el-input>
						</el-form-item>
					</div>

					<div class="uni-form-item">
						<div class="uni-form-title">其他信息</div>
						<el-form-item prop="sort" ref="sort">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">序号</span>
									<span class="label-desc label-red">(必填)</span>
								</div>
							</template>
							<el-input  v-model="caseForm.sort" placeholder="请输入序号"></el-input>
						</el-form-item>

						<el-form-item prop="digest" ref="digest">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">案例简介</span>
								</div>
							</template>
							<el-input :autosize="{ minRows: 2, maxRows: 4 }" v-model="caseForm.digest" type="textarea" placeholder="请输入案例简介"></el-input>
						</el-form-item>

						<el-form-item prop="source" ref="source">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">来源</span>
								</div>
							</template>
							<el-input v-model="caseForm.source" placeholder="请输入来源"></el-input>
						</el-form-item>

						<el-form-item>
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">标签</span>
									<span class="label-desc">
										<el-tooltip content="输入标签，按“enter”键进行添加" placement="right">
											<el-icon><InfoFilled /></el-icon>
										</el-tooltip>
									</span>
								</div>
							</template>
							<!-- <view-new-tag origin="tips" type="5" :tips="caseForm.tips" placeholder="请输入标签"
								@getTipsInfo="getTipsInfo">
							</view-new-tag> -->

						</el-form-item>
						<el-form-item>
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">匹配标签</span>
									<span class="label-desc">
										<el-tooltip content="输入标签，按“enter”键进行添加" placement="right">
											<el-button link class="uni-tooptip-button">
												<i class="el-icon-info"></i>
											</el-button>
										</el-tooltip>
									</span>
								</div>
							</template>
							<!-- <view-new-tag origin="matchtips" type="5" :tips="caseForm.matchtips" placeholder="请输入标签"
								@getTipsInfo="getTipsInfo">
							</view-new-tag> -->
						</el-form-item>
						<el-form-item prop="pageView" ref="pageView">
							<template v-slot:label>
								<div class="uni-label">
									<span class="label-cap">浏览量（显示为两者之和）</span>
								</div>
							</template>
							<div class="pageView-wrap flex j-between">
								<div class="pageView-contain flex j-between">
									<p>真实</p>
									<el-input disabled v-model="caseForm.pageViewReal"></el-input>
								</div>
								<div class="pageView-contain flex j-between">
									<p>虚拟</p>
									<el-form-item prop="pageViewVirtual">
										<el-input v-model="caseForm.pageViewVirtual" placeholder="请输入虚拟数值">
										</el-input>
									</el-form-item>
								</div>
							</div>
						</el-form-item>
					</div>
				</div>
			</div>
		</el-form>
		<div class="uni-form-footer uni-text-right">
			<el-button>返 回</el-button>
			<el-button @click="saveForm" type="primary" >保 存</el-button >
			<el-button @click="saveForm2" type="primary" >保 存</el-button >
		</div>
		<div class="uni-form-footer-place"></div>
	</div>
</template>

<script setup>
	import {reactive, ref } from 'vue';
	import{InfoFilled} from '@element-plus/icons-vue';
	import viewTinymce from '@/components/viewTinymce/index.vue';
	import imageUploadPreview from '@/components/imageUploadPreview/index.vue'
	const caseForm = reactive({
		// 应用的编码*
        applyCode: "",
        // 案例编码 *
        caseCode: "",
        // 案例类别(code编码)*
        categoryCode: "",
        // 案例介绍
        contentJs: "<p>你好啊 tinymce</p>",
        // 城市*
        country: "",
        // 案例简介
        digest: "",
        // id 为空表示新增否则为编辑
        id: "",
        // 封面*
        img: "",
        // 封面alt属性
        imgAlt: "",
        //   浏览量（真实）
        pageViewReal: "",
        //   浏览量（虚拟）
        pageViewVirtual: "",
        // seo描述
        seoDescription: "",
        // seo关键词
        seoKeywords: "",
        // seo标题
        seoTitle: "",
        // 排序*
        sort: 100, //默认100
        //   来源
        source: "",
        // 案例标题
        title: "",
        // 标签
        tips: [],
        // 匹配标签
        matchtips: [],
	})
	const caseFormRules = reactive({

	})
	const metaData = reactive([])
	const activeName = ref('xmys')

	const saveForm = ()=>{
		caseForm.contentJs = '修改值'
	}
	const saveForm2 = ()=>{
		console.log(caseForm.contentJs)
	}

	const getUploadFileInfo = (file)=>{
		console.log("接收的参数",file)
	}
</script>

<style>

</style>