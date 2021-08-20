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
      _de:[],
      username:0,
      timeyear:""
    }
  },
    // 处理课表增删
    changeCurriculum: function (addCurriculum, deCurriculum, allCurriculum) {
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
