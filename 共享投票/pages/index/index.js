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
    // 首页数据分页 默认从第一页渲染
    page: 1,
    // 数据容器
    list: [],
    // 页面底部提示语
    hint: '正在加载',
    // 分页内容
    isPage: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorageSync('id_list', '');
    var self = this;
    // 初始化设置
    self.setData({
      list: [],
      page: 1,
      hint: '正在加载',
      isPage: true
    });
    var page = self.data.page;
    Req.POST(URL.INDEXLIST, {
      params: {
        page: page
      },
      success: function(res) {
        console.log(res)
        console.log(app.globalData)
        if (res.data.status == 1) {
          var itemList = self.data.list;
          for (var i = 0; i < res.data.list.length; i++) {
            itemList.push(res.data.list[i]);
          }
          self.setData({
            list: itemList
          })
        }
      },
      fail: function() {},
      complete: function() {}
    });
  },

  /**
   * 进入二级页面
   */
  goActive: function(e) {
    var self = this;
    var itemid = e.currentTarget.dataset.itemid;
    app.globalData.itemid = itemid;
    var _idList = wx.getStorageSync('id_list') || [];
    
    _idList.reverse().push(itemid);
    console.log('_idList='+_idList)
    // 数组去重
    var idList = [];
    var json = {};
    for (var i = _idList.length-1; i >= 0; i--) {
      if (!json[_idList[i]]) {
        idList.push(_idList[i]);
        json[_idList[i]] = 1;
      }
    }
    wx.setStorageSync('id_list', idList);
    console.log(wx.getStorageSync('id_list'))
    wx.navigateTo({
      url: '../active/active?itemid=' + itemid,
    });
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
    var self = this;
    self.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var page = self.data.page;
    var isPage = self.data.isPage;
    if (isPage) {
      Req.POST(URL.INDEXLIST, {
        params: {
          page: page + 1
        },
        success: function (res) {
          if (res.data.endpage == 1) {
            var itemList = self.data.list;
            for (var i = 0; i < res.data.list.length; i++) {
              itemList.push(res.data.list[i]);
            }
            self.setData({
              list: itemList,
              page: page + 1,
              hint: "正在加载"
            });
          } else if (res.data.endpage == 2) {
            var endList = self.data.list;
            for (var i = 0; i < res.data.list.length; i++) {
              endList.push(res.data.list[i]);
            }
            self.setData({
              list: endList,
              hint: '我也是有底线的哟',
              isPage: false
            });
          }
        },
        fail: function () { },
        complete: function () { }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})