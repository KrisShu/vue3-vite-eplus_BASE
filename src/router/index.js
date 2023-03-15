import { createRouter,createWebHashHistory } from "vue-router";
import {customerRouters} from './customer'
import {showDataRouters} from './showData'
import { useCommonStore } from '../store/commonData'
import home from '../views/home/index.vue'
import homeIndex from '../views/home/home.vue'
//hash模式路由
const routes =[
    {
        path:'/',
        name:'home',
        component:home,
        meta: {
            title: "首页"
        },
        redirect: "/home-index",
        children:[
            {
                path: "home-index",
                name: "home-index",
                component: homeIndex,
                meta: {
                  title: "首页",
                }
            },
            customerRouters,
            showDataRouters,
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/login/index.vue'),
        meta: {
            title: "登录"
        },

    },
]
const router = new createRouter({
    history: createWebHashHistory(), //vue3是用history控制路由模式，vue2是mode
    routes
  });

  /**
   * 
   * 全局前置守卫，路由跳转前触发
   */
router.beforeEach((to, from, next) => {
    const CommonStore = useCommonStore()
    if (!CommonStore.token && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }

})
export default router
