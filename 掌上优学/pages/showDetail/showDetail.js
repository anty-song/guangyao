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
    item: {},
    bestComment:{},
    hotComments:[],
    otherComments:[],
    totalComments: 0,
    hotCommentsHide:false,
    otherCommentsHide:false,
    bestCommentHide:true,
    commentInputValue: ''
  },
  onLoad: function(){
    var that=this;
    // 获取上级页面秀的内容
    that.setData({
      item: app.globalData.itemData,
      otherCommentsHide: false
    });
    console.log(that.data.item)
    // 获取评论
    Req.POST(API.SHOW_COMMENTS, {
      params: {itemid:that.data.item.itemid},
      success: function(res){
        console.log(res)
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
  toggleCollect: function() {
    this.setData({
      isCollected: !this.data.isCollected
    })
  },
  toggleLike: function(e) {
    console.log(this)
    var isLike = this.data.isLike,
        likeNum = this.data.likeNum;
    likeNum = isLike ? likeNum - 1 : likeNum + 1;
    this.setData({
      isLike: !isLike,
      likeNum: likeNum
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
    // 
    var that = this;
    console.log(wx.getStorageSync('userAccount'))
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
        console.log(res);
        that.setData({
          commentInputValue: null
        });
        that.onLoad();
      },
      fail: function(res){},
      complete: function(){}
    })
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