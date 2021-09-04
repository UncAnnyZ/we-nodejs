
Page({
  data: {
    isLoading: true,
    dates:'',
    dayName: '',
  },
  
  DayNameInput:function(e)    //获取倒数日名称
  {
    this.setData({
      dayName: e.detail.value
    })
  },
    bindDateChange: function (e) {    //获取倒数日日期
      this.setData({
        dates: e.detail.value
      })
    },
  addSubmit:function(e) {       //提交倒数日
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    if (this.data.dayName == null || this.data.dayName == "" || this.data.dayName == undefined) {     //判断填写是否为空
      wx.showToast({
        title: '目标日名称不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.dates == null || this.data.dates == "" || this.data.dates == undefined ) {
      wx.showToast({
        title: '目标日日期不能为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      var tt = []
      var add = { 
        'holidayName': this.data.dayName,
        'holidayDate':this.data.dates,
      }
      tt.push(add)
      getApp().globalData._adday.push(add)
      wx.cloud.callFunction({             //访问云函数
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
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
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
  onLoad:function(options){                     //进行数据库的读取，先读取再添加
    wx.cloud.callFunction({
      name:'readday',
      data:{
        username: getApp().globalData.username,
        type: 'read'
      },
      success:res=>{
        console.log(res, 1111)
        getApp().globalData._adday=JSON.parse(res.result)
        //this.setDataCalendar();
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
})