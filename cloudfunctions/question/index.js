// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
var querystring = require("querystring");
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let getResponse = await got('http://150s.cn') //get请求 用httpbin.org这个网址做测试 
  let cookie = getResponse.headers["set-cookie"]
  let postResponse = await got.post('http://150s.cn/topic/getSubject', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie
    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      title: event.question
    })
  })
  return JSON.parse(postResponse.body)
}