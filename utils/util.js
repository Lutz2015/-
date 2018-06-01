
const formatTime = timeStamp => {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return m + '/' + d + ' ' + h + ':' + minute;
}
const toast = (msg, icon = 'none', time = 2000) => {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: time
  })
}
const formatWeek = timerStamp => {
  let _week = new Date(timerStamp * 1000);
  var weekday = new Array(7)
  weekday[0] = "星期日"
  weekday[1] = "星期一"
  weekday[2] = "星期二"
  weekday[3] = "星期三"
  weekday[4] = "星期四"
  weekday[5] = "星期五"
  weekday[6] = "星期六"
  return weekday[_week.getDay()];
}

//获取星期
const week = n => {
  let x;
  switch (n) {
    case 1:
      x = "星期一";
      break;
    case 2:
      x = "星期二";
      break;
    case 3:
      x = "星期三";
      break;
    case 4:
      x = "星期四";
      break;
    case 5:
      x = "星期五";
      break;
    case 6:
      x = "星期六";
      break;
    case 7:
      x = "星期日";
      break;
  }
  return x;
}
//格式化时间，将秒数转为0:00格式
const formate = n => {
  let minute = Math.floor(n / 60);
  let seconds = Math.ceil(n % 60);
  seconds = seconds.toString();
  seconds = seconds[1] ? seconds : '0' + seconds;
  return minute + ':' + seconds;
}

export { formatTime, toast, formate, week, formatWeek}