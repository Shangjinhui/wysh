<template>
  <div class="empty-block">
      <img src="@/assets/img/nodata.png" alt="">
      <p>{{desc}}</p>
  </div>
</template>

<script>
export default {
props:{
    desc:{
        type:String,
        default:'暂无相关信息'
    }
}
}
</script>

<style lang="scss" scoped>
.empty-block{
    width:100%;
    padding:45px 32px 0;
    img{
        width:324px;
        margin:0 auto;
    }
    p{
        font-size: 12px;
        color: #999999;
        line-height: 22px;
        margin-top:21px;
        text-align: center;
    }
}
</style>