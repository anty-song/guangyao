// pages/list/list.js
var URL = require('../../utils/config.default.js');
var Req = require("../../utils/request.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],           // 数据容器
    searchedLists: [],
    page: 1,            // 网络请求 分页加载 初始第一页
    hint: "",           // 底部提示信息
    inputValue: ''      // 拿到搜索框用户输入内容
  },
  /**
  * 搜索框搜索
  */
  bindKeyInput: function (e) {
    var that = this;
    that.setData({
      hint: "正在加载",
      inputValue: e.detail.value
    })
    var params = {
      action: "getcat14",
      page: 1,
      keyword: that.data.inputValue
    };
    Req.POST(URL.PRODUCT, {
      params: params,
      success: function (res) {

        var itemList = res.data.list;

        // 这里应将拿到的数据直接 赋值 给容器（这里指data中的list）
        // 使加载的新数据覆盖旧的数据 

        that.setData({
          list: itemList,
          searchedLists: itemList
        });
        if (!res.data.ispage) {
          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            hint: "暂无其他数据"
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
   * 点击更多 实现页面跳转 到投票页
   */
  showMore: function (e) {
    var catid = e.currentTarget.dataset.catid;
    var catname = e.currentTarget.dataset.catname;
    app.globalData.catid = catid;
    app.globalData.catname = catname;
    wx.navigateTo({
      url: "../proVote/proVote"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断小程序入口是否是 分享页面
    if(options){
      if (options.catid) {
        app.globalData.catid = options.catid;
        app.globalData.catname = options.catname;
        wx.navigateTo({
          url: "../proVote/proVote"
        });
      }
    }
    var that = this;
    that.setData({
      hint: "正在加载"
    })
    var page = that.data.page
    var params = {
      action: "getcat14",
      page: page,
      keyword: that.data.inputValue
    };
    Req.POST(URL.PRODUCT, {
      params: params,
      success: function (res) {
        if (res.data.ispage) {
          var itemList = that.data.list;

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
            hint: "暂无数据"
          })
        }
      },
      fail: function (res) {},
      complete: function (res) {
        // wx.hideLoading();
      }
    });
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /*
  * 上拉刷新 请求更多数据
  */
  onReachBottom: function (e) {
    var that = this;
    var page = that.data.page;
    that.setData({
      hint: "正在加载",
      page: page + 1
    })
    var params = {
      action: "getcat14",
      page: page + 1,
      keyword: that.data.inputValue
    };
    Req.POST(URL.PRODUCT, {
      params: params,
      success: function (res) {
        if (res.data.ispage) {
          var itemList = that.data.list;

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list: [],
      searchedLists: [],
      page: 1            // 网络请求 分页加载 初始第一页
    });
    if (that.data.inputValue) {
      var params = {
        action: "getcat14",
        page: 1,
        keyword: that.data.inputValue
      };
      Req.POST(URL.BRAND, {
        params: params,
        success: function (res) {
          var itemList = res.data.list;

          // 这里应将拿到的数据直接 赋值 给容器（这里指data中的list）
          // 使加载的新数据覆盖旧的数据 

          that.setData({
            list: itemList,
            searchedLists: itemList
          });
          if (!res.data.ispage) {
            // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
            that.setData({
              hint: "暂无其他数据"
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { }
      });
      that.setData({
        list: that.data.searchedLists
      });
    } else {
      that.onLoad();
    }
    // 请求数据后停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: "十佳产品",
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
        })
      },
      fail: function (res) {
        // do fail
      }
    }
  }
})