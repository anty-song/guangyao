// pages/login/login.js
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
    phoneFlag: 0,
    passwordFlag: 0,
    phoneErrMsg: '',
    passwordErrMsg: '',
    phoneNum: '',       // 手机号输入框初始值
    password: ''        // 密码输入框初始值            
  },
  completePhoneNum: function(e) {
    var that = this;
    var phoneNum = e.detail.value;
    var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    if (!phoneNum) {
      that.setData({
        phoneErrMsg: '*手机号码不能为空！',
        phoneFlag: 0
      });
    } else if (!reg.test(phoneNum)) {
      that.setData({
        phoneErrMsg: '*请输入正确的手机号码！',
        phoneFlag: 0
      });
    } else {
      that.setData({
        phoneErrMsg: '',
        phoneFlag: 1
      });
    }
  },
  completePassword: function(e) {
    var that = this;
    var password = e.detail.value;
    var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;
    if (!password) {
      that.setData({
        passwordErrMsg: '*密码不能为空!',
        passwordFlag: 0
      });
    } else if (password.length < 6) {
      that.setData({
        passwordErrMsg: '*密码长度最少6位!',
        passwordFlag: 0
      });
    } else if (password.length > 20) {
      that.setData({
        passwordErrMsg: '*密码长度最多20位!',
        passwordFlag: 0
      });
    } else if (!reg.test(password)) {
      that.setData({
        passwordErrMsg: '*密码需由大小写英文字母和数字组成!',
        passwordFlag: 0
      });
    } else {
      that.setData({
        passwordErrMsg: '',
        passwordFlag: 1
      });
    }
  },
  formSubmit: function (e) {
    var that = this;
    // 获取用户输入
    var acount = e.detail.value.phone;
    var password = e.detail.value.password;
    var timestamp = Date.parse(new Date())/1000;
    // 再次对电话和密码进行判断
    var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    var _reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;
    if (!acount) {
      that.setData({
        phoneErrMsg: '*手机号码不能为空！',
        phoneFlag: 0
      });
    } else if (!reg.test(acount)) {
      that.setData({
        phoneErrMsg: '*请输入正确的手机号码！',
        phoneFlag: 0
      });
    } else {
      that.setData({
        phoneErrMsg: '',
        phoneFlag: 1
      });
    }
    if (!password) {
      that.setData({
        passwordErrMsg: '*密码不能为空!',
        passwordFlag: 0
      });
    } else if (password.length < 6) {
      that.setData({
        passwordErrMsg: '*密码长度最少6位!',
        passwordFlag: 0
      });
    } else if (password.length > 20) {
      that.setData({
        passwordErrMsg: '*密码长度最多20位!',
        passwordFlag: 0
      });
    } else if (!_reg.test(password)) {
      that.setData({
        passwordErrMsg: '*密码需由大小写英文字母和数字组成!',
        passwordFlag: 0
      });
    } else {
      that.setData({
        passwordErrMsg: '',
        passwordFlag: 1
      });
    }

    // base加密用户输入
    var base64_wxlie = app.strencode(timestamp+','+acount +','+password);
    // 设置请求所传参数
    var params = {
      action: "login",
      wxlie: base64_wxlie
    };
    var reqLoginAPI = URL.LOGIN+'?action='+params.action+'&wxlie='+params.wxlie;
    if (that.data.phoneFlag == 1 && that.data.passwordFlag == 1) {
      // 请求接口验证登陆信息
      Req.POST(URL.LOGIN, {
        params: params,
        success: function(res) {
          if (res.data.status == 1) {
            // 本地缓存 用户 信息
            // 开始存储时的时间戳
            var timestamp = Date.parse(new Date()) / 1000;
            // 设置信息存储时间
            var expiration = timestamp + 2592000;
            wx.setStorageSync('userInfo', res.data);
            wx.setStorageSync('userInfo_expiration', expiration);
            // 登陆成功后返回原页面
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2500
            });
            app.globalData.pageid == 'brand' ? wx.switchTab({ url: '../brand/brand' }) : wx.switchTab({ url: '../product/product' });
          } else {
            if (res.data.status == 2) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              });
              wx.navigateTo({
                url: '../register/register',
              });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              });
            }
          }
        },
        fail: function(res) {
          // do fail
        },
        complete: function(res){}
      });
    } else {
      wx.showToast({
        title: '登录失败，请检查登录信息是否完整！',
        icon: 'none',
        duration: 3000
      });
    }
    // 点击登录按钮 输入框清空
    that.setData({
      // 每次点击登录按钮后 重置错误标识 防止提交错误登录信息
      phoneFlag: 0,
      passwordFlag: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      // delta: 0,
      phoneNum: '',
      password: ''
    });
    if(options){
      if(options.pageid){
        app.globalData.pageid = options.pageid;
      }
    }
  },
})