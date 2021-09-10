//index.js
//获取应用实例
const app = getApp()
Page({

  data: {
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false,
    slideRatio: '', //滑动
    adImg: '',
    ad: false,
    news: false, // 通知内容显示
    class: false, // 课程内容显示s
    classMsg: '今天没有课，出去玩吧',
    curriculum: [],
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


  onLoad: function (options) {
    // 渲染场景
    var self = this;
    var systemInfo = wx.getSystemInfoSync();
    self.setData({
      windowHeight: systemInfo.windowHeight - 35,
      windowWidth: systemInfo.windowWidth
    })
    this.showAll();

  },


  // 页面刷新
  onShow: function () {
    if (getApp().globalData.curriculum) {
      this.setcurriculum(getApp().globalData.curriculum)
    }
  },

  // 请求进行信息获取
  showAll: function () {

    // 读取本地配置信息
    var configData = wx.getStorageSync('configData');
    this.setStorageData(configData.index);

    // 读取云端配置信息
    this.getCloudConfigData()

    // 获取个人数据
    var nowTime = new Date().getTime(); // 当前时间
    var personalData = wx.getStorageSync('personaldata');
    // 不为空，则先将本地的数据用于展示
    personalData ? this.we_index(personalData) : null;
    if (!(personalData.length != 0 && nowTime - wx.getStorageSync('oldTime') < Number(configData.time) * 1000)) {
      if (!(personalData.length != 0)) {
        wx.showLoading({
          title: '更新数据中',
          mask: true
        })
      }
      // weLoading 更新个人课表信息
      this.weLoading(personalData, nowTime)
    }
  },

  // 读取云端配置信息
  getCloudConfigData() {
    var that = this

    wx.cloud.callFunction({
      name: 'configjson',
      success: res => {
        if (res.result.reset == true) {
          // 清除所有缓存
          wx.clearStorageSync();
        }
        // 将数据渲染到本页面，用于展示
        that.setStorageData(res.result.index);

        wx.setStorageSync('configData', res.result);
        // 判断信息发主页通知
        if (res.result.msgData != wx.getStorageSync('msgData')) {
          wx.showModal({
            title: res.result.msgTitle,
            confirmText: '确定',
            showCancel: false,
            content: res.result.msgData,
            success: function () {
              wx.setStorageSync('msgData', res.result.msgData);
            }
          })
        }
      }
    })
  },
  // 更新个人课表信息
  weLoading(personalData, nowTime) {
    var that = this
    wx.cloud.callFunction({
      name: 'weLoading',
      success: res => {
        if (res.result == "0") {
          that.setData({
            classMsg: '暂无登录',
          });
          wx.showToast({
            title: '加载完成',
            icon: 'none',
          });
        } else {
          wx.setStorageSync('personaldata', res.result);
          that.we_index(res.result);
          wx.showToast({
            title: '加载完成',
            icon: 'none',
          });
          wx.setStorageSync('oldTime', nowTime);
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
          that.setData({
            classMsg: '学校服务器出错，请等待',
          });
          wx.showToast({
            title: '学校服务器出错，请等待',
            icon: 'none',
          });
        }
      }

    })
  },


  // 将数据更新至全局
  we_index: function (data) {
    getApp().globalData.achievement = data.a_data;
    getApp().globalData.quality = data.t_data;
    getApp().globalData.task = data.k_data;
    getApp().globalData._de = JSON.parse(data._de);
    getApp().globalData._add = JSON.parse(data._add);
    getApp().globalData.curriculum = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.curriculum1 = JSON.parse(JSON.stringify(data.c_data));
    getApp().globalData.username = data.username;
    var curriculum = app.changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum);
    // 将课表格式化显示
    this.setcurriculum(curriculum);
    getApp().globalData.curriculum = curriculum;

  },

  // 格式化课表显示
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
  getweekString: function () {
    var Date1 = new Date();
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

  // 将数据渲染到本页面，用于展示
  setStorageData: function (indexData) {
    if (indexData) // 判断不为空渲染
    {
      var lll = indexData.iconList
      var iconList = []
      var aa = []

      // var length = lll.length - 5
      // for(var i = 0; i < length; i++)
      //   lll.push(lll[i])

      if (lll.length <= 8) {
        for (let i = 0; i < lll.length; i++)
          aa.push(lll[i])

        iconList.push(aa)
      } else {
        for (let i = 0; i < lll.length; i++) {
          aa.push(lll[i])
          // 前八个一组，后面所有为一组
          if (i == 7 || i == lll.length - 1) {
            iconList.push(aa)
            aa = []
          }
        }
      }

      this.setData({
        iconList: iconList, // indexData.iconList,
        inform: indexData.inform,
        news: indexData.news,
        ad: indexData.ad,
        adImg: indexData.adImg
      });
      // 初始化scroll-view
      this.getRatio();
    }

  },


  // 计算 scroll-view 滚条参数及滑动比例
  getRatio() {
    var self = this;
    if (self.data.iconList.length <= 1) {
      this.setData({
        slideShow: false
      })
    } else {
      // 与index.css中 .slide-bar{width}对应
      const barWidth = 90;      // 固定长度是90rpx
      const iconWidth = 182.5;  // 一个图标的宽度为182.5rpx

      var _totalLength = Math.ceil(self.data.iconList[1].length / 2) + 4  // 总的横向个数
      var onelength = barWidth / _totalLength                             // 一个图标 所占滚条的宽度
      var _showLength = barWidth - onelength * (_totalLength - 4)         // 红色滑条的长度(保留两位小数)

      // 一个图标 实际宽度:滚条所占宽度 （后面转化单位 px → rpx ）
      var _ratio =  onelength / iconWidth * (750 / this.data.windowWidth) 

      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  // 刷新滚条位置
  getleft(e) {
    var l = Math.ceil(this.data.iconList[1].length / 2) * 92;
    this.setData({
      slideLeft: l>= e.detail.scrollLeft ? (e.detail.scrollLeft * this.data.slideRatio).toFixed(2) : l * this.data.slideRatio
    })
  },

  // 跳转课程表
  setClass: function (e) {
    wx.navigateTo({
      url: '/pages/curriculum/curriculum'
    })
  },
  // 关闭广告位
  hide(e) {
    this.setData({
      ad: false
    })
  },


  // 分享we广油
  onShareAppMessage: function (res) {
    return {
      title: 'We广油',
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.showAll();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
})