/* 
* 程序的主入口文件
*/

//引入的是一个名为createApp的工厂函数 
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//注册pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router) //将router挂载到vue实例
app.use(pinia)// 挂载到 vue 实例
// app.use(VueTinymce)// 挂载到 vue 实例
// app.config.globalProperties.$tinymce = tinymce;
app.mount('#app')
