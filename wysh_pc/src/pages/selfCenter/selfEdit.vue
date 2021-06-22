<template>
  <div class="self-block">
    <p class="title b">编辑个人信息</p>

    <div class="con">
      <div class="block mb23 flex">
        <p class="label">当前头像</p>
        <img class="avatar" :src="infos.avatar||avatar" alt="" />
        <div class="upload">
          <p>上传图片</p>
          <input class="upload" type="file" ref="avatar" accept="image/*" />
        </div>
      </div>
      <div class="block mb40 flex">
        <p class="label">昵称</p>
        <input class="input" type="text" v-model="infos.nickname" />
      </div>
      <div class="block mb54 flex">
        <p class="label">姓名</p>
        <p class="name">{{ infos.realname }}</p>
      </div>
      <div class="block mb50 flex">
        <p class="label">手机</p>
        <p class="name">{{ infos.phone }}</p>
      </div>
      <div class="btn cursor hover-deepen flex-center" @click="Confirm">
        <p>保存</p>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle} from '@/untils/until'
export default {
  props: {
    info: {},
  },
  data() {
    return {
      infos:{},
      avatar_path: "",
      avatar: require("@/assets/img/avatar.png"),
    };
  },
  watch:{
    info(val){
      this.infos = {...val};
      this.avatar_path = val.avatarPath;
    }
  },
  mounted() {
    this.infos = {...this.info};
    this.initFile();
  },
  methods: {
    initFile() {
      var that = this;
      that.$nextTick(function () {
        that.$refs["avatar"].addEventListener("change", function (e) {
          let file = this.files[0];
          let fromData = new FormData();
          fromData.append("file", file);
          that
            .$fetch({
              url: "v1/member/uploadAvatar",
              type: "post",
              data: fromData,
            })
            .then((res) => {
              e.target.value = "";
              if (res.returnCode == "200") {
                that.$message({message:"上传成功！",type:'success'});
                that.infos.avatar = res.data.url;
                that.avatar_path = res.data.path;
              } else {
                that.$message(res.msg);
              }
            });
        });
      });
    },
    Confirm:throttle(function(){
      this.$fetch({
        url: "v1/member/update",
        type: "post",
        data: {
          nickname: this.infos.nickname,
          avatar: this.avatar_path,
        },
      }).then((res) => {
        if (res.returnCode == "200") {
          this.$message({message:"保存成功",type:'success'});
          this.infos.avatarPath = this.avatar_path;
          this.$emit('editInfo',this.infos);
        } else {
          this.$message(res.msg);
        }
      });
    }),
  },
};
</script>

<style lang="scss" scoped>
.self-block {
  width: 100%;
  min-height: 534px;
  background: #ffffff;
  border-radius: 4px;
  padding: 24px 0;
  .title {
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    padding-left: 27px;
    border-left: 2px solid #467bcf;
  }
  .con {
    padding: 0 30px;
    margin-top: 41px;
    .block {
      &.mb23 {
        margin-bottom: 23px;
      }
      &.mb40 {
        margin-bottom: 40px;
      }
      &.mb54 {
        margin-bottom: 54px;
      }
      &.mb50 {
        margin-bottom: 50px;
      }
      .label {
        width: 68px;
        text-align: right;
        font-size: 12px;
        color: #333333;
        line-height: 22px;
        margin-right: 36px;
      }
      .avatar {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        margin-right: 17px;
      }
      .upload {
        width: 60px;
        line-height: 24px;
        border: 1px solid #bfbfbf;
        opacity: 0.8;
        border-radius: 2px;
        font-size: 12px;
        color: #999999;
        text-align: center;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      }
      .input {
        width: 292px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        font-size: 12px;
        color: rgba(153, 153, 153, 0.6);
        padding-left: 14px;
      }
      .name {
        font-size: 12px;
        color: #333333;
        line-height: 22px;
      }
    }
    .btn {
      width: 132px;
      line-height: 40px;
      text-align: center;
      background: #467bcf;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      margin-left: 68px;
      position: relative;
      p {
        z-index: 1;
      }
      &:after {
        content: "";
        width: 80%;
        height: 50%;
        background: #047cd3;
        opacity: 0.5;
        filter: blur(13px);
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translateX(-50%);
      }

      &:before{
        content: '';
      }
    }
  }
}
</style>