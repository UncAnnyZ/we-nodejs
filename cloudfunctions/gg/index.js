// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    hctime: "400000",
    timeyear : "2021/8/30",
    key : "1.0",
    title : "预告",
    data: "新版预告（订阅系统升级，秒加载内容，兜底和降级，定制化推送能力，倒数日诞生。未来报名系统，失物招领，欢迎其他开发者加入）"
  }
}