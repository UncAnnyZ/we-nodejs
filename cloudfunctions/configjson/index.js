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

  return {
    version: "0.0.1",
    msgTitle : "通知",
    timeYear : "2021/8/30",
    time: "43200", // 秒
    reset: false,
<<<<<<< HEAD
    msgData: "1.修复添加课表bug\n2.倒数日功能上线啦！第二行第二个",
=======
    msgData: "可以滑动啦，可以配置公众号文章，有兴趣的官方组织欢迎投放公众号\n有想法或者新功能或者优化的请联系我们",
>>>>>>> 35b6428557ed8bdd4a5405202d2ae98c181ae233
    more: [{
      url: '/pages/more/tc/tc',
      name: '体测成绩计算',
      imgUrl: '../../../images/home/timg.png'
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
        url: "recommend/recommend?urlName=表白墙",
        icon: "/images/icon/examination1.png",
        name: "表白墙"
      }
      , {
        id: "11",
        url: "recommend/recommend?urlName=学校新咨询",
        icon: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/新闻动态.png",
        name: "学校新资讯"
      }

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
}