// pages/grade/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievement: [],
    array:[],
    color: [],
    skrw: '',
    show: "show",
    index: 0
  },
  bindPickerChange(e){
    this.xiu(this.data.skrw,  this.data.array[e.detail.value]);
  },
  onLoad: function () {
    getApp().loginState();
    var that = this;
    let skrw = JSON.parse(JSON.stringify(getApp().globalData.task));
    for(let i = 0; i < skrw.length; i++){
      let [year, month] = String(skrw[i].cjsj).split('-');
      let date = ''
      if(Number(month) > 4){
        date = String(year) + '-' + String(Number(year)+1) + '-' + 1
      }else{
        date = String(Number(year)-1) + '-' + String(Number(year)) + '-' + 2
      }
      let a = true;
      for(let b = 0; b < this.data.array.length; b++){
       if(date == this.data.array[b]){
         a = false;
       }
      }
      skrw[i]['date'] = date;
      if(a){
        this.data.array.push(date);
      }
      //  this.data.array.push(date);
  }
  this.data.array.sort().reverse();
    that.xiu(skrw,  this.data.array[0]);
  },
  xiu:function(skrw, date){
    let data = [], color = [], n = 0;
    
    for (let i = 0; i < skrw.length; i++) {
      if(skrw[i]['date'] == date){
        if (skrw[i].xf >= 3) {
          color.push("#11c1f3");
        } else if (skrw[i].xf >= 2) {
          color.push("#886aea");
        } else if (skrw[i].xf >= 1) {
          color.push("#33cd5f");
        } else {
          color.push("#ffc900");
        }
          n = Number(skrw[i].xf) + n;
          data.push(skrw[i]);
      }
      
    }
    this.setData({
      skrw: skrw,
      TotalCredit: n.toFixed(1),
      show: "",
      list: data,
      array: this.data.array,
      color: color,
      Totalnumber :data.length
    })
  },
})