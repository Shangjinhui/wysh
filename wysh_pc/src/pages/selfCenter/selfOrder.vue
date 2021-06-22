<template>
  <div class="self-block">
    <p class="title b">我的订单</p>

    <div class="con">
      <ul class="tabs flex">
          <li class="cursor b" :class="[{'select':selected==item.id}]" v-for="(item,index) in tabs" :key="index" @click="changeTabs(item.id)">{{item.title}}<span v-if="item.num">{{item.num}}</span></li>
      </ul>
      <ul class="th flex">
          <li class="wid280 pl37">商品</li>
          <li class="wid120 center">单价</li>
          <li class="wid120 center">数量</li>
          <li class="wid120 center">实付款</li>
          <li class="wid120 center">订单状态</li>
          <li class="flex1 center">操作</li>
      </ul>
      <!-- <div class="block">
          <div class="top flex">
              <p>订单号：<span>143225324234234</span></p>
              <p>创建时间：2021-5-10 18:35:30</p>
          </div>
          <ul class="tr flex">
            <li class="wid280 goods flex">
                <img class="pic" src="@/assets/img/sy_89.jpg" alt="">
                <p class="ellipsis2">上海氯碱TS-201掺混树脂</p>
            </li>
            <li class="wid120 center">¥ 1500</li>
            <li class="wid120 center">20吨</li>
            <li class="wid120 center colD30404">¥ 30000</li>
            <li class="wid120 center col666">待付款</li>
            <li class="flex1 center">
                <p>剩余支付时间</p>
                <p class="colD30404">23:18:47</p>
                <div class="btn cursor">立即付款</div>
            </li>
        </ul>
      </div> -->
      <div class="block-out">
          <div class="block" :class="[{'grey':item.orderStatus==400}]" v-for="(item,index) in list" :key="index">
            <div class="top flex">
                <p>订单号：<span>{{item.orderSn}}</span></p>
                <p>创建时间：{{item.timeline|exTime2}}</p>
            </div>
            <ul class="tr flex">
                <li class="wid280 goods flex">
                    <img class="pic" :src="item.photoUrl" alt="">
                    <p class="ellipsis2">{{item.title}}</p>
                </li>
                <li class="wid120 center">¥ {{item.unitPrice}}</li>
                <li class="wid120 center">{{item.dealTon}}吨</li>
                <li class="wid120 center colD30404">¥ {{item.totalPrice}}</li>
                <li class="wid120 center col666">{{item.orderStatusVal}}</li>
                <li class="flex1 center" v-if="item.orderStatus==100">
                    <p>剩余支付时间</p>
                    <p class="colD30404" v-if="pay_down[item.id]">{{pay_down[item.id].h}}:{{pay_down[item.id].m}}:{{pay_down[item.id].s}}</p>
                    <div class="btn cursor" @click="showPay=true">立即付款</div>
                </li>
                <li class="flex1 center" v-else-if="item.orderStatus==103">
                    <p>{{item.expressName}}</p>
                    <p class="colD30404">{{item.expressNo}}</p>
                    <div class="copy cursor" @click="toCopy(item.expressNo)">复制</div>
                </li>
                <li class="flex1 center" v-else></li>
            </ul>
        </div>

        <my-empty v-if="list.length==0"></my-empty>
      </div>
      

      <!-- <div class="block">
          <div class="top flex">
              <p>订单号：<span>143225324234234</span></p>
              <p>创建时间：2021-5-10 18:35:30</p>
          </div>
          <ul class="tr flex">
            <li class="wid280 goods flex">
                <img class="pic" src="@/assets/img/sy_89.jpg" alt="">
                <p class="ellipsis2">上海氯碱TS-201掺混树脂</p>
            </li>
            <li class="wid120 center">¥ 1500</li>
            <li class="wid120 center">20吨</li>
            <li class="wid120 center colD30404">¥ 30000</li>
            <li class="wid120 center col666">已发货</li>
            <li class="flex1 center">
                <p>德邦快递</p>
                <p class="colD30404">145263697452366332111</p>
                <div class="copy cursor" @click="toCopy('sjh')">复制</div>
            </li>
        </ul>
      </div>

      <div class="block grey">
          <div class="top flex">
              <p>订单号：<span>143225324234234</span></p>
              <p>创建时间：2021-5-10 18:35:30</p>
          </div>
          <ul class="tr flex">
            <li class="wid280 goods flex">
                <img class="pic" src="@/assets/img/sy_89.jpg" alt="">
                <p class="ellipsis2">上海氯碱TS-201掺混树脂</p>
            </li>
            <li class="wid120 center">¥ 1500</li>
            <li class="wid120 center">20吨</li>
            <li class="wid120 center colD30404">¥ 30000</li>
            <li class="wid120 center col666">已失效</li>
            <li class="flex1 center"></li>
        </ul>
      </div> -->
      
    </div>
    <el-pagination
        v-if="total>size"
        class="pagination"
        background
        layout="prev, pager, next, jumper"
        :page-size="size"
        :total="total"
        @current-change="changPage"
    >
    </el-pagination>

    <!-- 付款提示 -->
    <div class="mask-out" v-if="showPay">
        <div class="mask">
            <img class="close cursor" src="@/assets/img/close2.png" alt="" @click="showPay = false">

            <p class="tip-title">订单支付</p>
            <div class="flex-sp pay-li">
                <p>对公账户：{{acount.countNo}}</p>
                <div class="copy cursor" @click="toCopy(acount.countNo)">复制</div>
            </div>
            <div class="flex-sp pay-li">
                <p>开户银行：{{acount.countName}}</p>
                <div class="copy cursor" @click="toCopy(acount.countName)">复制</div>
            </div>
            <p class="tip">支付后请联系管理员，电话：<a class="col047CD3" :href="'tel:'+acount.countPhone">{{acount.countPhone}}</a></p>
        </div>
    </div>
  </div>
