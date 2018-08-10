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
    isfocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取上级页面秀的内容
    console.log(app.globalData.commentData)
    that.setData({
      replyInputValue: null,
      commentData: app.globalData.commentData,
      atName: '',
      isfocus: false
    });
    Req.POST(API.SHOW_CHILDCOMMENTS, {
      params: {
        commentid: app.globalData.commentData.commentid,
        userid: wx.getStorageSync('userAccount').userid  
      },
      success: function(res){
        console.log(res);
        that.setData({
          commentData: res.data.comment,
          childCommentsData: res.data.data
        })
      },
      fail: function(){},
      complete: function(){}
    })
  },
  // 评论点赞
  commentLike: function (e) {
    var that = this;
    var commentid = e.currentTarget.dataset.commentid;
    console.log(commentid)
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
          console.log(res)
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
            console.log(commentData)
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
        console.log(res)
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
          console.log(commentData)
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
          console.log(res)
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
        console.log(res)
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
  sendReply: function(){
    var that = this;
    console.log(wx.getStorageSync('userAccount'))
    if (that.data.replyInputValue){
      // 判断是否登录
      if (wx.getStorageSync('userAccount')) {
        // 时间戳
        var timestamp = Date.parse(new Date()) / 1000;
        // userid
        var userid = wx.getStorageSync('userAccount').userid;
        var auth = wx.getStorageSync('userAccount').auth;
        var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
        console.log(paramData + '\n' + that.data.commentData.commentid + '\n' + that.data.replyInputValue)
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
              console.log(res);
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
    that.setData({
      atName: atName,
      isfocus: true
    })
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