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
        {
            path: 'svg',
            name: 'svg-list',
            component: () => import('@/views/showData/svgdemo/index.vue'),
            meta: {
                title: 'svgdemo',
            },
        },
        {
            path: 'dragForm',
            name: 'drag-form',
            component: () => import('@/views/showData/dragForm/index.vue'),
            meta: {
                title: 'dragForm',
            },
        },
        {
            path: 'float',
            name: 'float',
            component: () => import('@/views/showData/floatNumber/index.vue'),
            meta: {
                title: '浮点精度计算',
            },
        },
        {
            path: 'debounceBtn',
            name: 'debounce-btn',
            component: () => import('@/views/showData/btnCase/index.vue'),
            meta: {
                title: '按钮防抖',
            },
        },
        {
            path: 'musicPlayer',
            name: 'music-player',
            component: () => import('@/views/showData/musicPlay/index.vue'),
            meta: {
                title: '音乐播放器',
            },
        },
        {
            path: 'elementCase',
            name: 'element-case',
            component: () => import('@/views/showData/elementCase/index.vue'),
        },
    ],
};
