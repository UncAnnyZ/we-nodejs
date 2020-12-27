//index.js
//获取应用实例
const app = getApp()
Page({

  onLoad: function () {
  },
  activity: function (e) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  login: function (e) {
    wx.showLoading({
      title: '刷新中',
      mask: true
    })
    var that = this;
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password,
      },
      success: res => {
        wx.setStorage({
          key: 'data',
          data: ""
        })
        if (res.result.msg == "/login!welcome.action") {
            wx.reLaunch({
              url: '/pages/index/index'
            })
        }
        else {
          wx.showToast({
            icon: 'none',
            title: res.result.msg,
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: '失败申请服务',
        })
      }
    })
  }
})
