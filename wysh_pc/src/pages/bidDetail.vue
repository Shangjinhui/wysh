<template>
  <div class="biddetail">
    <div class="bid-inner">
      <my-cremb></my-cremb>
      <div class="top-main flex-top">
        <div class="pic">
          <img :src="detail.photoUrl" alt="" />
          <div class="sign1" v-if="type==2">即<br />将<br />开<br />始</div>
          <div class="sign2" v-if="type==1">
              <img src="@/assets/img/point.png" alt="">
              <p>竞<br/>拍<br/>中</p>
          </div>
          <div class="sign3" v-if="type==3">竞<br/>拍<br/>结<br/>束</div>
        </div>
        <div class="right flex1">
          <p class="title b">{{ detail.title }}</p>
          <div class="time flex">
            <p>开始时间：<span>{{detail.startTimeline | exTime}}</span></p>
            <p>结束时间：<span>{{detail.endTimeline | exTime}}</span></p>
          </div>
          <div class="time flex">
            <p>收款截止：<span>{{detail.expirationTimeline | exTime}}</span></p>
            <p>发货仓库：<span class="col666">{{detail.goodsAddress}}</span></p>
          </div>
          <ul class="flex params">
            <li class="flex1">
              <p>竞拍总量</p>
              <p class="num">{{ detail.totalTon }}吨</p>
            </li>
            <li class="flex1">
              <p>起拍价</p>
              <p class="num">{{ detail.minUnitPrice }}元/吨</p>
            </li>
            <li class="flex1">
              <p>起拍量</p>
              <p class="num">{{ detail.minTon }}吨</p>
            </li>
            <li class="flex1">
              <p>保证金</p>
              <p class="num">{{ detail.depositPrice }}元</p>
            </li>
            <li class="flex1" v-if="type==3">
              <p>成交底价</p>
              <p class="num">{{ detail.defaultPrice }}元</p>
            </li>
          </ul>
          <div class="specs">
            <p>货物规格：<span>{{detail.goodsAttribute}}</span></p>
            <p>
              产品用途：<span>{{detail.goodsPurpose}}</span>
            </p>
          </div>
          <div class="btm flex">
            <div class="flex mr34">
              <img class="look" src="@/assets/img/icon3.png" alt="" />
              <p>浏览量：{{detail.views}}</p>
            </div>
            <div class="flex" v-if="type!=2">
              <img class="cj" src="@/assets/img/icon4.png" alt="" />
              <p>出价：<span class="col333">{{detail.offerMember}}</span>人</p>
            </div>
          </div>
        </div>
      </div>

      <div class="attach flex-sp-top">
        <div class="left">
          <ul class="tabs flex">
            <li
              class="cursor"
              :class="[{ select: select == 0 }]"
              @click="select = 0"
            >
              商品详情
            </li>
            <li
              class="cursor"
              :class="[{ select: select == 1 }]"
              @click="select = 1"
            >
              出价历史
            </li>
          </ul>
          <!-- 详情 -->
          <div class="content" v-show="select == 0" v-html="$until.richText(detail.content)"></div>
          <!-- 历史 -->
          <div class="history" v-show="select == 1">
            <ul class="th flex b">
              <li class="flex1">状态</li>
              <li class="flex1">出价人</li>
              <li class="flex1">出价金额</li>
              <li class="flex1">出价数量</li>
              <li class="flex1">入围数量</li>
              <li class="flex1">出价时间</li>
            </ul>

            <div class="infinite-list-wrapper scroll">
              <template v-if="hisList.length>0">
                <ul
                  class="list"
                  v-infinite-scroll="load"
                  infinite-scroll-disabled="disabled"
                >
                  <li
                    v-for="(item, index) in hisList"
                    class="list-item"
                    :key="index"
                  >
                    <ul class="tr flex">
                      <li class="status on flex1" v-if="item.status==1"><p>{{item.statusVal}}</p></li>
                      <li class="status flex1" v-else><p>{{item.statusVal}}</p></li>
                      <li class="flex1">{{ item.userInfo.isMe == 1 ? "我" : item.userInfo.nickname }}</li>
                      <li class="flex1">￥{{ item.unitPrice }}</li>
                      <li class="flex1">{{item.totalTon}}</li>
                      <li class="flex1">{{item.dealTon}}</li>
                      <li class="flex1">{{item.timeline | exTime3}}</li>
                    </ul>
                  </li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </template>
              <my-empty v-else desc="暂无出价记录"></my-empty>
            </div>
            
          </div>
        </div>
        <div class="right">
          <div class="top">我的出价</div>
          <div class="con">
            <ul class="th flex b">
              <li class="flex1">状态</li>
              <li class="flex1">出价人</li>
              <li class="flex1">出价金额</li>
              <li class="flex1">出价数量</li>
              <li class="flex1">入围数量</li>
              <li class="flex1">出价时间</li>
            </ul>
            <template v-if="selfList.length>0">
              <div class="scroll">
                <ul class="tr flex" v-for="(item, index) in selfList" :key="index">
                  <li class="status on flex1" v-if="item.status==1"><p>{{item.statusVal}}</p></li>
                  <li class="status flex1" v-else><p>{{item.statusVal}}</p></li>
                  <li class="flex1">我</li>
                  <li class="flex1">￥{{ item.unitPrice }}</li>
                  <li class="flex1">{{item.totalTon}}</li>
                  <li class="flex1">{{item.dealTon}}</li>
                  <li class="flex1">{{item.timeline | exTime3}}</li>
                </ul>
              </div>
              <template v-if="type==3">
                <div class="btm flex" v-if="selfList.some(item=>item.status==1)">
                  <img class="icon" src="@/assets/img/icon5.png" alt="" />
                  <div>
                    <p class="tip b">恭喜您！</p>
                    <p class="desc">
                      您参与的竞拍已中标，入围数量{{selfList[0].dealTon}}吨，出价金额¥{{selfList[0].unitPrice}}，谢谢您的参与!
                    </p>
                  </div>
                </div>
                <div class="btm flex" v-else>
                  <img class="icon" src="@/assets/img/icon6.png" alt="" />
                  <div>
                    <p class="tip b">很遗憾</p>
                    <p class="desc">
                      您参与的竞拍未能中标，请留意其他竞拍信息，谢谢您的参与!
                    </p>
                  </div>
                </div>
              </template>
              
            </template>
            <my-empty v-else desc="暂无出价记录"></my-empty>
          </div>
        </div>
      </div>
    </div>
    <!-- 竞价中 -->
    <div class="bottom" :class="[{'grey':type==3}]" v-if="type!=2">
      <div class="inner flex">
        <ul class="params flex">
          <li class="flex1">
            <p>入局最低报价</p>
            <p class="num">￥{{detail.biddingMinPrice}}</p>
          </li>
          <li class="flex1">
            <p>入局最高报价</p>
            <p class="num colD30404">￥{{detail.biddingMaxPrice}}</p>
          </li>
          <li class="flex1">
            <p>未出价数量</p>
            <p class="num">{{detail.leftTon}}吨</p>
          </li>
        </ul>
        <div>
          <p class="time-tip" v-if="Number(detail.addTime)>=240">本次为最后竞价时间，不会刷新，请谨慎出价！</p>
          <div class="time-out b flex">
            <p>{{time.h.split('')[0]}}</p>
            <p>{{time.h.split('')[1]}}</p>
            <span>:</span>
            <p>{{time.m.split('')[0]}}</p>
            <p>{{time.m.split('')[1]}}</p>
            <span>:</span>
            <p>{{time.s.split('')[0]}}</p>
            <p>{{time.s.split('')[1]}}</p>
          </div>
        </div>
        
        <div class="params2">
            <div class="block mb3 flex">
                <p class="label">竞拍价格（元/吨）：</p>
                <div class="count-out flex">
                    <p class="reduce cursor" :class="[{ grey: unit <= detail.minUnitPrice }]" @click="Reduce('unit', detail.addPrice,detail.minUnitPrice)">-</p>
                    <input type="number" v-model="unit" :disabled="type==3">
                    <p class="add cursor" @click="Add('unit', detail.addPrice)">+</p>
                </div>
                <p class="range">加价幅度：{{ detail.addPrice }}元/吨</p>
            </div>
            <div class="block flex">
                <p class="label">竞拍数量（吨）：</p>
                <div class="count-out flex">
                    <p class="reduce cursor" :class="[{ grey: num <= detail.minTon }]" @click="Reduce('num', detail.addTon,detail.minTon)">-</p>
                    <input type="text" v-model="num" disabled>
                    <p class="add cursor" @click="Add('num', detail.addTon)">+</p>
                </div>
                <p class="range">加量幅度：{{ detail.addTon }}吨</p>
            </div>
        </div>
        <div class="btn flex-center cursor" @click="toBuy">
          <p>立即<br />出价</p>
        </div>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="mask-out" v-if="showTip">
      <div class="mask-inner">
        <div class="top flex-sp">
          <p class="title b">温馨提示</p>
          <img class="close cursor" src="@/assets/img/close.png" alt="" @click="showTip=false">
        </div>
        <p class="desc">
          参与本次竞拍，需支付保证金 <span class="colD30404">{{detail.depositPrice}}</span>元，将直接从您账户余额中锁定。<br/>当前账户余额：{{info.balance}}元。
        </p>
        <div class="btm flex-sp">
          <div class="flex cursor" @click="agree=!agree">
            <img class="options" src="@/assets/img/option.png" alt="" v-if="agree">
            <div class="option" v-else></div>
            <p class="label">已认真阅读并同意 <span class="col3A66B7" @click.stop="openRule">《竞价规则》</span></p>
          </div>
          <div class="flex">
            <div class="confirm cursor" @click="Confirm">确定</div>
            <div class="cancle cursor" @click="showTip=false">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle} from '@/untils/until'
