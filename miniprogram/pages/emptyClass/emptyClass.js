// pages/grade/show/show.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievement: [],
    array: [],
    color: [],
    block_show: true,
    skrw: '',
    date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    index: 0,
    campusArrayIndex: 0,
    campusArray: ['官渡校区', '西城校区', '光华校区'],
    classIndex: 0,
    classArray: [{
      "dm": "1",
      "mc": "主教"
    }, {
      "dm": "2",
      "mc": "二教A"
    }, {
      "dm": "6",
      "mc": "二教B"
    }, {
      "dm": "7",
      "mc": "其它"
    }, {
      "dm": "8",
      "mc": "实验"
    }, {
      "dm": "9",
      "mc": "体育场地(官渡)"
    }],
    cookies: '',
  },
  bindDateChange: function (e) { //获取倒数日日期
    this.setData({
      date: e.detail.value
    })
  },
  bindxqChange: function (e) { //获取倒数日日期
    this.setData({
      classIndex: e.detail.value
    })
  },
  bindCampushange: function (e) {
    console.log(e.detail.value)
    if (e.detail.value === '1') {
      this.data.classArray = [{
        "dm": "103428603",
        "mc": "体育场地(西城)"
      }, {
        "dm": "103589811",
        "mc": "西城教学综合体"
      }, {
        "dm": "103596671",
        "mc": "外语楼"
      }, {
        "dm": "103956660",
        "mc": "东创楼"
      }, {
        "dm": "103978463",
        "mc": "石油大楼"
      }, {
        "dm": "104659964",
        "mc": "化学楼"
      }, {
        "dm": "104835722",
        "mc": "双创楼"
      }, {
        "dm": "105252604",
        "mc": "生食学院楼"
      }]
    } else if (e.detail.value === '2') {
      this.data.classArray = [{
        "dm": "101958392",
        "mc": "体育场地(光华)"
      }, {
        "dm": "3",
        "mc": "光华2号楼"
      }, {
        "dm": "4",
        "mc": "光华3号楼"
      }, {
        "dm": "5",
        "mc": "光华1号楼"
      }]
    } else {
      this.data.classArray = [{
        "dm": "1",
        "mc": "主教"
      }, {
        "dm": "2",
        "mc": "二教A"
      }, {
        "dm": "6",
        "mc": "二教B"
      }, {
        "dm": "7",
        "mc": "其它"
      }, {
        "dm": "8",
        "mc": "实验"
      }, {
        "dm": "9",
        "mc": "体育场地(官渡)"
      }]
    }
    this.setData({
      campusArrayIndex: e.detail.value,
      classArray: this.data.classArray
    })
  },

  changeWB(e) {
    var id = e.currentTarget.id
    this.data.week[id] = !this.data.week[id]
    let addSubmitStyle = false
    for(let i in this.data.week){
      if(this.data.week[i] === true){
        addSubmitStyle = true;
      }
    }
    this.setData({
      week: this.data.week,
      addSubmitStyle
    })

  },

  onLoad: function () {
    getApp().loginState();
    this.data.week = new Array(10)
    for (let i = 0; i < this.data.week.length; i++) {
      this.data.week[i] = false;
    }
    this.setData({
      week: this.data.week
    })
  },

  addSubmit: function (e) {
    let jc = []
    for (let i in this.data.week) {
      if (this.data.week[i]) {
        jc.push(Number(i) + 1 < 10 ? '0' + (Number(i) + 1) : Number(i) + 1)
      }
    }
    console.log(jc.toString())
    var that = this
    wx.showLoading({
      title: '查询中',
      mask: true
    })
    wx.request({
      url: 'https://jwxt.gdupt.edu.cn/',
      method: 'post',
      success: function (res) {
        wx.request({
          url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
          method: 'post',
          data: {
            account: getApp().globalData.username,
            pwd: getApp().globalData.pwd,
            verifycode: ''
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Cookie': res.cookies[0]
          },
          success: function (res1) {
            if (res1.data.msg == "/login!welcome.action") {
              that.data.cookies = res.cookies[0];
              const header = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Cookie': res.cookies[0]
              }
              wx.request({
                url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getZCXQByRq.action?date=' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (Number(new Date().getDate()) < 10 ? '0' + new Date().getDate() : new Date().getDate()),
                method: 'get',
                header,
                success: function (data1) {
                  console.log(data1)
                  let data2 = {
                    ...data1.data,
                    order: 'asc',
                    sort: 'jxcdbh',
                    rows: '50',
                    jc : String(jc),
                    isqy: '1',
                    page: '1',
                    xnxqdm: new Date().getMonth() < 7 ? (new Date().getFullYear() - 1) + '02' : (new Date().getFullYear()) + '01',
                    xq: data1.data.xqxh,
                    ssjzwdm: that.data.classArray[that.data.classIndex].dm
                  }
                  let url = Object.keys(data2).map(function (key) {
                    // body...
                    return encodeURIComponent(key) + "=" + encodeURIComponent(data2[key]);
                  }).join("&")
                  wx.request({
                    url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc',
                    method: 'get',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Accept': 'application/json, text/javascript, */*; q=0.01',
                      'Cookie': that.data.cookies
                    },
                    data : data2,
                    success: function (data3) {
                      console.log(data3)
                      if(data3.data.total === 0){
                        wx.showToast({
                          icon: 'none',
                          title: '这个时间段没有空教室',
                        })
                      }else{
                        wx.showToast({
                          icon: 'onoe',
                          title: '查询成功',
                        })
                        that.xiu(data3.data.rows)
                      }
                    }
                  })
                }
              })
            } else {
              wx.showToast({
                icon: 'onoe',
                title: '登录失败，请重新登录',
              })
            }

          }

        })

      },
      fail(res) {

        wx.showToast({
          title: '早上7-晚上11才能使用',
          icon: 'none',
        });
      }

    })
  },
  xiu: function (kc) {
    let data = [],
      color = [],
      n = 0;
    let c = ["#11c1f3","#886aea","#33cd5f","#ffc900"]
    for (let i = 0; i < kc.length; i++) {
        color.push(c[Math.floor(Math.random() * 4) + 0]);
        data.push(kc[i]);
    }
    console.log(data)
    this.setData({
      list: data,
      block_show: false,
      color: color,
      Totalnumber: kc.length
    })
  },
  show: function (){
    console.log(233)
    this.setData({
      block_show: true,
    })
  }
})