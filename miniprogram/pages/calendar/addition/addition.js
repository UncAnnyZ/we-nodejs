Page({
  data: {
    isLoading: true,
    jsonContent: '',
    dates:'2021-8-01',
    userName: '',
    colorArrays:["#8beeff", "#ffc2d6", "#b6ffea", "#ffb3a2"]
  },
  
  userNameInput:function(e)
  {
    this.setData({
      userName: e.detail.value
    })
  },

    bindDateChange: function (e) {
      this.setData({
        dates: e.detail.value
      }, () => { // 接收第二个回调函数
        console.log("进入this.data.dates",this.data.dates);
      })
      this.jsondata();
    },
  /**
   * 页面的初始数据
   */
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
    times.month = time.getMonth();
    var month = times.month +1;
    var time_daysmatter = this.num_data(this.data.dates, time.getFullYear() + '-' + month + '-' + time.getDate()); 
    getApp().globalData.dates = this.data.dates;
    getApp().globalData.dayName = this.data.userName;
    getApp().globalData.gapDays = time_daysmatter;
  },


  onLoad: function(options) {
    this.jsondata();
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
  
  },
  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  addSubmit:function(e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    
    // 检查填写是否为空
    if (this.data.userName == null || this.data.userName == "" || this.data.userName == undefined) {
      wx.showToast({
        title: '目标日名称不能为空',
        icon: 'none',
        duration: 1000
      })
    }  else if (this.data.dates == null || this.data.dates == "" || this.data.dates == undefined ) {
      this.showToast("请设置目标日日期")
    } else {
      var tt = []
      var add = { 
        'holidayName': this.data.userName,
        'holidayDate':this.data.dates,
        'gapDays':getApp().globalData.gapDays,
        'holidayRestInfo':this.data.dates,
      }
      tt.push(add)
      getApp().globalData._adday.push(add)
      wx.cloud.callFunction({
        name: 'we_adday1',
        data: {
          _adday: JSON.stringify(getApp().globalData._adday),
          username: getApp().globalData.username
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          let a = tt;
          let b = getApp().globalData.DaysMatter2;
          for (var i = 0; i < a.length; i++) {
            b.push(a[i])
          }
        },
        fail: err => {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        }
      })
    }
  },

})