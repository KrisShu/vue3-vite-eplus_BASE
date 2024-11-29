export const menuList = [
    {
        name: '首页',
        path: '/home-index',
        key: 1,
    },
    {
        name: '客户',
        key: 2,
        path: '/customer',
        children: [
            {
                name: '菜单1-1',
                path: '/customer/test',
            },
            {
                name: '菜单1-2',
                path: '/customer/test2',
            },
            {
                name: '主题改色',
                path: '/customer/changeColorDemo',
            },
        ],
    },
    {
        name: '数据',
        key: 3,
        path: '/showData',
        children: [
            {
                name: '案例列表',
                path: '/showData/case',
            },
        ],
    },
];
