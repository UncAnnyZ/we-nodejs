// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//1.社团
//2.机构
//3.社团类别1
//4.机构类别1

exports.main = async (event, context) => {

    // case 3:
    //   break;
    // case 4:
    //   break;

  if (event.shape===1){
    return cloud.database().collection("club_st").get({
      success(res){
        return res
      }
    })
  }
  if (event.shape===2){
    return cloud.database().collection("club_jg").get({
      success(res){
        return res
      }
    })
  }

}