</template>

<script>
import myEmpty from '@/components/empty';
export default {
    components:{myEmpty},
    data(){
        return {
            tabs:[
                {title:'所有订单',id:0},
                {title:'待付款',id:100,num:0},
                {title:'已发货',id:103,num:0},
                {title:'待发货',id:102,num:0},
                {title:'已失效',id:400,num:0},
            ],
            selected:0,
            pay_down_timer:{},           //待付款订单倒计时计时器
            dis_time:[],                 //待付款订单时差
            pay_down:{},                 //待付款订单倒计时
            list: [],
            page: 1,
            size: 4,
            total: 0,
            showPay:false,
            acount:{}
        }
    },
    beforeDestroy(){
        let pay_down_timer = this.pay_down_timer;
        for(let key in pay_down_timer){
            clearInterval(pay_down_timer[key]);
        }
    },
    mounted(){
        this.getOrderCount();
        this.getData();
        this.getAcount();
    },
    methods:{
        // 订单类别数量
        getOrderCount(){
            this.$fetch({
                url: "v1/member/biddingOrderCount",
            }).then((res) => {
                if(res.returnCode=='200'){
                    this.tabs.forEach(item=>{
                        item.num = res.data['status'+item.id];
                    })
                }
            });
        },
        // 商家银行账户
        getAcount(){
            this.$fetch({
                url: "v1/bidding/bankCount",
            }).then((res) => {
                if(res.returnCode=='200'){
                    this.acount = res.data;
                }
            });
        },
        changeTabs(id){
            if(this.selected == id) return;
            this.selected = id;
            this.page = 1;
            this.list = [];
            this.getData();
        },
        getData() {
            this.$fetch({
                url: "v1/member/biddingOrderList",
                data: {
                    status: this.selected,
                    page: this.page,
                    limit: this.size,
                },
            }).then((res) => {
                if(res.returnCode=='200'){
                    this.list = res.data.list;
                    this.total = res.data.count;
                    this.initTimer();
                }
            });
        },
        //处理待付款订单的倒计时
        initTimer(){
            //id,expirationTimeline
            let list = this.list,pay_down_timer = this.pay_down_timer;
            if(Object.keys(pay_down_timer).length>0){
                //先清除倒计时
                for(let key in pay_down_timer){
                    clearInterval(pay_down_timer[key]);
                }
            }
            list.forEach(item=>{
                if(item.orderStatus==100&&item.leftTime>0){
                    this.dis_time[item.id] = item.leftTime;
                    this.setTimer(item);
                    pay_down_timer[item.id] = setInterval(()=>{
                        this.setTimer(item);
                    },1000)
                    //console.log(this.dis_time,this.pay_down,this.pay_down_timer,'-----')
                }
            })

        },
        setTimer(item){
            // let end = item.expirationTimeline*1000,now = new Date().getTime(),pay_down = {...this.pay_down},pay_down_timer = this.pay_down_timer;
            // if(end>now){
            //     let h = parseInt((end-now)/3600000),
            //     m = parseInt(((end-now)%3600000)/60000),
            //     s = parseInt((end-now-h*3600000-m*60000)/1000);
            //     pay_down[item.id] = {
            //         h:h<10?'0'+h:h,
            //         m:m<10?'0'+m:m,
            //         s:s<10?'0'+s:s,
            //     }
            //     this.pay_down = pay_down;
            //     //console.log(pay_down)
            // }else{
            //     clearInterval(pay_down_timer[item.id])
            // }
            let dis_time = this.dis_time[item.id],pay_down = {...this.pay_down},pay_down_timer = this.pay_down_timer;
            if(dis_time>0){
                let h = parseInt(dis_time/3600),
                m = parseInt((dis_time%3600)/60),
                s = parseInt((dis_time-h*3600-m*60)/1);
                pay_down[item.id] = {
                    h:h<10?'0'+h:h,
                    m:m<10?'0'+m:m,
                    s:s<10?'0'+s:s,
                }
                this.pay_down = pay_down;
            }else{
                clearInterval(pay_down_timer[item.id]);
                this.getOrderCount();
                this.getData();
            }
            this.dis_time[item.id]--;
        },
        changPage(page){
            this.page = page;
            this.getData();
        },
        toCopy(txt){
            this.$until.Copy(this,txt);
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
    margin-top: 25px;
    .tabs{
        margin-bottom:14px;
        li{
            font-size:14px;
            color:#666;
            padding-bottom:11px;
            margin-right:42px;
            position: relative;
            span{
                color:#D30404;
                padding-left:4px;
            }
            &.select{
                color:#467BCF;
            }
            &.select:after{
                content: '';
                width: 17px;
                height: 3px;
                background:#467BCF;
                position: absolute;
                left:50%;
                bottom: 0;
                transform: translateX(-50%);
            }
        }
    }

    .wid280{width:280px;}
    .pl37{padding-left:37px;}
    .wid120{width:120px;}
    .center{text-align: center;}
    .colD30404{color:#D30404;}
    .col666{color:#666;}
    .th{
        width:100%;
        height:34px;
        background:#f7f7f7;
        font-size: 14px;
        color:#666;
        margin-bottom:11px;
    }
    .block-out{
        min-height:592px;
    }
    .block{
        width:100%;
        margin-bottom:10px;
        border: 1px solid rgba(220, 220, 220, 0.6);
        .top{
            height:34px;
            font-size:12px;
            color:#666;
            border-bottom: 1px solid rgba(220, 220, 220, 0.6);
            background:#f7f7f7;
            padding-left:27px;
            p{
                margin-right:38px;
                span{
                    color:#333;
                }
            }
            
        }
        .tr{
            min-height:102px;
            background:#fff;
            font-size:12px;
            line-height:22px;
            color:#333;
            .goods{
                padding-left:18px;
                .pic{
                    width: 70px;
                    height: 70px;
                    object-fit: contain;
                    border: 1px solid #DCDCDC;
                    margin-right:18px;
                }
                
            }
            .btn{
                width: 80px;
                height: 30px;
                background: #d30404;
                border-radius: 6px;
                font-size: 12px;
                line-height: 30px;
                color: #ffffff;
                margin:0 auto;
                position: relative;
                &:after{
                    content: "";
                    width: 80%;
                    height: 50%;
                    background: #d30404;
                    opacity: 0.5;
                    filter: blur(13px);
                    position: absolute;
                    left: 50%;
                    top: 60%;
                    transform: translateX(-50%);
                }
            }
            .copy{
                width: 52px;
                line-height: 22px;
                border: 1px solid #DCDCDC;
                border-radius: 4px;
                text-align: center;
                margin:0 auto;
            }
        }
    }
    
  }
  .pagination{
        text-align: right;
        padding-right:30px;
        margin-top:20px;
    }

    .mask-out{
        width:100vw;
        height:100vh;
        background:rgba(0, 0, 0, 0.85);
        position:fixed;
        left:0;
        top:0;
        z-index: 9;
        .mask{
            width: 500px;
            height: 230px;
            background: #FFFFFF;
            border-radius: 10px;
            padding:26px 37px;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);

            font-size: 14px;
            color: #666666;
            .close{
                width:22px;
                height:22px;
                position: absolute;
                right: 16px;
                top:20px;
            }
            .tip-title{
                font-size: 18px;
                color: #333333;
                line-height: 25px;
                text-align: center;
                margin-bottom:20px;
            }
            .pay-li{
                margin-bottom:11px;
                .copy{
                    width: 80px;
                    height: 30px;
                    border-radius: 4px;
                    border: 1px solid #979797;
                    font-size: 13px;
                    color: #666666;
                    line-height: 30px;
                    text-align: center;
                }
            }
            .tip{
                margin-top:20px;
            }
            .col047CD3{
                color:#047CD3;
            }
        }
    }
}
</style>