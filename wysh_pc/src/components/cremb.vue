<template>
  <div class="crembs">
      <ul class="flex">
          <li>您的位置：</li>
          <li class="flex" v-for="(item,index) in cremb" :key="index">
              <a v-if="item.link" :href="item.link">{{item.title}}</a>
              <p v-else>{{item.title}}</p>
              <p class="line" v-if="index<cremb.length-1">/</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cremb:[
                {title:'首页',link:'http://www.nbwysh.cn/index.php/welcome'},
                {title:'竞拍大厅'},
                {title:'竞拍详情'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.crembs{
    padding:16px 0;
    li{
        font-size: 12px;
        color: #999;
        &:last-child{
            color: #666;
        }
        a{
            font-size: 12px;
            color: #999;
        }
        .line{
            padding:0 5px;
        }
        // &:last-child{
        //     a,p{
        //         color:#666;
        //     }
        // }
    }
}
</style>