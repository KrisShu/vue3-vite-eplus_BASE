
export  const messageBox = (callback,title="删除",tipText="确认删除改数据？",icon="Delete")=>{
    ElMessageBox.confirm(
        tipText,
        title,
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true,
        //   icon: markRaw(icon),
        }
      ).then(() => {
            callback();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    
}
export default{
    messageBox
}

