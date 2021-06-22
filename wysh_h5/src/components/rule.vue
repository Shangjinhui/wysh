<template>
  <div class="rule-page">
      <div class="con">
          <img class="close" src="@/assets/img/close2.png" alt="" @click="closeRule" />
          <p class="title">{{title}}</p>
          <div class="desc" v-html="desc">

          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'竞价规则'
        },
        desc:{
            type:String,
            default:''
        }
    },
    methods:{
        closeRule(){
            this.$emit('closeRule');
        }
    }
}
</script>

<style lang="scss" scoped>
.rule-page{
    width: 100vw;
    height:100vh;
    background: rgba(0, 0, 0, 0.85);
    position:fixed;
    left:0;
    top:0;
    z-index:11;
    .con{
        width: 686px;
        height: 50vh;
        background: #FFFFFF;
        border-radius: 10px;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding:26px 24px 26px 28px;
        .close {
            width: 96px;
            height: 96px;
            padding: 26px;
            position: absolute;
            right: 0px;
            top: 0px;
        }
        .title{
            font-size: 36px;
            color: #333333;
            line-height: 50px;
            text-align: center;
        }
        .desc{
            margin-top:28px;
            width: 100%;
            height:34vh;
            overflow: auto;
            font-size: 30px;
            color: #333333;
            line-height: 45px;
        }
    }
}
</style>