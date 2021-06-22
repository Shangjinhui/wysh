<template>
  <div class="header flex-sp">
      <a href="http://www.nbwysh.cn/mobile/index.php/welcome">
        <img class="logo" src="@/assets/img/logo.png" alt="">
      </a>
      <div class="side flex-top" @click.stop>
          <div class="menu" :style="{right:show_menu?'57.6vw':'0'}" @click="openMenu">
              <img src="@/assets/img/h-btn.png" alt="">
          </div>
          <div class="side-out" ref="side-inner" :style="{width:show_menu?'57.6vw':'0'}">
              <div class="side-inner">
                <ul class="tabs">
                    <li v-for="(item,index) in list" :key="index">
                        <template v-if="item.list">
                            <p class="le1 flex-center" @click="openTab(index)">{{item.title}}<img class="icon" :class="[{'open':item.open}]" src="@/assets/img/h-arrow.png" alt=""></p>
                                <!-- 二级 -->
                                <div class="le2-ul-out" :style="{height:item.open?item.h:0}">
                                    <ul class="le2-ul" :ref="'le2'+item.id">
                                        <li v-for="(item2,index2) in item.list" :key="index2">
                                            <a class="le2 flex-center" :href="item2.link">{{item2.title}}</a>
                                        </li>
                                    </ul>
                                </div>
                        </template>
                        <p class="le1 flex-center" v-else-if="item.route" @click="toRoute(item.route)">{{item.title}}</p>
                        <a v-else class="le1 flex-center" :href="item.link">{{item.title}}</a>
                    </li>

                    <li class="lang flex-center">
                        <a class="e-link" href="http://www.nbwysh.cn/en">ENGLISH</a>
                        <span class="line">/</span>
                        <a class="c-link">中文</a>
                    </li>
                </ul>

                <div class="side-btm flex-center" v-if="hasLogin" @click="toSelf">
                    <img src="@/assets/img/self.png" alt="">
                    <p>个人中心</p>
                </div>
                <div class="side-btm flex-center" v-else @click="toLogin">
                    <img src="@/assets/img/login.png" alt="">
                    <p>登录</p>
                </div>
            </div>
          </div>
          
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            show_menu:false,
            list:[
                {
                    id:1,
                    title:'首页',
                    link:'http://www.nbwysh.cn/mobile/index.php/welcome'
                },
                {
                    id:2,
                    title:'产品中心',
                    list:[
                        {title:' 聚氯乙烯（pvc）',link:'http://www.nbwysh.cn/mobile/index.php/product'},
                        {title:'增塑剂',link:'http://www.nbwysh.cn/mobile/index.php/product/index/3'},
                        {title:'碳酸钙',link:'http://www.nbwysh.cn/mobile/index.php/product/index/4'},
                        {title:'钛白粉',link:'http://www.nbwysh.cn/mobile/index.php/product/index/5'},
                        {title:'稳定剂',link:'http://www.nbwysh.cn/mobile/index.php/product/index/6'},
                        {title:'其他助剂',link:'http://www.nbwysh.cn/mobile/index.php/product/index/7'},
                    ]
                },
                {
                    id:3,
                    title:'行业动态',
                    list:[
                        {title:'原油资讯',link:'http://www.nbwysh.cn/mobile/index.php/news/index/1'},
                        {title:'PVC厂家动态',link:'http://www.nbwysh.cn/mobile/index.php/news/index/2'},
                        {title:'公司新闻',link:'http://www.nbwysh.cn/mobile/index.php/news/index/3'},
                    ]
                },
                {
                    id:4,
                    title:'关于我们',
                    list:[
                        {title:'公司简介',link:'http://www.nbwysh.cn/mobile/index.php/about'},
                        {title:'企业荣誉',link:'http://www.nbwysh.cn/mobile/index.php/about/honor'},
                        {title:'仓储概况',link:'http://www.nbwysh.cn/mobile/index.php/about/store'},
                    ]
                },
                {
                    id:7,
                    title:'竞拍大厅',
                    route:'/bidhall',
                },
                {
                    id:5,
                    title:'联系我们',
                    list:[
                        {title:'联系我们',link:'http://www.nbwysh.cn/mobile/index.php/contact'},
                        {title:'人才招聘',link:'http://www.nbwysh.cn/mobile/index.php/contact/jobs'},
                    ]
                },
                {
                    id:6,
                    title:'网站操作指南',
                    link:'http://www.nbwysh.cn/mobile/index.php/guide'
                },
            ],
            hasLogin:false,
            op_time:null,
        }
    },
    watch:{
        $route(){
            this.lisPage();
        }
    },
    mounted(){
        document.body.addEventListener('click',this.lisPage);
    },
    beforeDestroy(){
        document.body.removeEventListener('click',this.lisPage);
    },
    methods:{
        openMenu(){
            clearTimeout(this.op_time);
            if(this.show_menu){
                this.show_menu = false;
                this.op_time = setTimeout(()=>{
                    this.$refs['side-inner'].style.display = 'none';
                    document.body.style.overflow = 'auto';
                    clearTimeout(this.op_time);
                },500)
            }else{
                window.scrollTo(0,0);
                this.$refs['side-inner'].style.display = 'block';
                document.body.style.overflow = 'hidden';
                this.op_time = setTimeout(()=>{
                    this.show_menu = true;
                    this.$nextTick(()=>{
                        let timer = setTimeout(()=>{
                            this.initH();
                            clearTimeout(timer);
                        },500)
                        
                    })
                    
                    clearTimeout(this.op_time);
                },0)
            }
            // 查看登录
            this.$until.checkLogin(info=>{
                this.hasLogin = info?true:false;
            })
        },
        lisPage(){
            clearTimeout(this.op_time);
            this.show_menu = false;
            this.op_time = setTimeout(()=>{
                this.$refs['side-inner'].style.display = 'none';
                document.body.style.overflow = 'auto';
                clearTimeout(this.op_time);
            },500)
        },
        initH(){
            let list = this.list;
            for(let i=0;i<list.length;i++){
                if(list[i].list) list[i].h = this.$refs['le2'+list[i].id][0].offsetHeight+'px';
            }
        },
        openTab(ind){
            let list = [...this.list];
            list.forEach((item,index)=>{
                item.open = index==ind?!item.open:false;
            })
            this.list = list;
        },
        toSelf(){
            // this.lisPage();
            if(this.$route.path == '/self') return;
            this.$router.push('/self');
        },
        toLogin(){
            this.$router.push({path:'/login',query:{url:decodeURI(location.href)}});
        },
        toRoute(path){
            if(this.$route.path!=path) this.$router.push(path);
        }
    }
}
</script>

