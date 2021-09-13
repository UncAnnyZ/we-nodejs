var app = getApp()
// 初始化
wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('club-sm')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
    condition: ["姓名", "学号", "专业班级", "学院", "联系电话"], //填写信息
    condition_en: ["name", "num", "major", "xueyuan", "phone"],
    sector_list: "", //加入部门
    title: '', //标题
    content: '',
    //内容
  },
  //提交表单
  formSubmit: function (e) {

    console.log(e.detail.value)
    this.setData({
      detail: e.detail.value
    })
    var that = this
    var phone = this.data.detail.phone
    //手机号格式判断
    var phoneCodeVerification = /^[1][3-9][0-9]{9}$/;
    var isPhone = phoneCodeVerification.test(phone);
    console.log(this.data.detail.checkbox)
    if (this.data.detail.name != '' && this.data.detail.phone != '' && this.data.detail.checkbox.length != [] && this.data.detail.num != '' && this.data.detail.major != '' && this.data.detail.xueyuan != "") {
      if (isPhone == true) {
        console.log(this.data.detail)
        wx.showLoading({
          title: '加载中',
          mask: true

        })
        data.add({
          data: {
            name: this.data.detail.name,
            phone: this.data.detail.phone,
            num: this.data.detail.num,
            xueyuan:this.data.detail.xueyuan,
            major: this.data.detail.major,
            checkbox: this.data.detail.checkbox,
            club_name: this.data.club_name,

          },
          success(res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              mask: true
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 0,
              })
            },600);
          }
        })
      } else {
        wx.showModal({
          title: "提示",
          content: "联系电话格式错误",
          showCancel: false
        })
      }

    } else {
      wx.showModal({
        title: "提示",
        content: "信息还未填写完毕",
        showCancel: false
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      title: app.globalData.club_detail.title,
      content: app.globalData.club_detail.content,
      sector_list: app.globalData.club_detail.sector_list,
      club_name: app.globalData.club_detail.name,
      current:app.globalData.club_detail.pic_current,
      url:app.globalData.club_detail.pic_url
    })
  },

  onShow: function () {

  },
  read_pic:function(e){
    console.log(typeof this.data.url)

    if (typeof this.data.url=="undefined"){
      wx.showToast({
        title:"暂未该社团招生群信息",
        icon:"none"
      })
     
      
    }
    else{
      wx.previewImage({
        current: this.data.current, // 当前显示图片的http链接
        urls: this.data.url // 需要预览的图片http链接列表
      })
    }
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