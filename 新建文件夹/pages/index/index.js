//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  phoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: "18233582827",
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function () {
    
  }
})
