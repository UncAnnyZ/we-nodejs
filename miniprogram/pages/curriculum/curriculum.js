const app = getApp()
const time = require("../../utils/time.js")
var startX, endX;
var moveFlag = true;


Page({
  data: {
    courseTime: [
      '8:00',
      '9:40',
      '10:00',
      '11:40',
      '14:30',
      '16:10',
      '16:20',
      '17:50',
      '19:40',
      '21:20',
      '22:05',
    ],
    whichWeek: '0',
    wlist: [],
    multiArray: [], //二维数组，长度是多少是几列
    dayOfWeek: (new Date()).getDay(),

    // 添加课表
    showAdd: false,
    week: [], // 周数
    section: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    ],
    sectionIndex: [0, 0],
    
    Week: ["一", "二", "三", "四", "五", "六", "七"], // 星期 [1,2,3,4,5,6,7]
    WeekIndex: 0,
    addSubmitStyle: false
  },

  onLoad: function (options) {
    getApp().loginState();
    this.kb(getApp().globalData.whichWeek);
    this.setData({
      weekNow: getApp().globalData.whichWeek,
    })
  },
  onShow: function (options) {
    this.kb(getApp().globalData.whichWeek);
    this.initWeek()
  },
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },

  // 触摸开始事件
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        moveFlag = false;
        this.setData({
          whichWeek: this.data.whichWeek - 1,
        })

        this.kb(this.data.whichWeek);
      }
      if (startX - endX > 50) {
        moveFlag = false;
        this.setData({
          whichWeek: this.data.whichWeek + 1,
        })

        this.kb(this.data.whichWeek);
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  // 上一周
  prevWeekHandler: function (e) {
    this.setData({
      whichWeek: this.data.whichWeek - 1,
    })
    this.kb(this.data.whichWeek);
  },
  // 下一周
  nextWeekHandler: function (e) {
    this.setData({
      whichWeek: this.data.whichWeek + 1,
    })
    this.kb(this.data.whichWeek);
  },

  // 显示当前周的课表
  kb: function (zs) {
    if (zs <= 0) {
      zs = 1;
    }
    var zs_now = (Number(zs) - 1) * 7;

    var test = "1";
    var arr = ['', '', '', '', '', '', ''];
    for (var i = 0; i < 7; i++) {
      test = this.showdate(zs_now + i);
      arr[i] = arr[i] + test;
    }

    var curriculum = getApp().globalData.curriculum
    if (zs > '26') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '超过范围',
        success: function (res) {}
      })
      zs = 26;
    } else if (zs < '1') {
      zs = 1;
    }
    var that = this;
    var a = 0;
    var data = {
      colorArrays: ['#99CCFF',
        '#FFCC99',
        '#FFCCCC',
        '#CC6699',
        '#99CCCC',
        '#FF6666',
        '#CCCC66',
        '#66CC99',
        '#FF9966',
        '#66CCCC',
        '#6699CC',
        '#99CC99',
        '#669966',
        '#99CC99',
        '#99CCCC',
        '#66CCFF',
        '#CCCCFF',
        '#99CC66',
        '#CCCC99',
        '#FF9999',
      ],
      wlist: []
    }
    var zc = 0;
    for (let i in curriculum) {
      zc = curriculum[i].zc;

      if (curriculum[i].xq == "7" && curriculum[i].dgksdm != undefined) {
        zc = String(Number(curriculum[i].zc) - 1);
      }
      if (zc == zs) {
        var kcmcc = curriculum[i].kcmc;
        if ((curriculum[i].kcmc + curriculum[i].jxcdmc).length > 20) {
          kcmcc = kcmcc.substring(0, 17 - curriculum[i].jxcdmc.length) + "...";
        }
        data.wlist.push({
          xqj: curriculum[i].xq,
          skjc: Number(curriculum[i].jcdm.substr(0, 2)),
          skcd: Number(curriculum[i].jcdm.substr(-2)) - Number(curriculum[i].jcdm.substr(0, 2)) + 1,
          kcmc: kcmcc,
          jxcdmc: curriculum[i].jxcdmc,
          teacher: curriculum[i].teaxms
        })
      }
    }

    that.setData({
      arr: arr,
      curWeek: '第 ' + zs + ' 周',
      whichWeek: zs,
      wlist: data.wlist,
      colorArrays: data.colorArrays,
      multiIndex: [(Number(zs) - 1), 0, 0, 0],
    })

  },
  showdate(n) { // 日期切换处理函数  返回时间格式 YYYY-MM-DD
    var date = new Date(wx.getStorageSync('configData').timeYear);
    date.setDate(date.getDate() + n);
    var month = date.getMonth() + 1
    month = month > 10 ? month : month // 格式化月份
    this.setData({
      month
    })
    var day = date.getDate()
    day = day > 9 ? day : "0" + day // 格式化日期

    date = "" + month + "/" + day;

    return date;
  },

  // 点击时显示toast
  showCardView: function (e) {
    console.log(this.data.wlist[e.currentTarget.dataset.index])

    wx.showToast({
      title: '教师:' + this.data.wlist[e.currentTarget.dataset.index].teacher + "\n" +
        '地点:' + this.data.wlist[e.currentTarget.dataset.index].jxcdmc,
      icon: 'none',
    })
  },

  // 跳转至 - 课表管理
  addCourseHandler: function (e) {
    wx.navigateTo({
      url: 'addcurriculum/addcurriculum'
    })
  },
  // 弹出 - 课表添加
  feedbackHandler: function (e) {
    var showAdd = this.data.showAdd
    var that = this
    if (showAdd) {
      this.setData({
        add_style: "add_hide"
      })
      setTimeout(() => {
        that.setData({
          showAdd: !showAdd
        })
      }, 200);
    } else {
      this.setData({
        add_style: "add_show",
        showAdd: !showAdd
      })
    }
  },


  // 添加课表

  initWeek() {
    // 初始化"设置周数"
    var week = [];
    for (var i = 0; i < 18; i++) {
      week.push([false, false]) //week.push([false, 'color:gary'])
    }
    this.setData({
      week: week
    })
  },
  // 设置 课程、地点、老师、星期选择器、课程选择器
  setCPT(e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
    this.checkSubmit()
  },
  // 节数选择器
  ChangeSectionIndex(e) {
    var index = this.data.sectionIndex
    //修改第一列
    if (e.detail.column == 0) {
      index[e.detail.column] = e.detail.value
      if (e.detail.value > index[1]) { //选择后，第一列>第二列
        index[1] = e.detail.value
      }
    }
    //修改第二列
    else {
      if (e.detail.value < index[0]) //选择后，第二列<第一列
        wx.showToast({
          title: '注意选择格式',
          icon: "none"
        })
      else
        index[e.detail.column] = e.detail.value
    }
    this.setData({
      sectionIndex: index
    })
    this.checkSubmit()
  },
  // 周数选择按钮
  changeWB(e) {
    let data = this.data.week
    if (data[e.target.id - 1][0]) {
      data[e.target.id - 1][0] = false
      data[e.target.id - 1][1] = false // 'color: rgb(100, 100, 100);'
    } else {
      data[e.target.id - 1][0] = true
      data[e.target.id - 1][1] = true // "background:rgb(8, 178, 255);color:rgb(245,245,245);border:none;"
    }

    this.setData({
      week: data
    })
    this.checkSubmit()
  },
  // 新增课程按钮
  addSubmit(e) {
    var that = this
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    var week = []
    var tt = JSON.parse(JSON.stringify(getApp().globalData._add));
    for (var i = 0; i < 18; i++) {
      if (this.data.week[i][0])
        week.push(i + 1)
    }
    // 检查填写是否为空
    if (this.data.course == null || this.data.course == "" || this.data.course == undefined) {
      this.showToast("课程名称不能为空")
    } else if (this.data.place == null || this.data.place == "" || this.data.place == undefined) {
      this.showToast("上课地点不能为空")
    } else if (this.data.teacher == null || this.data.teacher == "" || this.data.teacher == undefined) {
      this.showToast("任课老师不能为空")
    } else if (week == null || week == "" || week == undefined || week.length == 0) {
      this.showToast("请设置周数")
    } else {
      if (Number(this.data.sectionIndex[0] + 1) < 10) {
        var a = "0" + String(Number(this.data.sectionIndex[0] + 1))
      } else {
        var a = String(Number(this.data.sectionIndex[0] + 1))
      }
      if (Number(this.data.sectionIndex[1] + 1) < 10) {
        var b = "0" + String(Number(this.data.sectionIndex[1] + 1))
      } else {
        var b = String(Number(this.data.sectionIndex[1] + 1))
      }
      for (i = 0; i < week.length; i++) {
        var add = {
          'jcdm': a + b,
          'jxcdmc': this.data.place,
          'kcmc': this.data.course,
          'teaxms': this.data.teacher,
          'xq': time.formatDay(this.data.Week[this.data.WeekIndex]),
          'zc': String(week[i])
        }

        tt.push(add)
      }
      wx.cloud.callFunction({
        name: 'weLoading',
        data: {
          _add: JSON.stringify(tt),
          username: getApp().globalData.username,
          type: 'add'
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          getApp().globalData._add = tt;
          var curriculum = app.changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum1);
          getApp().globalData.curriculum = curriculum;
          that.onShow()
          wx.setStorage({
            key: 'oldTime',
            data: "1"
          })
        },
        fail: err => {
          wx.showToast({
            title: '添加失败(校园网关闭或者服务器异常)',
            icon: 'none',
          })
        },
        complete() {
          that.setData({
            showAdd: !that.data.showAdd
          })
        }
      })
    }
  },
  checkSubmit() {
    var week = []
    for (var i = 0; i < 18; i++) {
      if (this.data.week[i][0])
        week.push(i + 1)
    }
    // 检查填写是否为空
    if (this.data.course == null || this.data.course == "" || this.data.course == undefined ||
      this.data.place == null || this.data.place == "" || this.data.place == undefined ||
      this.data.teacher == null || this.data.teacher == "" || this.data.teacher == undefined ||
      week == null || week == "" || week == undefined || week.length == 0
    ) {
      this.setData({
        addSubmitStyle: false
      })
    } else {
      this.setData({
        addSubmitStyle: true
      })
    }

  },
  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  }
})