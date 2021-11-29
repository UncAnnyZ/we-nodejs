// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // const db = cloud.database()
  // const _ = db.command;
  // 紧急Patch 9.4号删除
  // var zh = await db.collection('username').where({_openid: wxContext.OPENID}).get({})
  // try{
  //   username = zh.data[0]._user
  //   var curriculum = await db.collection('curriculum').where({ _user: username }).get({})
  //   if(curriculum.data[0].curriculumTime != '202101'){
  //     await db.collection('curriculum').where({ _user: username }).update({
  //       data: {
  //         _add: "[]",
  //         _de: "[]",
  //         curriculumTime: '202101'
  //       }
  //     })
  //   }
  // }catch{

  // }

  // 免广告列表
  var noAd = [
    "oisor5MkCO8itCeQT57U5hE3T7U4", // xld
    "oisor5N21e4VQQDeTnXcu1oXCAV8"  // xld
  ]  

  // 打卡列表
  var punch = [
    "oisor5BFMK23z59g2Z95_ifBA1TU", // zw
    "oisor5MkCO8itCeQT57U5hE3T7U4", // xld
    "oisor5N21e4VQQDeTnXcu1oXCAV8", // xld
    "oisor5AjzXw2SIIVPztc2TueRkOk", // zyr
    "oisor5NZ2ed3g6JWzj2yVW9aaJPg", // yby
    "oisor5F9x3faZoz-tP6ojXDd0Mtk", // hcl
    "oisor5NzX7ZkO84KxB12CxgWqcys", // cwd
    //张伟实验室的人，感谢服务器存储
    "oisor5AxfPJZBqWBIFQumBjG2Lfs", // lyx
    "oisor5PYmkBynx9cCjkm-CuiA3yA", // zhj
    "oisor5H-FdtHtftkwloEwgESctoc", // cyq
    "oisor5CveKL1s6X5rF-J8eolSsi0", // zzr
    //杂种
    "oisor5LsA4kVdQdrbvtRH3w5Bnm0"  // zjy

  ]

  data = {
    version: "0.0.1",
    msgTitle : "通知",
    timeYear : "2021/8/30",
    time: "43200", // 秒
    reset: false,
    msgData: "第一次We系列正式招新，各路师弟师妹可以来用呀，未来We广油，We校园，新的商业模式",
    more: [{
      url: '/pages/recommend/recommend?appId=wx669135f6ab750be9',
      name: '广油学生公寓中心',
      imgUrl: 'cloud://un1-d62c68.756e-un1-d62c68-1258307938/水电费.png'
    }],
    index: {
      news: true, // 通知内容显示
      ad: noAd.includes(wxContext.OPENID) ? false : true,
      adImg : '',
      iconList: [{
        id: "1",
        url: "achievement/achievement",
        icon: "../../images/icon/grade.png",
        name: "成绩"
      }, {
        id: "2",
        url: "activity/activity",
        icon: "../../images/icon/news.png",
        name: "社团招新"
      }, {
        id: "3",
        url: "schoolNav/schoolNav",
        icon: "../../images/icon/map.png",
        name: "校内导航"
      }, {
        id: "4",
        url: "curriculum/curriculum",
        icon: "../../images/icon/schedule.png",
        name: "课表"
      }, {
        id: "5",
        url: "quality/quality",
        icon: "../../images/icon/quality.png",
        name: "素拓"
      }, {
        id: "6",
        url: "calendar/calendar",
        icon: "../../images/icon/calendar.png",
        name: "倒数日"
      }, {
        id: "7",
        url: "more/skrw/skrw",
        // tt1: "none",
        // tt: "examination",
        icon: "../../images/icon/1.png",
        name: "上课任务"
      }, {
        id: "8",
        url: "recommend/recommend?appId=wx0dffe79bb2223828",
        icon: "../../images/icon/examination.png",
        name: "邻家小市"
      }, {
        id: "9",
        url: "about/about",
        icon: "/images/icon/collect.png",
        name: "关于我们"
      }
      , {
        id: "10",
        url: "setting/setting?urlName=We生活吧",
        icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/生活.png",
        name: "We生活吧"
      }
      , {
        id: "11",
        url: "more/tc/tc",
        icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/运动.png",
        name: "体测计算器"
      }
      , {
        id: "12",
        url: "setting/setting?urlName=广油日常助手",
        icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/广油日常助手.png",
        name: "广油日常助手"
      }
      // , {
      //   id: "13",
      //   url: "more/punch/punch",
      //   icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/生活.png",
      //   name: "打卡测试"
      // }
    ],
      inform: [{
          comment: "消息",
          name: "下拉可刷新，课本可左右滑动",
          tiele: "下拉可刷新，课本可左右滑动"
        },
        {
          comment: "通知",
          name: "有问题请寻找我们",
          tiele: "有问题请寻找我们"
        }, {
          comment: "提示",
          name: "感谢你的支持",
          tiele: "感谢你的支持"
        }, {
          comment: "提示",
          name: "欢迎来到We广油",
          tiele: "欢迎来到We广油"
        }
      ]
    }
  }
  if(punch.includes(wxContext.OPENID)){
    data.index.iconList.push(
      {
        id: "13",
        url: "more/punch/punch",
        icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/新闻动态.png",
        name: "打卡测试"
      }
    )
  }

  return data
}