// 获取API
var API = require('../../utils/api.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
var flag = false;
Page({
  data: {
    mineData: null,
    collectHide: true,
    page:1,
    hint:'',
    itemdata: null,
    index: 0
  },
  // 初始化
  onLoad: function(){
    var that = this;
    that.setData({
      page: 1
    })
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
        that.setData({
          mineData: res.data.data
        })
      },
      fail: function () { },
      complete: function () { }
    });
  },
  onShow: function(){
    if (flag) {
      flag = false;
      return;
    }
    var that = this;
    var mineData = that.data.mineData;
    if (app.globalData.mineItemData) {
      if (that.data.itemdata == app.globalData.mineData) {
        return;
      } else {
        mineData[that.data.index] = app.globalData.mineItemData;
        that.setData({
          mineData: mineData
        });
      }
    }
  },
  // 预览图片
  getInfo: function (e) {
    var images = [];
    for (var i of e.target.dataset.images) {
      var item = i.replace(/\.thumb\..*/, '');
      images.push(item);
    }
    flag=true;
    wx.previewImage({ urls: images });
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function (e) {
    var that = this;
    var page = that.data.page;
    var mineData = that.data.mineData;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    // 获取评论
    Req.POST(API.MINE, {
      params: { paramData: paramData, page: page+1 },
      success: function (res) {
        if (!res.data.data.length) {
          // 添加无更多评论显示
          that.setData({
            hint: '到底了'
          })
        } else {
          that.setData({
            hint: '加载中',
            page: page + 1
          });
          for (var i = 0; i < res.data.data.length; i++) {
            mineData.push(res.data.data[i]);
          }
          that.setData({
            mineData: mineData,
            page: page + 1
          });
        }
      },
      fail: function () { },
      complete: function () { }
    })
  },
  transferData: function (e) {
    var that = this;
    app.globalData.showid = e.currentTarget.dataset.itemdata.itemid;
    app.globalData.collect = true;
    that.setData({
      itemdata: e.currentTarget.dataset.itemdata,
      index: e.currentTarget.dataset.index
    })
  },
})