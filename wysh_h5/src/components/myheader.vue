<template>
  <div class="my-header-page">
      <img class="back" src="@/assets/img/back.png" alt="" @click="toBack">
      <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
props:{
    title:{
        type:String,
        default:''
    }
},
methods:{
    toBack(){
        //如果从登录页过来的话有问题，所
        //window.history.back(-1);
        this.$router.replace('/self');
    }
}
}
</script>

<style lang="scss" scoped>
.my-header-page{
    width:750px;
    height:88px;
    position: relative;
    .back{
        width:64px;
        height:64px;
        padding:10px;
        object-fit: cover;
        position:absolute;
        left:22px;
        top:50%;
        transform: translateY(-50%);
    }
    .title{
        width:100%;
        line-height:88px;
        text-align: center;
        font-size:36px;
        color:#333;
    }
}
</style>