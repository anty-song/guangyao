// 获取API
var URL = require('../../utils/interface.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部选项条
    selected: 'rank-bar',
    goList: 'goList',
    goRank: '',
    goRules: 'goRules',
    // 跑马灯提示信息
    changeLeft: 0,
    // 页面背景图片
    bgPic: '',
    // 除列表数据之外的数据
    activeData: {},
    // 活动状态 开始/结束/进行
    activeState: '',
    // 轮播图
    imgUrls: [],
    // 倒计时时间
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var itemid = app.globalData.itemid;
    // 控制跑马灯
    setInterval(function () {
      var left = self.data.changeLeft;
      if (left >= -1100) {
        self.setData({
          changeLeft: left - 10
        });
      } else {
        left = 750;
        self.setData({
          changeLeft: left - 10
        });
      }

    }, 100);
    var params = {
      itemid: itemid
    };
    Req.POST(URL.RANK, {
      params: params,
      success: function (res) {
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        });
        console.log(res)
        self.setData({
          list: res.data.list,
          activeData: res.data.data,
          imgUrls: res.data.data.thumbs,
          bgPic: res.data.data.bgpic
        });
        if (res.data.data.othertime) {
          var time = res.data.data.othertime;
          setInterval(function () {
            time--;
            var days = parseInt(time / 60 / 60 / 24);
            var hours = parseInt(time / 60 / 60 % 24);
            var minutes = parseInt(time / 60 % 60);
            var seconds = parseInt(time % 60);
            self.setData({
              time: days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            });
          }, 1000);
        }
        switch (res.data.data.isend) {
          case 1:
            self.setData({
              activeState: '距活动开始还有'
            });
            break;
          case 2:
            self.setData({
              activeState: '活动已结束'
            });
            break;
          case 3:
            self.setData({
              activeState: '距活动开始还有'
            });
            break;
        };

      },
      fail: function () { },
      complete: function () { }
    });
  },
  goList: function () {
    wx.redirectTo({
      url: '../active/active'
    })
  },
  goRank: function () {
    wx.redirectTo({
      url: '../rank/rank'
    })
  },
  goRules: function () {
    wx.redirectTo({
      url: '../rules/rules'
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})