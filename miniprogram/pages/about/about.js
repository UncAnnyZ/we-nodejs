// pages/features/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '100%',
    height: '',
    coder: [{
      avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/UncAnnyZ.png',
      nickName: 'UncAnnyZ'
    },
    {
      avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/qieer.png',
      nickName: 'qieer'
    },
      {
        avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/kido.png',
        nickName: '细粒丁'
      }

    ],
    servicer: [{
      avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/UncAnnyZ.png',
      nickName: 'UncAnnyZ'
    },
    {
      avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/猪大肠居仔HL.png',
      nickName: '猪大肠'
    },
    {
      avatar: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/Luella.png',
      nickName: 'Luella'
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      width: wx.getSystemInfoSync().windowWidth * 0.9 + 'px',
      height: wx.getSystemInfoSync().windowWidth * 0.9 * 0.5625 + 'px'
    })

  },
  copyID: function () {
    wx.setClipboardData({
      data: 'wxd1eacf33b4ed0195'
    })
    wx.showToast({
      title: '已复制到粘贴版',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})