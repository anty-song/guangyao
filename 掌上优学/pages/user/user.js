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
    isLogin: false,
    userId: '',
    nickName: '',
    userAvatar: '../../images/myself_touxiang_img.png'
  },
  // 登录
  onGotUserInfo: function(e) {
    var that=this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // openID
    var openID = app.globalData.openId;
    var paramData = app.strencode(timestamp + ',' + openID);
    Req.POST(API.USER_VERIFY, {
      params: {
        paramData: paramData
      },
      success: function(res){
        console.log(res)
        if (res.data.bindaccount=='0'){
          wx.navigateTo({
            url: '../tiePhone/tiePhone',
          });
        } else {
          // 用户信息存储到本地
          wx.setStorageSync("userAccount", res.data);
          that.setData({
            isLogin: true,
            userId: res.data.ID,
            nickName: res.data.username,
            userAvatar: res.data.userimg
          });
        }
      },
      fail: function(){},
      complete: function(){}
    });
  },
  onLoad: function(options){
    var that=this;
    console.log(app.globalData)
    // 判断是否需要重新登录
    if(app.globalData.relogin){
      that.setData({
        isLogin: false
      });
    } else {
    // 判断是否具有登录信息
      console.log(wx.getStorageSync('userAccount'));
      if (wx.getStorageSync('userAccount') && wx.getStorageSync('userAccount').bindaccount=='1') {
        that.setData({
          isLogin: true,
          userId: wx.getStorageSync('userAccount').ID,
          nickName: wx.getStorageSync('userAccount').username,
          userAvatar: wx.getStorageSync('userAccount').userimg
        });
      }
    }
  },
  goWallet: function(){
    if(this.data.isLogin) {
      wx.navigateTo({ url: '../wallet/wallet' });
    } else {
      wx.showToast({
        title: '请登录后查看',
        icon: 'none'
      });
    }
  },
  goDongtai: function () {
    if (this.data.isLogin) {
      wx.navigateTo({ url: '../dongtai/dongtai' });
    } else {
      wx.showToast({
        title: '请登录后查看',
        icon: 'none'
      });
    }
  },
  goCollect: function () {
    if (this.data.isLogin) {
      wx.navigateTo({ url: '../collect/collect' });
    } else {
      wx.showToast({
        title: '请登录后查看',
        icon: 'none'
      });
    }
  }
})