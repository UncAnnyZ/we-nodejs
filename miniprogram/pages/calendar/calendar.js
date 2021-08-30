// pages/calendar/calendar.js
var util = require('../../utils/time.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    jsonContent: '',
    dates:'2021-8-01',
    wlist:[],
    startX: 0, //开始坐标
    startY: 0,
    colorArrays:["#EB9F9F", "#F1BBBA","#F8ECC9","#FFD08E"]
  },
  
  feedbackHandler: function(e) {
    wx.navigateTo({
      url: 'addition/addition'
    })
  }, // 点击遮罩层，显示的遮罩层与面板又隐藏起来

  num_data: function (start_date1, end_date1) {
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day*-1;
  },
 
  
 
  jsondata: function (){
    let time = new Date();
    let times = {
      date: "",
      month: "",
      day: "",
    };
    
    times.date = time.getDate();

    let day;  
    switch (time.getDay()) {
      case 1:
        day = "一";
        break;
      case 2:
        day = "二";
        break;
      case 3:
        day = "三";
        break;
      case 4:
        day = "四";
        break;
      case 5:
        day = "五";
        break;
      case 6:
        day = "六";
        break;
      case 0:
        day = "日";
        break;
    }
    times.month = time.getMonth();
    times.day = day;

    
    this.setData({
      time: times
    })

    var holidayname=getApp().globalData.dayName
    var gapdays=getApp().globalData.gapDays
    var holidaydate2=getApp().globalData.dates
    var holidaydate=getApp().globalData.dates
   

    var month = times.month +1 
    var time_zqj = this.num_data("2020-1-25", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ej = this.num_data("2020-3-2", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_gqj = this.num_data("2019-10-1", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_slj = this.num_data("2019-12-14", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ky = this.num_data("2019-12-21", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_yd = this.num_data("2020-1-1", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ksz = this.num_data("2020-1-4", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_fj = this.num_data("2020-1-10", time.getFullYear() + '-' + month + '-' + time.getDate())
  
    
    var that = this;
    var calendar = {
      "day": time.getDate(),
      "dayOfWeek": "星期" + times.day,
      "examWeekDate": "2020-1-1",
      "gap2ExamWeek": "50",
      "gap2StartClass": "59",
      "month": times.month,
      "nextHoliday": [
        {},
      {
        "holidayName": "春节",
        "holidayDate": "2020-1-25",
        "gapDays": time_zqj,
        "holidayRestInfo": "1月25日"

      },
      {
        "holidayName": "开学",
        "holidayDate": "2020-3-2",
        "gapDays": time_ej,
        "holidayRestInfo": "3月2日"
      },
      {
        "holidayName": "国庆节",
        "holidayDate": "2019-10-1",
        "gapDays": time_gqj,
        "holidayRestInfo": "10月1日~7日(放假7天)"
      },
      {
        "holidayName": "英语四六级",
        "holidayDate": "2019-12-14",
        "gapDays": time_slj,
        "holidayRestInfo": "12月14日"
      },
      {
        "holidayName": "考研",
        "holidayDate": "2019-12-21",
        "gapDays": time_ky,
        "holidayRestInfo": "12月21日"
      },
      {
        "holidayName": "元旦",
        "holidayDate": "2020-1-1",
        "gapDays": time_yd,
        "holidayRestInfo": "1月1日"
      },
      {
        "holidayName": "考试周",
        "holidayDate": "2020-1-4",
        "gapDays": time_ksz,
        "holidayRestInfo": "1月4日"
      },
      {
        "holidayName": "放假",
        "holidayDate": "2020-1-17",
        "gapDays": time_fj,
        "holidayRestInfo": "1月17日"
      },

       
     
      
     /*
      {
        "holidayName": holidayname,
        "holidayDate": holidaydate,
        "gapDays": gapdays,
        "holidayRestInfo": holidaydate2,
      }
      */
    ]}
    that.setData({
      jsonContent: calendar,
    })
  },
  


  add: function() {
    var addday = getApp().globalData._adday;
    var xlist = [];
    for (let i = 0; i < addday.length; i++) {
      xlist.push({
        holidayName: addday[i].dayname,
        holidayDate: addday[i].day,
        gapDays: addday[i].gapDays2,
        holidayRestInfo: addday[i].day,
        isTouchMove: false
      })
      this.data.wlist=xlist
    }
    console.log("before-wlist",this.data.wlist)
    this.setData({
      show: "",
      list: this.data.wlist,
    })
  },

  
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    
    this.data.wlist.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
      v.isTouchMove = false;
    })
    
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.wlist
    })
  },

  touchmove: function (e) {
    var that = this,
    index = e.currentTarget.dataset.index,//当前索引
    startX = that.data.startX,//开始X坐标
    startY = that.data.startY,//开始Y坐标
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
    //获取滑动角度
    angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.wlist.forEach(function (v, i) {
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
    list: that.data.wlist
    })
  },

    angle: function (start, end) {
      var _X = end.X - start.X,
      _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },

    del: function (e) {
      var addbefore = this.data.wlist;
      var result = getApp().globalData.DaysMatter2.indexOf(addbefore[e.currentTarget.dataset.index]);
      this.data.wlist.splice(e.currentTarget.dataset.index, 1)
      //getApp().globalData._adday=this.data.wlist

      console.log("result",result)
      console.log("after-wlist",this.data.wlist)

      wx.cloud.callFunction({
        name: 'we_adday1',
        data: {
          _adday: JSON.stringify(this.data.wlist),
          username: getApp().globalData.username,
        },
        success: res => {
          wx.showToast({
            title: '删除成功',
            icon: 'none',
          })
          if (result != -1) {
            getApp().globalData.DaysMatter2.splice(result, 1);
            this.add();
          }
        },
        fail: err => {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
          })
        }
      })
      console.log("wlist",this.data.wlist)
      this.setData({
        list: this.data.wlist
      })
      
    },
     
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.jsondata();
    this.add();
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function(options) {
    this.jsondata();
    this.add();
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
  
  },


  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '广东石油化工学院校历',
      path: 'pages/calendar/calendar',
    }
  },
  showPic: function() {
    wx.previewImage({
      current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png', // 当前显示图片的http链接
      urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/xl.png'] // 需要预览的图片http链接列表
    })
  },

})