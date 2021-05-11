// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime: "86400",
    timeyear : "2021/3/1",
    key : "2.6",
    title : "最新通知",
    data: "欢迎来到we广油"
  }
}