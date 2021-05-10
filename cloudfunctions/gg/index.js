// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
<<<<<<< Updated upstream
    hctime:"12000",
    timeyear : "2021/3/1",
    key : "2.6",
    title : "其他通知",
    data: "广油篮协正在参与全国百强社团评选就差你的一票\n关注“中国青年报”\n发送编号“573026”\n出道 马上 立刻 right now"
=======
    hctime: "12000",
    timeyear : "2021/3/1",
    key : "2.6",
    title : "最新通知",
    data: "欢迎使用we广油"
>>>>>>> Stashed changes
  }
}