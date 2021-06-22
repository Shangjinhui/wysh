// 价格小数点后数字变小
const smallPoint = (num,fs=24) => {
    let arr = (''+num).split('.');
    return arr[1]?`${arr[0]}.<span style="font-size:${fs}px;">${arr[1]}</span>`:num;
}
// 复制
const Copy = (that,txt) => {
    let input = document.createElement("input");
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('Copy');
    document.body.removeChild(input);
    that.$message('复制成功');
}
// 判断登录y need是否需要返回用户信息n去登录,tologin是否跳转登录页
const isLogin = (that,fun,need=true,tologin=true) => {
    let token = window.sessionStorage.getItem('token_pc');
    //info = window.sessionStorage.getItem('info_h5');
    if(token){
        if(need){
            that.$fetch({
                url: "v1/member/info",
            }).then((res) => {
                if(res.returnCode=='200'){
                    let info = res.data;
                    fun(info);
                }else{
                    that.$message(res.msg);
                }
            });
        }else{
            fun(true);
        }
        
    }else{
        if(tologin) that.$router.push({path:'/login',query:{url:decodeURI(location.href)}});
        fun(false);
    }
    
}
//判断登录y true n false
const checkLogin = (fun) => {
    let token = window.sessionStorage.getItem('token_pc');
    fun(token?true:false);
}
//简单处理加减乘除导致的数字精度问题(四舍五入去小数点后10位并返回字符串再被解析为浮点数)
const mathNumber = num=>parseFloat(num.toFixed(10))
//富文本处理1图片宽度
const richText = txt => txt?txt.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"'):'';
//节流
export function throttle(fn,delay=300){
    let gate = true,timer = null;
    return function(){
        if(!gate){
            return false;
        }
        gate = false;
        fn.call(this,...arguments);
        timer = setTimeout(()=>{
            gate = true;
            clearTimeout(timer);
        },delay)
    }
}
//防抖
export function debounce(fn,delay=300){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.call(this,...arguments);
            clearTimeout(timer);
        },delay);
    }
}
export const until =  {
    smallPoint,
    Copy,
    isLogin,
    checkLogin,
    mathNumber,
    richText,
}