// pages/more/tc/tcdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: true, //性别    男:true  女:false
    boy: {
      // BMI
      bmi: {
        title: "体重指数(BMI)单项评分表(男)",
        table_head: ['等级','单项得分','大学'],
        table_contain: [
          [ ['正常', 1], ['低体重', 1], ['超重', 1], ['肥胖', 1] ],
          [ [100, 1], [80, 2], [60, 1] ],
          [ ['17.9~23.9', 1], ['≤17.8', 1], ['24.0~27.9', 1], ['≥28.0', 1] ]
        ]
      },

      // 肺活量
      volume: {
        title: "肺活量单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [5040, 1], [4920, 1], [4800, 1], [4550, 1], [4300, 1], 
            [4180, 1], [4060, 1], [3940, 1], [3820, 1], [3700, 1], 
            [3580, 1], [3460, 1], [3340, 1], [3220, 1], [3100, 1], 
            [2940, 1], [2780, 1], [2620, 1], [2460, 1], [2300, 1]
          ],
          [ [5140, 1], [5020, 1], [4900, 1], [4650, 1], [4400, 1], 
            [4280, 1], [4160, 1], [4040, 1], [3920, 1], [3800, 1], 
            [3680, 1], [3560, 1], [3440, 1], [3320, 1], [3200, 1], 
            [3030, 1], [2860, 1], [2690, 1], [2520, 1], [2350, 1]
          ]
        ]
      },

      // 跳远
      jump: {
        title: "立定跳远单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [273, 1], [268, 1], [263, 1], [256, 1], [248, 1], 
            [244, 1], [240, 1], [236, 1], [232, 1], [228, 1], 
            [224, 1], [220, 1], [216, 1], [212, 1], [208, 1], 
            [203, 1], [198, 1], [193, 1], [188, 1], [183, 1]
          ],
          [ [275, 1], [270, 1], [265, 1], [258, 1], [250, 1], 
            [246, 1], [242, 1], [238, 1], [234, 1], [230, 1], 
            [226, 1], [222, 1], [218, 1], [214, 1], [210, 1], 
            [205, 1], [200, 1], [195, 1], [190, 1], [185, 1]
          ],
        ]
      },

      // 体前屈
      handlong: {
        title: "坐位体前屈单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [24.9, 1], [23.1, 1], [21.3, 1], [19.5, 1], [17.7, 1], 
            [16.3, 1], [14.9, 1], [13.5, 1], [12.1, 1], [10.7, 1], 
            [9.3, 1], [7.9, 1], [6.5, 1], [5.1, 1], [3.7, 1], 
            [2.7, 1], [1.7, 1], [0.7, 1], [-0.3, 1], [-1.3, 1]
          ],
          [ [25.1, 1], [23.3, 1], [21.5, 1], [19.9, 1], [18.2, 1], 
            [16.8, 1], [15.4, 1], [14.0, 1], [12.6, 1], [11.2, 1], 
            [9.8, 1], [8.4, 1], [7.0, 1], [5.6, 1], [4.2, 1], 
            [3.2, 1], [2.2, 1], [1.2, 1], [0.2, 1], [-0.8, 1]
          ]
        ]
      },

      // 引体向上
      pull_up: {
        title: "引体向上单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [19, 1], [18, 1], [17, 1], [16, 1], [15, 1], 
            [14, 2], [13, 2], [12, 2], [11, 2], [10, 2], 
            [9, 1], [8, 1], [7, 1], [6, 1], [5, 1]
          ],
          [ [20, 1], [19, 1], [18, 1], [17, 1], [16, 1], 
            [15, 2], [15, 2], [13, 2], [12, 2], [11, 2], 
            [10, 1], [9, 1], [8, 1], [7, 1], [6, 1]
          ],
        ]
      },

      // 短跑50m
      shortrun: {
        title: "50米跑单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [6.7, 1], [6.8, 1], [6.9, 1], [7.0, 1], [7.1, 1], 
            [7.3, 1], [7.5, 1], [7.7, 1], [7.9, 1], [8.1, 1], 
            [8.3, 1], [8.5, 1], [8.7, 1], [8.9, 1], [9.1, 1], 
            [9.3, 1], [9.5, 1], [9.7, 1], [9.9, 1], [10.1, 1], 
          ],
          [ [6.6, 1], [6.7, 1], [6.8, 1], [6.9, 1], [7.0, 1], 
            [7.2, 1], [7.4, 1], [7.6, 1], [7.8, 1], [8.0, 1], 
            [8.2, 1], [8.4, 1], [8.6, 1], [8.8, 1], [9.0, 1], 
            [9.2, 1], [9.4, 1], [9.6, 1], [9.8, 1], [10.0, 1], 
          ]
        ]
      },

      // 长跑1000m
      longrun: {
        title: "1000米耐力跑单项评分表(男)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ ["3'17\"", 1], ["3'22\"", 1], ["3'27\"", 1], ["3'34\"", 1], ["3'42\"", 1], 
            ["3'47\"", 1], ["3'52\"", 1], ["3'57\"", 1], ["4'02\"", 1], ["4'07\"", 1], 
            ["4'12\"", 1], ["4'17\"", 1], ["4'22\"", 1], ["4'27\"", 1], ["4'32\"", 1], 
            ["4'52\"", 1], ["5'12\"", 1], ["5'32\"", 1], ["5'52\"", 1], ["6'12\"", 1]
          ],
          [ ["3'15\"", 1], ["3'20\"", 1], ["3'25\"", 1], ["3'32\"", 1], ["3'40\"", 1], 
            ["3'45\"", 1], ["3'50\"", 1], ["3'55\"", 1], ["4'00\"", 1], ["4'05\"", 1], 
            ["4'10\"", 1], ["4'15\"", 1], ["4'20\"", 1], ["4'25\"", 1], ["4'30\"", 1], 
            ["4'50\"", 1], ["5'10\"", 1], ["5'30\"", 1], ["5'50\"", 1], ["6'10\"", 1]
          ]
        ]
      }

    },
    girl: {
      // BMI
      bmi: {
        title: "体重指数(BMI)单项评分表(女)",
        table_head: ['等级','单项得分','大学'],
        table_contain: [
          [ ['正常', 1], ['低体重', 1], ['超重', 1], ['肥胖', 1] ],
          [ [100, 1], [80, 2], [60, 1] ],
          [ ['17.2~23.9', 1], ['≤17.1', 1], ['24.0~27.9', 1], ['≥28.0', 1] ]
        ]
      },

      // 肺活量
      volume: {
        title: "肺活量单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [3400, 1], [3350, 1], [3300, 1], [3150, 1], [3000, 1], 
            [2900, 1], [2800, 1], [2700, 1], [2600, 1], [2500, 1], 
            [2400, 1], [2300, 1], [2200, 1], [2100, 1], [2000, 1], 
            [1960, 1], [1920, 1], [1880, 1], [1840, 1], [1800, 1]
          ],
          [ [3450, 1], [3400, 1], [3350, 1], [3200, 1], [3050, 1], 
            [2950, 1], [2850, 1], [2750, 1], [2650, 1], [2550, 1], 
            [2450, 1], [2350, 1], [2250, 1], [2150, 1], [2050, 1], 
            [2010, 1], [1970, 1], [1930, 1], [1890, 1], [1850, 1]
          ],
        ]
      },

      // 跳远
      jump: {
        title: "立定跳远单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [207, 1], [201, 1], [195, 1], [188, 1], [181, 1], 
            [178, 1], [175, 1], [172, 1], [169, 1], [166, 1], 
            [163, 1], [160, 1], [157, 1], [154, 1], [151, 1], 
            [146, 1], [141, 1], [136, 1], [131, 1], [126, 1]
          ],
          [ [208, 1], [202, 1], [196, 1], [189, 1], [182, 1], 
            [179, 1], [176, 1], [173, 1], [170, 1], [167, 1], 
            [164, 1], [161, 1], [158, 1], [155, 1], [152, 1], 
            [147, 1], [142, 1], [137, 1], [132, 1], [127, 1]
          ]
        ]
      },

      // 体前屈
      handlong: {
        title: "坐位体前屈单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [25.8, 1], [24.0, 1], [22.2, 1], [20.6, 1], [19.0, 1], 
            [17.7, 1], [16.4, 1], [15.1, 1], [13.8, 1], [12.5, 1], 
            [11.2, 1], [9.9, 1], [8.6, 1], [7.3, 1], [6.0, 1], 
            [5.2, 1], [4.4, 1], [3.6, 1], [2.8, 1], [2.0, 1]
          ],
          [ [26.3, 1], [24.4, 1], [22.4, 1], [21.0, 1], [19.5, 1], 
            [18.2, 1], [16.9, 1], [15.6, 1], [14.3, 1], [13.0, 1], 
            [11.7, 1], [10.4, 1], [9.1, 1], [7.8, 1], [6.5, 1], 
            [5.7, 1], [4.9, 1], [4.1, 1], [3.3, 1], [2.5, 1]
          ]
        ]
      },

      // 仰卧起坐
      sit_up: {
        title: "一分钟仰卧起坐单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [56, 1], [54, 1], [52, 1], [49, 1], [46, 1], 
            [44, 1], [42, 1], [40, 1], [38, 1], [36, 1], 
            [34, 1], [32, 1], [30, 1], [28, 1], [26, 1], 
            [24, 1], [22, 1], [20, 1], [18, 1], [16, 1]
          ],
          [ [57, 1], [55, 1], [53, 1], [50, 1], [47, 1], 
            [45, 1], [43, 1], [41, 1], [39, 1], [37, 1], 
            [35, 1], [33, 1], [31, 1], [29, 1], [27, 1], 
            [25, 1], [23, 1], [21, 1], [19, 1], [17, 1]
          ]
        ]
      },

      // 短跑50m
      shortrun: {
        title: "50米跑单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ [7.5, 1], [7.6, 1], [7.7, 1], [8.0, 1], [8.3, 1], 
            [8.5, 1], [8.7, 1], [8.9, 1], [9.1, 1], [9.3, 1], 
            [9.5, 1], [9.7, 1], [9.9, 1], [10.1, 1], [10.3, 1], 
            [10.5, 1], [10.7, 1], [10.9, 1], [11.1, 1], [11.3, 1]
          ],
          [ [7.4, 1], [7.5, 1], [7.6, 1], [7.9, 1], [8.2, 1], 
            [8.4, 1], [8.6, 1], [8.8, 1], [9.0, 1], [9.2, 1], 
            [9.4, 1], [9.6, 1], [9.8, 1], [10.0, 1], [10.2, 1], 
            [10.4, 1], [10.6, 1], [10.8, 1], [11.0, 1], [11.2, 1]
          ],
        ]
      },

      // 长跑800m
      longrun: {
        title: "800米耐力跑单项评分表(女)",
        table_head: ['等级','单项得分','大一大二', '大三大四'],
        table_contain: [
          [ ['优秀', 3], ['良好', 2], ['及格', 10], ['不及格', 5] ],
          [ [100, 1], [95, 1], [90, 1], [85, 1], [80, 1], 
            [78, 1], [76, 1], [74, 1], [72, 1], [70, 1], 
            [68, 1], [66, 1], [64, 1], [62, 1], [60, 1], 
            [50, 1], [40, 1], [30, 1], [20, 1], [10, 1]
          ],
          [ ["3'18\"", 1], ["3'24\"", 1], ["3'30\"", 1], ["3'37\"", 1], ["3'44\"", 1], 
            ["3'49\"", 1], ["3'54\"", 1], ["3'59\"", 1], ["4'04\"", 1], ["4'09\"", 1], 
            ["4'14\"", 1], ["4'19\"", 1], ["4'24\"", 1], ["4'29\"", 1], ["4'34\"", 1], 
            ["4'44\"", 1], ["4'54\"", 1], ["5'04\"", 1], ["5'14\"", 1], ["5'24\"", 1]
          ],
          [ ["3'16\"", 1], ["3'22\"", 1], ["3'28\"", 1], ["3'35\"", 1], ["3'42\"", 1], 
            ["3'47\"", 1], ["3'52\"", 1], ["3'57\"", 1], ["4'02\"", 1], ["4'07\"", 1], 
            ["4'12\"", 1], ["4'17\"", 1], ["4'22\"", 1], ["4'27\"", 1], ["4'32\"", 1], 
            ["4'42\"", 1], ["4'52\"", 1], ["5'02\"", 1], ["5'12\"", 1], ["5'22\"", 1]
          ]
        ]
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sex: options.sex == "true"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})