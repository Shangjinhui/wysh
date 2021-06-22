<template>
  <div class="login-page">
    <div class="login">
      <div class="right">
        <p class="title">炜烨塑化,欢迎您！</p>
        <input class="input" type="text" placeholder="请输入手机号" v-model="phone">
        <input class="input" type="password" placeholder="请输入密码" v-model="psw">
        <p class="desc">忘记密码或注册账号请联系管理员</p>
        <div class="btn cursor hover-deepen" @click="Confirm">立即登录</div>
      </div>
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
methods:{
  Confirm(){
    this.$fetch({
        url: "v1/login/loginByPassword",
        type:'post',
        data: {
          phone:this.phone,
          password:this.psw
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            window.sessionStorage.setItem('token_pc',res.data.token);
            this.$message({message:'登录成功',type:'success'});
            this.$eventBus.$emit('lisToken',true);
            //继续获取个人信息
            //this.getInfo();
            let url = this.$route.query.url;
            if(url){
              window.location.replace(decodeURIComponent(url));
            }else if(window.history.length>=1){
              window.location.href="javascript:history.go(-1)";
            }else{
              this.$router.replace('/self');
            }
        }else{
          this.$message(res.msg);
        }
      });
  }
}
}
</script>

<style lang="scss" scoped>
.login-page{
  width:100%;
  min-height:630px;
  background:#edf1f4;
  padding-top:63px;
  .login{
    width: 695px;
    height:472px;
    background:url('../assets/img/bg1.png') 0 0/cover no-repeat;
    margin: 0 auto;
    position: relative;
    .right{
      width:344px;
      height:100%;
      padding-top:92px;
      position: absolute;
      right:0;
      top:0;
      .title{
        font-size: 24px;
        color: #333333;
        line-height: 24px;
        margin-bottom:30px;
      }
      .input{
        width: 292px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        font-size:12px;
        padding-left:12px;
        margin-bottom:12px;
      }
      .desc{
        font-size: 12px;
        color: #666666;
        margin-bottom:32px;
      }
      .btn{
        width: 292px;
        height: 40px;
        background: #467BCF;
        border: 1px solid #EEEEEE;
        box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>