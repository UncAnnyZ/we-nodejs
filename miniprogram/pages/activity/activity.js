
Page({
  data: {
    curriculum: [],
    inform:[],
  },  

  //写出一个函数
  action_fun:function (e,data,b) {
    for (var i=0;i<data.length;i++){
      if(e.currentTarget.dataset.index == data[i].id){
        //索引和设置的id相等相等
        if (data[i].isopen==true){
          if (data[i].type==1 ){
            getApp().globalData.club_detail= data[i]
            wx.navigateTo({
              url: 'mod/mod',
            })
        }   
            //类型2
        else if (data[i].type==2 ){
          wx.previewImage({
            current: data[i].current, // 当前显示图片的http链接
            urls: data[i].url// 需要预览的图片http链接列表
          })
       }   
          //类型3
       else if (data[i].type==3 ){
        wx.navigateToMiniProgram({
          appId: data[i].appid,//数据库传入appid
          path: data[i].path,//数据库传入路径
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
            content:"不在该"+b+"报名时间内",
            showCancel:false

          })
        }
      
  }
    
  }
  },
  //点击事件执行函数
  activityjr: function(e) { 
    this.action_fun(e,this.data.info_st,"社团")
  },
  //点击事件执行函数
  act:function(e){
    this.action_fun(e,this.data.info_jg,"机构")
},
  onLoad: function (res) {
    //类别1按模板
    //类别2海报
    //类别3小程序
    let that =this
    wx.cloud.callFunction({
      name:"get_data",
      success(res){
        console.log(res,"请求成功11")
        that.setData({
                info_jg:res.result.result_jg.data,info_st:res.result.result_st.data,
              })
      }
    })
  },
})