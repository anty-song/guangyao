// 获取API
var URL = require('utils/interface.js');
// 获取网络请求
var Req = require("utils/request.js");
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
          Req.POST(URL.LOGIN, {
            params: {
              code: res.code
            },
            success: function (res) {
              self.globalData.voteCode = res.data.votecode;
            },
            fail: function () { },
            complete: function () { }
          })
        }
      }
    });
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