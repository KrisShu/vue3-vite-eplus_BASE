import { createRouter,createWebHashHistory } from "vue-router";
import {customerRouters} from './customer'
import { useCommonStore } from '../store/commonData'
//hash模式路由
const routes =[
    {
        path:'/',
        name:'home',
        component:() => import('@/views/home/index.vue'),
        meta: {
            title: "首页"
        },
        redirect: "/home-index",
        children:[
            {
                path: "home-index",
                name: "home-index",
                component: () => import('@/views/home/home.vue'),
                meta: {
                  title: "首页",
                }
            },
            customerRouters,
            

        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/login/index.vue'),
        meta: {
            title: "登录"
        },

    }
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
    if (!CommonStore.tooken && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }

})
export default router
