// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime: "12000",
    timeyear : "2021/3/1",
    key : "2.7",
    title : "最新通知",
    data: "we广油即将更新许多内容，可能使用过程中会有问题，敬请谅解"
  }
}