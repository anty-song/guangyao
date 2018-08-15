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
    walletData: null,
    page:1,
    hint:''
  },
  onLoad: function(){
    var that = this;
    that.setData({
      page: 1
    });
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
        that.setData({
          walletData: res.data
        })
      },
      fail: function () { },
      complete: function () { }
    });
  },
  goChongzhi: function(){
    // wx.navigateTo({
    //   url: '../chongzhi/chongzhi',
    // });
    wx.showToast({
      title: '下载APP充值',
      icon: 'none',
    });
  },
  getCash: function() {
    wx.showToast({
      title: '下载APP提现',
      icon: 'none',
    });
  },
  walletShare: function(){
    wx.showToast({
      title: '下载APP分享获取赏金',
      icon: 'none',
    });
  },
  onReachBottom: function(){
    var that=this;
    var page=that.data.page;
    var walletData = that.data.walletData;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.WALLET, {
      params: { paramData: paramData, page: page+1 },
      success: function (res) {
        if (res.data.length){
          for (var i = 0; i < res.data.length; i++) {
            walletData.push(res.data[i])
          }
          that.setData({
            walletData: walletData,
            page:page+1,
            hint:'加载中'
          })
        }else{
          that.setData({
            hint:'到底了'
          })
        }
      },
      fail: function () { },
      complete: function () { }
    });
  },
  onPullDownRefresh: function(){
    this.onLoad();
    wx.stopPullDownRefresh();
  }
})