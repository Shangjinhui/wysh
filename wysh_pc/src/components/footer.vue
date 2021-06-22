<template>
  <div class="footer">
    <div class="footer-inner flex-sp">
      <div class="left">
        <img class="title" src="@/assets/img/sy_89.jpg" alt="" />
        <img class="code" :src="detail.qrcode" alt="" />
      </div>
      <div class="right">
        <ul class="r-link flex">
          <li v-for="(item, index) in link" :key="index">
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
        <div class="r-btm">
          <ul class="inform flex">
            <li>地址：{{detail.addr}}</li>
            <li>联系电话：{{detail.tel}}</li>
            <li>邮箱：{{detail.email}}</li>
            <li>
              阿里巴巴：<a :href="detail.email" target="_blank"
                >{{detail.email}}</a
              >
            </li>
          </ul>
          <div class="bean flex">
            <p class="mr25">
              {{detail.copyright}}
            </p>
            <a class="mr25" href="https://beian.miit.gov.cn" target="_blank"
              >浙ICP备15012614号-2</a
            >
            <a class="mr25" href="http://www.bocweb.cn" target="_blank"
              >网站建设：博采网络</a
            >
            <a
              class="gif"
              href="https://www.cnzz.com/stat/website.php?web_id=1260018516"
              target="_blank"
              title="站长统计"
            >
              <img
                border="0"
                hspace="0"
                vspace="0"
                src="@/assets/img/pic1.gif"
              />
            </a>
          </div>
          <div class="share-out flex">
            <p>分享到：</p>
            <div class="bdsharebuttonbox" data-tag="share_1">
              <a href="#" class="bds_more" data-cmd="more"></a>
              <a
                href="#"
                class="bds_weixin"
                data-cmd="weixin"
                title="分享到微信"
              ></a>
              <a
                href="#"
                class="bds_tsina"
                data-cmd="tsina"
                title="分享到新浪微博"
              ></a>
              <a
                href="#"
                class="bds_tqq"
                data-cmd="tqq"
                title="分享到腾讯微博"
              ></a>
              <a
                href="#"
                class="bds_qzone"
                data-cmd="qzone"
                title="分享到QQ空间"
              ></a>
              <a
                href="#"
                class="bds_renren"
                data-cmd="renren"
                title="分享到人人网"
              ></a>
              <a
                href="#"
                class="bds_douban"
                data-cmd="douban"
                title="分享到豆瓣网"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: [
        {title:'首页',link:'http://www.nbwysh.cn/index.php/welcome',id:1},
        {title:'PVC',link:'http://www.nbwysh.cn/index.php/product/index/2',id:2},
        {title:'增塑剂',link:'http://www.nbwysh.cn/index.php/product/index/3',id:3},
        {title:'碳酸钙',link:'http://www.nbwysh.cn/index.php/product/index/4',id:4},
        {title:'日本钟渊MBS、ACR',link:'http://www.nbwysh.cn/index.php/product/index/5',id:5},
        {title:'稳定剂',link:'http://www.nbwysh.cn/index.php/product/index/6',id:6},
        {title:'其它助剂',link:'http://www.nbwysh.cn/index.php/product/index/7',id:7},
        {title:'行业动态',link:'http://www.nbwysh.cn/index.php/news',id:8},
        {title:'关于我们',link:'http://www.nbwysh.cn/index.php/about',id:9},
        {title:'联系我们',link:'http://www.nbwysh.cn/index.php/contact',id:10},
      ],
      detail:{},
    };
  },
  mounted() {
    this.getData();
    this.initShare();
  },
  methods: {
    getData(){
        this.$fetch({
            url: "v1/common/webFooter",
        }).then((res) => {
            if(res.returnCode=='200'){
                this.detail = res.data;
            }
        });
    },
    initShare() {
      window._bd_share_config = {
        common: {
          bdText: "",                         //自定义分享内容
          bdDesc: "",                         //自定义分享摘要
          bdUrl: "http://www.nbwysh.cn/index.php/welcome",                          //自定义分享url地址
          bdPic: "",                          //自定义分享图片
        },
        share: [
          {
            bdSize: 16,
          },
        ],
        slide: [
          {
            bdImg: 0,
            bdPos: "right",
            bdTop: 100,
          },
        ],
        // image: [
        //   {
        //     viewType: "list",
        //     viewPos: "top",
        //     viewColor: "black",
        //     viewSize: "16",
        //     viewList: ["qzone", "tsina", "huaban", "tqq", "renren"],
        //   },
        // ],
        selectShare: [
          {
            bdselectMiniList: ["qzone", "tqq", "kaixin001", "bdxc", "tqf"],
          },
        ],
      };

      // 百度分享有自动销毁的逻辑，加这么一段代码   重新初始化就没问题了。
      // if (window._bd_share_main) {
      //   window._bd_share_main.init();
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 245px;
  background: #0166bb;
  .footer-inner {
    width: 1190px;
    height: 100%;
    margin: 0 auto;
    .left {
      width: 230px;
      height: 100%;
      background: #0060b1;
      padding-top: 32px;
      .title {
        height: 44px;
        margin: 0 auto 15px;
      }
      .code {
        width: 127px;
        margin: 0 auto;
      }
    }
    .right {
      width: 925px;
      height: 100%;
      .r-link {
        min-height: 70px;
        margin-top: 10px;
        border-bottom: 1px solid #006eca;
        li {
          a {
            display: block;
            min-width: 86px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            &:hover {
              color: #a8c0e0;
            }
          }
        }
      }
      .r-btm {
        border-top: 1px solid #0060b1;
        padding-top: 20px;
        .inform {
          line-height: 35px;
          li {
            color: #a8c0e0;
            font-size: 14px;
            margin-right: 25px;
            a {
              color: #a8c0e0;
              &:hover {
                color: #fff;
              }
            }
          }
        }
        .bean {
          line-height: 35px;
          color: #6694c4;
          font-size: 14px;
          a {
            color: #6694c4;
            &:hover {
              color: #fff;
            }
          }
          .mr25 {
            margin-right: 25px;
          }
          .gif img {
            height: 20px;
            margin-top: -8px;
          }
        }
        .share-out {
          color: #a8c0e0;
          font-size: 14px;
          height: 35px;
        }
      }
    }
  }
}
</style>