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
            {
                name: 'git相关操作',
                path: '/showData/git',
            },
            {
                name: 'grid布局',
                path: '/showData/grid',
            },
            {
                name: 'svgdemo',
                path: '/showData/svg',
            },
            {
                name: '拖拽表单',
                path: '/showData/dragForm',
            },
            {
                name: '浮点精度计算',
                path: '/showData/float',
            },
            {
                name: '按钮防抖',
                path: '/showData/debounceBtn',
            },
            {
                name: '音乐播放器',
                path: '/showData/musicPlayer',
            },
            {
                name: 'elementPlus案例',
                path: '/showData/elementCase',
            },
        ],
    },
];
