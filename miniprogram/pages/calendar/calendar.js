// pages/calendar/calendar.js
var util = require('../../utils/time.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsonContent: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayOfWeek: "星期" + util.formatDay(new Date().getDay()),
    },
    isLoading: true,
    index: "0",
    startX: 0, //开始坐标
    startY: 0,
  },

  feedbackHandler(e) { //跳转到子页
    wx.navigateTo({
      url: 'addition/addition'
    })
  },


  num_data: function (start_date1, end_date1) { //计算倒数日
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day * -1;
  },

  terms: function () { //学年显示
    var year = '';
    if (new Date().getMonth() > 4) {
      year = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '-' + 1
    } else {
      year = new Date().getFullYear() - 1 + '-' + new Date().getFullYear() + '-' + 2
    }
    this.setData({
      term: year
    })
  },

  compare: function (property){
    return function(a,b){
      console.log(a,b)
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
},

  setDataCalendar: function () { //页面渲染全部倒数日
    var addday = getApp().globalData._adday;
    var xlist = [];
    var xlist1 = [];
    var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    console.log("yesr", nowdate);
    for (let i = 0; i < addday.length; i++) {
      var gapDays2 = this.num_data(addday[i].holidayDate, nowdate);
      if(gapDays2 > 0){
        xlist.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      }else{
        xlist1.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      }
    }
    this.setData({
      show: "",
      list: xlist.sort(this.compare("gapDays")).concat(xlist1.sort(this.compare("gapDays")).reverse())
    })
  },

  touchstart: function (e) { //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },

  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })

    //更新数据
    that.setData({
      list: that.data.list
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  del: function (e) { //删除倒数日  
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    this.data.list.splice(e.currentTarget.dataset.index, 1)
    wx.cloud.callFunction({
      name: 'we_adday1',
      data: {
        _adday: JSON.stringify(this.data.list),
        username: getApp().globalData.username,
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        this.setData({
          list: this.data.list
        })
      },
      fail: err => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //读取数据库
    getApp().loginState();
    this.terms();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function (options) {
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        username: getApp().globalData.username,
        type: 'read'
      },
      success: res => {
        getApp().globalData._adday = JSON.parse(res.result)
        this.setDataCalendar();
      },
      fail: err => {
        console.log(err)
      }
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间  

  },


  onReady: function () {

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
      title: '广东石油化工学院校历',
      path: 'pages/calendar/calendar',
    }
  },
  showPic: function () {
    wx.previewImage({
      current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png', // 当前显示图片的http链接
      urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png'] // 需要预览的图片http链接列表
    })
  },
})