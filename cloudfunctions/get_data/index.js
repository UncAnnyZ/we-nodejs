// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//1.社团
//2.机构
//3.社团类别1
//4.机构类别1

exports.main = async (event, context) => {

  var result_st =await cloud.database().collection("club_st").get()
  var result_jg =await cloud.database().collection("club_jg").get()
  return {
    result_st,
    result_jg
  }

}