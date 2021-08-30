// pages/about/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:[],
    view: 1,
    name: "",
    no: "",
    ad:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 暂不开启广告
    // this.hide()
    this.setData({
      more: wx.getStorageSync('configData').more,
      ad: wx.getStorageSync('configData').index.ad
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  CopyQQ: function () {
    wx.cloud.callFunction({
      name: 'quit',
      success: res => {
        // wx.setStorageSync('historyData',JSON.parse(JSON.stringify(wx.getStorageSync('personaldata'))) )
        if (wx.getStorageSync('personaldata').username != 18034530129) {
          wx.setStorageSync('personaldata', '');
        }
        wx.redirectTo({
          url: '/pages/login/login'
        })
      },
      fail: err => {
        wx.showToast({
          title: '退出失败',
          icon: 'none',
        })
      }
    })

  },
  tsg: function () {

    wx.showToast({
      title: '图书馆暂无开放考试',
      icon: 'none',
    })


  },

  // 关闭广告位
  hide(e){
    this.setData({
      ad: false
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },
})