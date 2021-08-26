// pages/release/release.js
var app = getApp()
var root_directory = app.globalData.root_directory
Page({

  //页面的初始数据
  data: {
    height: 0,
    image: [],          //存储上传的图片的路径
    isShow: true,        //是否显示添加图片按钮
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      width: (wx.getSystemInfoSync().windowWidth - 10) * 0.32
    })
  },

  //用户点击右上角分享
  onShareAppMessage: function () {

  },

  // 多图上传
  uploadImage(e) {
    let that = this;
    let image = that.data.image;
    wx.chooseImage({
      count: 1 - image.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let imgSrc = res.tempFilePaths;
        for (let i = 0; i < imgSrc.length; i++) {
          image.push(imgSrc[i])
        }
        if (image.length >= 1) {
          that.setData({
            isShow: false
          })
        }
        that.setData({
          image: image
        })
      },
    })
  },

  // 预览图片
  enlarged(e) {
    var image = this.data.image
    wx.previewImage({
      urls: this.data.image,
      current: image[e.target.id]
    })
  },
  // 长按删除图片
  delete(e) {
    console.log(e)
    let image = this.data.image;
    image.splice(e.target.id, 1)
    this.setData({
      image: image
    })
    if (image.length < 9) {
      this.setData({
        isShow: true
      })
    }
  },
  set(e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },

  // 保存并上传
  save(e) {
    console.log("点击发布")
    var that = this
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    console.log(that.data.name)
    wx.uploadFile({
      url: 'https://wegy.5gzvip.idcfengye.com/api_post', //仅为示例，非真实的接口地址
      filePath: that.data.image[0],
      name: 'file',
      formData: {
        name: that.data.name
      },

      header: {
        'content-type': 'multipart/form-data' // 非默认值
      },
      success(res) {
        wx.showToast({
          title: '生成成功',
        })
        console.log(res)
        wx.previewImage({
          current: res.data,
          urls: [res.data]
          
        })
      },fail(){
        wx.showToast({
          icon: 'none',
          title: '失败申请服务',
        })
      }
    })

  },

  // onHide(e){
  //   var that = this
  //   wx.showModal({
  //     title:"温馨提示",
  //     content:"发布页面是否保存",
  //     cancelText:"不保存",
  //     confirmText:"保存",
  //     success(res){
  //       if (res.cancel) {
  //         that.setData({
  //           title:null,
  //           describe:null,
  //           type:[["搞笑",false],["开心",false],["郁闷",false]],
  //           image:null
  //         })
  //       }
  //     }
  //   })
  // }

})