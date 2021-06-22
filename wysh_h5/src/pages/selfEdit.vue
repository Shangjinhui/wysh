<template>
<div>
  <my-header title="个人资料"></my-header>
  <div class="selfedit-page">
    <ul class="form">
      <li class="flex-sp">
        <p>头像</p>
        <div class="avatar">
          <img :src="info.avatar||avatar" alt="" />
          <input type="file" ref="avatar" accept="image/*" />
        </div>

        <img class="r" src="@/assets/img/r1.png" alt="" />
      </li>
      <li class="flex-sp">
        <p>昵称</p>
        <input class="username" type="text" v-model="info.nickname" />
        <img class="r" src="@/assets/img/r1.png" alt="" />
      </li>
      <li class="flex-sp">
        <p>姓名</p>
        <p>{{ info.realname }}</p>
      </li>
      <li class="flex-sp">
        <p>手机号</p>
        <p>{{ info.phone }}</p>
      </li>
    </ul>

    <div class="btn" @click="Confirm"><p>保存</p></div>
  </div>
</div>
  
</template>

<script>
import myHeader from '@/components/myheader';
export default {
  components:{myHeader},
  data() {
    return {
      info: {},
      avatar_path:'',
      avatar:require('@/assets/img/avatar.png'),
    };
  },
  mounted() {
    this.$until.isLogin(this, (info) => {
      if (info) {
        this.info = info;
        this.avatar_path = info.avatarPath;
      }
    });
    this.initFile();
  },
  methods: {
    initFile(){
      var that=this;
      that.$nextTick(function(){
          that.$refs['avatar'].addEventListener('change',function(e){
              let file = this.files[0];
              let fromData = new FormData();
              fromData.append('file',file);
              // console.log(file);
              // that.$toast(file.name+';'+file.type);
              // return;
              that.$fetch({
                  url:'v1/member/uploadAvatar',
                  type:'post',
                  data:fromData
              }).then(res=>{
                  e.target.value = '';
                  if(res.returnCode == '200'){
                      that.$toast('上传成功！');
                      that.info.avatar = res.data.url;
                      that.avatar_path = res.data.path;
                  }else{
                      that.$toast(res.msg);
                  }
              })
          })
      })
    },
    Confirm(){
      this.$fetch({
          url:'v1/member/update',
          type:'post',
          data:{
            nickname:this.info.nickname,
            avatar:this.avatar_path
          }
      }).then(res=>{
          if(res.returnCode == '200'){
              this.$toast('保存成功');
              this.$router.push('/self');
          }else{
              this.$toast(res.msg);
          }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.selfedit-page {
  width: 100%;
  min-height: 100vh;
  background: #ebf1f5;
  padding-top: 40px;
  .form {
    background: #ffffff;
    li {
      height: 120px;
      padding: 0 61px 0 32px;
      box-shadow: 0px 1px 0px 0px #dddddd;
      font-size: 28px;
      color: #333333;
      position: relative;
      .avatar {
        width: 80px;
        height: 80px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      }
      .username {
        color: #999;
        font-size: 28px;
        text-align: right;
      }
      .r {
        width: 13px;
        position: absolute;
        right: 31px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .btn {
    width: 686px;
    height: 88px;
    font-size: 32px;
    color: #ffffff;
    line-height: 88px;
    text-align: center;
    background: #047cd3;
    border-radius: 6px;
    margin: 60px auto 0;
    position: relative;
    p {
      position: relative;
      z-index: 1;
    }
    &:after {
      content: "";
      width: 524px;
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
</style>