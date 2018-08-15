//app.js
const APP_ID = 'wx69f10f57e566e2cc';
const APP_SECRET = 'fe577f84998e797bd243d0d1cbd0784f';
var base64 = require('utils/base64.js'); 
App({
  onLaunch: function () {
    var that =this;
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

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
              that.globalData.sessionKey = res.data.session_key;
              that.globalData.openId = res.data.openid;

            },fail: function(res) {
              console.log(res);
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