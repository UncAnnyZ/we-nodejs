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
  if(event.type === 'add'){
    await db.collection('curriculum').where({ _user: event.username }).update({
      data: {
        _add: event._add
      }
    })
  }else if(event.type === 'de'){
    await db.collection('curriculum').where({ _user: event.username }).update({
      data: {
        _de: event._de
      }
    })
  }
  let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Cookie': cookie
  };
  let postResponse = await got.post('https://jwxt.gdupt.edu.cn/login!doLogin.action', {
    headers,
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      account: username,
      pwd: output
    })
  })

  if (JSON.parse(postResponse.body).msg == "/login!welcome.action") {
    let a_data = await got.post('https://jwxt.gdupt.edu.cn/xskccjxx!getDataList.action', {
      headers,
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        'xnxqdm': '',
        'page': '1',
        'rows': '500',
        'sort': 'xnxqdm,kcbh,ksxzdm',
        'order': 'asc',
      })
    })
  
    let t_data = await got.post('https://jwxt.gdupt.edu.cn/xsktsbxx!getYxktDataList.action', {
      headers,
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        'xnxqdm': '',
        'page': '1',
        'rows': '100',
        'sort': 'cjsj',
        'order': 'desc',
      })
    })
    let c_data = await got.post('https://jwxt.gdupt.edu.cn/xsgrkbcx!getDataList.action', {
      headers,
      body: querystring.stringify({ //把json数据（对象）解析成字符串
        'xnxqdm': "202101",
        'page': '1',
        'rows': '1000',
        'sort': 'kxh',
        'order': 'asc',
      })
    })


    
    var curriculum = await db.collection('curriculum').where({ _user: username }).get({})
    var data = {
      a_data: JSON.parse(a_data.body).rows,
      t_data: JSON.parse(t_data.body).rows,
      c_data: JSON.parse(c_data.body).rows,
      _add: curriculum.data[0]._add,
      _de: curriculum.data[0]._de,
      zt: curriculum.data[0]._zt,
      username: username
    }
  }
  else{
    data = 0;
  }
  

  // for (xh = 0; xh < tz.length; xh++) {
  //   if (tz[xh].cjsj > "2021-04-20 14:38:09") {
  //     // console.log(tz[xh].cjsj)
  //     // console.log(tz[xh].msg)
      
  //     let kb1 = JSON.parse(tz[xh].msg);
  //     kb1["xnxqmc"] = "拉通知";
  //     kb1["cjjd"] = kb1.jd
  //     kb1["xf"] = "1"
  //     kb1["ksxzmc"] =  "通知类"
  //     if(kb1["cjjd"] == undefined){
  //       kb1["cjjd"] = "0"
  //       kb1["zcj"] = "0"
  //     }
  //     // kb1["kcmc"] = kb1.kcmc
  //     data.a_data.push(kb1)
  //   }

  // }

  //处理课表为0的问题，导致账户进不去
  if(data.c_data.length == 0){
    data.c_data = [{
      "kcmc" : "test",
      "jcdm" : ""
    }]
  }
  
  return data //返回数据
}