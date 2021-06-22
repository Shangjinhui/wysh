<template>
  <div class="header">
    <div class="top">
      <div class="top-inner flex-sp">
        <p class="h3">欢迎进入宁波炜烨塑化有限公司官方网站！</p>
        <ul class="right flex">
          <li class="flex" v-if="!hasLogin" @click="toLogin">
            <img class="icon" src="@/assets/img/icon7.png" alt="" />
            <p>登录</p>
          </li>
          <router-link tag="li" to="/self" class="flex" v-else>
            <img class="icon" src="@/assets/img/icon7.png" alt="" />
            <p>个人中心</p>
          </router-link>
          <li>
            <a class="flex" href="http://www.nbwysh.cn/en/">
              <img class="icon" src="@/assets/img/sy_04.jpg" alt="" />
              <p>English</p>
            </a>
          </li>
          <li><span class="hover">收藏</span></li>
          <li>
            <a class="hover" href="http://www.nbwysh.cn/index.php/guide"
              >网站操作指南</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="con">
      <div class="con-inner flex-sp">
        <div class="flex">
          <a class="h1 b flex" href="http://www.nbwysh.cn/index.php/welcome"
            ><span>Wei Ye</span><span class="chi-title">炜烨塑化</span></a
          >
          <p class="h3 b">PVC综合服务商</p>
        </div>
        <div class="c-r flex-sp">
          <div class="flex">
            <img class="icon-phone" src="@/assets/img/sy_15.jpg" alt="" />
            <div>
              <p class="hot">全国服务热线</p>
              <em class="phone b">{{tel}}</em>
            </div>
          </div>
          <img class="code" :src="qrcode" alt="" />
        </div>
      </div>
    </div>

    <div class="menu">
      <ul class="nav flex">
        <li
          class="flex-center flex1 cursor"
          :class="[{ select: selected == item.id, wid176: item.id == 5 }]"
          v-for="(item, index) in navs"
          :key="index"
        >
          <router-link v-if="item.route" :to="item.route">{{
            item.title
          }}</router-link>
          <a v-else :href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          title: "首页",
          link: "http://www.nbwysh.cn/index.php/welcome",
          id: 1,
        },
        {
          title: "PVC",
          link: "http://www.nbwysh.cn/index.php/product/index/2",
          id: 2,
        },
        {
          title: "增塑剂",
          link: "http://www.nbwysh.cn/index.php/product/index/3",
          id: 3,
        },
        {
          title: "碳酸钙",
          link: "http://www.nbwysh.cn/index.php/product/index/4",
          id: 4,
        },
        {
          title: "日本钟渊MBS、ACR",
          link: "http://www.nbwysh.cn/index.php/product/index/5",
          id: 5,
        },
        {
          title: "稳定剂",
          link: "http://www.nbwysh.cn/index.php/product/index/6",
          id: 6,
        },
        {
          title: "其它助剂",
          link: "http://www.nbwysh.cn/index.php/product/index/7",
          id: 7,
        },
        { title: "竞拍大厅", route: "/bidhall", id: 11 },
        {
          title: "行业动态",
          link: "http://www.nbwysh.cn/index.php/news",
          id: 8,
        },
        {
          title: "关于我们",
          link: "http://www.nbwysh.cn/index.php/about",
          id: 9,
        },
        {
          title: "联系我们",
          link: "http://www.nbwysh.cn/index.php/contact",
          id: 10,
        },
      ],
      selected: 0,
      hasLogin: false,
      tel:'',
      qrcode:'',
    };
  },
  watch: {
    $route(val) {
      let white = ["/self", "/login"];
      this.selected = white.indexOf(val.path) != -1 ? 0 : 11;
    },
  },
  created() {
    //检测登录
    this.$until.checkLogin((res) => {
      this.hasLogin = res ? true : false;
    });
    //监听登录
    this.$eventBus.$on("lisToken", (res) => {
      this.hasLogin = res;
    });

    this.getData();
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/login",
        query: { url: decodeURI(location.href) },
      });
    },
    getData(){
        this.$fetch({
            url: "v1/common/webFooter",
        }).then((res) => {
            if(res.returnCode=='200'){
                this.tel = res.data.tel;
                this.qrcode = res.data.qrcode;
            }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  .top {
    width: 100%;
    height: 43px;
    background: url(../assets/img/sy_01.jpg) repeat-x;
    .top-inner {
      width: 1190px;
      height: 100%;
      margin: 0 auto;
      .h3 {
        font-size: 12px;
        color: #888;
      }
      .right {
        font-family: Arial;
        li {
          padding: 0 10px;
          border-right: 1px solid #e1e1e1;
          cursor: pointer;
          font-size: 12px;
          color: #666;
          &:last-child {
            border-right: none;
          }
          a {
            color: #666;
          }
          .hover:hover {
            color: #007cd3;
          }
          .icon {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        }
      }
    }
  }

  .con {
    width: 100%;
    height: 110px;
    .con-inner {
      width: 1190px;
      height: 100%;
      margin: 0 auto;
      .h1 {
        min-width: 274px;
        border-right: 1px solid #e1e1e1;
        font-size: 38px;
        line-height: 40px;
        color: #007cd3;
        font-family: Arial;
        text-transform: uppercase;
        padding-right: 5px;
        .chi-title {
          line-height: 40px;
          font-size: 30px;
          margin-left: 5px;
        }
      }
      .h3 {
        font-size: 16px;
        color: #404040;
        padding-left: 20px;
      }

      .c-r {
        width: 300px;
        .icon-phone {
          width: 33px;
          height: 33px;
          margin-right: 10px;
        }
        .hot {
          color: #5e5d5d;
          font-size: 12px;
          margin-top: 4px;
          margin-bottom: 3px;
        }
        .phone {
          color: #f49b00;
          font-size: 20px;
          font-family: Arial;
        }
        .code {
          width: 59px;
        }
      }
    }
  }

  .menu {
    width: 100%;
    height: 53px;
    background: #007cd3;
    .nav {
      width: 1190px;
      margin: 0 auto;
      li {
        min-width: 94px;
        line-height: 53px;
        text-align: center;
        border-left: 1px solid #0472bf;
        border-right: 1px solid #1085d7;
        &.wid176 {
          min-width: 176px;
        }
        &:hover,
        &.select {
          background: #006fbd;
        }
        a {
          width: 100%;
          padding: 0 20px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>