<template>
  <div class="bidhall-page">
    <img class="banner" :src="banner" alt="" />
    <div class="main">
      <ul class="tabs flex">
        <li
          class="cursor"
          :class="[{ select: selected == item.id }]"
          v-for="(item, index) in tabs"
          :key="index"
          @click="changeTabs(index)"
        >
          {{ item.title }}
        </li>
      </ul>

      <template v-if="list.length>0">
        <ul class="list flex flex-wrap">
          <router-link
            tag="li"
            :to="{
              path: '/biddetail',
              query: { id: item.id, type: item.status },
            }"
            class="li cursor"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="top flex-sp">
              <p class="title flex1 ellipsis1 b">{{ item.title }}</p>
              <div class="biding hover-deepen flex-center" v-if="item.status == 1">
                <img src="@/assets/img/point.png" alt="" />
                <p>竞拍中</p>
              </div>
              <div class="bid" v-else>
                {{ item.status == 2 ? "即将开始" : "竞拍结束" }}
              </div>
            </div>
            <div class="line"></div>
            <div class="con">
              <div class="time flex">
                <img src="@/assets/img/time.png" alt="" />
                <p>
                  开始时间：<span class="colE30404">{{
                    item.startTimeline | exTime
                  }}</span>
                </p>
              </div>
              <div class="time flex">
                <img src="@/assets/img/time.png" alt="" />
                <p>
                  结束时间：<span class="colE30404">{{
                    item.endTimeline | exTime
                  }}</span>
                </p>
              </div>
              <ul class="btm flex" v-if="item.status != 3">
                <li class="flex1">
                  <p class="desc">竞拍总量</p>
                  <p class="num">{{ item.totalTon }}吨</p>
                </li>
                <li class="flex1">
                  <p class="desc">起拍价</p>
                  <p class="num">{{ item.minUnitPrice }}元</p>
                </li>
                <li class="flex1">
                  <p class="desc">起拍量</p>
                  <p class="num">{{ item.minTon }}吨</p>
                </li>
              </ul>
              <ul class="btm flex" v-else>
                <li class="flex1">
                  <p class="desc">竞拍总量</p>
                  <p class="num">{{ item.totalTon }}吨</p>
                </li>
                <li class="flex1">
                  <p class="desc">成交底价</p>
                  <p class="num">{{ item.defaultPrice }}元</p>
                </li>
                <li class="flex1">
                  <p class="desc">成交高价</p>
                  <p class="num">{{ item.dealMaxPrice }}元</p>
                </li>
                <li class="flex1">
                  <p class="desc">成交吨数</p>
                  <p class="num">{{ item.dealTon }}吨</p>
                </li>
              </ul>
              <div class="flex-sp recode">
                <p class="look">浏览量：{{ item.views }}</p>
                <p class="look" v-if="item.status == 1">
                  出价：{{ item.offerMember }}人
                </p>
                <p class="had" v-if="item.status == 3">
                  已有{{ item.dealMember }}家中标
                </p>
              </div>
            </div>
          </router-link>
        </ul>
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
      </template>
      

      <my-empty v-else></my-empty>
    </div>
  </div>
</template>

<script>
import myEmpty from "@/components/empty";
export default {
  components:{myEmpty},
  data() {
    return {
      banner:'',
      tabs: [
        { title: "全部竞拍", id: 0 },
        { title: "竞拍中", id: 1 },
        { title: "将开始", id: 2 },
        { title: "已结束", id: 3 },
      ],
      selected: 0,
      list: [
        
      ],
      page:1,
      size:9,
      total:0,
    };
  },
  mounted(){
    this.getBanner();
    this.getData();
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
    changeTabs(ind) {
      if (this.selected == ind) return;
      this.selected = ind;
      this.page = 1;
      this.getData();
    },
    changPage(page){
      this.page = page;
      this.getData();
    },
    getData() {
      this.$fetch({
        url: "v1/bidding/biddingList",
        data: {
          status: this.selected,
          page: this.page,
          limit: this.size,
        },
      }).then((res) => {
        if(res.returnCode=='200'){
            this.list = res.data.list;
            this.total = res.data.count;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bidhall-page {
  .banner {
    width: 100%;
    height: 372px;
    object-fit: cover;
  }
  .main {
    width: 1190px;
    margin: 21px auto 105px;
    .tabs {
      margin-bottom: 22px;
      border: 1px solid rgba(220, 219, 219, 0.6);
      background: #f7f7f7;
      li {
        font-size: 18px;
        color: #666;
        min-width: 126px;
        text-align: center;
        padding: 22px 20px 20px;
        position: relative;
        &.select {
          color: #467bcf;
        }
        &.select:after {
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

    .list {
    //   min-height: 480px;
      .li {
        margin-bottom: 16px;
        margin-right:16px;
        width: 386px;
        height: 227px;
        background: #ffffff;
        border: 1px solid #DCDCDC;
        box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
        border-radius: 4px;
        position: relative;
        &:nth-of-type(3n+3){margin-right:0;}
        .top {
          padding: 14px 18px 0;
          .title {
            font-size: 16px;
            color: #333333;
            line-height: 22px;
          }
          .biding {
            width: 80px;
            height: 30px;
            background: #d30404;
            border-radius: 6px;
            font-size: 14px;
            line-height: 30px;
            color: #ffffff;
            position: relative;
            img {
              width: 15px;
              height: 15px;
              margin-right: 8px;
            }
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
          .bid {
            width: 80px;
            height: 30px;
            background: #888888;
            border-radius: 6px;
            font-size: 14px;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            position: relative;
            &:after{
              content: "";
              width: 80%;
              height: 50%;
              background: #888888;
              opacity: 0.5;
              filter: blur(13px);
              position: absolute;
              left: 50%;
              top: 60%;
              transform: translateX(-50%);
            }
          }
        }
        .con {
          padding: 10px 19px 0;
          .time {
            margin-bottom: 10px;
            font-size: 14px;
            color: #333;
            img {
              width: 16px;
              height: 16px;
              margin-right: 6px;
            }
            .colE30404 {
              color: #e30404;
            }
          }
          .btm {
            width: 100%;
            height: 73px;
            padding: 17px 0 22;
            background: #F4FAFF;
            overflow: hidden;
            margin-top: 17px;
            li {
              height: 34px;
              border-right: 1px solid rgba(212, 223, 232, .5);
              // padding-left: 28px;
              text-align: center;
              &:first-child {
                // padding-left: 36px;
              }
              &:last-child {
                border-right: 0;
              }
              .desc {
                font-size: 14px;
                color: #666666;
              }
              .num {
                font-size: 14px;
                color: #333333;
                margin-top: 9px;
              }
            }
          }
          .recode {
            padding: 12px 0;
            .look {
              font-size: 12px;
              color: #999;
            }
            .had {
              font-size: 12px;
              color: #333;
            }
          }
        }
      }
    }
    .pagination{
        text-align: center;
        padding-right:30px;
        margin-top:20px;
    }
  }
}
</style>