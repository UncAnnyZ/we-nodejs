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
    zt: undefined,
    username:0,
    timeyear:"2021/8/30"
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'un1-d62c68',
        traceUser: true,
      })
    }


  },


})
