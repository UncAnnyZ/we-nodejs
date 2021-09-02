var app=getApp()
// 初始化
wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('club-sm')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    condition:["姓名","学号","专业班级","学院","联系电话"],//填写信息
    condition_en:["name","num","major","xueyuan","phone"],
    sector_list:"",//加入部门
    title:'',//标题
    content:''
  //内容
  },
  //提交表单
  formSubmit:function(e){

    console.log(e.detail.value)
    this.setData({
      detail:e.detail.value
    })
    var phone=this.data.detail.phone
    //手机号格式判断
    var phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    var isPhone=phoneCodeVerification.test(phone);

     if(this.data.detail.name!=''&&this.data.detail.phone!=''&&this.data.detail.chckbox!=''&&this.data.detail.num!=''&&this.data.detail.major!=''&&this.data.detail.xueyuan!=""&&isPhone==true){
       console.log(this.data.detail,2123)
       wx.showLoading({
         title: '加载中',
       })
       setTimeout(function(e){
        wx.hideLoading()
       }, data.add({
        data:{
          name:this.data.detail.name,
          phone:this.data.detail.phone,
          num:this.data.detail.num,
          major:this.data.detail.major,
          checkbox:this.data.detail.checkbox,
          club_name:this.data.club_name,
        },
        sucess:res =>{
          console.log(this.data)
        }
      }))
       wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
    })
      setTimeout(function () {
        wx.navigateBack({
          delta: 0,
        })
      }, 2000)

    }
    else{
      wx.showModal({
        title:"提示",
        content:"信息还未填写完毕或联系电话错误",
        showCancel:false
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      title:app.globalData.club_detail.title,
      content:app.globalData.club_detail.content,
      // condition:app.globalData.club_detail.condition,
      // condition_en:app.globalData.club_detail.condition_en,
      sector_list:app.globalData.club_detail.sector_list,
      club_name:app.globalData.club_detail.name
    })
  },
 
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
 

  onShareAppMessage: function () {

  }
})