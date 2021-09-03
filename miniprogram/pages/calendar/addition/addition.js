Page({
  data: {
    isLoading: true,
    dates:'2021-8-01',
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
    }  else {
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