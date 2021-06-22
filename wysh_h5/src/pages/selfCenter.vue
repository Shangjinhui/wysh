<template>
  <div class="self-page">
      <div class="top">
          <router-link to="/selfedit" class="edit flex">
              <img src="@/assets/img/edit.png" alt="">
              <p>编辑</p>
          </router-link>

          <img class="avatar" :src="info.avatar||avatar" alt="">
          <p class="username">{{info.nickname}}</p>
          <div class="flex-center phone">
              <img class="icon" src="@/assets/img/phone2.png" alt="">
              <p>{{info.phone}}</p>
          </div>
      </div>

      <div class="con">
          <ul>
              <router-link tag="li" to="/selfbond" class="flex-sp">
                  <div class="flex1 flex-sp">
                      <div class="flex">
                          <img class="icon" src="@/assets/img/self1.png" alt="">
                          <p>我的保证金</p>
                      </div>
                      <div class="tip">{{info.balance}}元</div>
                  </div>
                  <img class="r" src="@/assets/img/r1.png" alt="">
              </router-link>
              <router-link tag="li" to="/selfbidding" class="flex-sp">
                  <div class="flex1 flex-sp">
                      <div class="flex">
                          <img class="icon" src="@/assets/img/self2.png" alt="">
                          <p>我的竞拍</p>
                      </div>
                  </div>
                  <img class="r" src="@/assets/img/r1.png" alt="">
              </router-link>
              <router-link tag="li" to="/selforder" class="flex-sp">
                  <div class="flex1 flex-sp">
                      <div class="flex">
                          <img class="icon" src="@/assets/img/self3.png" alt="">
                          <p>我的订单</p>
                      </div>
                  </div>
                  <img class="r" src="@/assets/img/r1.png" alt="">
              </router-link>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            info:{},
            avatar:require('@/assets/img/avatar.png'),
        }
    },
    mounted(){
        this.$until.isLogin(this,info=>{
            if(info){
                console.log(info);
                this.info = info;
            }
        })
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.self-page{
    .top{
        width:750px;
        height:369px;
        background:url('../assets/img/bg1.png') 0 0/cover no-repeat;
        padding-top:78px;
        position:relative;
        .edit{
            font-size:28px;
            color:#fff;
            position:absolute;
            top:49px;
            right:32px;
            img{
                width:32px;
                margin-right:10px;
            }
        }
        .avatar{
            width:120px;
            height:120px;
            border-radius: 50%;
            object-fit: cover;
            margin:0 auto;
        }
        .username{
            font-size: 36px;
            color: #FFFFFF;
            text-align: center;
            margin-top:24px;
        }
        .phone{
            margin-top:16px;
            font-size: 28px;
            color: #FFFFFF;
            .icon{
                width:24px;
                margin-right:9px;
            }
        }
    }
    .con{
        padding:0 32px;
        margin-top:55px;
        ul{
            li{
                width:100%;
                height:110px;
                box-shadow: 0px 1px 0px 0px #DDDDDD;
                font-size: 32px;
                color: #333333;
                .icon{
                    width:44px;
                    margin-right:25px;
                }
                .tip{
                    font-size: 28px;
                    color:#D40000;
                }
                .r{
                    width:13px;
                    margin-left:25px;
                }
            }
        }
    }
}
</style>