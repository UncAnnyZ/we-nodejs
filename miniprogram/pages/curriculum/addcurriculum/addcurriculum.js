// pages/grade/show/show.js
var pageXstart = 0;
var pageX = 0;
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
    xxx: 'set1',
    block_show: false,
    addSubmitStyle: false
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value,
      zcs: e.detail.value[0] + 1,
      xq: e.detail.value[1] + 1,
      skjc: e.detail.value[2] + 1,
      skjc2: e.detail.value[3] + 1,
      skcd: e.detail.value[3] - e.detail.value[2],
    })
  },
  bindMultiPickerChange1: function (e) {
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
  setde12: function (e) {
    this.setData({
      shows: true,
    })
  }, // 点击遮罩层，显示的遮罩层与面板又隐藏起来  
  close: function () {
    this.setData({
      shows: false,
    })
  },
  set1: function (e) {
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

        var curriculum = getApp().changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum1);
        getApp().globalData.curriculum = curriculum;
        this.add();
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
  set2: function (e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    getApp().globalData._de.splice(e.currentTarget.dataset.bean, 1)
    wx.cloud.callFunction({
      name: 'weLoading',
      data: {
        _de: JSON.stringify(getApp().globalData._de),
        username: getApp().globalData.username,
        type: 'de'
      },
      success: res => {
        wx.showToast({
          title: '恢复成功',
          icon: 'none',
        })
        var curriculum = getApp().changeCurriculum(getApp().globalData._add, getApp().globalData._de, getApp().globalData.curriculum1);
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
  remove: function (array, a, zcs, xq, jcdm2) { //删除工具
    for (var i = 0; i < array.length; i++) {
      if (array[i].kcmc == a && array[i].zcs == zcs && array[i].jcdm2[1] == jcdm2) {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return -1;
  },
  add: function () {
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
  de: function () {
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
  onLoad: function () {
    // this.add();
    this.init()

  },

  init(){
    var lesson = wx.getStorageSync("personaldata").c_data;

    // 按上课时间排序先
    lesson.sort((a,b) => {
      return new Date(a.pkrq).getTime() - new Date(b.pkrq).getTime()
    })

    console.log(lesson)

    var ll = {}
    var kcmc = []

    // 处理数据=>以'课程名称'为字段 的对象数组
    for (let i = 0; i < lesson.length; i++) {
      let index = kcmc.indexOf(lesson[i].kcmc)
      if( index == -1 ) {
        kcmc.push(lesson[i].kcmc)
        ll[lesson[i].kcmc] = []
        ll[lesson[i].kcmc].push(lesson[i])
      } else {
        ll[lesson[i].kcmc].push(lesson[i])
      }
    }
    
    // 处理数据，将已经上过的剔除
    var nowtime = new Date().getTime();
    for (let i = 0; i < kcmc.length; i++) {
      var arr = ll[kcmc[i]]
      var obj = {}
      obj['data'] = [];
      obj['zcxq'] = []; // 列出该课程所有的 周次-星期-节次
      obj['jxcd'] = []; // 教学场地，这门课上课的地点
      for (let k = 0; k < arr.length; k++) {
        // 还没上的课
        if (nowtime < new Date(arr[k].pkrq).getTime()) {
          obj['data'].push(arr[k])
          obj['zcxq'].push([arr[k].zc + "-" + arr[k].xq + "-" + arr[k].jcdm, true]);
          // 找出该门课的上课场地
          if ( !obj['jxcd'].includes(arr[k].jxcdmc) ) {
            obj['jxcd'].push(arr[k].jxcdmc)
          }

        }
      }
      ll[kcmc[i]] = obj
    }

    this.setData({
      ll,kcmc
    })

    console.log(kcmc,ll)
  },

  change(e){
    console.log(e)
    this.block_show()

    var id = e.currentTarget.id
    let ll = JSON.parse( JSON.stringify( this.data.ll[ this.data.kcmc[id] ] ))  // 深拷贝
    var showDetail = {
      course: this.data.kcmc[id],
      place: ll.jxcd,
      teacher: ll.data[0].teaxms,
      week: ll.zcxq
    }
    this.setData({
      showDetail
    })
    console.log(showDetail)

  },

  changeWB(e){
    var id = e.currentTarget.id
    var ll = this.data.ll
    var showDetail = this.data.showDetail
    showDetail.week[id][1] = !showDetail.week[id][1]

    if( JSON.stringify(showDetail.week) == JSON.stringify(ll[showDetail.course].zcxq) ){
      this.setData({
        showDetail,
        addSubmitStyle:false
      })
    } else {
      this.setData({
        showDetail,
        addSubmitStyle:true
      })
    }
    

  },

  block_show(){
    var block_show = this.data.block_show
    var that = this
    if(block_show){
      this.setData({
        add_style: "add_hide"
      })
      setTimeout(() => {
        that.setData({
          block_show: !block_show
        })
      }, 200);
    } 
    else {
      this.setData({
        add_style: "add_show",
        block_show: !block_show
      })
    }
  },

  addSubmit(){
    console.log('点击保存')

  },

  // 左滑
  move(e){
    console.log(e)
    console.log(this.pageXstart,this.pageX,this.pageX - this.pageXstart)
    var id = e.currentTarget.id
    if (e.type == "touchstart") {
      this.pageXstart = e.touches[0].pageX
      this.data.ll[this.data.kcmc[id]].show = false
    }
    else{
      this.pageX = e.touches[0].pageX
      this.setData({ 
        ddd: (this.pageXstart - this.pageX)  + "px"
      })

      // if (this.pageX - this.pageXstart < -50) {
      //   let ll = this.data.ll
      //   ll[this.data.kcmc[id]].show = true
      //   this.setData({ 
      //     ll,
      //     ddd: (this.pageXstart - this.pageX)  + "px"
      //   })
        

      //   this.pageX = 0;
      // }
      // else if(this.pageX - this.pageXstart > 0){
      //   let ll = this.data.ll
      //   ll[this.data.kcmc[id]].show = false
      //   this.setData({ ll })
      // }
    }
  }


})