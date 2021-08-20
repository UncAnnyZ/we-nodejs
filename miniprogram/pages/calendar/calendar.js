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
    colorArrays:["#8beeff", "#ffc2d6", "#b6ffea", "#ffb3a2"]
  },
  
    bindDateChange: function (e) {
      console.log("用户选择日期",e.detail.value)
      
      this.setData({
        dates: e.detail.value
      }, () => { // 接收第二个回调函数
        console.log("进入this.data.dates",this.data.dates);
      })
      
      this.jsondata();
    },

 
 
 
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

  
   
   

    var month = times.month +1 
    var time_zqj = this.num_data("2020-1-25", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ej = this.num_data("2020-3-2", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_gqj = this.num_data("2019-10-1", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_slj = this.num_data("2019-12-14", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ky = this.num_data("2019-12-21", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_yd = this.num_data("2020-1-1", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_ksz = this.num_data("2020-1-4", time.getFullYear() + '-' + month + '-' + time.getDate())
    var time_fj = this.num_data("2020-1-10", time.getFullYear() + '-' + month + '-' + time.getDate())
    console.log("即将进入计算时，this.data.dates的值",this.data.dates);
  
    var time_daysmatter = this.num_data(this.data.dates, time.getFullYear() + '-' + month + '-' + time.getDate())
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
      {
        "holidayName": "倒数日",
        "holidayDate": "data.dates",
        "gapDays": time_daysmatter,
        "holidayRestInfo": this.data.dates
      }
    ]}
    that.setData({
      jsonContent: calendar
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.jsondata();
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  


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