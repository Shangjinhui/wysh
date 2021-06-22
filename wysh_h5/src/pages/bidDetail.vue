<template>
  <div class="bid-d-page">
    <my-rule v-if="showRule" :desc="rules.content" :title="rules.title" @closeRule="showRule=false"></my-rule>
    <div class="kv">
      <img :src="detail.photoUrl" alt="" />
    </div>
    <div class="p-out flex" v-if="type == 1">
      <div class="price flex-end">
        <span>¥</span>
        <p v-html="$until.smallPoint(detail.biddingMaxPrice)">
          {{ detail.biddingMaxPrice }}
        </p>
      </div>
      <div>
        <p class="min">最低价{{ detail.biddingMinPrice }}元</p>
        <p class="noyet">未出价{{ detail.leftTon }}吨</p>
      </div>
      <div class="dis-end">
        <p class="tip">距结束仅剩</p>
        <ul class="flex timer-out">
          <li>{{ time.h }}</li>
          :
          <li>{{ time.m }}</li>
          :
          <li>{{ time.s }}</li>
        </ul>
      </div>
    </div>
    <div class="line" v-else></div>
    <div class="main">
      <p class="title b">{{ detail.title }}</p>
      <ul class="btm flex" v-if="type != 3">
        <li class="flex1">
          <p class="desc">竞拍总量</p>
          <p class="num">{{ detail.totalTon }}吨</p>
        </li>
        <li class="flex1">
          <p class="desc">起拍价</p>
          <p class="num">{{ detail.minUnitPrice }}元</p>
        </li>
        <li class="flex1">
          <p class="desc">起拍量</p>
          <p class="num">{{ detail.minTon }}吨</p>
        </li>
      </ul>
      <ul class="btm flex" v-else>
        <li class="flex1">
          <p class="desc">竞拍总量</p>
          <p class="num">{{ detail.totalTon }}吨</p>
        </li>
        <li class="flex1">
          <p class="desc">成交底价</p>
          <p class="num">{{ detail.defaultPrice }}元</p>
        </li>
        <li class="flex1">
          <p class="desc">成交高价</p>
          <p class="num">{{ detail.dealMaxPrice }}元</p>
        </li>
        <li class="flex1">
          <p class="desc">成交吨数</p>
          <p class="num">{{ detail.dealTon }}吨</p>
        </li>
      </ul>
      <div v-if="type != 1">
        <div class="time flex">
          <img src="@/assets/img/time.png" alt="" />
          <p>
            开始时间：<span class="colE30404">{{
              detail.startTimeline | exTime
            }}</span>
          </p>
        </div>
        <div class="time flex">
          <img src="@/assets/img/time.png" alt="" />
          <p>
            结束时间：<span class="colE30404">{{
              detail.endTimeline | exTime
            }}</span>
          </p>
        </div>
      </div>
      <div class="txt">
        <p>发货仓库：{{ detail.goodsAddress }}</p>
        <p>货物规格：{{ detail.goodsAttribute }}</p>
        <p>产品用途：{{ detail.goodsPurpose }}</p>
      </div>
    </div>

    <div class="container">
      <div class="top flex">
        <p
          class="flex1"
          :class="[{ 'select b': selected == index }]"
          v-for="(item, index) in tabs"
          :key="index"
          @click="selected = index"
        >
          {{ item.title }}
        </p>
      </div>
      <!-- 商品详情 -->
      <div class="detail" v-show="selected == 0" v-html="$until.richText(detail.content)"></div>
      <!-- 出价历史 -->
      <div class="hisroty" v-show="selected == 1">
        <ul class="flex th">
          <li class="flex1">出价人</li>
          <li class="flex1">出价金额</li>
          <li class="flex1">出价数量</li>
          <li class="flex1">入围数量</li>
          <li class="flex1">出价时间</li>
          <li class="flex1">状态</li>
        </ul>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="20"
        >
          <li
            class="tr"
            :class="[{ self: item.userInfo.isMe == 1, grey: item.status == 2 }]"
            v-for="(item, index) in hisList"
            :key="index"
          >
            <ul class="flex">
              <li class="flex1">
                {{ item.userInfo.isMe == 1 ? "我" : item.userInfo.nickname }}
              </li>
              <li class="flex1">￥{{ item.unitPrice }}</li>
              <li class="flex1">{{ item.totalTon }}</li>
              <li class="flex1">{{ item.dealTon }}</li>
              <li class="flex1">{{ item.timeline | exTime3 }}</li>
              <li class="flex1" :class="[{ colE30404: item.status == 1 }]">
                {{ item.statusVal }}
              </li>
            </ul>
          </li>
        </ul>
        <p class="load" v-if="hisList.length>0">
          {{ loading ? "加载中..." : "已经到底了！" }}
        </p>
        <my-empty v-else></my-empty>
      </div>
    </div>
    <!-- btm -->
    <div class="fix-btm flex">
      <p class="pay flex-center">
        保证金：<span class="colD50303">{{ detail.depositPrice }}</span
        >元
      </p>
      <div class="btn flex-center" v-if="type == 1" @click="toBuy">
        <p>立即出价</p>
      </div>
      <div class="btn over flex-center" v-else-if="type == 2">
        <p>即将开始</p>
      </div>
      <div class="btn over flex-center" v-else-if="type == 3">
        <p>已结束</p>
      </div>
    </div>
    <!-- 出价时支付提示 -->
    <div class="mask-out" v-if="showParams||showTip">
      <!-- 出价参数 -->
      <div class="p-params" v-if="showParams">
        <img
          class="close"
          src="@/assets/img/close2.png"
          alt=""
          @click="showParams = false"
        />
        <p class="tip b">选择出价参数</p>
        <div class="li">
          <p class="label b">竞拍价格（元/吨）:</p>
          <div class="flex">
            <div class="title flex">
              <p>加价幅度：{{ detail.addPrice }}元/吨</p>
            </div>
            <div class="r flex">
              <p
                class="reduce"
                :class="[{ limit: unit <= detail.minUnitPrice }]"
                @click="Reduce('unit', detail.addPrice,detail.minUnitPrice)"
              >
                -
              </p>
              <input class="input" type="number" v-model="unit">
              <!-- <p class="input">{{unit}}</p> -->
              <p
                class="add"
                @click="Add('unit', detail.addPrice)"
              >
                +
              </p>
            </div>
          </div>
        </div>
        <div class="li">
          <p class="label b">竞拍数量（吨）:</p>
          <div class="flex">
            <div class="title flex">
              <p>加量幅度：{{ detail.addTon }}吨</p>
            </div>
            <div class="r flex">
              <p
                class="reduce"
                :class="[{ limit: num <= detail.minTon }]"
                @click="Reduce('num', detail.addTon,detail.minTon)"
              >
                -
              </p>
              <!-- <input type="text" v-model="num" disabled /> -->
              <p class="input">{{num}}</p>
              <p
                class="add"
                @click="Add('num', detail.addTon)"
              >
                +
              </p>
            </div>
          </div>
        </div>
        <div
          class="btn"
          @click="toOffer"
        >
          立即出价
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="tip-out" v-if="showTip">
        <p class="title">温馨提示</p>
        <div class="desc">
          参与本次竞拍，需支付保证金<span class="colD30404">{{
            detail.depositPrice
          }}</span
          >元，<br />
          将直接从您账户余额中锁定。<br />
          当前账户余额：{{info.balance}}元。
        </div>
        <div class="rule flex">
          <img
            v-if="agree"
            class="radio"
            src="@/assets/img/radios.png"
            alt=""
            @click="agree = !agree"
          />
          <img
            v-else
            class="radio"
            src="@/assets/img/radio.png"
            alt=""
            @click="agree = !agree"
          />
          <p>已认真阅读并同意 <span class="col1A82D5" @click="showRule=true">《竞价规则》</span></p>
        </div>
        <div class="btn-out flex">
          <div class="flex1 cancle" @click="showTip = false">取 消</div>
          <div class="flex1 confirm" @click="Confirm">确 认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myRule from '@/components/rule';
