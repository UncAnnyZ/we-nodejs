// 云函数入口文件
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
// cloud.init()
var querystring = require("querystring");
// 云函数入口函数
exports.main = async (event, context) => {


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
      account: "18024030112",
      pwd: 'MTEyMmFhMzM='
    })
  })
  let a_data = await got.post('http://210.38.250.43/xskccjxx!getDataList.action', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      'xnxqdm': '',
      'page': '1',
      'rows': '500',
      'sort': 'xnxqdm,kcbh,ksxzdm',
      'order': 'asc',
    })
  })
  let t_data = await got.post('http://210.38.250.43/xsktsbxx!getYxktDataList.action', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      'xnxqdm': '',
      'page': '1',
      'rows': '100',
      'sort': 'cjsj',
      'order': 'desc',
    })
  })
  let c_data = await got.post('http://210.38.250.43/xsgrkbcx!getDataList.action', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge / 18.18362',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Cookie': cookie

    },
    body: querystring.stringify({ //把json数据（对象）解析成字符串
      'xnxqdm': "201902",
      'page': '1',
      'rows': '1000',
      'sort': 'kxh',
      'order': 'asc',
    })
  })

  var data = {
    a_data : JSON.parse(a_data.body).rows,
    t_data : JSON.parse(t_data.body).rows,
    c_data: JSON.parse(c_data.body).rows,
  }
  return data //返回数据
}