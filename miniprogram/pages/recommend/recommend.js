//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    htmlText:"",
    foodList: []
  },
  //事件处理函数
  bindViewTap: function(e) {
    var id = e.currentTarget.id
    if (id == 0) {
      wx.navigateTo({
        url: 'tj/tj'
      })
    }
  },
  gg1: function() {
    wx.navigateToMiniProgram({
      appId: 'wxf40af775e49de00f',
      path: 'pages/goods/index?goods_id=10085',
      envVersion: 'release',
      success(res) {
        console.log('跳转成功');
      }

    })
  },
  onLoad: function(options) {
    var that = this;
    if(options.appId){
      //wx0dffe79bb2223828
      wx.navigateToMiniProgram({
        appId: options.appId,
        path: 'pages/index/index',
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          wx.navigateBack({
            delta: 1,
          })
          console.log('跳转成功');
        },
        fail: function(err) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
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
          wx.showToast({
            title: '请等待渲染',
            icon: 'none',
          })
          that.setData({
            htmlText: res.result
          })
        },
        fail: err => {
          wx.showToast({
            title: '访问失败',
            icon: 'none',
          })
        }
      })
    }

    
  },
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },
})