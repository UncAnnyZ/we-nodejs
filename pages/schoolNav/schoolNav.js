// pages/schoolNav/schoolNav.js
var amapFile = require('../../utils/amap-wx.js');
var sliderWidth = 96;
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: "800",
    placeName: "",
    hideOrNot: 0,
    activePlaceID: -1,
    markers: [{
      id: 0,
      latitude: 21.677456,
      longitude: 110.924444,
      iconPath: "/images/nav/others.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '公交站',
        display: 'ALWAYS'
      }
    }, {
      id: 1,
      latitude: 21.679041,
      longitude: 110.922631,
      iconPath: "/images/nav/sports.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '体育馆',
        display: 'ALWAYS'
      }
    }, {
      id: 2,
      latitude: 21.680033,
      longitude: 110.924519,
      iconPath: "/images/nav/sports.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '游泳池',
        display: 'ALWAYS'
      }
    }, {
      id: 3,
      latitude: 21.681175,
      longitude: 110.922615,
      iconPath: "/images/nav/sports.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '球类体育场',
        display: 'ALWAYS'
      }
    }, {
      id: 4,
      latitude: 21.678962,
      longitude: 110.923371,
      iconPath: "/images/nav/xingzheng.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '综合楼',
        display: 'ALWAYS'
      }
    }, {
      id: 5,
      latitude: 21.677855,
      longitude: 110.921939,
      iconPath: "/images/nav/xingzheng.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '中专楼',
        display: 'ALWAYS'
      }
    }, {
      id: 6,
      latitude: 21.680981,
      longitude: 110.921472,
      iconPath: "/images/nav/sports.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '操场',
        display: 'ALWAYS'
      }
    }, {
      id: 7,
      latitude: 21.677591,
      longitude: 110.922867,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '一教',
        display: 'ALWAYS'
      }
    }, {
      id: 8,
      latitude: 21.677147,
      longitude: 110.921789,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '二教A',
        display: 'ALWAYS'
      }
    }, {
      id: 9,
      latitude: 21.677541,
      longitude: 110.921778,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '二教B',
        display: 'ALWAYS'
      }
    }, {
      id: 10,
      latitude: 21.678897,
      longitude: 110.920882,
      iconPath: "/images/nav/xiaomen.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '计算机楼',
        display: 'ALWAYS'
      }
    }, {
      id: 11,
      latitude: 21.679276,
      longitude: 110.920893,
      iconPath: "/images/nav/shitang.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '一饭',
        display: 'ALWAYS'
      }
    }, {
      id: 12,
      latitude: 21.682197,
      longitude: 110.922476,
      iconPath: "/images/nav/shitang.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '二饭',
        display: 'ALWAYS'
      }
    }, {
      id: 13,
      latitude: 21.679365,
      longitude: 110.920169,
      iconPath: "/images/nav/shitang.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '四饭和4D区',
        display: 'ALWAYS'
      }
    }, {
      id: 14,
      latitude: 21.679699,
      longitude: 110.920732,
      iconPath: "/images/nav/shitang.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '五饭',
        display: 'ALWAYS'
      }
    }, {
      id: 15,
      latitude: 21.679704,
      longitude: 110.92158,
      iconPath: "/images/nav/sushe.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '1区',
        display: 'ALWAYS'
      }
    }, {
      id: 16,
      latitude: 21.678842,
      longitude: 110.920657,
      iconPath: "/images/nav/sushe.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '2区',
        display: 'ALWAYS'
      }
    }, {
      id: 17,
      latitude: 21.682227,
      longitude: 110.921794,
      iconPath: "/images/nav/sushe.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '3区',
        display: 'ALWAYS'
      }
    }, {
      id: 18,
      latitude: 21.680123,
      longitude: 110.920544,
      iconPath: "/images/nav/sushe.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '4区',
        display: 'ALWAYS'
      }
    }, {
      id: 19,
      latitude: 21.676374,
      longitude: 110.92346,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '实验楼',
        display: 'ALWAYS'
      }
    }, {
      id: 20,
      latitude: 21.678588,
      longitude: 110.924026,
      iconPath: "/images/nav/sushe.png",
      width: 22.5,
      height: 24,
      callout: {
        content: '5区',
        display: 'ALWAYS'
      }
    }],
    distance: '',
    cost: '',
    polyline: [],
    userLongitude: 110.922599,
    userLatitude: 21.679529,
    inSchool: false,
    isLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var _this = this

    if (e.markerId !== '' && Object.keys(e).length !== 0) {
      _this.makertap(e);
    }
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })

  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 800);

  },
  makertap: function(e) {
    console.log(e)
    var id = e.markerId;
    var that = this;
    const markers = that.data.markers;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        });
        that.setData({
          activePlaceID: id,
          placeName: that.data.markers[id].callout.content
        })
        var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
        var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
        that.planPolyline(userLocation, destination);
      }
    })

  },
  planPolyline: function(origin, destination) {
    var that = this;
    var id = that.data.activePlaceID;
    //规划步行路线
    var myAmapFun = new amapFile.AMapWX({
      key: '66a87160f8db2a9a76431c954b4f52a5'
    });
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          json: data.paths[0],
          polyline: [{
            points: points,
            color: "#7acfa6",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }
        var markers = that.data.markers;
        var points = that.data.polyline[0].points;
        //暂时一共70个坐标点
        markers[22] = {
          id: 22,
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          iconPath: '../../images/nav/mapicon_navi_s.png',
          width: 23,
          height: 33
        };
        markers[23] = {
          id: 23,
          latitude: points[points.length - 1].latitude,
          longitude: points[points.length - 1].longitude,
          iconPath: '../../images/nav/mapicon_navi_e.png',
          width: 24,
          height: 34
        }

        that.setData({
          markers: markers,
        })
      },
    })
  },
  location: function() {
    var _this = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
  },
  moveSchool: function() {
    //视图返回学校
    var _this = this;
    _this.setData({
      userLongitude: 110.922599,
      userLatitude: 21.679529,
    })
  },
  jtt: function() {

  },
  goDetail: function() {
    var that = this;
    const latitude = that.data.markers[that.data.activePlaceID].latitude;
    const longitude = that.data.markers[that.data.activePlaceID].longitude;
    const name = that.data.markers[that.data.activePlaceID].callout.content;
    wx.openLocation({
      latitude,
      longitude,
      name,
      address: '广东石油化工学院',
      scale: 8
    })
  }
})