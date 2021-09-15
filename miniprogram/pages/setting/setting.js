//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    htmlText:"",
    foodList: [],
    htmlSrc: "",
  },
  //事件处理函数
  onLoad: function(options) {
    var that = this;
    if(options.urlName){
      wx.showLoading({
        title: '更新数据中',
        mask: true
      })
      wx.cloud.callFunction({
        name: 'imgapi',
        data: {
          urlName: options.urlName,
        },
        success: res => {
          if(res.result.length< 50){
            that.setData({
            htmlSrc: res.result
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }else{
            wx.showToast({
              title: '内容出错',
              icon: 'none',
            })
          }

        },
        fail: err => {
          wx.showToast({
            title: '访问失败',
            icon: 'none',
          })
        }
      })
    }else{
      wx.showToast({
        title: '内容出错',
        icon: 'none',
      })
    }

    
  },
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },
})