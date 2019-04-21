var Time = {
  // 现在的时间戳
  getUnix: function(){
    return Date.now();
  },
  // 今日0:0:0 的时间戳
  getTodayUnix: function(){
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 今年1月1日0:0:0的时间戳
  getYearUnix: function(){
    var date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 将时间戳如 Date.now() 转为 "2019-04-10" 的格式
  getLastDate: function(time){
    var date = new Date(time);
    var month = date.getMonth() + 1 < 10
      ? '0'+(date.getMonth()+1)
      : (date.getMonth()+1);
    var day = date.getDate() < 10
      ? '0'+date.getDate()
      : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },
  // 距离当前时间多久，参数为毫秒级
  getFormatTime: function(timestamp){
    var now = this.getUnix();
    var timer = (now-timestamp)/1000; // 秒级
    var tip = '';
    if(timer>=0 && timer<60){
      tip = '刚刚';
    }else if(timer<3600){
      tip = Math.floor(timer/60) + '分钟前';
    }else if(timer>=3600 && timer<86400){
      tip = Math.floor(timer/3600) + '小时前';
    }else if(timer>=86400 && timer/86400<=31){
      tip = Math.floor(timer/86400) + '天前'
    }else{
      tip = this.getLastDate(timestamp);
    }
    return tip;
  }
}

// 自定义指令 bind, inserted, update, componentUpdated, unbind 可选
export default {
  bind: function(el, binding){
    el.innerHTML = Time.getFormatTime(binding.value * 1000);
    el.__timeout__ = setInterval(function(){
      el.innerHTML = Time.getFormatTime(binding.value * 1000);
    }, 60000)
  },
  unbind: function(el, binding){
    clearInterval(el.__timeout__);
    delete el.__timeout__;
  }
}