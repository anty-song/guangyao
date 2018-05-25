// pages/proRankItem/proRankItem.js

// 获取API
var URL = require('../../utils/config.default.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemid: '',
    list: [],
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var itemid = app.globalData.itemid;
    var title = app.globalData.title;
    that.setData({
      itemid: itemid,
      title: title
    })
    // 设置导航标题
    wx.setNavigationBarTitle({
      title: title
    });
    var params = {
      action: 'getlist',
      itemid: itemid
    };
    Req.POST(URL.BRARANK_DETAIL, {
      params: params,
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({
            list: res.data.list,
            title: title
          });
        }
      },
      fail: function (res) { },
      complete: function (res) {
        // wx.hideLoading();
      }
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list: []
    });
    that.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var itemid = that.data.itemid;
    var title = that.data.title;
    return {
      title: title,
      path: '/pages/find/find?itemid=' + itemid + '&pagename=prorank',
      imageUrl: '../../images/share_img.png',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        });
      },
      fail: function (res) {
        // do fail
      }
    }
  }
})