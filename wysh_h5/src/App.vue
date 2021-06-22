<template>
  <div id="app">
    <my-header v-show="isHeader"></my-header>
    <keep-alive v-if="$route.meta.cache">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components:{myHeader},
  name: 'App',
  data(){
    return {
      isHeader:false
    }
  },
  watch:{
    $route(val){
      //console.log(val)
      let white = ['/login','/selfedit','/selfbond','/selfbidding','/selforder'];
      this.isHeader = white.indexOf(val.path)!=-1?false:true;
    }
  },
  mounted(){ 
  },
  methods:{
  }
}
</script>
