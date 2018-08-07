// pages/wallet/wallet.js
// 获取API
var API = require('../../utils/api.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    walletData: null
  },
  onLoad: function(){
    var that = this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.WALLET, {
      params: { paramData: paramData,page: 1},
      success: function (res) {
        console.log(res)
        that.setData({
          walletData: res.data
        })
      },
      fail: function () { },
      complete: function () { }
    });
  },
  goChongzhi: function(){
    wx.navigateTo({
      url: '../chongzhi/chongzhi',
    });
  },
  getCash: function() {
    wx.showToast({
      title: '下载APP',
      icon: 'none',
    });
  }
})