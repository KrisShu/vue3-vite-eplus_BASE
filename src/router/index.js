import { createRouter,createWebHashHistory } from "vue-router";
import {customerRouters} from './customer'
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
    }
]
const router = new createRouter({
    history: createWebHashHistory(), //vue3是用history控制路由模式，vue2是mode
    routes
  });
export default router
