<template>
    <el-table :data="tableData" style="width: 100%" height="300">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
                <el-button link type="primary" size="small">
                    Detail
                </el-button>
                <el-button link type="primary" size="small">Edit</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="pagination.handleSizeChange"
      @current-change="pagination.handleCurrentChange"
    />
</template>

<script setup>
    import { ref } from 'vue'
    import usePagination from '@/hooks/pagination'
    let pagination = usePagination()
    const tableData = [{
            date: '2016-05-03',
            name: 'Tom',
            state: 'CaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCalifornia',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-08',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-06',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
        {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
    ]
    const currentPage = ref(1)//当前页面
    const pageSize = ref(20)//每页条数
    
    
    const initTable = ()=>{
        console.log("pagination",pagination.pageData.pageNo)
    }
    pagination.createChangePaginationCb(initTable)

    
</script>