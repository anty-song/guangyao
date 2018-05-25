// pages/braRank/braRank.js

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
    list: [],
    page: 1,
    hint: '',
    isHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 确认 页面入口 是分享
    if(options){
      if(options.num){
        wx.navigateTo({
          url: '../braRankItem/braRankItem'
        });
      }
    }
    var that = this;
    var page = that.data.page;
    var params = {
      action: 'list',
      page: page
    };
    Req.POST(URL.BRARANK, {
      params: params,
      success: function (res) {
        var itemList = that.data.list;
        // 判断若 data 不为 0 则将数据添加到容器中
        if (res.data.data == "1") {
          
          // 不能直接将拿到的数据赋值给容器（这里指data中的list）
          // 否则出现加载的新数据覆盖旧的数据 所以 在容器有旧数据的前提下向其中
          // 添加新数据 一直 push 不要有赋值操作

          for (var i = 0; i < res.data.list.length; i++) {
            itemList.push(res.data.list[i]);
          }
          that.setData({
            list: itemList
          });
        } else {

          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            list: itemList,
            hint: "暂无数据"
          })
        }
      },
      fail: function (res) {},
      complete: function(res){}
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  /**
   * 全局获取 itemid title 显示榜单列表
   */
  showItemList: function(e) {
    app.globalData.itemid = e.currentTarget.dataset.itemid;
    app.globalData.title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../braRankItem/braRankItem'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      page: 1,
      list: []
    });
    that.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({
      hint: "正在加载"
    })
    var page = that.data.page;
    that.setData({
      page: page + 1
    })
    var params = {
      action: "list",
      page: page + 1
    };
    Req.POST(URL.BRARANK, {
      params: params,
      success: function (res) {
        var itemList = that.data.list;
        if (res.data.data == "1") {

          // 不能直接将拿到的数据赋值给容器（这里指data中的list）
          // 否则出现加载的新数据覆盖旧的数据 所以 在容器有旧数据的前提下向其中
          // 添加新数据 一直 push 不要有赋值操作

          for (var i = 0; i < res.data.list.length; i++) {
            itemList.push(res.data.list[i]);
          }
          that.setData({
            list: itemList
          });
        } else {
          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            list: itemList,
            hint: "我也是有底线的哟"
          })
        }
      },
      fail: function (res) {
        // do fail
      },
      complete: function (res) { }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "十大品牌榜单",
      path: '/pages/find/find?key=brand',
      imageUrl: '../../images/share_img.png',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        });
      },
      fail: function (res) {
        // do fail
      }
    }
  }
})