// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['2019-2020-1'],
    index: "0",
    pd: ['2019-2020-1'],
    achievement: [],
    color: [],
    show: "show",
    isCourse:'none',
  },
  onShareAppMessage: function (res) {

  },
  bindPickerChange(e) {

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
      if (achievement[i].xnxqmc == this.data.array[e.detail.value]) {
        data.push(achievement[i]);
        a = Number(achievement[i].xf) + a;
        b = Number(achievement[i].cjjd) + b;
        c = c + Number(achievement[i].xf) * Number(achievement[i].cjjd);
        if (achievement[i].kcdlmc != "公共选修课") {
          d = Number(achievement[i].xf) + d;
          k = Number(achievement[i].cjjd) + k;
          f = Number(achievement[i].xf) * Number(achievement[i].cjjd) + f;
        }
      }
    }
    if (data[0] == undefined) {
      isCourse = '';
    }
    var pj_credit = c / a;
    var pj_credit2 = f / d;
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
      index: e.detail.value,
      list: data,
      color: color,
      TotalCredit: a,
      AverageScorePoint: pj_credit.toFixed(2),
      Achi: pj_credit2.toFixed(2)
    })
  },
  onLoad: function() {
    getApp().globalData.achievement.sort((a, b) => b.zcj.localeCompare(a.zcj, 'zh'))

    let data = [], color = [], isCourse = 'none', data1 = [];
    var achievement = getApp().globalData.achievement;
    if (achievement[0] == undefined)
    {
      isCourse = '';
    }
    
    for (var i = 0; i < achievement.length; i++) {
      var n = 0;
      for (var b = 0; b < this.data.array.length; b++) {
        if (achievement[i].xnxqmc == this.data.array[b]) {
          n = 1;
        }
      }
      if (n == 0) {
        this.data.array.push(achievement[i].xnxqmc);
        this.data.array.sort()
        this.data.array.reverse()
      }
      // for (var b = 0; b < this.data1.array.length; b++) {
      //   if (achievement[i].xnxqmc == this.data1.array[b]) {
      //     n = 1;
      //   }
      // }
      // if (n == 0) {
      //   this.data1.array.push(achievement[i].xnxqmc);
      // }
    }
    var a = 0,
      b = 0,
      c = 0,
      d = 0,
      k = 0,
      f = 0;
    for (var i = 0; i < achievement.length; i++) {
      if (achievement[i].xnxqmc == this.data.array[0]) {
        a = Number(achievement[i].xf) + a;
        b = Number(achievement[i].cjjd) + b;
        c = Number(achievement[i].xf) * Number(achievement[i].cjjd) + c;
        data.push(achievement[i]);
        if (achievement[i].kcdlmc != "公共选修课"){
          d = Number(achievement[i].xf) + d;
          k = Number(achievement[i].cjjd) + k;
          f = Number(achievement[i].xf) * Number(achievement[i].cjjd) + f;
        }
      }
    }
    if (data[0] == undefined) {
      isCourse = '';
    }
    var pj_credit = c / a;
    var pj_credit2 = f / d;
    if (pj_credit > 0){
      pj_credit2 = pj_credit2.toFixed(2);
      pj_credit = pj_credit.toFixed(2);
    }
    else{
            pj_credit = "看看其他学年吧";
    }
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
      array: this.data.array,
      show: "",
      list1:data1,
      list: data,
      color: color,
      isCourse: isCourse,
      achievement: achievement,
      Achi : pj_credit2,
      TotalCredit: a,
      AverageScorePoint: pj_credit
    })
  },
})