import myCremb from "@/components/cremb";
import myEmpty from "@/components/empty";
export default {
  components: { myCremb, myEmpty },
  data() {
    return {
      id:'',
      type:'',
      detail:{},
      unit:0,
      num:0,
      timer:null,
      dis_time:0,                               //后台返回的时差
      time:{h:'00',m:'00',s:'00'},             //倒计时

      his_timer:null,                          //竞拍记录10秒一更新

      select: 1,
      hisList: [],                      //竞价记录
      page: 1,
      limit: 20,
      total: 0,
      loading: false,
      selfList:[],                      //我的竞价记录

      showTip:false,
      agree:false,
      rules:{},
      info:{},

      ws:null,                        //详情里有个字段要实时监测，用到webscoket
    };
  },
  computed: {
    noMore() {
      return this.hisList.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  beforeDestroy(){
    clearInterval(this.timer);
    clearInterval(this.his_timer);
  },
  mounted() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.getData();
    this.getRule();
    //this.initScoket();

    this.$until.isLogin(this,info=>{
      if(info) this.info = info;
    },true,false)
  },
  methods: {
    getData(sta){
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
            if(sta!='updata'){
              this.unit = Number(res.data.minUnitPrice);
              this.num = Number(res.data.minTon);
              this.initTimer();
              this.getHisList();
              this.getSelfList();
              this.initHisTimer();
            }
            
        }else{
          this.$message(res.msg);
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
      // if(end > now){
      //   let h = parseInt((end-now)/3600000),
      //   m = parseInt(((end-now)%3600000)/60000),
      //   s = parseInt((end-now-h*3600000-m*60000)/1000);
      //   this.time = {
      //     h:h<10?'0'+h:''+h,
      //     m:m<10?'0'+m:''+m,
      //     s:s<10?'0'+s:''+s,
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
            h:h<10?'0'+h:''+h,
            m:m<10?'0'+m:''+m,
            s:s<10?'0'+s:''+s,
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
    load() {
      this.loading = true;
      this.page++;
      this.getHisList();
    },
    getHisList(sta) {
      this.$fetch({
        url: "v1/bidding/biddingRecordList",
        data: {
          biddingId:this.id,
          page:this.page,
          limit:this.limit
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            let hisList = sta=='updata'?[]:[...this.hisList];
            this.hisList = [...hisList,...res.data.successList.list,...res.data.failList.list];
            this.total = res.data.failList.count;
        }
        this.loading = false;
      });
    },
    getSelfList(){
      this.$fetch({
        url: "v1/bidding/myRecordList",
        data: {
          biddingId:this.id
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.selfList = res.data;
        }
      });
    },
    Reduce(type,unit,min) {
      if(this.type==3) return;
      this[type] = Number(this[type]);
      if (this[type] > min) {
        this[type] -= Number(unit);
        this[type] = this.$until.mathNumber(this[type]);
      }
    },
    Add(type,unit) {
      if(this.type==3) return;
      this[type] = Number(this[type]);
      this[type] += Number(unit);
      this[type] = this.$until.mathNumber(this[type]);
    },
    toBuy:throttle(function(){
      if(this.type==3) return;
      //先判断登录态
      this.$until.isLogin(this,info=>{
        if(info){
          if(this.detail.isFirst==1){
            this.showTip = true;
          }else{
            this.Submit();
          }
          
        }
      },false)
    }),
    Confirm(){
      if(!this.agree){
        this.$message('请勾选同意竞价规则');
        return;
      }
      this.Submit();
    },
    Submit(){
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
            this.$message({message:'参与竞拍成功!',type:'success'});
            this.showTip = false;
            this.page = 1;
            this.total = 0;
            this.hisList = [];
            this.getData();
        }else{
          this.$message(res.msg);
        }
      });
    },
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
    openRule(){
      let title = this.rules.title,content = this.rules.content;
      this.$alert(content, title, {
        dangerouslyUseHTMLString: true,
        callback: () => {}
      });
    },
    // inputPrice(){
    //   let unit=this.unit,minUnitPrice = Number(this.detail.minUnitPrice),addPrice = Number(this.detail.addPrice);
    //   if(unit<minUnitPrice){
    //     this.unit = minUnitPrice;
    //   }else if((unit-minUnitPrice)%addPrice!=0){
    //     this.unit = parseInt((unit-minUnitPrice)/addPrice)*addPrice+minUnitPrice;
    //   }
    // },
    initHisTimer(){
      clearInterval(this.his_timer);
      this.his_timer = setInterval(()=>{
        this.page = 1;
        this.total = 0;
        // this.hisList = [];
        this.getHisList('updata');
        this.getSelfList();
        this.getData('updata');
      },10000)
    },
    initScoket(){
      if(this.ws) return;
      if(WebSocket){
        this.ws = new WebSocket("ws://172.16.38.61:8888");
        let ws = this.ws;
        // console.log(ws);
        // return;
        ws.onopen = () => {
            console.log('链接成功');
        }
        ws.onmessage = res => {
            console.log(res);
        }
        ws.onclose = function(){ 
            console.log("连接已关闭..."); 
            this.ws = null;
        }
      }else{
        console.warn('当前浏览器不支持WebSocket!')
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.biddetail {
  .bid-inner {
    width: 1190px;
    margin: 0 auto;
    padding-bottom: 58px;
    .top-main {
      margin-top: 30px;
      .pic {
        width: 390px;
        height: 390px;
        background: #ffffff;
        border: 1px solid rgba(220, 219, 219, 0.6);
        border-radius: 4px;
        margin-right: 29px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .sign1,
        .sign2,
        .sign3 {
          width: 41px;
          height: 85px;
          font-size: 14px;
          color: #fff;
          padding-left: 12px;
          position: absolute;
          left: 29px;
          top: -3px;
        }
        .sign1 {
          background: url("../assets/img/sign1.png") 0 0 / cover no-repeat;
          padding-top: 8px;
        }
        .sign2 {
          background: url("../assets/img/sign2.png") 0 0 / cover no-repeat;
          padding-top: 5px;
          img {
            width: 15px;
            height: 15px;
            margin-bottom: 4px;
          }
        }
        .sign3 {
          background: url("../assets/img/sign3.png") 0 0 / cover no-repeat;
          padding-top: 8px;
        }
      }
      .right {
        .title {
          font-size: 30px;
          color: #333333;
          margin-bottom: 24px;
          padding-top: 4px;
        }
        .time {
          font-size: 14px;
          color: #999;
          margin-bottom: 16px;
          p {
            width: 287px;
            span {
              color: #d30404;
              &.col666 {
                color: #666;
              }
            }
          }
        }
        .params {
          width: 100%;
          height: 84px;
          background: #f4faff;
          margin-top: 19px;
          li {
            height: 34px;
            padding-left: 40px;
            border-right: 1px solid rgba(212, 223, 232, 0.5);
            font-size: 14px;
            color: #666;
            .num {
              font-size: 18px;
              color: #333;
              margin-top: 6px;
            }
          }
        }
        .specs {
          margin-top: 18px;
          min-height: 96px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          p {
            font-size: 14px;
            color: #999;
            line-height: 22px;
            margin-bottom: 16px;
            span {
              color: #666;
            }
          }
        }
        .btm {
          margin-top: 28px;
          padding-left: 14px;
          font-size: 12px;
          color: #999;
          .mr34 {
            margin-right: 34px;
          }
          .col333 {
            color: #333;
          }
          img {
            margin-right: 7px;
          }
          .look {
            width: 16px;
            height: 10px;
          }
          .cj {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .attach {
      margin-top: 25px;
      .left {
        width: 588px;
        border: 1px solid rgba(220, 219, 219, 0.6);
        .tabs {
          width: 100%;
          height: 62px;
          background: #f7f7f7;
          border-bottom: 1px solid rgba(220, 219, 219, 0.6);
          padding: 0 14px;
          li {
            font-size: 18px;
            color: #666;
            line-height: 62px;
            padding: 0 34px;
            position: relative;
            &.select {
              color: #467bcf;
              &:after {
                content: "";
                width: 17px;
                height: 3px;
                background: #467bcf;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
              }
            }
          }
        }
        .content {
          min-height: 381px;
          padding: 27px;
          font-size: 18px;
          color: #333;
        }
        .history {
          text-align: center;
          font-size: 14px;
          color: #666;
          padding-bottom: 10px;
          .th {
            padding: 16px 0;
          }
          .scroll {
            height: 325px;
            overflow: auto;
            .tr {
              height: 20px;
              margin-bottom: 13px;
              .status {
                color: #999;
                &.on p {
                  width: 35px;
                  line-height: 20px;
                  background: #d30404;
                  border-radius: 4px;
                  color: #fff;
                  text-align: center;
                  margin: 0 auto;
                }
              }
            }
          }
        }
      }
      .right {
        width: 588px;
        .top {
          width: 100%;
          line-height: 62px;
          background: #467bcf;
          font-size: 18px;
          color: #fff;
          padding: 0 32px;
        }
        .con {
          min-height: 381px;
          text-align: center;
          font-size: 14px;
          color: #666;
          padding-bottom: 10px;
          border: 1px solid rgba(220, 219, 219, 0.6);
          .th {
            padding: 16px 0;
          }
          .scroll {
            height: 271px;
            overflow: auto;
            .tr {
              height: 20px;
              margin-bottom: 13px;
              .status {
                color: #999;
                &.on p {
                  width: 35px;
                  line-height: 20px;
                  background: #d30404;
                  border-radius: 4px;
                  color: #fff;
                  text-align: center;
                  margin: 0 auto;
                }
              }
            }
          }
          .btm {
            width: 100%;
            height: 54px;
            padding-left: 44px;
            text-align: left;
            .icon {
              width: 54px;
              height: 54px;
              margin-right: 24px;
            }
            .tip {
              font-size: 18px;
              color: #333;
            }
            .desc {
              font-size: 14px;
              color: #666;
              margin-top: 12px;
            }
          }
        }
      }
    }
  }
  .bottom {
    background: #f4faff;
    margin-top: -30px;
    .inner {
      width: 1190px;
      height: 133px;
      margin: 0 auto;
      .params {
        width: 331px;
        height: 80px;
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
        border-radius: 4px;
        padding: 24px 0 19px;
        margin-right: 19px;
        li {
          font-size: 14px;
          color: #666;
          padding-left: 18px;
          .num {
            font-size: 18px;
            color: #333;
            margin-top: 9px;
            &.colD30404 {
              color: #d30404;
            }
          }
        }
      }
      .time-tip{
          font-size: 12px;
          margin-bottom: 6px;
          color: #d30404;
      }
      .time-out {
        width: 353px;
        height: 64px;
        background: url("../assets/img/bg3.png") 0 0 / cover no-repeat;
        font-size: 48px;
        color: #ffffff;
        line-height: 64px;
        margin-right: 21px;
        p {
          width: 45px;
          text-align: center;
          margin-right: 10px;
          &:nth-of-type(2n + 2) {
            margin-right: 0;
          }
        }
        span {
          color: #3a66b7;
          margin: 0 7px;
        }
      }
      .params2 {
        width: 399px;
        height: 80px;
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
        border-radius: 4px;
        padding: 17px 0 14px 16px;
        .mb3{margin-bottom: 3px;}
        .block{
            .label{
                width:133px;
                font-size:14px;
                color:#666;
            }
            .reduce,.add{
                width: 23px;
                line-height: 23px;
                background: #3A66B7;
                border-radius: 4px;
                font-size:14px;
                color:#fff;
                text-align: center;
            }
            input{
                width: 78px;
                height: 23px;
                background: rgba(255,255,255,.5);
                box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
                border-radius: 2px;
                margin:0 1px;
                line-height: 23px;
                font-size: 14px;
                color:#000;
                padding:0 10px;
            }
            .range{
                font-size:12px;
                color:#3A66B7;
                margin-left:11px;
            }
        }
      }
      .btn {
        width: 67px;
        height: 64px;
        background: #d30404;
        border-radius: 4px;
        font-size: 18px;
        color: #ffffff;
        line-height: 22px;
      }
    }
  }
  .mask-out{
    width:100vw;
    height:100vh;
    background:rgba(0, 0, 0, .8);
    position:fixed;
    left:0;
    top:0;
    z-index:99;
    .mask-inner{
      width: 511px;
      height: 220px;
      background: #FFFFFF;
      border-radius: 8px;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      padding:0 19px 0 23px;
      .top{
        height:50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        font-size: 18px;
        color: #333333;
        .close{
          width:16px;
          height:16px;
        }
      }
      .desc{
        font-size: 14px;
        color: #666;
        line-height: 24px;
        padding:19px 0 23px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        .colD30404{
          color: #D30404;
        }
      }
      .btm{
        padding-top:14px;
        .options{
          width:15px;
          height:15px;
        }
        .option{
          width:15px;
          height:15px;
          border: 1px solid #DDDDDD;
          border-radius: 4px;
        }
        .label{
          font-size: 14px;
          color: #666;
          margin-left:10px;
          .col3A66B7{
            color: #3A66B7;
          }
        }
        .confirm{
          width: 68px;
          line-height: 32px;
          text-align: center;
          background: #3A66B7;
          border-radius: 4px;
          font-size: 16px;
          color: #fff;
          margin-right: 11px;
        }
        .cancle{
          width: 68px;
          line-height: 32px;
          text-align: center;
          background: #FFFFFF;
          border: 1px solid #DDDDDD;
          border-radius: 4px;
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
}
</style>