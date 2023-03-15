import  { reactive,ref} from 'vue'
export default function(){
   
    let pageNo = ref(1) //页码
    let pageSize = ref(10)//每页条数
    let _cb = ()=>{}
    //改变每页条数
    const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
        pageSize.value = val 
        _cb()
    }
    //改变页码
    const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
        pageNo.value  = val
        _cb()
    }
    const createChangePaginationCb = (fn)=> {
        _cb = fn;
    }
    return{
        handleSizeChange,
        handleCurrentChange,
        createChangePaginationCb,
        pageNo,
        pageSize

    }
}