wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('club_st')
const data_ = db.collection('club_jg')
Page({
  data: {
    curriculum: [],
    inform:[],
  },

  activityjr: function(e) {
    ///有问题 
    console.log(e.currentTarget.dataset.index)
    for (var i=0;i<this.data.info_st.length;i++){
      if(e.currentTarget.dataset.index == this.data.info_st[i].id){
        if (this.data.info_st[i].type==1 ){
          getApp().globalData.club_detail = this.data.inform_st[i];
          wx.navigateTo({
            url: 'mod/mod',
          })
      }   
      else if (this.data.info_st[i].type==2 ){
        wx.previewImage({
          current: this.data.info_st[i].current, // 当前显示图片的http链接
          urls: this.data.info_st[i].url// 需要预览的图片http链接列表
        })
     }   
     else if (this.data.info_st[i].type==3 ){
      wx.navigateToMiniProgram({
        appId: this.data.info_st[i].appid,
        path: this.data.info_st[i].path,
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          console.log('跳转成功');
        }
      })
   }   
  }
    
  }
  },

  act:function(e){
    for (var i=0;i<this.data.info_jg.length;i++){
      console.log(e.currentTarget.dataset.index)
      if(e.currentTarget.dataset.index == this.data.info_jg[i].id){
        if (this.data.info_jg[i].type==1 ){
          getApp().globalData.club_detail = this.data.inform_jg[i];
          wx.navigateTo({
            url: 'mod/mod',
          })
      }   
      else if (this.data.info_jg[i].type==2 ){
        wx.previewImage({
          current: this.data.info_jg[i].current, // 当前显示图片的http链接
          urls: this.data.info_jg[i].urls// 需要预览的图片http链接列表
        })
     }   
     else if (this.data.info_jg[i].type==3 ){
      wx.navigateToMiniProgram({
        appId: this.data.info_jg[i].appid,
        path: this.data.info_jg[i].path,
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          console.log('跳转成功');
        }
      })
   }   
  }
    
  }
},



  onLoad: function (res) {
    //加载六种情况的数据
    //机构、社团、type分别为1，2，3
    data.where({
      type:'1'
    }).get().then(res=>{
      console.log(res.data,3333333)
      var infomation=res.data
      this.setData({
        inform_st:infomation,
      })
    })
    data_.where({
      type:'1'
    }).get().then(res=>{
      console.log(res.data,2222222)
      var infomation=res.data
      this.setData({
        inform_jg:infomation,
      })
    })
    data.get().then(res=>{
      console.log(res.data,22)
      var infomation=res.data
      this.setData({
       info_st:infomation,
      })
    })

    data_.get().then(res=>{
      console.log(res.data,11)
      var infomation=res.data
      this.setData({
        info_jg:infomation,
      })
    })

  
  },
})