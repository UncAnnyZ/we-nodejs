
Page({
  data: {
    curriculum: [],
    inform:[],
  },

  activityjr: function(e) { 
    console.log(e.currentTarget.dataset.index)
    //类型1
    for (var i=0;i<this.data.info_st.length;i++){
      if(e.currentTarget.dataset.index == this.data.info_st[i].id){
        //索引和设置的id相等相等
        if (this.data.info_st[i].isopen==true){
          if (this.data.info_st[i].type==1 ){
            // getApp().globalData.club_detail= this.data.inform_st[i];
            getApp().globalData.club_detail= this.data.info_st[i]
            wx.navigateTo({
              url: 'mod/mod',
            })
        }   
            //类型2
        else if (this.data.info_st[i].type==2 ){
          wx.previewImage({
            current: this.data.info_st[i].current, // 当前显示图片的http链接
            urls: this.data.info_st[i].url// 需要预览的图片http链接列表
          })
       }   
          //类型3
       else if (this.data.info_st[i].type==3 ){
        wx.navigateToMiniProgram({
          appId: this.data.info_st[i].appid,//数据库传入appid
          path: this.data.info_st[i].path,//数据库传入路径
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
        else{
          wx.showModal({
            title:"提示",
            content:"不在该社团报名时间内",
            showCancel:false

          })
        }
      
  }
    
  }
  },

  act:function(e){
    for (var i=0;i<this.data.info_jg.length;i++){
      console.log(e.currentTarget.dataset.index)
      //类型1
      if(e.currentTarget.dataset.index == this.data.info_jg[i].id){
        if (this.data.info_jg[i].isopen==true){
          if (this.data.info_jg[i].type==1 ){
            getApp().globalData.club_detail = this.data.info_jg[i];
            wx.navigateTo({
              url: 'mod/mod',
            })
        }   
        //类型2
        else if (this.data.info_jg[i].type==2 ){
          wx.previewImage({
            current: this.data.info_jg[i].current, // 数据库传入显示图片的http链接
            urls: this.data.info_jg[i].url// 数据库传入预览的图片http链接列表
          })
       }   
       //类型3
       else if (this.data.info_jg[i].type==3 ){
        wx.navigateToMiniProgram({
          appId: this.data.info_jg[i].appid, //数据库传入appid
          path: this.data.info_jg[i].path, //数据库传入path
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
        else{
          wx.showModal({
            title:"提示",
            content:"不在该机构报名时间内",
            showCancel:false

          })
        }
  }
    
  }
},
process:function  (ar) {
  var ret=[];
  for (var i=0;i<ar.length;i++){
    console.log(ar[i])
    if(ar[i].type==1){
      ret.push(ar[i])
    }
  }
  return ret

},


  onLoad: function (res) {
    //类别1按模板
    //类别2海报
    //类别3小程序
    let that =this
    // wx.cloud.callFunction({
    //   name:"get_data",
    //   success(res){
    //     console.log(res,"请求成功13")
    //     console.log(res.result.result_jg)
    //     // that.setData({
    //     //   info_st:res.result.data,

    //     // })
    //   }
    // })
    wx.cloud.callFunction({
      name:"get_data",
      data:{
        shape:1
      },
      success(res){

        console.log(res,"请求成功1")
        that.setData({
          info_st:res.result.data,

        })
        console.log(that.data.info_st.length,123)
        var ret=that.process(that.data.info_st)
        that.setData({
              inform_st:ret
            })

      }
    })
    wx.cloud.callFunction({
      name:"get_data",
      data:{
        shape:2
      },
      success(res){
        console.log(res,"请求成功2")
        that.setData({
          info_jg:res.result.data,
        })
        console.log(that.data.info_jg.length,123)
        var ret=that.process(that.data.info_jg)
        that.setData({
              inform_jg:ret
            })
        
      }

    })
  },
})