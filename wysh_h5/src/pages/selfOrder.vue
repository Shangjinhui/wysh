<template>
<div>
    <my-header title="我的订单"></my-header>
    <div class="order-page">
      <div class="tabs">
          <ul class="flex">
              <li :class="[{'on':selected==item.id}]" v-for="(item,index) in tabs" :key="index" @click="changeTab(item.id)">{{item.title}}</li>
          </ul>
      </div>
      <div class="container">
        <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="20"
        >
        <li class="li" :class="[{'grey':orderStatus==400}]" v-for="(item, index) in list" :key="index">
            <div class="top flex-sp">
                <p class="title flex1 ellipsis1 b">{{item.orderSn}}</p>
                <p class="status" :class="[{'colD83537':item.orderStatus==100||item.orderStatus==102,'col666':item.orderStatus==103||item.orderStatus==400}]">{{item.orderStatusVal}}</p>
            </div>
            <div class="line"></div>
            <div class="con">
                <p class="title">{{item.title}}</p>
                <div class="flex-sp desc">
                    <div class="flex">
                        <p class="price">单价：{{item.unitPrice}}元</p>
                        <p class="num">数量：{{item.dealTon}}吨</p>
                    </div>
                    <p class="count">总计：{{item.totalPrice}}元</p>
                </div>
                <div class="btm flex-sp">
                    <p class="time">创建时间：{{item.timeline|exTime2}}</p>
                    <div class="btn" v-if="item.orderStatus==100" @click="showPay = true"><p>立即付款</p></div>
                </div>
            </div>
            <!-- 已发货有个快递号 -->
            <div class="express flex-sp" v-if="item.orderStatus==103">
                <p class="number">{{item.expressName}}<span>{{item.expressNo}}</span></p>
                <div class="copy" @click="Copy(item.expressNo)">复制</div>
            </div>
        </li>
        </ul>
        <p class="load" v-if="list.length>0">{{loading?'加载中...':'已经到底了！'}}</p>
        <my-empty v-else></my-empty>
    </div>

    <!-- 支付提示 -->
    <div class="mask-out" v-if="showPay">
        <div class="mask">
            <img class="close" src="@/assets/img/close2.png" alt="" @click="showPay = false">

            <p class="title">订单支付</p>
            <div class="flex-sp pay-li">
                <p>对公账户：{{acount.countNo}}</p>
                <div class="copy" @click="Copy(acount.countNo)">复制</div>
            </div>
            <div class="flex-sp pay-li">
                <p>开户银行：{{acount.countName}}</p>
                <div class="copy" @click="Copy(acount.countName)">复制</div>
            </div>
            <p class="tip">支付后请联系管理员，电话：<a class="col047CD3" :href="'tel:'+acount.countPhone">{{acount.countPhone}}</a></p>
        </div>
    </div>
  </div>
</div>
  
</template>

<script>
import myHeader from '@/components/myheader';
import myEmpty from '@/components/empty';
export default {
    components:{myHeader,myEmpty},
    data(){
        return {
            tabs:[
                {title:'全部',id:0},
                {title:'待付款',id:100},
                {title:'待发货',id:102},
                {title:'已发货',id:103},
                {title:'已失效',id:400},
            ],
            selected:0,
            list: [],
            loading: false,
            page: 1,
            size: 10,
            total: 0,
            showPay:false,
            acount:{}
        }
    },
    mounted() {
        this.getData();
        this.getAcount();
    },
    methods:{
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
        changeTab(id){
            if(id == this.selected) return;
            this.selected = id;
            this.page = 1;
            this.list = [];
            this.getData();
        },
        loadMore() {
            if (this.page * this.size < this.total) {
                this.page++;
                this.getData();
            }
        },
        getData() {
            this.loading = true;
            this.$fetch({
                url: "v1/member/biddingOrderList",
                data: {
                    status: this.selected,
                    page: this.page,
                    limit: this.size,
                },
            }).then((res) => {
                if(res.returnCode=='200'){
                    let list = [...this.list];
                    this.list = [...list, ...res.data.list];
                    this.total = res.data.count;
                }
                this.loading = false;
            });
        },
        Copy(txt){
            this.$until.Copy(this,txt);
        }
    }
}
</script>

