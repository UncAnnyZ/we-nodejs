//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    foodList:[
    ]
  },
  //事件处理函数
  bindViewTap: function(e) {
    var id = e.currentTarget.id
    if(id == 0){
      wx.navigateTo({
        url: 'tj/tj'
      })
    }
  },
  gg1:function(){
    wx.navigateToMiniProgram({
      appId: 'wxf40af775e49de00f',
      path: 'pages/index/index',
      extraData: {
        xuehao: getApp().globalData.xuehao
      },
      envVersion: 'release',
      success(res) {
        console.log('跳转成功');
      }
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
  }
})
