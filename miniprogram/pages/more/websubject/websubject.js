//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    "index":"0",
    "imgData": "",
    "hiddenn":true,
    "username":0,
    "array": ['一教东204\n', '一教东304\n', '一教东404\n', '一教东604\n', '一教东804\n', '东904\n', '二教A-201\n', '二教A-202\n', '二教A-203\n', '二教A-204\n', '二教A-205\n', '二教A-301\n', '二教A-302\n', '二教A-303\n', '二教A-305\n', '二教A-401\n', '二教A-402\n', '二教A-403\n', '二教A-405\n', '二教A-501\n', '二教A-502\n', '二教A-503\n', '二教A-504\n', '二教A-505\n', '二教A-601\n', '二教A-602\n', '二教A-603\n', '二教A-604\n', '二教A-605\n', '二教A-701\n', '二教A-702\n', '二教A-703\n', '二教A-704\n', '二教A-705\n', '二教B-201\n', '二教B-202\n', '二教B-203\n', '二教B-204\n', '二教B-205\n', '二教B-206\n', '二教B-207\n', '二教B-208\n', '二教B-301\n', '二教B-302\n', '二教B-303\n', '二教B-304\n', '二教B-305\n', '二教B-306\n', '二教B-307\n', '二教B-308\n', '二教B-401\n', '二教B-404\n', '二教B-601\n', '二教B-602\n', '二教B-603\n', '二教B-604\n', '二教B-701\n', '二教B-702\n', '二教B-703\n', '二教B-704\n', '二教B-801\n', '二教B-802\n', '二教B-803\n', '二教B-804\n', '二教B-901\n', '二教B-904\n', '二教B1003\n', '光华实验1室\n', '光华实验2室\n', '光华实验3室\n', '计算机4室\n', '计算机5室\n', '计算机8室\n', '计算机9室\n', '软件实验室\n', '三号楼203\n', '三号楼204\n', '三号楼205\n', '三号楼602\n', '三号楼603\n', '实验楼506\n', '网络实验室\n', '物理实验室\n', '一教西1004\n', '一教西204\n', '一教西304\n', '一教西404\n', '一教西504\n', '一教西604\n', '一教西701\n', '一教西704\n', '一教西804\n', '西904\n', '一教学术一室\n', '一号楼101\n', '一号楼401\n', '一号楼501\n', '一号楼603\n', '一号楼604\n', '一号楼703\n', '一号楼705\n', '一号楼801\n', '一号楼804\n', '硬件实验室\n', '语音室1001\n', '语音室1002\n', '语音室1003\n', '语音室901\n', '语音室903\n', '篮球场1\n', '篮球场2\n', '篮球场4\n', 'J01\n', 'J02\n', 'J06\n', 'J07\n', 'J11\n', 'J12\n', 'J14\n', 'A102\n', 'B101\n', 'B102\n', 'B103\n', 'C103\n', 'D101\n', 'D103\n', 'D104\n', 'D105\n', 'E101\n', 'E102\n', 'E103\n', 'E104\n', 'E106\n', 'F103\n', 'F104\n', 'C201\n', 'C202\n', 'C203\n', 'A209\n', 'D201\n', 'D202\n', 'D203\n', 'D204\n', 'B208\n', 'B209\n', 'E201\n', 'E202\n', 'E203\n', 'E204\n', 'C205\n', 'F202\n', 'F203\n', 'D205\n', 'C303\n', 'D302\n', 'D303\n', 'D304\n', 'E301\n', 'E302\n', 'E304\n', 'F301\n', 'F302\n', 'F303\n', 'F304\n', 'F307\n', 'F401\n', 'F403\n', 'E505\n', 'E506\n', '外语楼南103\n', '外语楼南102\n', '外语楼南101\n', '外语楼南204\n', '外语楼南203\n', '外语楼南302\n', '外语楼南304\n', '外语楼南205\n', '外语楼南104\n', '外语楼南305\n', '外语楼南406\n', 'A401\n', 'A404\n', 'H401\n', 'H402\n', 'G513\n', 'G514\n', '外语楼南303\n', '外语楼南201\n', '西城校区化学楼四楼有机实验室\n', '西城校区化学楼四楼物化实验室\n', '外语楼南403'],
    'arr': ['76', '77', '78', '80', '84', '85', '89', '90', '91', '92', '93', '94', '95', '96', '98', '99', '100', '101', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '143', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '161', '162', '171', '172', '173', '195', '196', '198', '199', '243', '245', '246', '247', '257', '258', '264', '286', '294', '295', '301', '305', '309', '313', '317', '318', '320', '321', '324', '338', '339', '342', '344', '346', '347', '348', '349', '350', '352', '358', '364', '365', '366', '372', '374', '386', '387', '389', '406', '407', '411', '412', '416', '417', '419', '421', '424', '425', '426', '431', '434', '436', '437', '438', '439', '440', '441', '442', '443', '446', '447', '450', '451', '452', '455', '456', '457', '458', '459', '460', '461', '462', '463', '464', '465', '467', '469', '470', '473', '476', '479', '480', '481', '482', '483', '485', '486', '487', '488', '489', '490', '499', '501', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '522', '523', '526', '527', '531', '532', '535', '542', '558', '559', '565']
  },
  //事件处理函数
  onLoad: function() {
    console.log(getApp().globalData.zt)
    if (getApp().globalData.zt != 1){
    wx.showModal({
      title: '提示',
      confirmText: '确定',
      showCancel: false,
      content: '你无权限访问此页面',
      success: function (res) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })

    }else{
      console.log(getApp().globalData.username)
      if (getApp().globalData.username == 18024030112){
        this.setData({
          hiddenn: false,
        })
        // this.data.hiddenn = false
      }

      wx.showToast({
        title: '此功能测试阶段，可能涉及随时下架',
        icon: 'none',
      })
    }
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  prefixInteger:function(num, n) {
    return(Array(n).join(0) + num).slice(-n);
},
  add: function(e){
    var that = this
    console.log(that.data.username)
    if (e.detail.target.dataset.type == 1) {

      wx.cloud.callFunction({
        name: 'getcode',
        data: {
          i: 1,
          username: Number(e.detail.value.username)
        },
        success: res => {
          if (res.result == 1) {
            wx.showToast({
              title: '添加成功',
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '失败申请服务',
          })
        }
      })

    } else if (e.detail.target.dataset.type == 2) {

      wx.cloud.callFunction({
        name: 'getcode',
        data: {
          i: 2,
          username: Number(e.detail.value.username)
        },
        success: res => {
          if (res.result == 1) {
            wx.showToast({
              title: '删除成功',
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '失败申请服务',
          })
        }
      })

    }


  },

  cx: function(e) {

    var that = this;
    console.log(that.data.arr[that.data.index])
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getcode',
      data: {
        i:0,
        code: that.prefixInteger(that.data.arr[that.data.index],4)
      },
      success: res => {
        console.log(res.result)
        if (res.result == "教室获取失败"){
          wx.showToast({
            icon: 'none',
            title: '教室获取失败,确定是否有这个课',
          })
          return
        } else if (res.result == "关闭"){
          wx.showToast({
            icon: 'none',
            title: '关闭了',
          })
          return
          }else{
          var base64 = res.result;
        var aa = wx.getFileSystemManager();
        console.log('that.data.scene:', base64)
        this.setData({
          'imgData': base64
        })
        aa.writeFile({
          filePath: wx.env.USER_DATA_PATH + '/test.png',
          data: base64,
          encoding: 'base64',
          success: res => {
            wx.saveImageToPhotosAlbum({
              filePath: wx.env.USER_DATA_PATH + '/test.png',
              success: function (res) {
                wx.showToast({
                  title: '保存成功',
                })
              },
              fail: function (err) {
                wx.showToast({
                  icon: 'none',
                  title: '保存失败，请重新保存或者给予权限',
                })
                wx.showModal({
                  title: '提示',
                  content: '保存失败，请重新保存或者给予权限',
                  showCancel: false,
                })
              }
            })
            console.log(res)
          }, fail: err => {
            wx.showToast({
              icon: 'none',
              title: '保存失败，请重新保存或者给予权限',
            })
            wx.showModal({
              title: '提示',
              content: '保存失败，请重新保存或者给予权限',
              showCancel: false,
            })
          }
        })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: '失败申请服务',
        })
      }
    })
  }
})