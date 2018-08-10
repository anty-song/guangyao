// pages/showDetail/showDetail.js
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
    collectHide: false,
    item: null,
    bestComment:null,
    hotComments:null,
    otherComments:null,
    totalComments: null,
    hotCommentsHide:false,
    otherCommentsHide:false,
    bestCommentHide:true,
    commentInputValue: null
  },
  // 初始化
  onLoad: function(){
    var that=this;
    that.setData({
      item: app.globalData.itemData,
      otherCommentsHide: false
    });
    console.log(that.data.item)
    // 获取评论
    Req.POST(API.SHOW_COMMENTS, {
      params: { userid: wx.getStorageSync('userAccount').userid,itemid:that.data.item.itemid},
      success: function(res){
        console.log(res)
        that.setData({
          item: res.data.detail,
          otherCommentsHide: false
        });
        if(res.data.data==[]){
          // 添加无评论显示
        } else {
          var otherComments = [];
          var hotComments = [];
          var comments = res.data.data;
          for(var i=0; i<comments.length;i++){
            switch (comments[i].type) {
              case 0:
                otherComments.push(comments[i]);
                console.log(otherComments)
                that.setData({
                  otherComments: otherComments,
                  totalComments: res.data.comments
                });
                break;
              case 1:
                var bestComment = comments[i]
                that.setData({
                  bestComment: bestComment
                });
                break;
              case 2:
                hotComments.push(comments[i]);
                that.setData({
                  hotComments: hotComments
                });
                break;
            }
          }
          // 没有热门评论 则隐藏该模块
          if (!hotComments.length){
            that.setData({
              hotCommentsHide: true
            });
          }
          // 没有其他评论 则隐藏该模块
          if (!otherComments.length) {
            console.log('dddddd')
            that.setData({
              otherCommentsHide: true
            });
          }
          if (bestComment) {
            that.setData({
              bestCommentHide: false
            });
          }
        }
      },
      fail: function(){},
      complete: function(){}
    })
  },
  onShow: function(){
    this.onLoad()
  },
  // 秀点赞
  likeComment: function (e) {
    var that = this;
    if (wx.getStorageSync('userAccount')){
      // 时间戳
      var timestamp = Date.parse(new Date()) / 1000;
      // userid
      var userid = wx.getStorageSync('userAccount').userid;
      // 加密字符串
      var auth = wx.getStorageSync('userAccount').auth;
      var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
      Req.POST(API.LIKE, {
        params: {
          paramData: paramData,
          itemid: e.currentTarget.dataset.itemid,
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
            var id = e.currentTarget.dataset.itemid;
            var item = that.data.item;
            item['isagree'] = 1;
            item['agrees'] = item['agrees'] - 0 + 1;
            that.setData({
              item: item
            });
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
  // 秀取消点赞
  unLikeComment: function (e) {
    var that = this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.LIKE, {
      params: {
        paramData: paramData,
        itemid: e.currentTarget.dataset.itemid,
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
          var id = e.currentTarget.dataset.itemid;
          var item = that.data.item;
          item['isagree'] = 0;
          item['agrees'] = item['agrees'] - 1;
          that.setData({
            item: item
          });
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 评论点赞
  commentLike: function(e){
    var that=this;
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
            switch (ctype) {
              // 普通评论
              case 0:
                var otherComments = that.data.otherComments;
                console.log(otherComments)
                for(var i=0;i<otherComments.length;i++){
                  if(otherComments[i]['commentid']==commentid){
                    console.log(i)
                    otherComments[i]['isagree']=1;
                    otherComments[i]['agrees'] = otherComments[i]['agrees']-0+1;
                    that.setData({
                      otherComments: otherComments
                    })
                  }
                }
                break;
              // 最佳
              case 1:
                var bestComment = that.data.bestComment;
                bestComment['isagree']=1;
                bestComment['agrees'] = bestComment['agrees']-0+1;
                that.setData({
                  bestComment: bestComment
                });
                break;
              // 热门
              case 2:
                var hotComments = that.data.hotComments;
                for (var i = 0; i < hotComments.length; i++) {
                  if (hotComments[i]['commentid'] == commentid) {
                    hotComments[i]['isagree'] = 1;
                    hotComments[i]['agrees'] = hotComments[i]['agrees'] - 0 + 1;
                    that.setData({
                      hotComments: hotComments
                    })
                  }
                }
                break;
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
  // 评论取消点赞
  commentUnLike: function(e){
    var that=this;
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
          console.log(ctype)
          switch (ctype) {
            // 普通评论
            case 0:
              var otherComments = that.data.otherComments;
              for (var i = 0; i < otherComments.length; i++) {
                if (otherComments[i]['commentid'] == commentid) {
                  otherComments[i]['isagree'] = 0;
                  otherComments[i]['agrees'] = otherComments[i]['agrees'] - 1;
                  that.setData({
                    otherComments: otherComments
                  })
                }
              }
              break;
            // 最佳
            case 1:
              var bestComment = that.data.bestComment;
              bestComment['isagree'] = 0;
              bestComment['agrees'] = bestComment['agrees'] - 1;
              that.setData({
                bestComment: bestComment
              });
              break;
            // 热门
            case 2:
              var hotComments = that.data.hotComments;
              for (var i = 0; i < hotComments.length; i++) {
                if (hotComments[i]['commentid'] == commentid) {
                  hotComments[i]['isagree'] = 0;
                  hotComments[i]['agrees'] = hotComments[i]['agrees'] - 1;
                  that.setData({
                    hotComments: hotComments
                  })
                }
              }
              break;
          }
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 收藏
  collect: function () {
    var that = this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.COLLECT, {
      params: {
        paramData: paramData,
        itemid: that.data.item.itemid,
        iscollection: 1
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
          var item = that.data.item;
          item['iscollection'] = 1;
          that.setData({
            item: item
          });
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 取消收藏
  cancelCollect: function () {
    var that = this;
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.COLLECT, {
      params: {
        paramData: paramData,
        itemid: that.data.item.itemid,
        iscollection: 0
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
          var item = that.data.item;
          item['iscollection'] = 0;
          that.setData({
            item: item
          });
        }
      },
      fail: function (res) { },
      complete: function () { }
    })
  },
  // 获取评论框中的内容
  bindKeyInput: function(e) {
    this.setData({
      commentInputValue: e.detail.value
    })
  },
  // 发表评论
  sendComments: function(){
    var that = this;
    console.log(wx.getStorageSync('userAccount'))
    // 判断是否登录
    if (wx.getStorageSync('userAccount')) {
      // 时间戳
      var timestamp = Date.parse(new Date()) / 1000;
      // userid
      var userid = wx.getStorageSync('userAccount').userid;
      var auth = wx.getStorageSync('userAccount').auth;
      var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
      console.log(paramData + '\n' + that.data.item.itemid + '\n' + that.data.commentInputValue)
      Req.POST(API.SENDCOMMENT, {
        params: {
          paramData: paramData,
          itemid: that.data.item.itemid,
          comment: that.data.commentInputValue
        },
        success: function(res){
          if(res.data.status==2){
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
              commentInputValue: null
            });
            that.onLoad();
          }
        },
        fail: function(res){},
        complete: function(){}
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
  // 向下一层传递数据
  transferData: function(e){
    app.globalData.commentData = e.currentTarget.dataset.commentdata;
  },
  // 预览图片
  getInfo: function (e) {
    var images = [];
    for (var i of e.target.dataset.images) {
      var item = i.replace(/\.thumb\..*/, '');
      images.push(item);
    }
    wx.previewImage({ urls: images });
  },
})