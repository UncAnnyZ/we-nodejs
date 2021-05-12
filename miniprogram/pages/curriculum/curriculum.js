const app = getApp()
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
      '17;50',
      '19:40',
      '21:20',
      '22:05',
    ],
    shows: false,
    whichWeek: '0',
    wlist: [],
    xz: "",
    zcs: "",
    xq: "",
    skcd: "",
    skjc2: "",
    isCourse: 'none',
    getname: "",
    multiArray: [], //二维数组，长度是多少是几列
    addcurriculum: []
  },
  onShareAppMessage: function(res) {
    return {
      title: 'We广油',
    }
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
  nextWeekHandler: function (e) {
    this.setData({
      whichWeek: this.data.whichWeek + 1,
    })
    this.kb(this.data.whichWeek);
  },
  prevWeekHandler: function (e) {
    this.setData({
      whichWeek: this.data.whichWeek - 1,
    })
    this.kb(this.data.whichWeek);
  },


  showCardView: function(e) {
    wx.showToast({
      title: '教师:' + this.data.wlist[e.currentTarget.dataset.index].teacher,
      icon: 'none',
    })
  },
  feedbackHandler: function(e) {
    wx.navigateTo({
      url: 'add/add'
    })
  }, // 点击遮罩层，显示的遮罩层与面板又隐藏起来  
  close: function() {
    this.setData({
      shows: false,
    })
  },
  touchStart: function(e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function(e) {
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
  touchEnd: function(e) {
    moveFlag = true; // 回复滑动事件

  },

  showdate(n) { // 日期切换处理函数  返回时间格式 YYYY-MM-DD
    var date = new Date(getApp().globalData.timeyear);
    console.log(date)
    date.setDate(date.getDate() + n);
    var month = date.getMonth() + 1
    month = month > 10 ? month :  month // 格式化月份
    this.setData({
      month
    })
    var day = date.getDate()
    day = day > 9 ? day : "0" + day // 格式化日期

    date = ""+ month + "/" + day ;
    
    return date;
  },

  kb: function(zs) {
    if (zs <= 0){
      zs = 1;
    }
    var zs_now = (Number(zs)-1) * 7;
    
    var test = "1";
    var arr = ['', '', '', '', '', '', ''];
    for(var i = 0; i < 7;i++){
      test = this.showdate(zs_now+i);
      console.log(test)
      arr[i] = arr[i] + test;
    }
 
    var curriculum = getApp().globalData.curriculum
    if (zs > '26') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '超过范围',
        success: function(res) {}
      })
      zs = 26;
    } else if (zs < '1') {
      zs = 1;
    }
    var that = this;
    var isCourse = 'none',
      xz = '';
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
        '#FF9999',],
      wlist: []
    }
    var zc = 0;
    for (let i in curriculum) {
      zc = curriculum[i].zc;
      if (curriculum[i].xq == "7") {
        zc = String(Number(curriculum[i].zc) - 1);
      }
      if (zc == zs) {
        var kcmcc = curriculum[i].kcmc;
        if (kcmcc.length > 13) {
          kcmcc = kcmcc.substring(0, 13) + "...";
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
    if (data.wlist.length == 0) {
      isCourse = '';
      xz = 'none';
    }

    that.setData({
      arr : arr,
      curWeek: '第 ' + zs + ' 周',
      whichWeek: zs,
      wlist: data.wlist,
      colorArrays: data.colorArrays,
      xz: xz,

      isCourse: isCourse,
      multiIndex: [(Number(zs) - 1), 0, 0, 0],
    })
  },

  onLoad: function(options) {
    this.kb(getApp().globalData.whichWeek);
  },
  onShow: function(options) {
    this.kb(getApp().globalData.whichWeek);
  },
  addCourseHandler: function(e) {
    wx.navigateTo({
      url: 'addcurriculum/addcurriculum'
    })
  },
  showPic: function() {
    wx.previewImage({
      current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/kb.png', // 当前显示图片的http链接
      urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/kb.png'] // 需要预览的图片http链接列表
    })
  }
})