//app.js
App({
  globalData: {
    curriculum: [],
    achievement: [],
    quality: [],
    curriculum1:[],
    _add:[],
    _de:[],
    curriculum2:[],
    username:0,
    timeyear:"2020/8/31"
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }


  },


})
