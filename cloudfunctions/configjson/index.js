// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const _ = db.command;
  // 紧急Patch 9.4号删除
  var zh = await db.collection('username').where({_openid: wxContext.OPENID}).get({})
  try{
    username = zh.data[0]._user
    var curriculum = await db.collection('curriculum').where({ _user: username }).get({})
    if(curriculum.data[0].curriculumTime != '202101'){
      await db.collection('curriculum').where({ _user: username }).update({
        data: {
          _add: "[]",
          _de: "[]",
          curriculumTime: '202101'
        }
      })
    }
  }catch{

  }


  return {
    version: "0.0.1",
    msgTitle : "更新",
    timeYear : "2021/8/30",
    time: "10000", // 秒
    msgData: "1.欢迎使用We广油",
    more: [{
      url: '/pages/more/tc/tc',
      name: '体测成绩计算',
      imgUrl: '../../../images/home/timg.png'
    },{
      url: '/pages/more/skrw/skrw',
      name: '学生上课任务',
      imgUrl: '/images/icon/1.png'
    }],
    index: {
      news: true, // 通知内容显示
      ad: true,
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
        name: "社团活动"
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
        name: "校历"
      }, {
        id: "7",
        url: "more/skrw/skrw",
        // tt1: "none",
        // tt: "examination",
        icon: "../../images/icon/1.png",
        name: "上课任务"
      }, {
        id: "8",
        url: "about/about",
        icon: "../../images/icon/collect.png",
        name: "关于我们"
      }],
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