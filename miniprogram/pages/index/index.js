//index.js
//获取应用实例
const app = getApp()
Page({
  getweekString: function() {
    var Date1 = new Date();
    var y = Date1.getFullYear();
    var Date2 = new Date(y + "/3/9");
    var dayOfWeek = Date2.getDay();
    var day1fWeek = Date1.getDay();
    //如果把周日算在一周的最后一天，请加上下面这句
    dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek
    //如果把周日算在一周的第一天，请删除上面这句
    var num = (Date1 - Date2) / 1000 / 3600 / 24;
    var whichWeek = Math.ceil((num + dayOfWeek) / 7);
    if (day1fWeek == 0){
      whichWeek = whichWeek-1;
    }
    return whichWeek;
  },
  data: {
    time1: '',
    curriculum: [],
    iconList: [{
      id: "1",
      url: "achievement/achievement",
      icon: "grade",
      name: "成绩"
    }, {
      id: "2",
      url: "activity/activity",
      icon: "news",
      name: "社团活动"
    }, {
      id: "3",
      url: "schoolNav/schoolNav",
      icon: "map",
      name: "校内导航"
    }, {
      id: "4",
      url: "curriculum/curriculum",
      icon: "schedule",
      name: "课表"
    }, {
      id: "5",
      url: "quality/quality",
      icon: "quality",
      name: "素拓"
    }, {
      id: "6",
      url: "calendar/calendar",
      icon: "calendar",
      name: "校历"
    }, {
      id: "7",
      url: "recommend/recommend",
      tt1: "none",
      tt: "examination",
      icon: "examination",
      name: "校园平台"
    }, {
      id: "8",
      url: "about/about",
      icon: "collect",
      name: "关于我们"
    }],
    message: [],
    color: ['#28cbb8', '#ffca43', '#28cbb8', '#ffca43', '#28cbb8'],
    background: ['#e6f9f7', '#fef7e5', '#e6f9f7', '#fef7e5', '#e6f9f7', '', ''],
    inform: [],
    course: [],
    news: true,
    weather: true,
    class: true,
    wea: {
      temp: "",
      Maxtemp: "",
      Mintemp: "",
      site: "",
      wea: "",
      air_tips: "",
      background: "",
      icon: "",
      color: "",
      images: ""
    },
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
    show: "show",
    classUrl: "",
    weekIndex: [6, 0, 1, 2, 3, 4, 5],
    isCourse: false
  },
  setClass: function(e) {
    wx.navigateTo({
      url: '/pages/curriculum/curriculum'
    })
  },
  getMessage: function() { //消息
    var data1 = ([{
        comment: "消息",
        name: "下拉可刷新，课本可左右滑动",
        tiele: "下拉可刷新，课本可左右滑动"
      },
      {
        comment: "通知",
        name: "有问题请寻找我们",
        tiele: "有问题请寻找我们"
      }, {
        comment: "提示",
        name: "感谢你的支持",
        tiele: "感谢你的支持"
      }, {
        comment: "提示",
        name: "欢迎来到We广油",
        tiele: "欢迎来到We广油"
      }
    ])
    this.setData({
      inform: data1
    })

  },
  onPullDownRefresh() {
    wx.showLoading({
      title: '更新数据中',
      mask: true
    })

    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.cloud.callFunction({
      name: 'we_index',
      success: res => {
        if (res.result == "0") {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          this.we_index(res.result)
          wx.setStorage({
            key: 'data',
            data: res.result
          })
          wx.showToast({
            title: '加载完成',
            icon: 'none',
          })
        }
      },
      fail: err => {
        if (wx.getStorageSync('data').length != 0) {
          this.we_index(wx.getStorageSync('data'))
        } else {
          wx.redirectTo({
            url: '/pages/login/login'
          })
          wx.showToast({
            title: '本地完成',
            icon: 'none',
          })
        }

      }
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onShow: function() {
    this.setcurriculum(getApp().globalData.curriculum)
  },
  curriculumcl: function() {
    var a = getApp().globalData._add;
    var b = getApp().globalData.curriculum;
    var c = getApp().globalData._de;
    var d = getApp().globalData.curriculum1;
    for (var i = 0; i < c.length; i++) {
      if (c[i].zc == "全部"){
        for (var g = 0; g < b.length; g++){
          if (b[g].kcmc == c[i].kcmc) {
            b.splice(g, 1);
            g--;
          }
        }
        for (g = 0; g < d.length; g++) {

          if (d[g].kcmc == c[i].kcmc) {
            d.splice(g, 1);
            g--;
          }
        }
      }
      else{
        for (var g = 0; g < b.length; g++) {
          if (b[g].kcmc == c[i].kcmc && b[g].jcdm == c[i].jcdm && b[g].zc == c[i].zc && b[g].xq == c[i].xq ) {
            b.splice(g, 1);
            g--;
          }
          }
          for (g = 0; g < d.length; g++) {
            if (d[g].kcmc == c[i].kcmc && d[g].jcdm == c[i].jcdm && d[g].zc == c[i].zc && d[g].xq == c[i].xq) {
              d.splice(g, 1);
              g--;
            }
        }
      }
    }
        for (var i = 0; i < a.length; i++) {
      b.push(a[i])
    }
    return b
  },
  we_index: function(data) {
    getApp().globalData.achievement = data.a_data;
    getApp().globalData.quality = data.t_data;
    getApp().globalData.curriculum = data.c_data;
    getApp().globalData.curriculum1 = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.curriculum2 = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.username = data.username;
    getApp().globalData._add = JSON.parse(data._add);
    getApp().globalData._de = JSON.parse(data._de);
    var curriculum = this.curriculumcl();
    this.setcurriculum(curriculum)
  },
  setcurriculum: function(curriculum) {
    var course = [];
    
    var that = this;
    var isCourse = false;
    let xq = new Date().getDay();
    if (xq == 0) {
      xq = 7;
    }
    getApp().globalData.whichWeek = this.getweekString();
    for (let y = 0; y < curriculum.length; y++) {
      if (curriculum[y].xq == "7"){
        curriculum[y].zc = String(Number(curriculum[y].zc) - 1)
      }
      if (curriculum[y].zc == this.getweekString() && curriculum[y].xq == xq) {
        course.push({
          day: '今天',
          time: '第' + curriculum[y].jcdm[1] + '节',
          name: curriculum[y].kcmc,
          site: curriculum[y].jxcdmc,
        })
      }
      course.sort((b, a) => b.time.localeCompare(a.time, 'zh'))

    }

    if (course.length == 0) {
      isCourse = true
    }
    that.setData({
      course: course,
      show: '',
      isCourse: isCourse
    })
  },
  onLoad: function(options) {
    this.getMessage();
    var bb = wx.getStorageSync('bb');
    if (bb != "1.1.4") {
      wx.showModal({
        title: '版本更新',
        confirmText: '确定',
        showCancel: false,
        content: '1、修复了成绩的bug\r\n2、增加了云毕业照，可能可以用，因为资金不够，菜鸡服务器\r\n',
        success: function(res) {
          wx.setStorage({
            key: 'bb', //自己去的key名，必须有，因为调用时会用到
            data: '1.1.4' //及接收储图片或文件地址的变量
          })
        }
      })
    }
    wx.showLoading({
      title: '更新数据中',
      mask: true
    })
    var time1 = new Date().getTime()
    // if (wx.getStorageSync('time').length != 0 && time1 - wx.getStorageSync('time') < 3600000) {
    //     this.we_index(wx.getStorageSync('data'))
    //     wx.showToast({
    //       title: '加载完成',
    //       icon: 'none',
    //     })
      

    // } else {

      wx.cloud.callFunction({
        name: 'we_index',
        success: res => {
          if (res.result == "0") {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          } else {
            this.we_index(res.result)
            wx.setStorage({
              key: 'time',
              data: time1
            })
            wx.showToast({
              title: '加载完成',
              icon: 'none',
            })
            wx.setStorage({
              key: 'data',
              data: res.result
            })
          }
        },
        fail: err => {
          if (wx.getStorageSync('data').length != 0) {
            this.we_index(wx.getStorageSync('data'))
            wx.showToast({
              title: '本地完成',
              icon: 'none',
            })
          } else {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    // }
  },
  onShareAppMessage: function(res) {
    return {
      title: 'We广油',
    }
  },
})