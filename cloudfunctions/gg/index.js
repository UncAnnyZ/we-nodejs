// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime:"10000",
    timeyear : "2020/8/31",
    key : "1.4",
    title : "最新通知",
    data : "1、其他学校解封了。。。 \n 2、可能将在国庆举办一次王者荣耀比赛"
  }
}