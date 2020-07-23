//index.js
//获取应用实例
const app = getApp()
Page({
  //事件处理函数
  onLoad: function() {
    wx.showToast({
      title: '此功能测试阶段，可能涉及随时下架',
      icon: 'none',
    })
  },
  cx: function(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'question',
      data: {
        question: e.detail.value.question,
      },
      success: res => {
        that.setData({
          question: res.result.title,
          answer: res.result.answer
        })
        wx.showToast({
          title: '获取成功',
          icon: 'none',
        })

      },
      fail: err => {
        wx.showToast({
          title: '获取失败，可能端口关闭',
          icon: 'none',
        })
      }
    })
  }
})