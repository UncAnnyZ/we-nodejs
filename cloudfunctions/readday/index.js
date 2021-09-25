// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  if(event.type == "read"){
    var data = await db.collection('daysmatter').where({ _user: event.username }).get({ })
    if(data.data[0] === undefined){
      db.collection('daysmatter').add({
        data: {
          _user: Number(event.username),
          _adday: '[]',
        },
        success(res) {
        },
        fail(res) {
          console.log('数据库操作失败');
        }
      })
      return "[]"
    }
    return data.data[0]._adday
  }
  if(event.type == "write"){
    await db.collection('daysmatter').where({ _user: event.username }).update({
      data: {
        _adday: event._adday
      }
    })
  }
  
}