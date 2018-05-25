// pages/forget/forget.js
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
    yzmFlag: 0,
    passwordFlag: 0,
    passwordAgainFlag: 0,
    phoneErrMsg: '',
    yzmErrMsg: '',
    passwordErrMsg: '',
    passwordAgainErrMsg: '',
    hintMsg: "获取验证码",
    isDisabled: true,
    phoneNum: '',       // 手机号
    message: '',        // 短信验证码
    password: '',
    passwordAgain: ''
  },
  /**
   * 完成电话号码输入 获取用户电话号码
   */
  completePhoneNum: function (e) {
    var that = this;
    var phoneNum = e.detail.value;
    var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;

    if (!phoneNum) {
      that.setData({
        phoneErrMsg: '*手机号码不能为空！',
        isDisabled: true,
        phoneFlag: 0
      });
    } else if (!reg.test(phoneNum)) {
      that.setData({
        phoneErrMsg: '*请输入正确的手机号码！',
        isDisabled: true,
        phoneFlag: 0
      });
    } else {
      that.setData({
        phoneNum: phoneNum,
        phoneErrMsg: '',
        isDisabled: false,
        phoneFlag: 1
      });
    }
  },
  /**
   * 点击获取短信验证码
   */
  sendMsg: function () {
    var that = this;
    var count = 60;
    var timestamp = Date.parse(new Date()) / 1000;
    var phoneNum = that.data.phoneNum;
    var base64_wxlie = app.strencode(timestamp + ',' + phoneNum);
    var params = {
      action: 'sms2',
      wxlie: base64_wxlie
    };
    Req.POST(URL.MESSAGE, {
      params: params,
      success: function (res) {
        if (res.data.status == 1) {
          var timer = setInterval(function () {
            if (count > 0) {
              count--;
              that.setData({
                isDisabled: true,
                hintMsg: count + "s后重新获取"
              });
            } else {
              that.setData({
                isDisabled: false,
                hintMsg: "重新获取"
              });
              count = 60;
              clearInterval(timer);
            }
          }, 1000);
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2500
          });
        }
        if(res.data.status == 2) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2500
          });
          wx.redirectTo({
            url: '../register/register',
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    });
  },
  /**
   * 完成短信验证码输入 获取验证码 用作判断和清空
   */
  completeMsg: function (e) {
    var that = this;
    var message = e.detail.value;
    if (!message) {
      that.setData({
        yzmErrMsg: '*请输入验证码！',
        yzmFlag: 0
      });
    } else {
      that.setData({
        yzmErrMsg: '',
        yzmFlag: 1
      });
    }
  },
  /**
   * 完成密码输入 校检密码 获取密码
   */
  completePass: function (e) {
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
        password: password,
        passwordErrMsg: '',
        passwordFlag: 1
      });
    }
  },
  /**
   * 完成二次密码输入 校检密码并和第一次输入的密码比较 获取二次输入的密码
   */
  completePassAgain: function (e) {
    var that = this;
    var password = that.data.password;
    var passwordAgain = e.detail.value;
    if (!passwordAgain) {
      that.setData({
        passwordAgainErrMsg: '*密码不能为空!',
        passwordAgainFlag: 0
      });
    } else if (password != passwordAgain){
      // 比较两次输入的密码是否一致
      that.setData({
        passwordAgainErrMsg: '*输入密码不一致!',
        passwordAgainFlag: 0
      });
    } else {
      that.setData({
        passwordAgainErrMsg: '',
        passwordAgainFlag: 1
      });
    }
  },
  /**
   * 提交操作
   */
  formSubmit: function (e) {
    var that = this;
    var timestamp = Date.parse(new Date()) / 1000;
    var phoneNum = e.detail.value.phone;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subpassword;
    var message = e.detail.value.yzm;

    // 再次对用户输入信息进行判断
    // 检测电话
    var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    var _reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/;
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
        phoneNum: phoneNum,
        phoneErrMsg: '',
        phoneFlag: 1
      });
    }
    // 检测验证码是否为空
    if (!message) {
      that.setData({
        yzmErrMsg: '*请输入验证码！',
        yzmFlag: 0
      });
    } else {
      that.setData({
        yzmErrMsg: '',
        yzmFlag: 1
      });
    }
    // 检测密码
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
        password: password,
        passwordErrMsg: '',
        passwordFlag: 1
      });
    }
    // 检测重复密码
    if (!subPassword) {
      that.setData({
        passwordAgainErrMsg: '*密码不能为空!',
        passwordAgainFlag: 0
      });
    } else if (password != subPassword) {
      // 比较两次输入的密码是否一致
      that.setData({
        passwordAgainErrMsg: '*输入密码不一致!',
        passwordAgainFlag: 0
      });
    } else {
      that.setData({
        passwordAgainErrMsg: '',
        passwordAgainFlag: 1
      });
    }

    var base64_wxlie = app.strencode(timestamp + ',' + phoneNum + ',' + password + ',' + subPassword + ',' + message);
    var params = {
      action: 'getpass',
      wxlie: base64_wxlie
    };
    if (that.data.phoneFlag == 1 && that.data.yzmFlag == 1 && that.data.passwordFlag == 1 && that.data.passwordAgainFlag == 1) {
      Req.POST(URL.REGISTER, {
        params: params,
        success: function (res) {
          if (res.data.status == 1) {
            // 本地缓存 用户 信息
            // 开始存储时的时间戳
            var timestamp = Date.parse(new Date()) / 1000;
            // 设置信息存储时间
            var expiration = timestamp + 2592000;
            wx.setStorageSync('userInfo', res.data);
            wx.setStorageSync('userInfo_expiration', expiration);
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2500
            });
            // 登陆成功后返回原页面
            app.globalData.pageid == 'brand' ? wx.switchTab({ url: '../brand/brand' }) : wx.switchTab({ url: '../product/product' });
          } else {
            if (res.data.msg) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              });
            } else {
              wx.showToast({
                title: '修改失败，请检查信息是否正确！',
                icon: 'none',
                duration: 3000
              });
            }
          }
        },
        fail: function (res) { },
        complete: function (res) { }
      })
    } else {
      wx.showToast({
        title: '修改失败，请检查信息是否完整！',
        icon: 'none',
        duration: 3000
      });
    }
    // 点击登录按钮 输入框清空
    that.setData({
      // 每次点击登录按钮后 重置错误标识 防止提交错误登录信息
      phoneFlag: 0,
      yzmFlag: 0,
      passwordFlag: 0,
      passwordAgainFlag: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isDisabled: true,
      phoneNum: '',
      message: '',
      password: '',
      passwordAgain: ''
    });
  }
})