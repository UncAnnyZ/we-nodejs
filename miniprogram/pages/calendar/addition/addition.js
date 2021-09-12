
Page({
  data: {
    isLoading: true,
  },
  
  onLoad:function(options){                     //接收url传递的数据并渲染
    this.setData({
      Name:options.Name,
      Date:options.Date,
      gapDays:options.gapDays,
    })
  },
})