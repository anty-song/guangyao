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
    selected: 'list-bar',
    goList: '',
    goRank: 'goRank',
    goRules: 'goRules',
    // 跑马灯提示信息
    changeLeft: 0,
    // 页面背景图片
    bgPic: '',
    // 通用数据
    activeData: {},
    // 活动状态 开始/结束/进行
    activeState: '',
    // 数据容器
    list: [],
    // 轮播图
    imgUrls: [],
    // 倒计时
    time: '',
    // 分页起始页
    page: 1,
    // 是否还有分页的判断
    isPage: true,
    hint: '正在加载',
    // 投票结果弹窗
    resHide: true,
    res: {},
    // 搜索框输入
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
    var self = this;
    // 初始化设置
    self.setData({
      list: [],
      page: 1,
      hint: '正在加载',
      isPage: true
    });
    // 控制跑马灯
    // setInterval(function(){
    //   var left = self.data.changeLeft;
    //   if (left >= -1100) {
    //     self.setData({
    //       changeLeft: left - 10
    //     });
    //   } else {
    //     left = 750;
    //     self.setData({
    //       changeLeft: left - 10
    //     });
    //   }
    // }, 100);
    var params = {
      itemid: app.globalData.itemid,
      key: self.data.searchValue
    };
    Req.POST(URL.ACTIVE, {
      params: params,
      success: function (res) {
        console.log('success')
        console.log(res)
        // 设置导航标题
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        });
        self.setData({
          list: res.data.list,
          activeData: res.data.data,
          imgUrls: res.data.data.thumbs,
          bgPic: res.data.data.bgpic
        });
        // 若活动未结束则实现倒计时功能
        if (res.data.data.othertime) {
          var time = res.data.data.othertime;
          setInterval(function(){
            time--;
            var days = parseInt(time / 60 / 60 / 24);
            var hours = parseInt(time / 60 / 60 % 24);
            var minutes = parseInt(time / 60 % 60);
            var seconds = parseInt(time % 60);
            self.setData({
              time: days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            });
          },1000);
        }
        // 判断活动状态
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
      fail: function() {},
      complete: function() {
        wx.hideLoading();
        console.log('complete')
      }
    })
  },
  goList: function() {
    wx.redirectTo({
      url: '../active/active'
    });
  },
  goRank: function () {
    wx.redirectTo({
      url: '../rank/rank'
    });
  },
  goRules: function () {
    wx.redirectTo({
      url: '../rules/rules'
    });
  },
  goItemPage: function(e) {
    console.log(e)
    app.globalData.voteitemid = e.currentTarget.dataset.voteitemid;
    wx.navigateTo({
      url: '../item/item',
    });
  },

  /**
   * 投票/点赞/支持
   */
  handler: function(e) {
    app.globalData.voteitemid = e.currentTarget.dataset.voteitemid;
    var self = this;
    var votetype = self.data.activeData.votetype;
    var timestamp = parseInt(new Date().getTime() / 1000);
    var itemId = app.globalData.itemid;
    var voteId = app.globalData.voteitemid;
    var openId = app.globalData.openId;
    var random = '';
    var inputValue = '';
    // 判断投票方式
    switch (votetype) {
      // 不限
      case 1:
        break;
      // 仅限登录用户
      case 2:
        break;
      // 指定用户
      case 3:
        break;
      // 验证码投票
      case 4:
        // 获取验证码

        break;
      // 口令投票
      case 5:
        break;
    }
    // var random = Math.floor(Math.random() * 1000000000000000);
    console.log(timestamp + '\n' + itemId + '\n' + voteId + '\n' + openId + '\n' + inputValue + '\n' + random)
    var wxline = app.strencode(timestamp + ',' + itemId + ',' + voteId + ',' + openId + ',' + inputValue + ',' + random);
    console.log(wxline)
    var params = {
      wxlie: wxline
    }
    Req.POST(URL.VOTE, {
      params: params,
      success: function (res) {
        console.log(res);
        self.setData({
          res: res.data,
          resHide: false
        });
        if(res.data.code == 1) {
          self.onLoad();
        }
      },
      fail: function() {},
      complete: function() {}
    })
  },

  /**
   * 复制链接
   */
  copyLink: function() {
    wx.setClipboardData({
      data: 'www.10pinping.com',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },

  /**
   * 关闭结果显示弹窗
   */
  closeRes: function() {
    var self = this;
    self.setData({
      resHide: true
    })
  },

  /**
   * 获取输入框的值
   */
  getSearchValue: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  /**
   * 输入框输入搜索
   */
  search: function() {
    var self = this;
    var key = self.data.searchValue;
    var itemid = app.globalData.itemid;
    var params = {
      itemid: itemid,
      key: key
    };
    if (key) {
      Req.POST(URL.ACTIVE, {
        params: params,
        success: function(res) {
          console.log(res);
          self.setData({
            list: res.data.list
          })
        },
        fail: function() {},
        complete: function() {}
      });
    } else {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
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
    self.setData({
      page: page + 1
    });
    if (!self.data.searchValue) {
      if (isPage) {
        Req.POST(URL._ACTIVE, {
          params: {
            itemid: app.globalData.itemid,
            page: self.data.page
          },
          success: function(res) {
            if (res.data.endpage == 1) {
              var itemList = self.data.list;
              var otherList = res.data.list;
              for (var i = 0; i < otherList.length; i++) {
                itemList.push(otherList[i]);
              }
              self.setData({
                list: itemList
              });
            } else if (res.data.endpage == 2) {
              var endList = self.data.list;
              var otherList = res.data.list;
              for (var i = 0; i < otherList.length; i++) {
                endList.push(otherList[i]);
              }
              self.setData({
                list: endList,
                hint: '我也是有底线的哟',
                isPage: false
              });
            }
          },
          fail: function() {},
          complete: function() {}
        });
      }
    } else {
      self.setData({
        hint: '我也是有底线的哟'
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})