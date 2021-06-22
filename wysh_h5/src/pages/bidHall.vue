<template>
  <div class="bidhall-page">
    <my-rule v-if="showRule" :desc="rules.content" :title="rules.title" @closeRule="showRule=false"></my-rule>
    <div class="header">
      <img class="kv" :src="banner" alt="" />
      <p class="rule" @click="showRule=true">规则</p>
    </div>

    <div class="container">
      <div class="tabs">
        <ul class="flex">
          <li
            :class="[{ on: selected == item.id }]"
            v-for="(item, index) in tabs"
            :key="index"
            @click="changeTab(item.id)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>

      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="20"
      >
        <router-link tag="li" :to="{path:'/biddetail',query:{id:item.id,type:item.status}}" class="li" v-for="(item, index) in list" :key="index">
          <div class="top flex-sp">
            <p class="title flex1 ellipsis1 b">{{item.title}}</p>
            <div class="biding flex-center" v-if="item.status==1">
              <img src="@/assets/img/point.png" alt="" />
              <p>竞拍中</p>
            </div>
            <div class="bid" v-else>{{item.status==2?'即将开始':'竞拍结束'}}</div>
          </div>
          <div class="line"></div>
          <div class="con">
            <div class="time flex">
              <img src="@/assets/img/time.png" alt="" />
              <p>开始时间：<span class="colE30404">{{item.startTimeline|exTime}}</span></p>
            </div>
            <div class="time flex">
              <img src="@/assets/img/time.png" alt="" />
              <p>结束时间：<span class="colE30404">{{item.endTimeline|exTime}}</span></p>
            </div>
            <ul class="btm flex" v-if="item.status!=3">
              <li class="flex1">
                <p class="desc">竞拍总量</p>
                <p class="num">{{item.totalTon}}吨</p>
              </li>
              <li class="flex1">
                <p class="desc">起拍价</p>
                <p class="num">{{item.minUnitPrice}}元</p>
              </li>
              <li class="flex1">
                <p class="desc">起拍量</p>
                <p class="num">{{item.minTon}}吨</p>
              </li>
            </ul>
            <ul class="btm flex" v-else>
              <li class="flex1">
                <p class="desc">竞拍总量</p>
                <p class="num">{{item.totalTon}}吨</p>
              </li>
              <li class="wid164">
                <p class="desc">成交底价</p>
                <p class="num">{{item.defaultPrice}}元</p>
              </li>
              <li class="wid164">
                <p class="desc">成交高价</p>
                <p class="num">{{item.dealMaxPrice}}元</p>
              </li>
              <li class="flex1">
                <p class="desc">成交吨数</p>
                <p class="num">{{item.dealTon}}吨</p>
              </li>
            </ul>
            <div class="flex-sp recode">
              <p class="look">浏览量：{{item.views}}</p>
              <p class="look" v-if="item.status==1">出价：{{item.offerMember}}人</p>
              <p class="had" v-if="item.status==3">已有{{item.dealMember}}家中标</p>
            </div>
          </div>
        </router-link>
      </ul>
      <p class="load" v-if="list.length>0">
        {{ loading ? "加载中..." : "已经到底了！" }}
      </p>
      <my-empty v-else></my-empty>
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
      banner:'',
      rules:{},
      tabs: [
        { title: "全部", id: 0 },
        { title: "竞拍中", id: 1 },
        { title: "未开始", id: 2 },
        { title: "已结束", id: 3 },
      ],
      selected: 0,
      list: [],
      loading: false,
      page: 1,
      size: 10,
      total: 0,

      showRule:false
    };
  },
  mounted() {
    this.getData();
    this.getBanner();
    this.getRule();
  },
  methods: {
    getBanner(){
      this.$fetch({
        url: "v1/common/banner",
        data: {
          categoryId:1
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.banner = res.data[0].photoUrl;
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
    changeTab(id) {
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
        url: "v1/bidding/biddingList",
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
  },
};
</script>

<style lang="scss" scoped>
.bidhall-page {
  .header {
    width: 100%;
    height: 368px;
    position: relative;
    .kv {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .rule {
      // width: 108px;
      padding: 0 20px 0 32px;
      height: 54px;
      background: #fea205;
      border-radius: 100px 0px 0px 100px;
      font-size: 28px;
      color: #ffffff;
      line-height: 54px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 65px;
    }
  }

  .container {
    padding: 0 32px;
    .tabs {
      width: 100%;
      overflow: auto;
      height: 88px;
      background: #ffffff;
      box-shadow: 0px 1px 0px 0px #dddddd;
      padding: 8px 0;
      margin-bottom: 30px;
      position: sticky;
      left: 0;
      top: 0;
      z-index: 9;
      ul {
        width: max-content;
        li {
          min-width: 155px;
          line-height: 72px;
          padding: 0 12px;
          background: #f9f9f9;
          border-radius: 6px;
          font-size: 24px;
          color: #333333;
          text-align: center;
          margin-right: 20px;
          &.on {
            background: #047cd3;
            color: #fff;
          }
        }
      }
    }

    .li {
      margin-bottom: 30px;
      width: 100%;
      min-height: 431px;
      background: #ffffff;
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;
      .top {
        padding: 24px;
        .title {
          font-size: 30px;
          color: #333333;
          line-height: 42px;
        }
        .biding {
          width: 149px;
          height: 54px;
          background: #d30404;
          border-radius: 6px;
          font-size: 24px;
          line-height: 23px;
          color: #ffffff;
          img {
            width: 23px;
            height: 23px;
            margin-right: 12px;
          }
        }
        .bid {
          width: 149px;
          height: 54px;
          background: #888888;
          border-radius: 6px;
          font-size: 24px;
          color: #ffffff;
          line-height: 54px;
          text-align: center;
        }
      }
      .line {
        width: 100%;
        height: 11px;
        background: linear-gradient(
          180deg,
          #eeeeee 0%,
          rgba(216, 216, 216, 0) 100%
        );
        opacity: 0.3;
      }
      .con {
        padding: 20px 24px 0;
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
        .btm {
          width: 100%;
          height: 137px;
          padding: 30px 0;
          background: rgba(236, 247, 255, 0.6);
          border-radius: 10px;
          overflow: hidden;
          margin-top: 20px;
          li {
            height: 68px;
            border-right: 1px solid rgba(151, 151, 151, .3);
            // padding-left: 28px;
            text-align: center;
            &.wid164{
                width: 164px;
            }
            &:first-child {
              // padding-left: 36px;
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
        .recode {
          padding: 19px 0;
          .look {
            font-size: 24px;
            color: #999;
          }
          .had {
            font-size: 24px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>