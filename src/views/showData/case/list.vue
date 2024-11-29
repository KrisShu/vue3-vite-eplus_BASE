<template>
    <div class="uni-content-wrap">
        <el-table :data="data.tableData"  style="width: 100%">
            <el-table-column label="编码" prop="caseCode"></el-table-column>
            <el-table-column label="案例标题" width="400" prop="title"></el-table-column>
            <el-table-column label="城市" prop="country"></el-table-column>
            <el-table-column label="案例类型" prop="categoryName"></el-table-column>
            <el-table-column label="浏览量" prop="pageView"></el-table-column>
            <el-table-column label="时间" prop="createTime"></el-table-column>
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button @click="deleteEvent" link type="primary" size="small">
                        delete
                    </el-button>
                    <el-button v-permiss="'test'"  @click="gotoDetail" link type="primary" size="small">detail</el-button>
                </template>
            </el-table-column>
        </el-table>
    <el-pagination
        class="uni-pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      @size-change="pagination.handleSizeChange"
      @current-change="pagination.handleCurrentChange"
    />
    </div>
   
</template>

<script setup>
    import { ref,reactive } from 'vue'
    import { useRouter } from 'vue-router';
    import usePagination from '@/hooks/pagination'
    import  Api from '@/apis/index'
    import {messageBox} from '@/utils/common'
    let pagination = usePagination()
    // const tableData = reactive([])
    const data = reactive({
        tableData:[],
        total:0
    })
    const currentPage = ref(1)//当前页面
    const pageSize = ref(10)//每页条数
    const searhParam = reactive({
        categoryCode:'',
        contentJs:'',
        digest:'',
        matchTag:'',
        tag:'',
        title:'',
        endTime_show:'',
        startTime_show:'',
    })
    const router = useRouter();


    const initTable = ()=>{
        console.log("获取页面数据",pagination.pageNo)
        let params = Object.assign({},searhParam,{
				pageNo: pagination.pageNo.value,
				pageSize: pagination.pageSize.value
			})
        Api.apiCaseGetList(params).then(res=>{
            console.log("列表数据",res)
            data.tableData = res.data.caseList
            data.total = res.data?.count;

        })
    }
    initTable();
    pagination.createChangePaginationCb(initTable)

    const gotoDetail = ()=>{
        router.push({
            path:'/showData/case-detail'
        })
    }

    const deleteEvent = ()=>{
        messageBox(()=>{
            console.log("删除")
        })
    }
</script>