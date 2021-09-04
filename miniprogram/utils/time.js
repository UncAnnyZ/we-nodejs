function formatTime(date) {
  var year = date.getFullYear() + 1
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()

  var d = new Date()
  var weekday = new Array(7)
  weekday[0] = "星期日"
  weekday[1] = "星期一"
  weekday[2] = "星期二"
  weekday[3] = "星期三"
  weekday[4] = "星期四"
  weekday[5] = "星期五"
  weekday[6] = "星期六"

  return year + "年" + month + "月" + day + "日" + "  " + weekday[d.getDay()] + '  ' + hour + "点"
}

function formatDay(day) {
  switch (day) {
    case 1:
      day = "一";
      break;
    case 2:
      day = "二";
      break;
    case 3:
      day = "三";
      break;
    case 4:
      day = "四";
      break;
    case 5:
      day = "五";
      break;
    case 6:
      day = "六";
      break;
    case 0:
      day = "日";
      break;
  }
  return day
}

module.exports = {
  formatTime: formatTime,
  formatDay: formatDay
}

