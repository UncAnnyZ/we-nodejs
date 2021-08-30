//patch同步，过时间此云函数作废
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
// cloud.init()
cloud.init()
var querystring = require("querystring");
// 云函数入口函数
const db = cloud.database()
const _ = db.command;
const curriculumTime = '202101' // 每学期的id，来清空修改课表的课记录
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()
  var zh = await db.collection('username').where({_openid: wxContext.OPENID}).get({})
  try{
    username = zh.data[0]._user
    password = zh.data[0]._pwd + ''
  }catch{
    return 0
  }

  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  string = password.replace(/\r\n/g, "\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }
  var input = utftext;
  while (i < input.length) {

    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

  }

  let getResponse = await got('https://jwxt.gdupt.edu.cn') //get请求 用httpbin.org这个网址做测试 
  let cookie = getResponse.headers["set-cookie"]
  await db.collection('curriculum').where({ _user: event.username }).update({
    data: {
      _add: event._add
    }
  })
}