<template>
  <div class="self-page">
      <div class="self-inner">
          <my-cremb :cremb="cremb"></my-cremb>
          <div class="con flex-top">
              <div class="left">
                  <div class="avatar-out">
                      <img class="avatar" :src="info.avatar||avatar" alt="">
                      <p class="username">{{info.nickname}}</p>
                      <div class="exit cursor" @click="Exit">退出登录</div>
                  </div>
                  <ul class="side">
                      <li class="flex-center cursor b" :class="[{select:selected==index}]" v-for="(item,index) in side" :key="index" @click="changeSide(index)">
                          <p>{{item.title}}</p>
                      </li>
                  </ul>
              </div>
              <div class="right flex1">
                  <self-edit v-if="keep.indexOf(0)!=-1" v-show="selected==0" :info="info" @editInfo="editInfo"></self-edit>
                  <self-bond v-if="keep.indexOf(1)!=-1" v-show="selected==1"></self-bond>
                  <self-bidding v-if="keep.indexOf(2)!=-1" v-show="selected==2"></self-bidding>
                  <self-order v-if="keep.indexOf(3)!=-1" v-show="selected==3"></self-order>
              </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import myCremb from '@/components/selfCremb';

import selfEdit from '@/pages/selfCenter/selfEdit';
import selfBond from '@/pages/selfCenter/selfBond';
import selfBidding from '@/pages/selfCenter/selfBidding';
import selfOrder from '@/pages/selfCenter/selfOrder';
export default {
    components:{myCremb,selfEdit,selfBond,selfBidding,selfOrder},
    data(){
        return {
            cremb:[],
            side:[
                {title:'基本信息',path:''},
                {title:'我的保证金',path:''},
                {title:'我的竞拍',path:''},
                {title:'我的订单',path:''},
            ],
            selected:-1,
            keep:[],
            info:{},
            avatar: require("@/assets/img/avatar.png"),
        }
    },
    mounted(){
        this.$until.isLogin(this,info=>{
            if(info){
                this.info = info;

                let ind = this.$route.query.ind||0;
                this.selected = ind;
                this.keep = [Number(ind)];
                this.initCremb(ind);
            }
        })
    },
    watch:{
        $route(val){
            //通过链接到达的话从这里更换query
            let ind = val.query.ind||0;
            this.selected = ind;
            //this.keep = [Number(ind)];
            if(this.keep.indexOf(Number(ind))==-1) this.keep.push(Number(ind));
            //console.log(this.keep)
            this.initCremb(ind);
        }
    },
    methods:{
        initCremb(ind){
            //处理下cremb
            let arr = [{title:'编辑个人信息'},{title:'我的保证金'},{title:'我的竞拍'},{title:'我的订单'},];
            this.cremb = [
                {title:'首页',link:'http://www.nbwysh.cn/index.php/welcome'},
                {title:'个人中心'},
                arr[ind]
            ];
        },
        changeSide(ind){
            if(ind==this.selected) return;
            this.selected = ind;
            this.$router.push({path:'/self',query:{ind}});
            //if(this.keep.indexOf(ind)==-1) this.keep.push(ind);
        },
        Exit(){
            this.$fetch({
                url: "v1/login/loginOut",
            }).then((res) => {
                if (res.returnCode == "200") {
                    this.$eventBus.$emit('lisToken',false);
                    window.sessionStorage.removeItem('token_pc');
                    this.$router.push('/login');
                }
            });
        },
        editInfo(val){
            this.info = val;
        },
    }
}
</script>

<style lang="scss" scoped>
.self-page{
    width:100%;
    min-height:639px;
    padding-bottom:40px;
    background:#edf1f4;
    .self-inner{
        width:1190px;
        margin:0 auto;
        .con{
            margin-top:10px;
            .left{
                width:170px;
                min-height:387px;
                padding-bottom:14px;
                margin-right:20px;
                background: #FFFFFF;
                border-radius: 4px;
                .avatar-out{
                    width:100%;
                    height:172px;
                    padding-top:14px;
                    background: url('../assets/img/bg2.png') 0 0/cover no-repeat;
                    .avatar{
                        width:71px;
                        height:71px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin:0 auto;
                    }
                    .username{
                        font-size: 14px;
                        color: #666666;
                        padding:0 20px;
                        text-align: center;
                        margin-top:12px;
                    }
                    .exit{
                        width: 60px;
                        border: 1px solid #BFBFBF;
                        opacity: 0.8;
                        border-radius: 2px;
                        font-size: 12px;
                        color: #999999;
                        line-height:24px;
                        text-align: center;
                        margin:13px auto;
                    }
                }
                .side{
                    margin-top:12px;
                    li{
                        width:100%;
                        height:44px;
                        font-size:14px;
                        color:#333;
                        border-left:2px solid #fff;
                        &.select{
                            color:#007CD3;
                            border-left:2px solid #007CD3;
                            background:#f8fafd;
                        }
                    }
                }
            }
        }
    }
}
</style>