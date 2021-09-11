
Page({
  data: {
    isLoading: true,
  },
  
  onLoad:function(options){                     //进行数据库的读取，先读取再添加
    this.setData({
      Name:options.Name,
      Date:options.Date,
      gapDays:options.gapDays,
    })
  },
})