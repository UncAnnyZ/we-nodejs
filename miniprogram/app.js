//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      curriculum: [],
      achievement: [],
      quality: [],
      curriculum1:[], //保存一份原始课表
      _add:[],
      _adday:[],
      _de:[],
      username:0,
      timeyear:"",
      task:[],
      dates:'2021-8-01',
      timeyear:"2021/3/1",
      dayName: '',
      gapDays:0,
      DaysMatter2:[]
    }
  },
  // 登录判断
  loginState: function(){
    if(getApp().globalData.username === 0){
      wx.showModal({
        title: '登录提示',
        showCancel: true, //是否显示取消按钮
        content: "是否要登录",
        cancelText: "否", //默认是“取消”
        // cancelColor: 'skyblue', //取消文字的颜色
        confirmText: "是", //默认是“确定”
        // confirmColor: 'red', //确定文字的颜色
        success: function (res) {
          if (!res.cancel) {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          } else {
            wx.navigateBack({
            })
          }
        },
        fail: function (res) {}, //接口调用失败的回调函数
        complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
  },
    // 处理课表增删
    changeCurriculum: function (addCurriculum, deCurriculum, allCurriculum) {
      allCurriculum = JSON.parse(JSON.stringify(allCurriculum));
      for (var i = 0; i < deCurriculum.length; i++) {
        for (var g = 0; g < allCurriculum.length; g++) {
          if (deCurriculum[i].zc == "全部") {
            if (allCurriculum[g].kcmc == deCurriculum[i].kcmc) {
              allCurriculum.splice(g, 1);
              g--;
            }
          } else {
            if (allCurriculum[g].kcmc == deCurriculum[i].kcmc && allCurriculum[g].jcdm == deCurriculum[i].jcdm && allCurriculum[g].zc == deCurriculum[i].zc && allCurriculum[g].xq == deCurriculum[i].xq) {
              allCurriculum.splice(g, 1);
              g--;
            }
          }
        }
      }
      for (var i = 0; i < addCurriculum.length; i++) {
        allCurriculum.push(addCurriculum[i]);
      }
      return allCurriculum;
    },
})
