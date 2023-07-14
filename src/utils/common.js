
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

export const messageAlert = (message,type="success")=>{
	ElMessage({
		message,
		type
	})
}


/**
 * 深度克隆数据
 * @paramsource数据源
 * @authorzhuiyi 2021/04/29
 */
export function DEEP_CLONE(source) {
	if (!source || typeof source !== 'object') {
	  throw new Error('error arguments', 'shallowClone');
	}
	var targetObj = source.constructor === Array ? [] : {};
	for (var keys in source) {
	  if (source.hasOwnProperty.call(source, keys)) {
		if (source[keys] && typeof source[keys] === 'object' && !(source[keys] instanceof Date)) {
		  targetObj[keys] = source[keys].constructor === Array ? [] : {};
		  targetObj[keys] = DEEP_CLONE(source[keys]);
		} else {
		  targetObj[keys] = source[keys];
		}
	  }
	}
	return targetObj;
}

export default{
    messageBox,
	messageAlert,
	DEEP_CLONE
}

