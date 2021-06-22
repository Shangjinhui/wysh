<template>
  <div class="self-block">
    <p class="title b">我的保证金</p>

    <div class="con flex-top">
      <div class="left">
        <p class="tit">{{page.title}}</p>
        <p class="des" v-html="page.content">
          
        </p>
        <div class="flex">
          <div class="code">
            <img :src="code.zfb" alt="" />
            <p>支付宝</p>
          </div>
          <div class="code">
            <img :src="code.wx" alt="" />
            <p>微信</p>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="tit">保证金可用余额</p>
        <p class="price">{{balance}}<span>元</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance:'',
      page:{},
      code:{},
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    getData(){
        this.$fetch({
            url: "v1/member/balance",
        }).then((res) => {
            if(res.returnCode=='200'){
                this.balance = res.data.info.balance;
                this.page = res.data.page;
                this.code = res.data.qrCode;
            }
        });
    }
  }
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
    margin-top: 39px;
    .left {
      width: 590px;
      min-height: 390px;
      border-right: 1px solid #eee;
      .tit {
        font-size: 14px;
        color: #333;
        line-height: 22px;
      }
      .des {
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        margin: 20px 0 33px;
      }
      .code {
        width: 190px;
        height: 190px;
        padding: 6px;
        box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: 1px solid #d5d5d5;
        margin-right: 73px;
        margin-left: 6px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        p {
          font-size: 14px;
          color: #666666;
          line-height: 22px;
          margin-top: 15px;
          text-align: center;
        }
      }
    }
    .right {
      padding-left: 52px;
      .tit {
        font-size: 14px;
        color: #333;
        line-height: 22px;
      }
      .price {
        font-size: 48px;
        color: #d40000;
        line-height:1;
        margin-top: 21px;
        span {
          font-size: 24px;
          color: #333;
        }
      }
    }
  }
}
</style>