//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
  onLoad: function() {
    wx.navigateToMiniProgram({
      appId: 'wx0dffe79bb2223828',
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

    var that = this
    //调用应用实例的方法获取全局数据
  }
})