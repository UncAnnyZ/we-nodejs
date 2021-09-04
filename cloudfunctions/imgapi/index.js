const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


exports.main = async (event, context) => {
  const { value } = event;
  try {
    const checkmsg = await cloud.openapi.security.imgSecCheck({
      media: {
        header: {'Content-Type': 'application/octet-stream'},
        contentType: 'image/png',
        value: Buffer.from(value)
      }
    })
    return 1
  } catch (err) {
    return '1.发布内容含有违法违规内容：87014';
  }
}