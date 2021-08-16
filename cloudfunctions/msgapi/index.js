const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


exports.main = async (event, context) => {
  try {
    const checkmsg = await cloud.openapi.security.msgSecCheck({
      content: event.text
    });
    return 1
  } catch (err) {
    return '1.发布内容含有违法违规内容：87014' + event.text;
  }
}