// 获取API
var API = require('../../utils/api.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
Page({
  data: {
    mineData: null,
    collectHide: true,
    loadingHide: true
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
    Req.POST(API.MINE, {
      params: { paramData: paramData, page: 1 },
      success: function (res) {
        console.log(res)
        that.setData({
          mineData: res.data.data
        })
      },
      fail: function () { },
      complete: function () { }
    });
  },
  getInfo: function (e) {
    var images = [];
    for (var i of e.target.dataset.images) {
      var item = i.replace(/\.thumb\..*/, '');
      images.push(item);
    }
    wx.previewImage({ urls: images });
  },
})