<style lang="scss" scoped>
.order-page{

    .tabs{
        width:100%;
        overflow: auto;
        height: 88px;
        background: #FFFFFF;
        box-shadow: 0px 1px 0px 0px #DDDDDD;
        padding:8px 33px;
        position: sticky;
        left: 0;
        top: 0;
        z-index:9;
        ul{
            width:max-content;
            li{
                min-width: 155px;
                line-height: 72px;
                padding:0 12px;
                background: #F9F9F9;
                border-radius: 6px;
                font-size: 24px;
                color: #333333;
                text-align: center;
                margin-right:20px;
                &.on{
                    background: #047CD3;
                    color:#fff;
                }
            }
        }
        
    }
    .container{
        padding: 30px 32px;
        .li {
            margin-bottom: 30px;
            width: 100%;
            min-height: 323px;
            background: #ffffff;
            box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06);
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.08);
            .top{
                height: 88px;
                padding:0 36px 0 24px;
                font-size: 26px;
                line-height:30px;
                .title{
                    color: #333333;
                }
                .colD83537{
                    color:#D83537;
                }
                .col666{
                    color:#666;
                }
            }
            .line{
                width:100%;
                height: 11px;
                background: linear-gradient(180deg, #EEEEEE 0%, rgba(216, 216, 216, 0) 100%);
                opacity: 0.3;
            }
            .con{
                padding:22px 23px 0;
                .title{
                    font-size: 26px;
                    color: #333333;
                    line-height: 37px;
                    margin-bottom:22px;
                }
                .desc{
                    padding-bottom:22px;
                    .price,.num,.count{
                        font-size: 24px;
                        color: #999999;
                        line-height: 33px;
                    }
                    .price{margin-right:44px;}
                    .count{
                        color:#333;
                    }
                }
                .btm{
                    height:87px;
                    border-top: 1px solid #DDDDDD;
                    .time{
                        font-size: 24px;
                        color: #666666;
                        line-height: 33px;
                    }
                    .btn{
                        width: 149px;
                        line-height: 54px;
                        background: #D30404;
                        border-radius: 6px;
                        text-align: center;
                        font-size: 24px;
                        color: #fff;
                        position: relative;
                        p {
                            position: relative;
                            z-index: 1;
                        }
                        &:after {
                            content: "";
                            width: 119px;
                            height: 43px;
                            background: #D30404;
                            border-radius: 5px;
                            opacity: 0.5;
                            filter: blur(8px);
                            position: absolute;
                            left: 50%;
                            top: 14px;
                            transform: translateX(-50%);
                        }
                    }
                }
                
            }
            .express{
                height: 88px;
                background: #ECF7FF;
                padding:0 25px;
                .number{
                    font-size: 26px;
                    color: #333333;
                    span{
                        color:#666;
                        margin-left:18px;
                    }
                }
                .copy{
                    width: 107px;
                    height: 54px;
                    border-radius: 6px;
                    border: 1px solid #979797;
                    font-size: 26px;
                    color: #666666;
                    line-height: 54px;
                    text-align: center;
                }
            }
        }
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
            width: 598px;
            height: 357px;
            background: #FFFFFF;
            border-radius: 10px;
            padding:26px 37px;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);

            font-size: 24px;
            color: #666666;
            .close{
                width:44px;
                height:44px;
                position: absolute;
                right: 16px;
                top:20px;
            }
            .title{
                font-size: 36px;
                color: #333333;
                line-height: 50px;
                text-align: center;
                margin-bottom:28px;
            }
            .pay-li{
                margin-bottom:21px;
                .copy{
                    width: 107px;
                    height: 54px;
                    border-radius: 6px;
                    border: 1px solid #979797;
                    font-size: 26px;
                    color: #666666;
                    line-height: 54px;
                    text-align: center;
                }
            }
            .tip{
                margin-top:40px;
            }
            .col047CD3{
                color:#047CD3;
            }
        }
    }
}
</style>