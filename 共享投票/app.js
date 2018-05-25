//app.js
const APP_ID = 'wx74dcbf65c74a69a3';//输入小程序appid  
const APP_SECRET = 'b497f13291f63da34df6a6e6dd1bfcf6';
var base64 = require('utils/base64.modified.js');
App({
  onLaunch: function () {
    var self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var errMsg = res.errMsg;
        if (errMsg != 'login:ok') {
          wx.showToast({
            title: '出错了，请稍后再试试...',
            icon: 'none'
          })
        } else {
          var code = res.code;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              self.globalData.sessionKey = res.data.session_key;
              self.globalData.openId = res.data.openid;
            },fail: function(res) {
              console.log(res);
            }
          });
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              self.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (self.userInfoReadyCallback) {
                self.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  // 加密参数
  strencode: function (strings) {
    var key = '25e7cf05de3ebacde7c54152cca37dd6';
    var strings = base64.encode(strings);
    var len = key.length;
    var code = '';
    for (var i = 0; i < strings.length; i++) {
      var k = i % len;
      code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
    }
    return base64.encode(code);
  },
  globalData: {
    userInfo: null
  }
})