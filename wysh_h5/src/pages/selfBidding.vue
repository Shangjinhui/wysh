<template>
<div>
    <my-header title="我的竞拍"></my-header>
    <div class="bidding-page">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
    >
      <router-link tag="li" :to="{path:'/biddetail',query:{id:item.id}}" class="li" v-for="(item, index) in list" :key="index">
          <div class="top flex-sp">
              <p class="title flex1 ellipsis1 b">{{item.title}}</p>
              <div class="biding flex-center" v-if="item.biddingStatus==1">
                  <img src="@/assets/img/point.png" alt="">
                  <p>{{item.biddingStatusVal}}</p>
              </div>
              <div class="bid" v-else-if="item.biddingStatus==3">{{item.biddingStatusVal}}</div>
          </div>
          <div class="line"></div>
          <div class="con">
              <div class="time flex">
                  <img src="@/assets/img/time.png" alt="">
                  <p>开始时间：<span class="colE30404">{{item.startTimeline|exTime}}</span></p>
              </div>
              <div class="time flex">
                  <img src="@/assets/img/time.png" alt="">
                  <p>结束时间：<span class="colE30404">{{item.endTimeline|exTime}}</span></p>
              </div>
              <p class="end-title b">我的最后出价</p>
              <ul class="btm flex">
                  <li class="flex1">
                      <p class="desc">出价金额</p>
                      <p class="num">¥{{item.unitPrice}}</p>
                  </li>
                  <li class="flex1">
                      <p class="desc">出价数量</p>
                      <p class="num">{{item.totalTon}}</p>
                  </li>
                  <li class="flex1">
                      <p class="desc">入围数量</p>
                      <p class="num">{{item.dealTon}}</p>
                  </li>
              </ul>
          </div>
          <img v-if="item.status==1" class="status" src="@/assets/img/icon1.png" alt="">
          <img v-else class="status" src="@/assets/img/icon2.png" alt="">
      </router-link>
    </ul>
    <p class="load" v-if="list.length>0">{{total>page*size?'加载中...':'已经到底了！'}}</p>
    <my-empty v-else></my-empty>
  </div>
</div>
  
</template>

<script>
import myHeader from '@/components/myheader';
import myEmpty from '@/components/empty';
export default {
  components:{myHeader,myEmpty},
  data() {
    return {
      list: [],
      loading: false,
      page: 1,
      size: 10,
      total: 0,
    };
  },
  mounted() {
      this.getData();
  },
  methods: {
    loadMore() {
      if (this.page * this.size < this.total) {
        this.page++;
        this.getData();
      }
    },
    getData() {
      this.loading = true;
      this.$fetch({
          url: "v1/member/biddingList",
          data: {
              page: this.page,
              limit: this.size,
          },
      }).then((res) => {
          if(res.returnCode=='200'){
              let list = [...this.list];
              this.list = [...list,...res.data.onGoing.list,...res.data.closed.list];
              this.total = res.data.closed.count;
          }
          this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bidding-page {
  padding: 30px 32px;
  .li {
    margin-bottom: 30px;
    width: 100%;
    min-height: 451px;
    background: #ffffff;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    position: relative;
    .top{
        padding:24px;
        .title{
            font-size: 30px;
            color: #333333;
            line-height: 42px;
        }
        .biding{
            width: 149px;
            height: 54px;
            background: #D30404;
            border-radius: 6px;
            font-size: 24px;
            line-height: 23px;
            color: #FFFFFF;
            img{
                width:23px;
                height:23px;
                margin-right:12px;
            }
        }
        .bid{
            width: 149px;
            height: 54px;
            background: #888888;
            border-radius: 6px;
            font-size: 24px;
            color: #FFFFFF;
            line-height: 54px;
            text-align: center;
        }
    }
    .line{
        width:100%;
        height: 11px;
        background: linear-gradient(180deg, #EEEEEE 0%, rgba(216, 216, 216, 0) 100%);
        opacity: 0.3;
    }
    .con{
        padding:20px 24px 0;
        .time{
            margin-bottom:11px;
            font-size: 24px;
            color:#333;
            img{
                width:24px;
                height:24px;
                margin-right:12px;
            }
            .colE30404{
                color:#E30404;
            }
        }
        .end-title{
            margin-top:23px;
            font-size: 26px;
            color: #333333;
            line-height: 37px;
        }
        .btm{
            width:100%;
            height: 137px;
            padding:30px 0;
            background: rgba(236, 247, 255, .6);
            border-radius: 10px;
            overflow: hidden;
            margin-top:20px;
            li{
                height:68px;
                border-right: 1px solid #979797;
                padding-left:28px;
                &:first-child{
                    padding-left:36px;
                }
                &:last-child{
                    border-right: 0;
                }
                .desc{
                    font-size: 24px;
                    color: #666666;
                    line-height: 33px;
                }
                .num{
                    font-size: 28px;
                    color: #333333;
                    line-height: 33px;
                    margin-top:8px;
                }
            }
        }
    }
    .status{
        width:114px;
        height:108px;
        position:absolute;
        right:53px;
        bottom:137px;
    }
  }
}
</style>