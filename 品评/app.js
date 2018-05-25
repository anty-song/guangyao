//app.js
const APP_ID = 'wx719080d2a46bf68f';//输入小程序appid  
const APP_SECRET = '71e201688bc0bdc837c2bebc125cb85b';//输入小程序app_secret  71e201688bc0bdc837c2bebc125cb85b
var base64 = require('utils/base64.modified.js'); 
// 获取API
var URL = require('utils/config.default.js');
// 获取网络请求
var Req = require("utils/request.js");

App({

    globalData: {
      userInfo: '',
      pageid: '',
      sessionKey: '',
      openId: '',
      catid: '',
      catname: '',
      userid: '',
      auth: '',
      shareImg: '',
      itemid: '',
      title: '',
      access_token: '',
      expires_in: '',
      // 小程序场景值
      scene: ''
    },
    
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function (ops) {
      var that = this;
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // 登录
      // wx.login({
      //   success: res => {
      //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //     var errMsg = res.errMsg;
      //     if (errMsg != 'login:ok') {
      //       wx.showToast({
      //         title: '出错了，请稍后再试试...',
      //         icon: 'none'
      //       })
      //     } else {
      //       var code = res.code;
      //       wx.request({
      //         url: 'https://api.weixin.qq.com/sns/jscode2session',
      //         data: {
      //           appid: APP_ID,
      //           secret: APP_SECRET,
      //           js_code: res.code,
      //           grant_type: 'authorization_code'
      //         },
      //         method: 'GET',
      //         success: function (res) {
      //           that.globalData.sessionKey = res.data.session_key;
      //           that.globalData.openId = res.data.openid;
                
      //         },fail: function(res) {
      //           console.log(res);
      //         }
      //       })
      //     }
      //   }
      // })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    },
  
    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
      this.globalData.scene = options.scene;
    },
  
    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {
      
    },
  
    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {},
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
    }
  })
  