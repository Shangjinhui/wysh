import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import '@/assets/js/element'
import '@/assets/css/public.css'
import '@/assets/css/index.scss'
import '@/untils/filter'
import {fetch} from '@/untils/fetch'
Vue.prototype.$fetch = fetch;
import {until} from '@/untils/until'
Vue.prototype.$until = until;
Vue.prototype.$eventBus = new Vue();

const h5_router = {
  "/selfedit":{path:'/self',query:{ind:0}},
  "/selfbond":{path:'/self',query:{ind:1}},
  "/selfbidding":{path:'/self',query:{ind:2}},
  "/selforder":{path:'/self',query:{ind:3}},
}
router.beforeEach((to, from, next) => {
  //console.log(to,'to',h5_router)
  //因为pc与h5要互相转化，但没提前说，个人这块路由不一样，在这处理下
  if(h5_router[to.path]){
    let r = h5_router[to.path];
    next({path:r.path,query:r.query});
  }

  //判断是否登录
  // let token = window.sessionStorage.getItem('token_pc');
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
  store,
  render: h => h(App),
}).$mount('#app')