import myEmpty from '@/components/empty';
export default {
  components:{myRule,myEmpty},
  data() {
    return {
      id:'',
      type: 1, //1进行中2即将开始3已结束
      detail:{},
      timer:null,
      dis_time:0,                               //后台返回的时差
      time:{h:'',m:'',s:''},             //倒计时
      tabs: [{ title: "商品详情" }, { title: "出价历史" }],
      selected: 1,
      hisList:[],                     //出价历史
      loading: false,
      page:1,
      limit:20,
      total:0,

      showParams: false,
      showTip: false,
      agree: false,
      unit: 0, //竞拍价格（元/吨）
      // unit_max: 10,
      num: 0, //竞拍数量（吨）:
      // num_max: 10,

      info:{},         //用户信息

      showRule:false,
      rules:{},
    };
  },
  mounted(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.getData();
    this.getRule();
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods: {
    getRule(){
      this.$fetch({
        url: "v1/common/page",
        data: {
          categoryId:2
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.rules = res.data;
        }
      });
    },
    getData(){
      this.$fetch({
        url: "v1/bidding/biddingInfo",
        data: {
          biddingId:this.id
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.detail = res.data;
            this.type = res.data.status;
            this.dis_time = res.data.leftTime;
            this.unit = Number(res.data.minUnitPrice);
            this.num = Number(res.data.minTon);
            this.initTimer();
            this.getHisList();
        }else{
          this.$toast(res.msg);
        }
      });
    },
    initTimer(){
      // let star = this.detail.startTimeline,
      // end = this.detail.endTimeline,
      // type = this.detail.status;
      // let nowTime = new Date().getTime();
      // if(type==1&&nowTime>star*1000&&nowTime<end*1000){
      //   this.setTimer();
      //   clearInterval(this.timer);
      //   this.timer = setInterval(this.setTimer,1000)
      // }
      let type = this.detail.status,dis_time = this.dis_time;
      if(type==1&&dis_time>0){
        this.setTimer();
        clearInterval(this.timer);
        this.timer = setInterval(this.setTimer,1000)
      }
    },
    setTimer(){
      // let end = this.detail.endTimeline*1000,now = new Date().getTime();
      // //console.log(end > now)
      // if(end > now){
      //   let h = parseInt((end-now)/3600000),
      //   m = parseInt(((end-now)%3600000)/60000),
      //   s = parseInt((end-now-h*3600000-m*60000)/1000);
      //   this.time = {
      //     h:h<10?'0'+h:h,
      //     m:m<10?'0'+m:m,
      //     s:s<10?'0'+s:s,
      //   }
      // }else{
      //   clearInterval(this.timer);
      //   this.page = 1;
      //   this.total = 0;
      //   this.hisList = [];
      //   this.getData();
      // }
      let dis_time = this.dis_time;
      if(dis_time>0){
          let h = parseInt(dis_time/3600),
          m = parseInt((dis_time%3600)/60),
          s = parseInt((dis_time-h*3600-m*60)/1);
          this.time = {
            h:h<10?'0'+h:h,
            m:m<10?'0'+m:m,
            s:s<10?'0'+s:s,
          }
      }else{
          clearInterval(this.timer);
          this.page = 1;
          this.total = 0;
          this.hisList = [];
          this.getData();
      }
      this.dis_time--;
    },
    getHisList(){
      this.loading = true;
      this.$fetch({
        url: "v1/bidding/biddingRecordList",
        data: {
          biddingId:this.id,
          page:this.page,
          limit:this.limit
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            let hisList = [...this.hisList];
            this.hisList = [...hisList,...res.data.successList.list,...res.data.failList.list];
            this.total = res.data.failList.count;
        }
        this.loading = false;
      });
    },
    loadMore() {
      if (this.page * this.limit < this.total && this.selected == 1) {
        this.page++;
        this.getHisList();
      }
    },
    Reduce(type,unit,min) {
      this[type] = Number(this[type]);
      if (this[type] > min) {
        this[type] -= Number(unit);
        this[type] = this.$until.mathNumber(this[type]);
      }
    },
    Add(type,unit) {
      // if (this[type] < this[type + "_max"]) {
      //   this[type] += Number(unit);
      // }
      this[type] = Number(this[type]);
      this[type] += Number(unit);
      this[type] = this.$until.mathNumber(this[type]);
    },
    toBuy(){
      //先判断登录态
      this.$until.isLogin(this,info=>{
        if(info){
          this.info = info;
          //在判断是否是第一次出价
          if(this.detail.isFirst==1){
            this.showTip = true;
          }else{
            this.showParams = true;
          }
          
        }
      })
    },
    Confirm(){
      //console.log(this.agree);
      //this.$toast(''+this.detail.depositPrice+'/'+this.info.balance)
      if(Number(this.detail.depositPrice)>Number(this.info.balance)){
        this.$toast('余额不足');
        return;
      }
      if(!this.agree){
        this.$toast('请勾选同意竞价规则');
        return;
      }
      this.showTip = false;
      this.$nextTick(()=>{
        this.showParams = true;
      })
      
    },
    toOffer(){
      let unit=this.unit,minUnitPrice = Number(this.detail.minUnitPrice),addPrice = Number(this.detail.addPrice);
      if(unit<minUnitPrice){
        this.$message('出价失败,竞拍价格小于起拍价!');
        return;
      }else if((unit-minUnitPrice)%addPrice!=0){
        this.$message('出价失败,加价量应为加价幅度的整数倍!');
        return;
      }
      this.$fetch({
        url: "v1/bidding/biddingOffer",
        type:'post',
        data: {
          biddingId:this.id,
          unitPrice:this.unit,
          totalTon:this.num
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.$toast('参与竞拍成功!');
            this.showParams = false;
            this.page = 1;
            this.total = 0;
            this.hisList = [];
            this.getData();
        }else{
          this.$toast(res.msg);
        }
      });
    },
    // inputPrice(){
    //   let unit=this.unit,minUnitPrice = Number(this.detail.minUnitPrice),addPrice = Number(this.detail.addPrice);
    //   if(unit<minUnitPrice){
    //     this.unit = minUnitPrice;
    //   }else if((unit-minUnitPrice)%addPrice!=0){
    //     this.unit = parseInt((unit-minUnitPrice)/addPrice)*addPrice+minUnitPrice;
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
.bid-d-page {
  padding-bottom: 98px;
  .kv {
    width: 100%;
    height: 517px;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .p-out {
    width: 100%;
    height: 118px;
    background: #d30404;
    padding-left: 32px;
    position: relative;
    .price {
      font-size: 75px;
      color: #ffffff;
      margin-right: 15px;
      span {
        font-size: 33px;
        padding-bottom: 2px;
      }
    }
    .min {
      font-size: 24px;
      color: #ffffff;
      line-height: 33px;
    }
    .noyet {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 36px;
      padding: 0 16px 0 8px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-top: 11px;
    }
    .dis-end {
      width: 246px;
      height: 100%;
      background: url("../assets/img/bg3.png") center/cover no-repeat;
      padding-top: 16px;
      position: absolute;
      top: 0;
      right: 0;
      .tip {
        font-size: 26px;
        color: #ea0707;
        line-height: 37px;
        padding-left: 76px;
        margin-bottom: 12px;
      }
      .timer-out {
        padding-left: 64px;
        color: #4d3100;
        font-size: 26px;
        line-height: 42px;
        li {
          width: 42px;
          height: 42px;
          background: #4d3100;
          border-radius: 4px;
          font-size: 26px;
          color: #ffffff;
          text-align: center;
          margin: 0 5px;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 32px;
    background: linear-gradient(
      180deg,
      #d8d8d8 0%,
      rgba(238, 238, 238, 0) 100%
    );
    opacity: 0.3;
  }
  .main {
    background: #fff;
    border-bottom: 20px solid #ebf1f5;
    padding: 33px 32px 55px;
    .title {
      font-size: 30px;
      color: #333333;
      line-height: 42px;
      margin-bottom: 22px;
    }
    .btm {
      width: 100%;
      height: 137px;
      padding: 30px 0;
      background: rgba(236, 247, 255, 0.6);
      border-radius: 10px;
      overflow: hidden;
      margin-top: 20px;
      margin-bottom: 22px;
      li {
        height: 68px;
        border-right: 1px solid rgba(151, 151, 151, .3);
        padding-left: 28px;
        &:first-child {
          padding-left: 36px;
        }
        &:last-child {
          border-right: 0;
        }
        .desc {
          font-size: 24px;
          color: #666666;
          line-height: 33px;
        }
        .num {
          font-size: 28px;
          color: #333333;
          line-height: 33px;
          margin-top: 8px;
        }
      }
    }
    .time {
      margin-bottom: 11px;
      font-size: 24px;
      color: #333;
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
      .colE30404 {
        color: #e30404;
      }
    }
    .txt {
      margin-top: 22px;
      font-size: 26px;
      color: #666666;
      line-height: 44px;
    }
  }
  .container {
    background: #fff;
    .top {
      width: 686px;
      margin: 0 auto;
      padding: 31px 0 27px;
      box-shadow: 0px 1px 0px 0px #dddddd;
      p {
        font-size: 24px;
        color: #666666;
        line-height: 33px;
        text-align: center;
        border-right: 1px solid #979797;
        &:last-child {
          border-right: 0;
        }
        &.select {
          color: #333;
        }
      }
    }
    .detail {
      min-height: 470px;
      padding: 28px 32px;
      font-size: 26px;
      color: #333;
      line-height: 37px;
    }
    .hisroty {
      min-height: 470px;
      .th {
        width: 100%;
        height: 88px;
        background: #f4f4f4;
        font-size: 24px;
        color: #333333;
        line-height: 33px;
        text-align: center;
      }
      .tr {
        width: 100%;
        height: 88px;
        font-size: 24px;
        color: #333333;
        line-height: 33px;
        text-align: center;
        ul {
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(2n + 2) {
          background: #f4f4f4;
        }
        .colE30404 {
          color: #e30404;
        }
        &.self {
          background: rgba(211, 4, 4, 0.07);
          color: #d30404;
        }
      }
    }
  }
  .fix-btm {
    width: 100%;
    height: 98px;
    background: #ffffff;
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    bottom: 0;
    .pay {
      width: 277px;
      font-size: 26px;
      color: #333333;
      .colD50303 {
        color: #d50303;
      }
    }
    .btn {
      width: 473px;
      height: 100%;
      background: #d30404;
      text-align: center;
      font-size: 32px;
      color: #ffffff;
      &.over {
        background: #888888;
      }
    }
  }
  .mask-out {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    .p-params {
      width: 100%;
      padding-top: 38px;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      .close {
        width: 44px;
        height: 44px;
        position: absolute;
        right: 32px;
        top: 29px;
      }
      .tip {
        font-size: 36px;
        color: #333333;
        line-height: 50px;
        text-align: center;
        margin-bottom: 50px;
      }
      .li {
        padding: 0 32px;
        margin-bottom: 40px;
        .label {
          font-size: 28px;
          color: #333333;
          line-height: 40px;
          margin-bottom: 16px;
        }
        .title {
          width: 333px;
          height: 80px;
          background: #f1f3f4;
          font-size: 24px;
          color: #333333;
          line-height: 33px;
          padding: 0 30px;
        }
        .r {
          .reduce,
          .add {
            width: 80px;
            line-height: 80px;
            background: #d30404;
            font-size: 36px;
            color: #fff;
            text-align: center;
            &.limit {
              background: #bdbdbd;
            }
          }
          input,.input {
            width: 174px;
            height: 80px;
            background: #ffffff;
            border: 1px solid #d30404;
            margin: 0 10px;
            font-size: 28px;
            color: #333333;
            line-height: 80px;
            text-align: center;
          }
        }
      }
      .btn {
        width: 100%;
        line-height: 98px;
        background: #d30404;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
      }
    }
    .tip-out {
      width: 100%;
      padding: 33px 0 0;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      .title {
        font-size: 36px;
        color: #333333;
        line-height: 50px;
        text-align: center;
        margin-bottom: 28px;
      }
      .desc {
        font-size: 30px;
        color: #333333;
        text-align: center;
        line-height: 42px;
        padding-bottom: 48px;
        .colD30404 {
          color: #d30404;
        }
      }
      .rule {
        width: 100%;
        height: 72px;
        background: #ecf7ff;
        padding: 0 32px;
        font-size: 26px;
        color: #333333;
        line-height: 37px;
        .radio {
          width: 44px;
          height: 44px;
          margin-right: 16px;
        }
        .col1A82D5 {
          color: #1a82d5;
        }
      }
      .btn-out {
        width: 100%;
        font-size: 32px;
        line-height: 98px;
        text-align: center;
        .cancle {
          color: #999;
        }
        .confirm {
          background: #d30404;
          color: #fff;
        }
      }
    }
  }
}
</style>