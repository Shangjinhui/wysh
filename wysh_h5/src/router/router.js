import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        //登录
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login'),
            meta:{
                cache:false,
            }
        },
        //我的
        {
            path: '/self',
            name: 'self',
            component: () => import('@/pages/selfCenter'),
            meta:{
                cache:false,
            }
        },
        //个人信息编辑
        {
            path: '/selfedit',
            name: 'selfedit',
            component: () => import('@/pages/selfEdit'),
            meta:{
                cache:false,
            }
        },
        //我的保证金
        {
            path: '/selfbond',
            name: 'selfbond',
            component: () => import('@/pages/selfBond'),
            meta:{
                cache:false,
            }
        },
        //我的竞拍
        {
            path: '/selfbidding',
            name: 'selfbidding',
            component: () => import('@/pages/selfBidding'),
            meta:{
                cache:false,
            }
        },
        //我的订单
        {
            path: '/selforder',
            name: 'selforder',
            component: () => import('@/pages/selfOrder'),
            meta:{
                cache:false,
            }
        },
        //竞拍大厅
        {
            path: '/bidhall',
            name: 'bidhall',
            component: () => import('@/pages/bidHall'),
            meta:{
                cache:false,
            }
        },
        //竞拍详情
        {
            path: '/biddetail',
            name: 'biddetail',
            component: () => import('@/pages/bidDetail'),
            meta:{
                cache:false,
            }
        },
    ]
})
export default router