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
<<<<<<< HEAD
  const wxContext = cloud.getWXContext()
  let getResponse = await got('http://wa.gdupt.edu.cn:8080/signInQRCode/createQRCodeDoubleClick?classCode=' + event.code, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6",
      "cache-control": "max-age=0",
      "upgrade-insecure-requests": "1",
      "x-forwarded-for": "113.107.163.218"
    }
  }
  ) 
  if (JSON.parse(getResponse.body).data == null || JSON.parse(getResponse.body).data.startTime != ""){
    return "教室获取失败"
  }
  console.log(JSON.parse(getResponse.body))
  var taskid = JSON.parse(getResponse.body).data.taskId
  // var taskid = "132200164628"
  let getResponse1 = await got('http://wa.gdupt.edu.cn:8080/signInQRCode/' + taskid + '/getQRCodeImg', {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6",
      "cache-control": "max-age=0",
      "upgrade-insecure-requests": "1",
      "x-forwarded-for": "113.107.163.218"
    }
  }) 
  return JSON.parse(getResponse1.body).data.data.qrCodeImg
=======
  if (event.i == 2) {
    await db.collection('curriculum').where({ _user: event.username }).update({
      data: {
        _zt: 2
      }
    })
    return 1
  } 
  const wxContext = cloud.getWXContext()
  // var taskid = "132200164628"
  if (Number(event.code) > 400){
    event.code = Number(event.code)
  }
  let getResponse1 = await got('http://101.32.75.155:5000/one/' + event.code, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    }
  }) 
  if (JSON.parse(getResponse1.body).msg != "success" || JSON.parse(getResponse1.body).code == "") {
    return "教室获取失败"
  }
  return JSON.parse(getResponse1.body).code
>>>>>>> 535f34519613a7ee1a55617646111fe9d5962ba6
  
}