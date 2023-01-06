import {defineStore} from 'pinia';
//1.定义导出容器
// 参数1：第一个参数是应用程序中 store 的唯一 id
// 参数2：选项对象  
// 返回值：返回的是一个函数
export const useMainStore = defineStore('main',{
    state:() => {
        return {
            // menuIscollapse:true,//菜单是否展开，默认不展开false
        }
       
    },
    /**
     * 类似于组件的computed，用来封装计算属性,有缓存的功能
     */
    getters: {

    },
    /**
     * 类似于组件的methods，封装业务逻辑，修改state
     */
    actions: {

    }


})