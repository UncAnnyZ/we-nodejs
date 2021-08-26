// pages/page_vip/active/active.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /* 页面的初始数据 */
  data: {
    name: "",
    tel: "",
    number: "",
    school: "",
    classname: "",
    activeType: "",
    formId: "",
    counterId:'',
  },

  onLoad: function () {
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '未到报名时间',
        success: function (res) {
          wx.navigateBack({
            delta: 1,
          })
        }
      })

    this.setData({
      name3: getApp().globalData.xiehui,
      name2: getApp().globalData.ziliao,
      list: getApp().globalData.ziliao1,
    })
  },

  /* 绑定事件 */
  
  check_submit: function (e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
      })
    }
    else if (e.detail.value.tel == ""){
      wx.showToast({
        title: '请正确填写电话',
        icon: 'none',
      })
    }
    else if (e.detail.value.school == ""){
      wx.showToast({
        title: '请正确填写学院',
        icon: 'none',
      })
    }
    else if (e.detail.value.xiao == "") {
      wx.showToast({
        title: '请正确填写校区',
        icon: 'none',
      })
    }
    else if (e.detail.value.classname == "") {
      wx.showToast({
        title: '请正确填写班级',
        icon: 'none',
      })
    }
    else if (this.data.activeType == '') {
      wx.showToast({
        title: '请选择' + getApp().globalData.ziliao,
        icon: 'none',
      })
    }
    else if (e.detail.value.other == '') {
      wx.showToast({
        title: '请正确填写备注',
        icon: 'none',
      })
    }
    else{

      wx.request({
        url:  'https://www.roseneedle.top:90/sign',
        data: {
          xiehui: getApp().globalData.xiehui1,
          xuehao: e.detail.value.xuehao,
          name: e.detail.value.name,
          tel: e.detail.value.tel,
          school: e.detail.value.school,
          xiao:e.detail.value.xiao,
          classname: e.detail.value.classname,
          other: e.detail.value.other,
          activeType: this.data.activeType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        success: function (res) {
          console.log(res.data)
            wx.showToast({
              title: '提交成功',
              icon: 'none',
            });
        },
        fail: function (error) {
          wx.showToast({
            title: '连接超时',
            icon: 'none',
          })
        },
      })

    }


  },

  checkboxChange: function (event) {
    this.data.activeType = event.detail.value;
  }
})