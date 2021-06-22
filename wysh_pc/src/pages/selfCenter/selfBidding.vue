<template>
  <div class="self-block">
    <p class="title b">我的竞拍</p>

    <div class="main">
      <div class="list-out">
        <ul class="list flex flex-wrap" v-if="list.length>0">
          <router-link
            tag="li"
            :to="{ path: '/biddetail', query: { id: item.id } }"
            class="li cursor"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="top flex-sp" :class="[{ grey: item.biddingStatus == 3 }]">
              <p class="title flex1 ellipsis1 b">{{ item.title }}</p>
              <div class="biding flex-center" v-if="item.biddingStatus == 1">
                <img src="@/assets/img/point.png" alt="" />
                <p>{{ item.biddingStatusVal }}</p>
              </div>
              <div class="bid" v-else-if="item.biddingStatus == 3">
                {{ item.biddingStatusVal }}
              </div>
            </div>
            <!-- <div class="line"></div> -->
            <div class="con" :class="[{ grey: item.biddingStatus == 3 }]">
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
              <p class="end-title b">我的最后出价</p>
              <ul class="btm flex">
                <li class="flex1">
                  <p class="desc">出价金额</p>
                  <p class="num">¥{{ item.unitPrice }}</p>
                </li>
                <li class="flex1">
                  <p class="desc">出价数量</p>
                  <p class="num">{{ item.totalTon }}</p>
                </li>
                <li class="flex1">
                  <p class="desc">入围数量</p>
                  <p class="num">{{ item.dealTon }}</p>
                </li>
              </ul>
            </div>
            <img
              v-if="item.status == 1"
              class="status"
              src="@/assets/img/icon1.png"
              alt=""
            />
            <img v-else class="status" src="@/assets/img/icon2.png" alt="" />
          </router-link>
        </ul>
        <my-empty v-else></my-empty>
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
    </div>
  </div>
</template>

<script>
import myEmpty from "@/components/empty";
export default {
  components: { myEmpty },
  data() {
    return {
      list: [
        
      ],
      page: 1,
      size: 4,
      total: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$fetch({
        url: "v1/member/biddingList",
        data: {
          page: this.page,
          limit: this.size,
        },
      }).then((res) => {
        if (res.returnCode == "200") {
          this.list = [
            ...res.data.onGoing.list,
            ...res.data.closed.list,
          ];
          this.total = res.data.closed.count;
        }
      });
    },
    changPage(page){
        this.page = page;
        this.getData();
    }
  },
};
</script>

<style lang="scss" scoped>
.self-block {
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  padding: 24px 0;
  & > .title {
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    padding-left: 27px;
    border-left: 2px solid #467bcf;
  }
  .main {
    padding-left: 30px;
    margin-top: 27px;
    .list-out{
      min-height: 480px;
    }
    .list {
      .li {
        margin-right: 13px;
        margin-bottom: 13px;
        width: 465px;
        min-height: 227px;
        background: #ffffff;
        border: 1px solid #dcdcdc;
        box-shadow: 0px 0px 10px 0px rgba(21, 106, 241, 0.2);
        border-radius: 4px;
        padding: 0 17px;
        position: relative;
        &:nth-of-type(2n + 2) {
          margin-right: 0;
        }
        .top {
          padding: 14px 0;
          .title {
            font-size: 16px;
            color: #333333;
          }
          .biding {
            width: 80px;
            height: 30px;
            background: #d30404;
            border-radius: 6px;
            font-size: 12px;
            line-height: 30px;
            color: #ffffff;
            position: relative;
            img {
              width: 15px;
              height: 15px;
              margin-right: 8px;
            }
            &:after {
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
            font-size: 12px;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            position: relative;
            &:after {
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
        // .line{
        //     width:100%;
        //     height: 11px;
        //     background: linear-gradient(180deg, #EEEEEE 0%, rgba(216, 216, 216, 0) 100%);
        //     opacity: 0.3;
        // }
        .con {
          // padding:20px 24px 0;
          .time {
            margin-bottom: 10px;
            font-size: 14px;
            color: #333;
            img {
              width: 16px;
              height: 16px;
              margin-right: 10px;
            }
            .colE30404 {
              color: #e30404;
            }
          }
          .end-title {
            margin-top: 13px;
            font-size: 14px;
            color: #333333;
          }
          .btm {
            width: 100%;
            height: 73px;
            padding: 17px 0 13px;
            background: #f4faff;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 9px;
            li {
              height: 34px;
              border-right: 1px solid #d4dfe8;
              padding-left: 40px;
              // &:first-child{
              //     padding-left:36px;
              // }
              &:last-child {
                padding-left: 36px;
                border-right: 0;
              }
              .desc {
                font-size: 14px;
                color: #666666;
              }
              .num {
                font-size: 14px;
                color: #333333;
                margin-top: 10px;
              }
            }
          }
        }
        .status {
          width: 59px;
          height: 47px;
          position: absolute;
          right: 27px;
          top: 95px;
        }
      }
    }

    .pagination {
      text-align: right;
      padding-right: 30px;
      margin-top: 20px;
    }
  }
}
</style>