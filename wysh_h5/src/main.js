import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// import store from './store'
import '@/assets/js/mint'
import '@/assets/css/public.css'
import '@/assets/css/index.scss'
import '@/untils/filter'
import {fetch} from '@/untils/fetch'
Vue.prototype.$fetch = fetch;
import until from '@/untils/until'
Vue.prototype.$until = until;

const pc_router = {
  "/self0":{path:'/self'},
  "/self1":{path:'/selfbond'},
  "/self2":{path:'/selfbidding'},
  "/self3":{path:'/selforder'},
}
router.beforeEach((to, from, next) => {
  //因为pc与h5要互相转化，但没提前说，个人这块路由不一样，在这处理下
  if(pc_router[to.path+to.query.ind]){
    let r = pc_router[to.path+to.query.ind];
    next({path:r.path});
  }
  //判断是否登录
  // let token = store.state.userInfo.token || window.localStorage.getItem('token');
  // if(!token&&to.name!='login'){
  //   next('/login');
  // }else{
  //   next();
  // }
  next();
})

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')

