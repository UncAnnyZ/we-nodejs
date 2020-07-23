// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievement: [],
    color: [],
    show: "show",
    isCourse: 'none'
  },
  onLoad: function () {
    let data = [], color = [], isCourse = 'none',n=0;
    var quality = getApp().globalData.quality;
    if (quality[0] == undefined) {
      isCourse = '';
    }
    for (let i = 0; i < quality.length; i++) {
      if (quality[i].hdxf >= 0.4) {
        color.push("#11c1f3");
      } else if (quality[i].hdxf >= 0.3) {
        color.push("#886aea"); 
      } else if (quality[i].hdxf >= 0.2) {
        color.push("#33cd5f");
      } else {
        color.push("#ffc900");
      }
      if (quality[i].shztmc == '审核通过'){
        n = Number(quality[i].hdxf) + n;
      }
  
    }
    this.setData({
      TotalCredit: n.toFixed(1),
      show: "",
      list: quality,
      color: color,
      isCourse: isCourse,
    })
  },
})