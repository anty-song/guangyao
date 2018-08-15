// pages/commentsDetail/commentsDetail.js
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
    commentData: null,
    childCommentsData: null,
    replyInputValue: null,
    atName: '',
    isfocus: false,
    currentid:null,
    page:1,
    hint:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取上级页面秀的内容
    that.setData({
      replyInputValue: null,
      commentData: app.globalData.commentData,
      atName: '',
      isfocus: false,
      page:1,
      hint:''
    });
    Req.POST(API.SHOW_CHILDCOMMENTS, {
      params: {
        commentid: app.globalData.commentData.commentid,
        userid: wx.getStorageSync('userAccount').userid
      },
      success: function(res){
        that.setData({
          commentData: res.data.comment,
          childCommentsData: res.data.data
        })
      },
      fail: function(){},
      complete: function(){}
    })
  },
  getCommentInfo: function (e) {
    var images = [];
    for (var i of e.target.dataset.images) {
      var item = i.replace(/\.thumb\..*/, '');
      images.push(item);
    }
    wx.previewImage({ urls: images });
  },
  getChildCommentInfo: function (e) {
    var images = [];
    for (var i of e.target.dataset.images) {
      var item = i.replace(/\.thumb\..*/, '');
      images.push(item);
    }
    wx.previewImage({ urls: images });
  },
  // 评论点赞
  commentLike: function (e) {
    var that = this;
    var commentid = e.currentTarget.dataset.commentid;
    var ctype = e.currentTarget.dataset.type;
    if (wx.getStorageSync('userAccount')) {
      // 时间戳
      var timestamp = Date.parse(new Date()) / 1000;
      // userid
      var userid = wx.getStorageSync('userAccount').userid;
      // 加密字符串
      var auth = wx.getStorageSync('userAccount').auth;
      var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
      Req.POST(API.COMMENTLIKE, {
        params: {
          paramData: paramData,
          commentid: commentid,
          isagree: 1
        },
        success: function (res) {
          if (res.data.status == 2) {
            wx.showToast({
              title: 'relogin',
              icon: 'none'
            });
            app.globalData.relogin = true;
            wx.switchTab({
              url: '../user/user',
            });
          } else {
            var commentData = that.data.commentData;
            commentData['isagree']=1;
            commentData['agrees'] = commentData['agrees']-0+1;
            that.setData({
              commentData: commentData
            })
          }
        },
        fail: function (res) { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: '请登录后操作',
        icon: 'none'
      });
      app.globalData.relogin = true;
      wx.switchTab({
        url: '../user/user',
      });
    }
  },
  // 评论取消点赞
  commentUnLike: function (e) {
    var that = this;
    var commentid = e.currentTarget.dataset.commentid;
    var ctype = e.currentTarget.dataset.type;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.COMMENTLIKE, {
      params: {
        paramData: paramData,
        commentid: commentid,
        isagree: 0
      },
      success: function (res) {
        if (res.data.status == 2) {
          wx.showToast({
            title: 'relogin',
            icon: 'none'
          });
          app.globalData.relogin = true;
          wx.switchTab({
            url: '../user/user',
          });
        } else {
          var commentData = that.data.commentData;
          commentData['isagree'] = 0;
          commentData['agrees'] = commentData['agrees'] - 1;
          that.setData({
            commentData: commentData
          })
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 子评论点赞
  commentChildLike: function(e){
    var that = this;
    if (wx.getStorageSync('userAccount')) {
      // 时间戳
      var timestamp = Date.parse(new Date()) / 1000;
      // userid
      var userid = wx.getStorageSync('userAccount').userid;
      // 加密字符串
      var auth = wx.getStorageSync('userAccount').auth;
      var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
      Req.POST(API.COMMENTLIKE, {
        params: {
          paramData: paramData,
          commentid: e.currentTarget.dataset.commentid,
          isagree: 1
        },
        success: function (res) {
          // 重新登录
          if (res.data.status == 2) {
            wx.showToast({
              title: 'relogin',
              icon: 'none'
            });
            app.globalData.relogin = true;
            wx.switchTab({
              url: '../user/user',
            });
            // 不需重新登录
          } else {
            // 添加判断
            var id = e.currentTarget.dataset.commentid;
            var childCommentsData = that.data.childCommentsData;
            for (var i = 0; i < childCommentsData.length;i++){
              if (childCommentsData[i]['commentid']==id){
                childCommentsData[i]['isagree']=1;
                childCommentsData[i]['agrees'] = childCommentsData[i]['agrees']-0+1;
                that.setData({
                  childCommentsData: childCommentsData
                })
              }
            }
          }
        },
        fail: function (res) { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: '请登录后操作',
        icon: 'none'
      });
      app.globalData.relogin = true;
      wx.switchTab({
        url: '../user/user',
      });
    }
  },
  // 子评论取消点赞
  commentChildUnLike: function(e){
    var that=this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.COMMENTLIKE, {
      params: {
        paramData: paramData,
        commentid: e.currentTarget.dataset.commentid,
        isagree: 0
      },
      success: function (res) {
        // 重新登录
        if (res.data.status == 2) {
          wx.showToast({
            title: 'relogin',
            icon: 'none'
          });
          app.globalData.relogin = true;
          wx.switchTab({
            url: '../user/user',
          });
          // 不需重新登录
        } else {
          // 添加判断
          var id = e.currentTarget.dataset.commentid;
          var childCommentsData = that.data.childCommentsData;
          for (var i = 0; i < childCommentsData.length; i++) {
            if (childCommentsData[i]['commentid'] == id) {
              childCommentsData[i]['isagree'] = 0;
              childCommentsData[i]['agrees'] = childCommentsData[i]['agrees'] - 1;
              that.setData({
                childCommentsData: childCommentsData
              })
            }
          }
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 获取回复内容
  bindKeyInput: function(e){
    this.setData({
      replyInputValue: e.detail.value
    })
  },
  // 回复
  sendReply: function(e){
    var that = this;
    if (that.data.replyInputValue){
      // 判断是否登录
      if (wx.getStorageSync('userAccount')) {
        // 时间戳
        var timestamp = Date.parse(new Date()) / 1000;
        // userid
        var userid = wx.getStorageSync('userAccount').userid;
        var auth = wx.getStorageSync('userAccount').auth;
        var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
        var currentid=that.data.currentid;
        if(currentid){
          Req.POST(API.SENDCOMMENT, {
            params: {
              paramData: paramData,
              replycommentid: currentid,
              comment: that.data.replyInputValue
            },
            success: function (res) {
              if (res.data.status == 2) {
                wx.showToast({
                  title: 'relogin',
                  icon: 'none'
                });
                app.globalData.relogin = true;
                wx.switchTab({
                  url: '../user/user',
                });
              } else {
                that.setData({
                  replyInputValue: null
                });
                that.onLoad();
              }
            },
            fail: function (res) { },
            complete: function () { }
          });
        } else {
          Req.POST(API.SENDCOMMENT, {
            params: {
              paramData: paramData,
              commentid: that.data.commentData.commentid,
              comment: that.data.replyInputValue
            },
            success: function (res) {
              if (res.data.status == 2) {
                wx.showToast({
                  title: 'relogin',
                  icon: 'none'
                });
                app.globalData.relogin = true;
                wx.switchTab({
                  url: '../user/user',
                });
              } else {
                that.setData({
                  replyInputValue: null
                });
                that.onLoad();
              }
            },
            fail: function (res) { },
            complete: function () { }
          });
        }
      } else {
        wx.showToast({
          title: '请登录后操作',
          icon: 'none'
        });
        app.globalData.relogin = true;
        wx.switchTab({
          url: '../user/user',
        });
      }
    } else {
      wx.showToast({
        title: '请输入回复内容',
        icon: 'none'
      });
    }
  },
  wakeUpInput: function(e){
    var that = this;
    var atName = e.currentTarget.dataset.otheruser;
    var currentCommentid = e.currentTarget.dataset.currentid;
    that.setData({
      currentid: currentCommentid,
      atName: atName,
      isfocus: true
    })
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function (e) {
    var that = this;
    var page = that.data.page;
    var childCommentsData = that.data.childCommentsData;
    // 获取评论
    Req.POST(API.SHOW_CHILDCOMMENTS, {
      params: {
        commentid: app.globalData.commentData.commentid,
        userid: wx.getStorageSync('userAccount').userid,
        page: page + 1
      },
      success: function (res) {
        if (!res.data.data.length) {
          // 添加无更多评论显示
          that.setData({
            hint: '到底了'
          })
        } else {
          that.setData({
            hint: '加载中',
            page: page + 1
          });
          for (var i = 0; i < res.data.data.length; i++) {
            childCommentsData.push(res.data.data[i]);
          }
          that.setData({
            childCommentsData: childCommentsData
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  }
})