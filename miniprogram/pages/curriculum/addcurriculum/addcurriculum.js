// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['自增课程', '学校课程'],
    multiArray: [], //二维数组，长度是多少是几列
    multiIndex: [0, 0, 0, 0],
    decurriculum: [], //二维数组，长度是多少是几列
    multiIndex1: [0],
    index: "0",
    button: '删除',
    wlist: [],
    show: "show",
    xx: '木有自增课程',
    isCourse: 'none',
    isCourse2: 'none',
    kb1: '',
    zcs: "",
    xq: "",
    skcd: "",
    skjc2: "",
    xxx: 'set1'
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value,
      zcs: e.detail.value[0] + 1,
      xq: e.detail.value[1] + 1,
      skjc: e.detail.value[2] + 1,
      skjc2: e.detail.value[3] + 1,
      skcd: e.detail.value[3] - e.detail.value[2],
    })
  },
  bindMultiPickerChange1: function(e) {
    this.setData({
      kb1: this.data.decurriculum[0][e.detail.value],
      multiIndex1: e.detail.value,
    })
  },

  bindPickerChange(e) {
    var val = e.detail.value,
      button = '',
      xx = '';
    if (val == '1') {
      button = '恢复';
      xx = '木有学校课程';
      this.setData({
        button: button,
        xx: xx,
        index: e.detail.value,
        isCourse2: '',
        xxx: 'set2'
      })
      this.de();
    } else {
      button = '删除';
      xx = '木有自增课程';
      this.setData({
        button: button,
        xx: xx,
        index: e.detail.value,
        isCourse2: 'none',
        xxx: 'set1'
      })
      this.add();
    }

  },
  setde12: function(e) {
    this.setData({
      shows: true,
    })
  }, // 点击遮罩层，显示的遮罩层与面板又隐藏起来  
  close: function() {
    this.setData({
      shows: false,
    })
  },
  set1: function(e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    var addcurriculum = getApp().globalData._add;
    var index = getApp().globalData.curriculum.indexOf(addcurriculum[e.currentTarget.dataset.bean]);
    getApp().globalData._add.splice(e.currentTarget.dataset.bean, 1)
    wx.cloud.callFunction({
      name: 'weLoading',
      data: {
        _add: JSON.stringify(getApp().globalData._add),
        username: getApp().globalData.username,
        type: 'add'
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        if (index != -1) {
          var curriculum = app.changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum);
          getApp().globalData.curriculum = curriculum;
          this.add();
        }
        wx.setStorage({
          key: 'oldTime',
          data: "1"
        })
      },
      fail: err => {
        wx.showToast({
          title: '删除失败(校园网关闭或者服务器异常)',
          icon: 'none',
        })
      }
    })

  },
  set2: function(e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    var de = getApp().globalData._de
    de.splice(e.currentTarget.dataset.bean, 1)
    wx.cloud.callFunction({
      name: 'weLoading',
      data: {
        _de: JSON.stringify(de),
        username: getApp().globalData.username,
        type: 'de'
      },
      success: res => {
        wx.showToast({
          title: '恢复成功',
          icon: 'none',
        })
        var curriculum = app.changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum);
        getApp().globalData.curriculum = curriculum;
        this.de()
        wx.setStorage({
          key: 'oldTime',
          data: "1"
        })
      },
      fail: err => {
        wx.showToast({
          title: '恢复失败(校园网关闭或者服务器异常)',
          icon: 'none',
        })
      }
    })
  },
  remove: function(array, a, zcs, xq, jcdm2) { //删除工具
    for (var i = 0; i < array.length; i++) {
      if (array[i].kcmc == a && array[i].zcs == zcs && array[i].jcdm2[1] == jcdm2) {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return -1;
  },
  add: function() {
    var addcurriculum = getApp().globalData._add;
    var wlist = [];
    var isCourse = 'none';
    if (addcurriculum[0] == undefined) {
      isCourse = '';
    }
    var pd1 = /(.*?),/g;
    for (let i in addcurriculum) {
      wlist.push({
        zs: '第' + addcurriculum[i].zc + '周',
        xqj: '星期' + addcurriculum[i].xq,
        skjc: '第' + addcurriculum[i].jcdm[1] + '节',
        kcmc: addcurriculum[i].kcmc,
      })
    }
    this.setData({
      show: "",
      list: wlist,
      isCourse: isCourse,
    })
  },
  de: function() {
    var decurriculum = getApp().globalData._de;
    var wlist = [];
    var isCourse = 'none';
    if (decurriculum[0] == undefined) {
      isCourse = '';
    }
    var pd1 = /(.*?),/g;
    for (let i in decurriculum) {
      var zs = ""
      var xqj = ""
      var skjc = ""
      if (decurriculum[i].zc != "全部") {
        zs = '第' + decurriculum[i].zc + '周';
        xqj = '星期' + decurriculum[i].xq;
        skjc = '第' + decurriculum[i].jcdm[1] + '节';
      } else {
        zs = decurriculum[i].zc;
        xqj = decurriculum[i].zc;
        skjc = decurriculum[i].zc;
      }
      wlist.push({
        zs: zs,
        xqj: xqj,
        skjc: skjc,
        kcmc: decurriculum[i].kcmc,
      })
    }
    /*
    let b = '英语学习', zcs = '21,', xq = '3', jcdm2 = '1';
    this.remove(addcurriculum, b, zcs, xq, jcdm2);
    */
    this.setData({
      show: "",
      list: wlist,
      isCourse: isCourse,
    })
  },
  onLoad: function() {
    this.add();
  },
})