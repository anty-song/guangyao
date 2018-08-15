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
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getMoneyValue: function(e){
  },
  pay: function(){
    var openid = app.globalData.openId;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    wx.request({
      url: 'http://xuexi.yewu99.com:8089/wx/interface/pay.php?action=advancedOrder',
      method: 'POST',
      data: {
        paramData: paramData,  /*订单号*/
        money: 1,   /*订单金额*/
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // wx.requestPayment({
        //   'timeStamp': timeStamp,
        //   'nonceStr': nonceStr,
        //   'package': 'prepay_id=' + res.data.prepay_id,
        //   'signType': 'MD5',
        //   'paySign': res.data._paySignjs,
        //   'success': function (res) {
        //     console.log(res);
        //   },
        //   'fail': function (res) {
        //     console.log('fail:' + JSON.stringify(res));
        //   }
        // })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})