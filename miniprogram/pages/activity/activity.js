Page({
  data: {
    curriculum: [],
    iconList: [{
      id: "1",
      icon: "qp",
      name: "棋牌协会"
    },
      {
        id: "2",
        icon: "yy",
        name: "英语爱好者"
      },
      {
        id: "3",
        icon: "ms",
        name: "美食协会"
      },
      {
        id: "4",
        icon: "sx",
        name: "沙盘协会"
      },
      {
        id: "5",
        icon: "jjt",
        name: "记者团"
      },
      {
        id: "6",
        icon: "sf",
        name: "书画协会"
      },
      {
        id: "7",
        icon: "xqn",
        name: "新青年哲学"
      },
      {
        id: "8",
        icon: "fyd",
        name: "风杨灯谜社"
      },
      {
        id: "9",
        icon: "jsj",
        name: "计算机青协"
      },
      {
        id: "10",
        icon: "gfa",
        name: "地理考察者"
      },
      {
        id: "11",
        icon: "msxh",
        name: "异度魔术"
      },
      {
        id: "12",
        icon: "dn",
        name: "电脑协会"
      },
      {
        id: "13",
        icon: "jm",
        name: "健与美协会"
      },
    ],
    picker:['校级机构', '院级机构', '学生社团'],
    index:0,
    list:[
      // 校级机构
      [
        {
          url:"",
          name:"",
          intro:""
        } 
      ],
      // 院级机构
      [
        {
          url:"",
          name:"",
          intro:"",
          xy:"",
        }
      ],
      // 学生社团
      [
        {
          url:"",
          name:"",
          intro:""
        }
      ]
    ]
  },
  activityjr: function(e) {
    console.log(e)
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateToMiniProgram({
        appId: 'wx909f7431e2ccba81',
        path: 'pages/index/index',
        extraData: {
          xuehao: getApp().globalData.xuehao
        },
        envVersion: 'release',
        success(res) {
          console.log('跳转成功');
        }
      })
    }
    else if(e.currentTarget.dataset.index == 1){
      getApp().globalData.xiehui = '英语爱好者协会';
      getApp().globalData.xiehui1 = 'yyahzxh';
      getApp().globalData.ziliao = '部门';
      getApp().globalData.ziliao1 = ['学术部', '演讲队', '英语角', '公关部', '网宣部', '秘书处', '组织部'];
      wx.navigateTo({
        url: 'sign/sign'
      })
    }
    else if (e.currentTarget.dataset.index == 2){
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/ms.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/ms.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 3) {
      getApp().globalData.xiehui = 'ERP沙盘协会';
      getApp().globalData.xiehui1 = 'spxh';
      getApp().globalData.ziliao = '部门';
      getApp().globalData.ziliao1 = ['人事部', '组织部', '宣传部', '秘书部', '公关部'];
      wx.navigateTo({
        url: 'sign/sign'
      })
    }
    else if (e.currentTarget.dataset.index == 4) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/jjt.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/jjt.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 5) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/sf.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/sf.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 6) {
      wx.previewImage({
        current:'cloud://un1-d62c68.756e-un1-d62c68-1258307938/xqn.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/xqn.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 7) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/fyd.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/fyd.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 8) {
      getApp().globalData.xiehui = '计算机学院青年志愿者协会';
      getApp().globalData.xiehui1 = 'jsj';
      getApp().globalData.ziliao = '部门';
      getApp().globalData.ziliao1 = ['秘书处', '技术宣传部', '策划部'];
      wx.navigateTo({
        url: 'sign/sign'
      })
    }
    else if (e.currentTarget.dataset.index == 9) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/gfa.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/gfa.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 10) {
      getApp().globalData.xiehui = '异度魔术协会';
      getApp().globalData.xiehui1 = 'msxh';
      getApp().globalData.ziliao = '部门';
      getApp().globalData.ziliao1 = ['技术部', '教学部', '组织部', '宣传部', '秘书部', '公关部'];
      wx.navigateTo({
        url: 'sign/sign'
      })
    }
    else if (e.currentTarget.dataset.index == 11) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/dn.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/dn.png'] // 需要预览的图片http链接列表
      })
    }
    else if (e.currentTarget.dataset.index == 12) {
      wx.previewImage({
        current: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/jm.png', // 当前显示图片的http链接
        urls: ['cloud://un1-d62c68.756e-un1-d62c68-1258307938/jm.png'] // 需要预览的图片http链接列表
      })
    }

  },
  onLoad: function() {
  },

  bindPickerChange(e){
    this.setData({
      index: e.detail.value
    })
  }
})