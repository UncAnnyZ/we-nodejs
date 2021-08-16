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
  var zh = await db.collection('username').where({_openid: wxContext.OPENID}).get({})
  username = zh.data[0]._user
  password = zh.data[0]._pwd + ''

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
  let postResponse = await got.post('https://jwxt.gdupt.edu.cn/login!doLogin.action', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      account: username,
      pwd: output
    })
  })
  if (JSON.parse(postResponse.body).msg == "/login!welcome.action") {
    let k_data = await got.post('https://jwxt.gdupt.edu.cn/xskktzd!getDataList.action', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Cookie': cookie

      },
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        'xnxqdm': "202101",
        'page': '1',
        'rows': '20',
        'sort': 'kcbh',
        'order': 'asc',
        'kcmc':'',
        'kcfldm':'',
        'kcdldm':''
      })
    })

    var data = JSON.parse(k_data.body).rows
  }
  else{
    data = 0;
  }
  return data //返回数据
}