const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


exports.main = async (event, context) => {
  const { value } = event;
  try {
  const db = cloud.database()
  const _ = db.command;
  var zh = await db.collection('gzh').where({type: event.urlName}).get({})
  return zh.data[0].html
  } catch (err) {
    return `获取错误`
  }
}