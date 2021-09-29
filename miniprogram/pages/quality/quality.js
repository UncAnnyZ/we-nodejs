// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievement: [],
    color: [],
    mask: false,
    // maskDetail: {

    // }
  },
  onLoad: function () {
    getApp().loginState();
    let color = [], n=0;
    var quality = getApp().globalData.quality;
    
    console.log(quality.ktmc);
    for (let i = 0; i < quality.length; i++) {
      quality[i].ktmc =  quality[i].ktmc.replace("&ldquo;", "").split("&rdquo;")[0]
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
      list: quality,
      color: color
    })
  },

  click (e) {
    var index = e.currentTarget.id
    console.log(this.data.list[index])

    this.setData({
      maskDetail: this.data.list[index],
      mask: true
    })

  },
  hideMask(){
    this.setData({
      mask:false
    })
  },
  

  return_true(){return true},
  return_false(){return false},
})