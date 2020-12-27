// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime:"8000",
    timeyear : "2020/8/31",
    key : "2.0",
    title : "最新通知",
    data : "1、更多的上课任务更新到下一个学期啦"
  }
}