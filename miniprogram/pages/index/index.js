//index.js
//获取应用实例
const app = getApp()
Page({
  getweekString: function () {
    var Date1 = new Date();
    var y = Date1.getFullYear();
    var Date2 = new Date(wx.getStorageSync('configData').timeYear);
    var dayOfWeek = Date2.getDay();
    var day1fWeek = Date1.getDay();
    //如果把周日算在一周的最后一天，请加上下面这句
    dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek
    //如果把周日算在一周的第一天，请删除上面这句
    var num = (Date1 - Date2) / 1000 / 3600 / 24;
    var whichWeek = Math.ceil((num + dayOfWeek) / 7);
    if (day1fWeek == 0) {
      whichWeek = whichWeek - 1;
    }
    return whichWeek;
  },
  data: {
    news: false, // 通知内容显示
    class: false, // 课程内容显示
    classMsg: '今天没有课，出去玩吧',
    curriculum: [],
    color: ['#28cbb8', '#ffca43', '#28cbb8', '#ffca43', '#28cbb8'],
    background: ['#e6f9f7', '#fef7e5', '#e6f9f7', '#fef7e5', '#e6f9f7', '', ''],
    inform: [],
    course: [],
    time: {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
    },
    show: "show",
    isCourse: false
  },
  // 跳转课程表
  setClass: function (e) {
    wx.navigateTo({
      url: '/pages/curriculum/curriculum'
    })
  },
  // 页面刷新
  onShow: function () {
    if (getApp().globalData.curriculum) {
      this.setcurriculum(getApp().globalData.curriculum)
    }
  },



  // 一个进入课表采集的函数
  we_index: function (data) {
    getApp().globalData.achievement = data.a_data;
    getApp().globalData.quality = data.t_data;
    getApp().globalData._de = JSON.parse(data._de);
    getApp().globalData._add = JSON.parse(data._add);
    getApp().globalData.curriculum = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.curriculum1 = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.username = data.username;
    var curriculum = app.changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum);
    this.setcurriculum(curriculum);
    getApp().globalData.curriculum = curriculum;
  },

  // 最后一步渲染
  setcurriculum: function (curriculum) {
    var course = [];
    var that = this;
    var isCourse = false;
    let xq = new Date().getDay();
    if (xq == 0) {
      xq = 7;
    }
    getApp().globalData.whichWeek = this.getweekString();
    var zc = 0;
    for (let y = 0; y < curriculum.length; y++) {
      zc = curriculum[y].zc
      if (curriculum[y].xq == "7") {
        zc = String(Number(curriculum[y].zc) - 1)
      }
      if (zc == this.getweekString() && curriculum[y].xq == xq) {
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
      class: true,
      isCourse: isCourse
    });
  },



  onLoad: function (options) {
    // 渲染场景
    this.showAll();
  },

  // 渲染到页面
  setStorageData: function (indexData) {
    if (indexData) // 判断不为空渲染
    {
      this.setData({
        iconList: indexData.iconList,
        inform: indexData.inform,
        news: indexData.news
      });
    }

  },

  // 请求进行信息获取
  showAll: function () {
    var configData = wx.getStorageSync('configData');
    this.setStorageData(configData.index);
    // 基础配置信息
    wx.cloud.callFunction({
      name: 'configjson',
      success: res => {
        // 判断版本加载页面内容
        if (res.result.version != configData.version) {
          this.setStorageData(res.result.index);
          wx.setStorage({
            key: 'configData',
            data: res.result
          });
        }
        // 判断信息发主页通知
        if (res.result.msgData != wx.getStorageSync('msgData')) {
          wx.showModal({
            title: res.result.msgTitle,
            confirmText: '确定',
            showCancel: false,
            content: res.result.msgData,
            success: function () {
              wx.setStorage({
                key: 'msgData',
                data: res.result.msgData
              });
            }
          })
        }
      }
    })
    // 获取个人数据
    var nowTime = new Date().getTime(); // 当前时间
    var personalData = wx.getStorageSync('personaldata');
    personalData ?? this.we_index(personalData);
    if (!(personalData.length != 0 && nowTime - wx.getStorageSync('oldTime') < Number(configData.time) * 1000)) {
      if (!(personalData.length != 0)) {
        wx.showLoading({
          title: '更新数据中',
          mask: true
        })
        // 记录当前时间
      }
      wx.cloud.callFunction({
        name: 'weLoading',
        success: res => {
          if (res.result == "0") {
            this.setData({
              classMsg: '暂无登录',
            });
          } else {
            wx.setStorage({
              key: 'personaldata',
              data: res.result
            });
            this.we_index(res.result);
            wx.showToast({
              title: '加载完成',
              icon: 'none',
            });
            wx.setStorage({
              key: 'oldTime',
              data: nowTime
            })
          }
        },
        fail: err => {
          // 兜底
          if (personalData.length != 0) {
            wx.showToast({
              title: '本地完成',
              icon: 'none',
            });
          } else {
            this.setData({
              classMsg: '学校服务器出错，请等待',
            });
          }
        }

      })
    } else {
      // 加载缓存
      this.we_index(personalData);
    }

  },

  // 分享we广油
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },

  // 上拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.showAll();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
})