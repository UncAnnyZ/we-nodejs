//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    user:"",
    pwd:""
  },
  onReady: function () {
  },
  activity: function (e) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  login: function (e) {
    var that = this
    if (this.data.user.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '帐号及密码不能为空',
        icon: "none"
      })
      return -1;
    }
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
        username: that.data.user,
        password: that.data.pwd,
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
          title: '校园网关闭或者服务器异常',
        })
      }
    })
  },
  input(e){
    this.setData({
      [e.target.id]:e.detail.value
    })
  },

  // 帮助弹窗
  tapHelp: function(e){
    if(e.target.id == 'help_model'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  },
  copy(){
    wx.setClipboardData({
      data:'http://210.38.250.43/',
      success(){
        wx.showToast({
          title: '已成功复制地址，快用浏览器打开吧',
          icon: "none"
        })
      }
    })
  }

})
