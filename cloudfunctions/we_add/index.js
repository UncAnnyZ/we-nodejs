// 云函数入口文件
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
// cloud.init()
cloud.init()
var querystring = require("querystring");
// 云函数入口函数
const db = cloud.database()
const _ = db.command;
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('curriculum').where({ _user: event.username }).update({
    data: {
      _add: event._add
    }
  })
}