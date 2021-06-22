<template>
<div>
    <my-header title="我的保证金"></my-header>
    <div class="bond-page">
      <div class="top">
          <p class="desc">保证金可用余额</p>
          <p class="price b">{{balance}}<span>元</span></p>
      </div>
      <div class="con">
          <p class="title">{{page.title}}</p>
          <div class="desc" v-html="page.content">
              <!-- <p>1. 参与竞拍前需要支付保证金，扫下二维码可支付保证金，支付后请联系管理员处理。</p><br/>
              <p>2. 保证金随时可退，退款请联系管理员，<br/>电话：<span class="col037CD3">13858212350</span></p><br/> -->
          </div>
          <ul class="tabs flex">
              <li class="flex1" :class="[{'select':selected==index}]" v-for="(item,index) in code" :key="index" @click="selected=index">{{item.title}}</li>
          </ul>
          <div class="code">
              <img :src="code[selected]&&code[selected].img" alt="">
          </div>
          <p class="tip">保存二维码到相册，打开相应app扫一扫，相册选取</p>
      </div>
  </div>
</div>
</template>

<script>
import myHeader from '@/components/myheader'
export default {
    components:{myHeader},
    data(){
        return {
            balance:'',
            page:{},
            code:[
                
            ],
            selected:0,
        }
    },
    mounted(){
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
                    let code = [
                        {
                            title:'支付宝',
                            img:res.data.qrCode['zfb']
                        },
                        {
                            title:'微信',
                            img:res.data.qrCode['wx']
                        },
                    ]
                    this.code = code;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.bond-page{
    padding:50px 29px 89px 32px;
    .top{
        width:100%;
        height:292px;
        background:url('../assets/img/bg2.png') 0 0/cover no-repeat;
        padding:52px 62px 0;
        .desc{
            font-size: 28px;
            color: #FFFFFF;
            line-height: 40px;
        }
        .price{
            font-size: 72px;
            color: #FFFFFF;
            line-height: 85px;
            margin-top:23px;
            span{
                font-size: 36px;
                font-weight: normal;
            }
        }
    }
    .con{
        margin-top:6px;
        .title{
            font-size: 30px;
            color: #333333;
            line-height: 42px;
            margin-bottom: 44px;
        }
        .desc{
            font-size: 26px;
            color: #666666;
            line-height: 37px;
            padding-bottom: 44px;
            border-bottom: 1px solid #DDDDDD;
            .col037CD3{
                color:#037CD3;
            }
        }
        .tabs{
            width: 376px;
            border-radius: 6px;
            overflow: hidden;
            margin:49px auto 36px;
            li{
                line-height:50px;
                border: 2px solid #047CD3;
                font-size: 28px;
                color: #047CD3;
                text-align: center;
                &:last-child{
                    border-left:0;
                }
                &.select{
                    background: #047CD3;
                    color:#fff;
                }
            }
        }
        .code{
            width: 397px;
            height: 397px;
            background: #FFFFFF;
            box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            border: 1px solid #D5D5D5;
            margin:0 auto;
            img{
                width: 359px;
                margin:20px auto;
            }
        }
        .tip{
            font-size: 26px;
            color: #666666;
            line-height: 37px;
            text-align: center;
            margin-top:36px;
        }
    }
}
</style>