// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievement: [],
    color: [],
    show: "show",
    isCourse: 'none'
  },
  onLoad: function () {
    wx.showLoading({
      title: '更新上课任务中',
      mask: true
    })
    var that = this;
    wx.cloud.callFunction({
      name: 'skrw',
      success: res => {
        
        if (res.result == "0") {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          var skrw = res.result;
          that.xiu(skrw);
          wx.setStorage({
            key: 'skrw',
            data: res.result
          })
        }
      },
      fail: err => {
        if (wx.getStorageSync('skrw').length != 0) {
          var skrw = wx.getStorageSync('skrw')
          that.xiu(skrw)
        }
        else {
          wx.redirectTo({
            url: '/pages/login/login'
          })

        }
      }
    })
  },
  xiu:function(skrw){
    console.log(skrw)
    let data = [], color = [], isCourse = 'none', n = 0;
    if (skrw[0] == undefined) {
      isCourse = '';
    }
    for (let i = 0; i < skrw.length; i++) {
      if (skrw[i].xf >= 3) {
        color.push("#11c1f3");
      } else if (skrw[i].xf >= 2) {
        color.push("#886aea");
      } else if (skrw[i].xf >= 1) {
        color.push("#33cd5f");
      } else {
        color.push("#ffc900");
      }
        n = Number(skrw[i].xf) + n;
    }
    wx.showToast({
      title: '加载完成',
      icon: 'none',
    })
    this.setData({
      TotalCredit: n.toFixed(1),
      show: "",
      list: skrw,
      color: color,
      isCourse: isCourse,
      Totalnumber :skrw.length
    })
  },
})