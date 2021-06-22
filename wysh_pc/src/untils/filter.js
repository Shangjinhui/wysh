import Vue from 'vue';
function AddZero(num){
    return num<10?'0'+num:num;
}
//2021.05.10 11：00
Vue.filter('exTime',time=>{
    let date = new Date(time*1000);
    let year = date.getFullYear(),
    month = AddZero(date.getMonth()+1),
    day = AddZero(date.getDate()),
    h = AddZero(date.getHours()),
    m = AddZero(date.getMinutes());
    return `${year}.${month}.${day} ${h}:${m}`
})
//2021-5-10 18:35:30
Vue.filter('exTime2',time=>{
    let date = new Date(time*1000);
    let year = date.getFullYear(),
    month = AddZero(date.getMonth()+1),
    day = AddZero(date.getDate()),
    h = AddZero(date.getHours()),
    m = AddZero(date.getMinutes()),
    s = AddZero(date.getSeconds());
    return `${year}-${month}-${day} ${h}:${m}:${s}`
})
//14:48:58
Vue.filter('exTime3',time=>{
    let date = new Date(time*1000);
    let h = AddZero(date.getHours()),
    m = AddZero(date.getMinutes()),
    s = AddZero(date.getSeconds());
    return `${h}:${m}:${s}`
})