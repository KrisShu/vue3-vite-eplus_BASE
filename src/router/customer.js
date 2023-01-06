/* 
    客户模块路由
*/

export const customerRouters ={
    path:'/customer',
    name:'customer',
    component:() => import('@/views/customer/index.vue'),
    meta: {
        title: "客户"
    },
    children:[
        {
            path: "test",
            name: "customer-test",
            component: () => import('@/views/customer/test.vue'),
            meta: {
              title: "客户记录",
            }
        },
        
    ]

}