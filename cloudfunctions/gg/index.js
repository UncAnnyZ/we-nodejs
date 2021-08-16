// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime: "4000",
    timeyear : "2021/8/30",
    key : "3.5",
    title : "更新",
    data: "1.修改上课时间 \n 2.修复部分添加课表的bug"
  }
}