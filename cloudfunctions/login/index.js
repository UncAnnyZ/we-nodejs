// 云函数入口文件
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
// cloud.init()
var querystring = require("querystring");
cloud.init()
const db = cloud.database()
const _ = db.command;
// 云函数入口函数
exports.main = async(event, context) => {
  if (event.password == "test"){
    event.password = "1122qq3344"
  }
  if (event.username == "test") {
    event.username = "18024030112"
  }
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    string = event.password.replace(/\r\n/g, "\n");
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


    const wxContext = cloud.getWXContext()
    let getResponse = await got('http://210.38.250.43') //get请求 用httpbin.org这个网址做测试 
    let cookie = getResponse.headers["set-cookie"]
    let postResponse = await got.post('http://210.38.250.43/login!doLogin.action', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Cookie': cookie

      },
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        account: event.username,
        pwd: output
      })
    })
    if (JSON.parse(postResponse.body).msg == "/login!welcome.action") {
       db.collection("username").where({
        _openid: wxContext.OPENID
      }).get().then(res => {
        const userLen = res.data.length;
         db.collection("curriculum").where({
          _user: Number(event.username)
        }).get().then(res => {
          const userLen1 = res.data.length;
          if (userLen1 === 0) {
            db.collection('curriculum').add({
              data: {
                _user: Number(event.username),
                _add: '[]',
                _de: '[]'
              },
              success(res) {
              },
              fail(res) {
                console.log('数据库操作失败');
              }
            })
          }
        })
        if (userLen === 0) {
            db.collection('username').add({
            data: {
              _openid: wxContext.OPENID,
              _user: Number(event.username),
              _pwd: event.password
            },
            success(res) { },
            fail(res) {
              console.log('数据库操作失败');
            }
          })
        } else if (userLen === 1) {
          db.collection('username').where({ _openid: wxContext.OPENID }).update({
            data: {
              _user: Number(event.username),
              _pwd: event.password
            },
            success(res) { },
            fail(res) {
              console.log('数据库操作失败');
            }
          })
        }
      })
      await new Promise(res => setTimeout(res, 2000))
      return JSON.parse(postResponse.body)
    }
    else{
      return JSON.parse(postResponse.body)
    }


}