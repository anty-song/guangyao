// pages/tiePhone/tiePhone.js
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
    phoneNum: null,
    yzmValue: null,
    hint:"发送验证码",
    phoneErrMsg: '',
    isDisabled: true,
    errMsgHide: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getPhoneValue: function(e){
    var that = this;
    var phoneNum = e.detail.value;
    var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    if (!phoneNum) {
      that.setData({
        phoneErrMsg: '*手机号码不能为空！',
        isDisabled: true,
        errMsgHide: false
      });
    } else if (!reg.test(phoneNum)) {
      that.setData({
        phoneErrMsg: '*请输入正确的手机号码！',
        isDisabled: true,
        errMsgHide: false
      });
    } else {
      that.setData({
        phoneNum: phoneNum,
        isDisabled: false,
        errMsgHide: true
      });
    }
  },
  getYzmValue: function(e){
    this.setData({
      yzmValue: e.detail.value
    });
  },
  sendYZM: function(){
    var that = this;
    var count = 60;
    var timestamp = Date.parse(new Date()) / 1000;
    var phoneNum = that.data.phoneNum;
    var paramData = app.strencode(timestamp+','+phoneNum);
    Req.POST(API.USER_SENDYZM, {
      params: {
        paramData: paramData
      },
      success: function(res){
        console.log(res)
        clearInterval(timer);
        var timer = setInterval(function () {
          if (count > 0) {
            count--;
            that.setData({
              isDisabled: true,
              hint: count + "s"
            });
          } else {
            that.setData({
              isDisabled: false,
              hint: "重新获取"
            });
            count = 60;
            clearInterval(timer);
          }
        }, 1000);
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        });
      },
      fail: function(){},
      complete: function(){}
    })
  },
  confirm: function(){
    var that = this;
    var timestamp = Date.parse(new Date()) / 1000;
    var openID = app.globalData.openId;
    var phoneNum = that.data.phoneNum;
    var yzmValue = that.data.yzmValue;
    var paramData = app.strencode(timestamp + ',' + openID + ',' + phoneNum + ',' + yzmValue);
    Req.POST(API.USER_BIND, {
      params: {
        paramData: paramData
      },
      success: function (res) {
        console.log(res);
        if(res.data.status==1){
          wx.navigateBack({
            delta:1
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  }
})