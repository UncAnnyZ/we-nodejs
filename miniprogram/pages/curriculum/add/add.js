// pages/index/index.js
Page({

  /* 页面的初始数据 */
  data: {
    // course:'',    //课程
    // place:'',     //地点
    // teacher:'',   //任课老师
    // week:[],      //选择的周数

    selectWeek: false,   //选择周数
    section: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
    sectionIndex: [0, 0],

    Week: ["1", "2", "3", "4", "5", "6", "7"],// [1,2,3,4,5,6,7]
    WeekIndex: 0,

    del: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],  // 第 x 周
    ["全部", "周一", "周二", "周三", "周四", "周五", "周六", "周七"],       // 周 x 
    ["全部", "1-2节", "3-4节", "5-6节", "7-8节", "上午", "下午"]],
    delIndex: [0, 0, 0],

    kcmc: [],
    kcmcIndex: 0
  },

  onLoad: function (options) {
    // 获取屏幕宽度
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          winWidth: res.screenWidth * 0.8 / 3 - 30
        })
      }
    })
    // 所有课程名称
    var lesson = getApp().globalData.curriculum1
    var kcmc = []
    for (let i = 0; i < lesson.length; i++) {
      if (!kcmc.includes(lesson[i].kcmc)) {
        kcmc.push(lesson[i].kcmc)
      }
    }
    this.setData({
      kcmc: kcmc
    })
  },

  onReady: function () {
    // 初始化 屏蔽列表
    this.delLesson()
  },

  onShow: function () {
    // 初始化"设置周数"
    var week = [];
    for (var i = 0; i < 18; i++) {
      week.push([false, 'color:gary'])
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
    if (e.target.id == "kcmcIndex") {
      this.delLesson()
    }
  },

  // 周数显示按钮
  selectWeek(e) {
    this.setData({
      selectWeek: !this.data.selectWeek
    })
  },
  // 周数选择按钮
  changeWB(e) {
    let data = this.data.week
    if (data[e.target.id - 1][0]) {
      data[e.target.id - 1][0] = false
      data[e.target.id - 1][1] = 'background:gary;color:black'
    }
    else {
      data[e.target.id - 1][0] = true
      data[e.target.id - 1][1] = "background:rgb(60, 200, 60);color:white"
    }

    this.setData({
      week: data
    })
  },

  // 节数选择器
  ChangeSectionIndex(e) {
    var index = this.data.sectionIndex
    //修改第一列
    if (e.detail.column == 0) {
      index[e.detail.column] = e.detail.value
      if (e.detail.value > index[1]) {  //选择后，第一列>第二列
        index[1] = e.detail.value
      }
    }
    //修改第二列
    else {
      if (e.detail.value < index[0])   //选择后，第二列<第一列
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
  },
  // 新增课程按钮
  addSubmit(e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    var week = []
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
      var tt = []
      for (i = 0; i < week.length; i++) {
        var jcdm = '0' + Number(this.data.sectionIndex[0] + 1)
        Number(this.data.sectionIndex[1] + 1)
        var add = {
          'jcdm': a + b,
          'jxcdmc': this.data.place,
          'kcmc': this.data.course,
          'teaxms': this.data.teacher,
          'xq': this.data.Week[this.data.WeekIndex],
          'zc': String(week[i])
        }
        tt.push(add)
        getApp().globalData._add.push(add)
      }
      wx.cloud.callFunction({
        name: 'we_add',
        data: {
          _add: JSON.stringify(getApp().globalData._add),
          username: getApp().globalData.username
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          let a = tt;
          let b = getApp().globalData.curriculum;
          for (var i = 0; i < a.length; i++) {
            b.push(a[i])
          }
          wx.setStorage({
            key: 'hctime',
            data: "1"
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

  // 删除课程选择器
  ChangeDelIndex(e) {
    this.delLesson(e)
    // var data = this.data.delIndex
    // data[e.detail.column] = e.detail.value
    // this.setData({
    //   delIndex:data
    // })
  },

  delLesson(e) {
    var lesson = getApp().globalData.curriculum1
    var del = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      ["周一", "周二", "周三", "周四", "周五", "周六", "周七", "全部"],
      ["1-2节", "3-4节", "5-6节", "7-8节", "上午", "下午", "全部"]
    ]

    // 找出该课程的所有信息
    var data = []
    for (let i = 0; i < lesson.length; i++) {
      if (lesson[i].kcmc == this.data.kcmc[this.data.kcmcIndex]) {
        data.push(lesson[i])
      }
    }

    // 初始化 或 重新选择课程 时
    if (e == undefined) {
      this.setData({
        delIndex: [0, 0, 0]
      })
      del = this.zc(data, del)
      this.setData({
        del: del,
      })
    }
    // 更改选择器选项时
    else {
      var index = this.data.delIndex
      // 修改周次
      if (e.detail.column == 0) {
        if (e.detail.value != 0) {
          index = [e.detail.value, 1, 1]
        }
        else {   // 选择全部
          index = [e.detail.value, 0, 0]
        }
      }
      // 修改星期
      else if (e.detail.column == 1) {
        if (e.detail.value != 0)
          index = [index[0], e.detail.value, 1]
      }
      // 修改节次
      else if (e.detail.column == 2) {
        if (e.detail.value != 0)
          index = [index[0], index[1], e.detail.value]
      }


      this.setData({
        delIndex: index
      })

      del = this.zc(data, del)
      this.setData({
        del: del
      })
    }
  },

  // 统计该课程所有上课的周数
  zc(data, del) {
    var zc = ["全部"]
    for (let i = 0; i < data.length; i++) {
      if (!zc.includes(Number(data[i].zc))) {
        zc.push(Number(data[i].zc))
      }
    }
    del[0] = zc
    return this.xq(data, del)
  },
  // 统计星期
  xq(data, del) {
    var newdata = []
    var xq = ["全部"]
    for (let i = 0; i < data.length; i++) {
      // 课程的周数 == 当前选择的周数
      if (data[i].zc == String(del[0][this.data.delIndex[0]]) && !xq.includes(String(del[0][this.data.delIndex[0]])) && !xq.includes(del[1][Number(data[i].xq) - 1])) {
        newdata.push(data[i])
        xq.push(del[1][Number(data[i].xq) - 1])
      }
    }
    del[1] = xq
    return this.jc(newdata, del)
  },
  // 统计节次
  jc(data, del) {
    var xq = ["全部", "周一", "周二", "周三", "周四", "周五", "周六", "周七"]
    // 找出所在周数 所在下标
    var index
    for (let i = 0; i < xq.length; i++) {
      if (del[1][this.data.delIndex[1]] == xq[i]) {
        index = i
        break
      }
    }
    // 将下标当前的 星期X的节次 统计出来
    var jcdm = []
    var jc = ["全部"]
    for (let i = 0; i < data.length; i++) {
      if (data[i].zc == String(del[0][this.data.delIndex[0]]) && data[i].xq == String(index)) {
        jcdm.push(data[i].jcdm)
      }
    }

    if (jcdm.includes("0102")) {
      jc.push("1-2节")
    }
    if (jcdm.includes("0304")) {
      jc.push("3-4节")
    }
    if (jcdm.includes("0506")) {
      jc.push("5-6节")
    }
    if (jcdm.includes("0708")) {
      jc.push("7-8节")
    }
    del[2] = jc

    return del
  },

  // 屏蔽课程按钮
  delSubmit(e) {
    var jcdm
    switch (this.data.del[2][this.data.delIndex[2]]) {
      case "全部":
        jcdm = "0"; break;
      case "1-2节":
        jcdm = "0102"; break;
      case "3-4节":
        jcdm = "0304"; break;
      case "5-6节":
        jcdm = "0506"; break;
      case "7-8节":
        jcdm = "0708"; break;
      default:
        jcdm = ""; break;
    }

    var xqall = ["全部", "周一", "周二", "周三", "周四", "周五", "周六", "周七"]
    var xq
    for (let i = 0; i < xqall.length; i++) {
      if (this.data.del[1][this.data.delIndex[1]] == xqall[i]) {
        xq = i
        break
      }
    }

    var de = {
      'kcmc': String(this.data.kcmc[this.data.kcmcIndex]),
      'xq': String(xq),
      'zc': String(this.data.del[0][this.data.delIndex[0]]),
      'jcdm': String(jcdm)

    }
    var that = this;
    getApp().globalData._de.push(de)
    wx.showModal({
      title: "温馨提示",
      content: "确认屏蔽 第" +
        this.data.del[0][this.data.delIndex[0]] + "周 " +
        this.data.del[1][this.data.delIndex[1]] + " " +
        this.data.del[2][this.data.delIndex[2]] + " ",
      confirmText: "确认屏蔽",
      confirmColor: "#ff3c3c",
      cancelText: "再想想",
      success(res) {

        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'we_de',
            data: {
              _de: JSON.stringify(getApp().globalData._de),
              username: getApp().globalData.username
            },
            success: res => {
              wx.showToast({
                title: '屏蔽成功',
                icon: 'none',
              })
              if (that.data.del[0][that.data.delIndex[0]] == "全部") {
                for (var i = 0; i < getApp().globalData.curriculum.length; i++) {
                  if (getApp().globalData.curriculum[i].kcmc == that.data.kcmc[that.data.kcmcIndex]) {
                    getApp().globalData.curriculum.splice(i, 1);
                    i--;
                  }
                }
                for (var i = 0; i < getApp().globalData.curriculum1.length; i++) {
                  if (getApp().globalData.curriculum1[i].kcmc == that.data.kcmc[that.data.kcmcIndex]) {
                    getApp().globalData.curriculum1.splice(i, 1);
                    i--;
                  }
                }
              }
              else {
                for (var i = 0; i < getApp().globalData.curriculum.length; i++) {
                  if (getApp().globalData.curriculum[i].kcmc == that.data.kcmc[that.data.kcmcIndex] && getApp().globalData.curriculum[i].jcdm == jcdm && getApp().globalData.curriculum[i].zc == that.data.del[0][that.data.delIndex[0]] &&
                    getApp().globalData.curriculum[i].xq == xq) {
                    getApp().globalData.curriculum.splice(i, 1);
                    i--;
                  }
                }
                for (var i = 0; i < getApp().globalData.curriculum1.length; i++) {
                  if (getApp().globalData.curriculum1[i].kcmc == that.data.kcmc[that.data.kcmcIndex] && getApp().globalData.curriculum1[i].jcdm == jcdm && getApp().globalData.curriculum1[i].zc == that.data.del[0][that.data.delIndex[0]] &&
                    getApp().globalData.curriculum1[i].xq == xq) {
                    getApp().globalData.curriculum1.splice(i, 1);
                    i--;
                  }
                }
              }
              that.onLoad()
              wx.setStorage({
                key: 'hctime',
                data: "1"
              })
            },
            fail: err => {
              wx.showToast({
                title: '屏蔽失败',
                icon: 'none',
              })
            }
          })
        }
      }

    })
  },

  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  }
})