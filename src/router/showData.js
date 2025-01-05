/* 
    数据展示页面
*/
export const showDataRouters = {
    path: '/showData',
    name: 'showData',
    component: () => import('@/views/showData/index.vue'),
    meta: {
        title: '数据展示',
    },
    children: [
        {
            path: 'case',
            name: 'case-list',
            component: () => import('@/views/showData/case/list.vue'),
            meta: {
                title: '案例列表',
            },
        },
        {
            path: 'case-detail',
            name: 'case-detail',
            component: () => import('@/views/showData/case/detail.vue'),
            meta: {
                title: '案例列表',
                activeMenu: '/showData/case',
            },
        },
        {
            path: 'git',
            name: 'git-list',
            component: () => import('@/views/showData/gitData/index.vue'),
            meta: {
                title: 'git操作指令列表',
            },
        },
        {
            path: 'grid',
            name: 'grid-list',
            component: () => import('@/views/showData/grid/index.vue'),
            meta: {
                title: 'grid布局列表',
            },
        },
    ],
};
