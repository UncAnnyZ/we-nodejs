// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime:"8000",
    timeyear : "2021/3/1",
    key : "2.2",
    title : "最新通知",
    data: "1、课表更新下学期啦(请左右滑动来看课，可能课没有安排完)！！！\n 2、时间bug下午修复"
  }
}