<style lang="scss" scoped>
$h:108px;
.header{
    width:100%;
    height:$h;
    background:#fff;
    padding-left:24px;
    .logo{
        width:340px;
    }
    .side{
        z-index: 10;
        .menu{
            background:rgba(255,255,255,.9);
            height: $h;
            padding:28px 20px 24px;
            position:absolute;
            top:0;
            right:0;
            transition: right .5s ease;
            img{
                width:56px;
                height:56px;
            }
        }
        .side-out{
            width:0;
            // overflow: hidden;
            display:none;
            transition: width .5s ease;
            height:100vh;
            background:rgba(255,255,255,.9);
            position:absolute;
            top:0;
            right:0;
            .side-inner{
                // background:rgba(255,255,255,.9);
                width: 432px;
                // padding-top:110px;
                .tabs{
                    height:82vh;
                    padding-top:110px;
                    overflow: auto;
                    li{
                        .le1{
                            width:100%;
                            height:$h;
                            font-size:36px;
                            color:#333;
                            position: relative;
                            .icon{
                                width:24px;
                                height:24px;
                                object-fit: cover;
                                position:absolute;
                                right:100px;
                                transition: all .3s ease;
                                &.open{
                                    transform: rotate(90deg);
                                }
                            }
                        }
                        .le2-ul-out{
                            height:0;
                            overflow: hidden;
                            transition: height .3s ease;
                            .le2-ul{
                                
                                .le2{
                                    width:100%;
                                    line-height:38px;
                                    padding-bottom: 20px;
                                    font-size:32px;
                                    color:#333;
                                }
                            }
                        }

                        &.lang{
                            width:100%;
                            height:$h;
                            font-size:36px;
                            color:#333;
                            .e-link{
                                color: #007cd3;
                            }
                            .line{
                                padding:6px;
                            }
                        }
                    }
                }

                .side-btm{
                    width: 432px;
                    font-size:36px;
                    line-height: 50px;
                    padding-top:30px;
                    color:#666;
                    position: absolute;
                    left:0;
                    bottom:68px;
                    img{
                        width:44px;
                        margin-right:12px;
                    }
                }
            }
        }
        
    }
}
</style>