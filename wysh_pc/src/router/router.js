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
        //个人中心
        {
            path: '/self',
            name: 'self',
            component: () => import('@/pages/selfCenter'),
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
        //拍品详情
        {
            path: '/biddetail',
            name: 'biddetail',
            component: () => import('@/pages/bidDetail'),
            meta:{
                cache:false,
            }
            
        }
    ]
})
export default router