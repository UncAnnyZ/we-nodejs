const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getHeight = {
  // 总高度
  screenHeight() {
    return wx.getSystemInfoSync().screenHeight
  },
  // 状态栏高度（时间、点亮、信号）
  statusBar() {
    return wx.getSystemInfoSync().statusBarHeight
  },
  // 顶部标题栏（胶囊那栏）
  navigationBar() {
    var capsule = wx.getMenuButtonBoundingClientRect()
    var statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    // var height = capsule.top - statusBarHeight + capsule.bottom - statusBarHeight
    var height = ( capsule.top - statusBarHeight ) * 2 + capsule.height
    return height
  },
  // 底部导航栏
  tabBar() {
    var info = wx.getSystemInfoSync()
    return info.screenHeight - info.windowHeight
  }
}

module.exports = {
  formatTime: formatTime,
  getHeight: getHeight
}

const getTouchData = (endX, endY, startX, startY) => {
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
    turn = "left";
  }
  return turn;
}