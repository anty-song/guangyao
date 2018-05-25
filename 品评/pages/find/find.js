// pages/find/find.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      if(options.pagename && options.itemid){
        app.globalData.itemid = options.itemid;
        options.pagename == "brarank" ? wx.navigateTo({ url: '../braRank/braRank?num=2' }) : wx.navigateTo({ url: '../proRank/proRank?num=2' });
      }
      if (options.scene) {
        var scene = decodeURIComponent(options.scene).split(',');
        if (scene[0]) {
          app.globalData.itemid = scene[0];
        }
        if (scene[1]) {
          if (scene[1] == 3) {
            wx.navigateTo({
              url: "../braRank/braRank?code=1"
            });
          }
          if (scene[1] == 4) {
            wx.navigateTo({
              url: "../proRank/proRank?code=1"
            });
          }
        }
      }
    }
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "发现",
      imageUrl: '../../images/share_img.png',
      success: function(res) {
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