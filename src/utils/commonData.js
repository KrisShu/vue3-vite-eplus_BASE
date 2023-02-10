export const menuList =[
    {
        name:'首页',
        path:'/home-index',
        key:1
    },
    {
        name:'客户',
        key:2,
        path:'/customer',
        children:[
            {
                name:'菜单1-1',
                path:'/customer/test',
                
            },
            {
                name:'菜单1-2',
                path:'/customer/test2',
                
            },
            
        ]
    }
]