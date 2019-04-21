import axios from 'axios'

const Util = {
  imgPath: 'http://127.0.0.1:8011/img/',
  apiPath: 'http://127.0.0.1:8010',
};
// 获取今日0点0分0秒0毫秒的时间戳
Util.getTodayTime = function(){
  var date = new  Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}
// 转化格式为 20190410 类型, 请求需要的时间格式
Util.prevDay = function(timestamp=(Date.now())){
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth()+1 < 10
    ? '0' + (date.getMonth()+1)
    : date.getMonth()+1;
  const day = date.getDate()+1 < 10
    ? '0' + (date.getDate()+1)
    : date.getDate();
  return year + '' + month + '' + day;
}
// 将20190410转为 2019年4月10日这样的格式
Util.formatDay = function(date){
  var year = date.substr(0, 4);
  var month = date.substr(4, 2).substr(0, 1)==='0' 
    ? date.substr(4, 2).substr(1, 1)
    : date.substr(4, 2);
  var day = date.substr(6, 2).substr(0, 1)==='0'
    ? date.substr(6, 2).substr(1, 1)
    :date.substr(6, 2)
  return `${year}年${month}月${day}日`
}
// 创建实例时设置配置的默认值
Util.ajax = axios.create({
  baseURL: Util.apiPath
});
// 添加响应拦截器
Util.ajax.interceptors.response.use(res=>{
  // 对响应数据做点什么
  return res.data;
});

export default Util;