<template>
  <div class="login-page">
    <img class="close" src="@/assets/img/close.png" alt="" @click="toBack" />
    <div class="con">
      <p class="title">登录</p>
      <p class="tip">忘记密码或注册账号请联系管理员</p>
      <ul class="form">
        <li class="flex">
          <img src="@/assets/img/phone.png" alt="" />
          <input class="flex1" type="text" v-model="phone" placeholder="请输入手机号" />
        </li>
        <li class="flex">
          <img src="@/assets/img/psw.png" alt="" />
          <input class="flex1" type="password" v-model="psw" placeholder="请输入密码" />
        </li>
      </ul>

      <div class="btn" @click="Login"><p>立即登录</p></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      phone:'',
      psw:''
    }
  },
  mounted() {

  },
  methods:{
    toBack(){
      this.$router.go(-1);
    },
    Login(){
      this.$fetch({
        url: "v1/login/loginByPassword",
        type:'post',
        data: {
          phone:this.phone,
          password:this.psw
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            window.sessionStorage.setItem('token_h5',res.data.token);
            this.$toast('登录成功');
            //继续获取个人信息
            //this.getInfo();
            let url = this.$route.query.url;
            if(url){
              //window.location.href = decodeURIComponent(url);
              window.location.replace(decodeURIComponent(url));
            }else if(window.history.length>=1){
              window.location.href="javascript:history.go(-1)";
            }else{
              this.$router.replace('/self');
            }
        }else{
          this.$toast(res.msg);
        }
      });
    },
    // getInfo(){
    //   this.$fetch({
    //     url: "v1/member/info",
    //   }).then((res) => {
    //     if(res.returnCode=='200'){
    //         let info = res.data;
    //         window.sessionStorage.setItem('info_h5',encodeURI(JSON.stringify(info)));
    //         let url = this.$route.query.url;
    //         console.log(url)
    //         if(url){
    //           window.location.href = decodeURIComponent(url);
    //         }else{
    //           this.$router.go(-1);
    //         }
    //     }else{
    //       this.$toast(res.msg);
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  min-height:100vh;
  background:url('../assets/img/bg4.png') left bottom/100% auto no-repeat;
  .close {
    width: 96px;
    height: 96px;
    padding: 26px;
    position: absolute;
    right: 34px;
    top: 34px;
  }
  .con {
    padding: 163px 60px 0;
    .title {
      display: inline-block;
      font-size: 60px;
      color: #333333;
      line-height: 84px;
      position: relative;
      &:before {
        content: "";
        width: 100%;
        height: 20px;
        background: #037cd3;
        opacity: 0.5;
        position: absolute;
        left: 0;
        bottom: 7px;
      }
    }
    .tip {
      font-size: 24px;
      color: #999999;
      line-height: 33px;
      margin-top: 21px;
    }
    .form {
      margin-top: 78px;
      li {
        padding: 28px 0;
        border-bottom: 1px solid #dddddd;
        font-size: 28px;
        img {
          width: 36px;
          height: 36px;
          margin-right: 12px;
        }
        input {
          font-size: 28px;
          padding-left: 23px;
          border-left: 1px solid rgba(151,151,151,.5);
        }
      }
    }
    .btn {
      width: 100%;
      height: 88px;
      font-size: 32px;
      color: #ffffff;
      line-height: 88px;
      text-align: center;
      background: #047cd3;
      border-radius: 6px;
      margin-top: 67px;
      position: relative;
      p {
        position: relative;
        z-index: 1;
      }
      &:after {
        content: "";
        width: 474px;
        height: 51px;
        background: #047cd3;
        border-radius: 5px;
        opacity: 0.5;
        filter: blur(13px);
        position: absolute;
        left: 50%;
        top: 42px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>