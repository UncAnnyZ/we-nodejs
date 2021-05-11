// 云函数入口文件
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
cloud.init()
const db = cloud.database()
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.i == 1){
    await db.collection('curriculum').where({ _user: event.username }).update({
      data: {
        _zt : 1
      }
    })
    return 1
  } 
  const wxContext = cloud.getWXContext()
  // var taskid = "132200164628"
  let getResponse1 = await got('http://101.32.75.155:5000/one/' + event.code, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    }
  }) 
  if (JSON.parse(getResponse1.body).msg != "success" || JSON.parse(getResponse1.body).code == "") {
    return "教室获取失败"
  }
  return JSON.parse(getResponse1.body).code
  
}