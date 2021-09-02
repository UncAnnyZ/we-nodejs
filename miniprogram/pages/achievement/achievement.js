// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['公选课','2019-2020-1'],
    index: "0",
    achievement: [],
    color: [],
    isCourse: 'none',
  },
  onShareAppMessage: function (res) {

  },
  bindPickerChange(e) {
    console.log(e)
    this.showList(e.detail.value)
  },
  onLoad: function () {
    getApp().loginState();
    getApp().globalData.achievement.sort((a, b) => b.zcj.localeCompare(a.zcj, 'zh'))

    var achievement = getApp().globalData.achievement;
    if (achievement[0] == undefined)
      isCourse = '';

    // 选出所有年份
    for (var i = 0; i < achievement.length; i++) {
      if (!this.data.array.includes(achievement[i].xnxqmc)) {
        this.data.array.push(achievement[i].xnxqmc);
      }
    }
    // 年份从大到小
    this.data.array.sort()
    this.data.array.reverse()

    console.log(achievement)
    console.log(this.data.array)
    this.setData({
      array: this.data.array,
      achievement: achievement
    })

    this.showList(1)
  },

  // 处理展示
  showList(id) {
    // kcdlmc: "公共选修课" xdfsmc: "任选"
    var a = 0,
      b = 0,
      c = 0,
      d = 0,
      k = 0,
      f = 0;
    var isCourse = 'none';
    let data = [],
      color = [],
      achievement = this.data.achievement;
    for (var i = 0; i < achievement.length; i++) {
      if (achievement[i].xnxqmc == this.data.array[id] || (achievement[i].kcdlmc == "公共选修课" && id == 0)) {
        a = Number(achievement[i].xf) + a;
        b = Number(achievement[i].cjjd) + b;
        c = Number(achievement[i].xf) * Number(achievement[i].cjjd) + c;
        if (achievement[i].kcdlmc != "公共选修课") {
          d = Number(achievement[i].xf) + d;
          k = Number(achievement[i].cjjd) + k;
          f = Number(achievement[i].xf) * Number(achievement[i].cjjd) + f;
        }

        data.push(achievement[i]);
      }
    }
    if (data[0] == undefined) {
      isCourse = '';
    }
    var pj_credit = c / a;
    var pj_credit2;
    d ? (pj_credit2 = f / d) : (pj_credit2 = 0)

    // 颜色
    for (let i = 0; i < data.length; i++) {
      if (parseInt(data[i].zcj) >= 90) {
        color.push("#11c1f3");
      } else if (parseInt(data[i].zcj) >= 80) {
        color.push("#33cd5f");
      } else if (parseInt(data[i].zcj) >= 70) {
        color.push("#886aea");
      } else if (parseInt(data[i].zcj) >= 60) {
        color.push("#ffc900");
      } else {
        color.push("#CC0000");
      }
    }


    this.setData({
      isCourse: isCourse,
      index: id,
      list: data,
      color: color,
      TotalCredit: a,
      Achi: pj_credit2.toFixed(2),
      AverageScorePoint: pj_credit.toFixed(2)
    })

  },

  // 总绩点
  totalJD(){
    let zxf = 0;
    let cjjd = 0
    var achievement = this.data.achievement
    for (var i = 0; i < achievement.length; i++) {
      if (achievement[i].kcdlmc != "公共选修课") {
        zxf += Number(achievement[i].xf);
        cjjd += Number(achievement[i].xf) * Number(achievement[i].cjjd);
      }
    }
    console.log( (cjjd / zxf).toFixed(2) )
  }
})