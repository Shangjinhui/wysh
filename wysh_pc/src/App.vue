<template>
  <div>
    <my-header></my-header>
    <keep-alive v-if="$route.meta.cache">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
    <my-footer></my-footer>
  </div>
</template>
<script>
import myHeader from '@/components/header'
import myFooter from '@/components/footer'
export default {
  name: 'App',
  components:{myHeader,myFooter}
}
</script>
