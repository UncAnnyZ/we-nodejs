// 云函数入口文件
const cloud = require('wx-server-sdk')
var got = require('got'); //引用 got
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {


  function a() {
    var e = new Date,
      t = "" + (e.getMonth() + 1),
      n = "" + e.getDate(),
      a = e.getFullYear();
    return t.length < 2 && (t = "0" + t),
      n.length < 2 && (n = "0" + n),
      [a, t, n].join("-")
  }

  var p = 0,
    h = 8

  function aa(e) {
    return f(r(m(e), e.length * h))
  }

  function r(e, t) {
    e[t >> 5] |= 128 << t % 32,
      e[14 + (t + 64 >>> 9 << 4)] = t;
    for (var n = 1732584193, a = -271733879, r = -1732584194, o = 271733878, d = 0; d < e.length; d += 16) {
      var m = n,
        f = a,
        p = r,
        h = o;
      n = i(n, a, r, o, e[d + 0], 7, -680876936),
        o = i(o, n, a, r, e[d + 1], 12, -389564586),
        r = i(r, o, n, a, e[d + 2], 17, 606105819),
        a = i(a, r, o, n, e[d + 3], 22, -1044525330),
        n = i(n, a, r, o, e[d + 4], 7, -176418897),
        o = i(o, n, a, r, e[d + 5], 12, 1200080426),
        r = i(r, o, n, a, e[d + 6], 17, -1473231341),
        a = i(a, r, o, n, e[d + 7], 22, -45705983),
        n = i(n, a, r, o, e[d + 8], 7, 1770035416),
        o = i(o, n, a, r, e[d + 9], 12, -1958414417),
        r = i(r, o, n, a, e[d + 10], 17, -42063),
        a = i(a, r, o, n, e[d + 11], 22, -1990404162),
        n = i(n, a, r, o, e[d + 12], 7, 1804603682),
        o = i(o, n, a, r, e[d + 13], 12, -40341101),
        r = i(r, o, n, a, e[d + 14], 17, -1502002290),
        a = i(a, r, o, n, e[d + 15], 22, 1236535329),
        n = s(n, a, r, o, e[d + 1], 5, -165796510),
        o = s(o, n, a, r, e[d + 6], 9, -1069501632),
        r = s(r, o, n, a, e[d + 11], 14, 643717713),
        a = s(a, r, o, n, e[d + 0], 20, -373897302),
        n = s(n, a, r, o, e[d + 5], 5, -701558691),
        o = s(o, n, a, r, e[d + 10], 9, 38016083),
        r = s(r, o, n, a, e[d + 15], 14, -660478335),
        a = s(a, r, o, n, e[d + 4], 20, -405537848),
        n = s(n, a, r, o, e[d + 9], 5, 568446438),
        o = s(o, n, a, r, e[d + 14], 9, -1019803690),
        r = s(r, o, n, a, e[d + 3], 14, -187363961),
        a = s(a, r, o, n, e[d + 8], 20, 1163531501),
        n = s(n, a, r, o, e[d + 13], 5, -1444681467),
        o = s(o, n, a, r, e[d + 2], 9, -51403784),
        r = s(r, o, n, a, e[d + 7], 14, 1735328473),
        a = s(a, r, o, n, e[d + 12], 20, -1926607734),
        n = c(n, a, r, o, e[d + 5], 4, -378558),
        o = c(o, n, a, r, e[d + 8], 11, -2022574463),
        r = c(r, o, n, a, e[d + 11], 16, 1839030562),
        a = c(a, r, o, n, e[d + 14], 23, -35309556),
        n = c(n, a, r, o, e[d + 1], 4, -1530992060),
        o = c(o, n, a, r, e[d + 4], 11, 1272893353),
        r = c(r, o, n, a, e[d + 7], 16, -155497632),
        a = c(a, r, o, n, e[d + 10], 23, -1094730640),
        n = c(n, a, r, o, e[d + 13], 4, 681279174),
        o = c(o, n, a, r, e[d + 0], 11, -358537222),
        r = c(r, o, n, a, e[d + 3], 16, -722521979),
        a = c(a, r, o, n, e[d + 6], 23, 76029189),
        n = c(n, a, r, o, e[d + 9], 4, -640364487),
        o = c(o, n, a, r, e[d + 12], 11, -421815835),
        r = c(r, o, n, a, e[d + 15], 16, 530742520),
        a = c(a, r, o, n, e[d + 2], 23, -995338651),
        n = l(n, a, r, o, e[d + 0], 6, -198630844),
        o = l(o, n, a, r, e[d + 7], 10, 1126891415),
        r = l(r, o, n, a, e[d + 14], 15, -1416354905),
        a = l(a, r, o, n, e[d + 5], 21, -57434055),
        n = l(n, a, r, o, e[d + 12], 6, 1700485571),
        o = l(o, n, a, r, e[d + 3], 10, -1894986606),
        r = l(r, o, n, a, e[d + 10], 15, -1051523),
        a = l(a, r, o, n, e[d + 1], 21, -2054922799),
        n = l(n, a, r, o, e[d + 8], 6, 1873313359),
        o = l(o, n, a, r, e[d + 15], 10, -30611744),
        r = l(r, o, n, a, e[d + 6], 15, -1560198380),
        a = l(a, r, o, n, e[d + 13], 21, 1309151649),
        n = l(n, a, r, o, e[d + 4], 6, -145523070),
        o = l(o, n, a, r, e[d + 11], 10, -1120210379),
        r = l(r, o, n, a, e[d + 2], 15, 718787259),
        a = l(a, r, o, n, e[d + 9], 21, -343485551),
        n = u(n, m),
        a = u(a, f),
        r = u(r, p),
        o = u(o, h)
    }
    return Array(n, a, r, o)
  }

  function o(e, t, n, a, r, o) {
    return u(d(u(u(t, e), u(a, o)), r), n)
  }

  function i(e, t, n, a, r, i, s) {
    return o(t & n | ~t & a, e, t, r, i, s)
  }

  function s(e, t, n, a, r, i, s) {
    return o(t & a | n & ~a, e, t, r, i, s)
  }

  function c(e, t, n, a, r, i, s) {
    return o(t ^ n ^ a, e, t, r, i, s)
  }

  function l(e, t, n, a, r, i, s) {
    return o(n ^ (t | ~a), e, t, r, i, s)
  }

  function u(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
  }

  function d(e, t) {
    return e << t | e >>> 32 - t
  }

  function m(e) {
    for (var t = Array(), n = (1 << h) - 1, a = 0; a < e.length * h; a += h)
      t[a >> 5] |= (e.charCodeAt(a / h) & n) << a % 32;
    return t
  }

  function f(e) {
    for (var t = p ? "0123456789ABCDEF" : "0123456789abcdef", n = "", a = 0; a < 4 * e.length; a++)
      n += t.charAt(e[a >> 2] >> a % 4 * 8 + 4 & 15) + t.charAt(e[a >> 2] >> a % 4 * 8 & 15);
    return n
  }

  var token = aa("qweasd" + a());

  // var taskid = "132200164628"
  if (Number(event.code) > 400) {
    event.code = Number(event.code)
  }
  let getResponse1 = await got('http://101.32.75.155:8081/getCode?code=' + event.code +'&token=' + token, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    }
  })

  console.log(JSON.parse(getResponse1.body))
  if (!JSON.parse(getResponse1.body).data.taskId) {
    return {"msg" : "教室获取失败"}
  }

  return {"msg" : token ,"taskId" : JSON.parse(getResponse1.body).data.taskId}


}