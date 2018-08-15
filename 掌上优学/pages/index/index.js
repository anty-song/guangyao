// 获取API
var API = require('../../utils/api.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
var flag,top;
Page({
  data: {
    scrollTop: 0,
    tiwen_page: 1, // '有问必答'分页 内容默认显示第一页的数据
    quan_page: 1, // '同学圈'分页 内容默认显示第一页的数据
    attention_page: 1, // '关注'分页 内容默认显示第一页的数据
    nearby_page: 1, // '附近'分页 内容默认显示第一页的数据
    startPoint: [0,0], // 下拉刷新时 起始点坐标容器
    isFriend: false, // 朋友圈
    currentTab: 0, // 顶部导航 默认显示第一个 即 ‘有问必答’
    topbarList: [{ title: '有问必答' }, { title: '同学圈' }, { title: '关注' }, { title: '附近' }], // 顶部导航列表
    stagetArray: [], // 上学阶段 年级
    stageIndex: 0, // 默认显示 ‘全部’
    stageIdArray: [], // 年级id数组
    currentStageId: '0', // 当前年级id 默认全部
    subjectArray: [],
    currentSubject: 0,
    currentSubjectId: '0',
    lunboArray: [],
    showData: [], // 秀场列表数据
    isLike: false,
    showDataAttention: [], // 关注列表数据
    defaultAttentionHide: true,
    showDataNearby: [], // 附近列表数据
    defaultNearbyHide: true,
    showDataFriend: [], // 同学圈列表数据
    loadingHide: true,
    collectHide: true,
    isTopLoading: true,
    isBottomLoading: true,
    bottomLoadingHint: '加载中',
    isVideo:false,
    // 刷新首页对应条目数据
    itemdata:null,
    index:0,
  },
  scroll:function(e){if(e.detail.scrollTop>200){top=1;}},
  // 禁止某种情况下的下拉刷新
  goTop:function(e){
    top=1;
  },
  // 页面初始化
  onLoad: function(){
    var that = this;
    if(!that.data.isTopLoading){
      setTimeout(function(){
        that.setData({
          isTopLoading: true
        });
      },0)
    }
    // 页面初始化
    that.setData({
      tiwen_page: 1,
      quan_page: 1,
      guanzhu_page: 1,
      nearby_page: 1,
      defaultNearbyHide: true,
      likeNum: null
    });
    // 年级分类
    Req.POST(API.SHOW_CATEGORY, {
      success: function(res){
        that.setData({
          stageArray: res.data.data.catname,
          stageIdArray: res.data.data.catid
        });
      },
      fail: function(){},
      complete: function(){}
    });
    wx.showShareMenu({
      withShareTicket: true
    });
    that.loadTiwen();
  },
  onReady:function(){
    var that=this;
    if(app.globalData.share){
      Req.POST(API.SHARE, {
        params: {
          itemid: app.globalData.itemid
        },
        success: function (res) {
          // 接口成功 渲染首页对应改变的数据
          if(res.status==1){
            switch (that.data.currentTab) {
              case 0:
                that.onLoad();
                break;
              case 1:
                that.loadFriend();
                break;
              case 2:
                that.loadAttention();
                break;
              case 3:
                wx.getSetting({
                  success: function (res) {
                    if (res.authSetting['scope.userLocation']) {
                      that.loadNearby();
                      // 未开启定位权限
                    } else {
                      that.setData({
                        defaultNearbyHide: false,
                        isTopLoading: true
                      })
                    }
                  }
                });
                break;
            }
          }
        },
        fail: function () { },
        complete: function () { }
      });
    }
  },
  // 这里只用作 手动设置位置权限后 小程序返回刷新的实现
  onShow: function(){
    // 预览图片后防止页面刷新
    if(flag){
      flag=false;
      return;
    }
    var that = this;
    switch (that.data.currentTab) {
      case 0:
        var showData = that.data.showData;
        if (app.globalData.itemData){
          if(that.data.itemdata==app.globalData.itemData){
            return;
          }else{
            showData[that.data.index]=app.globalData.itemData;
            that.setData({
              showData:showData
            });
          }
        }
        break;
      case 1:
        var showDataFriend = that.data.showDataFriend;
        if (app.globalData.itemData) {
          if (that.data.itemdata == app.globalData.itemData) {
            return;
          } else {
            showDataFriend[that.data.index] = app.globalData.itemData;
            that.setData({
              showDataFriend: showDataFriend
            });
          }
        }
        break;
      case 2:
        that.loadAttention();
        break;
      case 3:
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userLocation']) {
              that.loadNearby();
              // 未开启定位权限
            } else {
              that.setData({
                defaultNearbyHide: false,
                isTopLoading: true
              })
            }
          }
        });
        break;
    }
  },
  // 加载有问必答页
  loadTiwen: function(){
    var that = this;
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    // 初始化触底刷新提示
    that.setData({ isBottomLoading: true});
    // 科目分类列表
    Req.POST(API.SUBJECT_CATEGORY, {
      params: {
        catid: that.data.currentStageId
      },
      success: function (res) {
        that.setData({
          subjectArray: res.data.data
        });
      },
      fail: function () { },
      complete: function () { }
    });
    // 推荐页面广告
    Req.POST(API.SHOW_AD, {
      success: function (res) {
        that.setData({
          lunboArray: res.data.data
        });
      },
      fail: function () { },
      complete: function () { }
    });
    // 秀场推荐内容
    Req.POST(API.SHOW_RECOMMEND, {
      params: {
        userid: wx.getStorageSync('userAccount').userid,
        catid: that.data.currentStageId,
        page: 1
      },
      success: function (res) {
        that.setData({
          showData: res.data.data,
          isTopLoading: true
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  // 加载同学圈页
  loadFriend: function(){
    var that = this;
    // 初始化触底刷新提示
    that.setData({ isBottomLoading: true });
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    Req.POST(API.SHOW_RECOMMEND, {
      params: {
        userid: wx.getStorageSync('userAccount').userid,
        catid: that.data.currentStageId,
        xiutype: 2,
        page: 1
      },
      success: function (res) {
        that.setData({
          showDataFriend: res.data.data,
          isTopLoading: true
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  loadAttention: function(){
    var that = this;
    // 初始化触底刷新提示
    that.setData({ isBottomLoading: true });
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    // --------------------登录态判断 TODO
    if (wx.getStorageSync('userAccount')) {
      // 时间戳
      var timestamp = Date.parse(new Date()) / 1000;
      // userid
      var userid = wx.getStorageSync('userAccount').userid;
      // 加密字符串
      var auth = wx.getStorageSync('userAccount').auth;
      var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
      Req.POST(API.SHOW_ATTENTION, {
        params: {
          paramData: paramData,
          page: 1
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
            // 有关注的人
            if (res.data.data.length){
              that.setData({
                showDataAttention: res.data.data,
                isTopLoading: true,
                defaultAttentionHide: true
              });
              // 无关注的人
            } else {
              that.setData({
                defaultAttentionHide: false
              });
            }
          }
        },
        fail: function () { },
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
  // 加载附近页面
  loadNearby: function(){
    var that=this;
    // 初始化触底刷新提示
    that.setData({ isBottomLoading: true, defaultNearbyHide: true });
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    wx.getLocation({
      type: 'wgs84',
      // 位置获取成功回调
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        Req.POST(API.SHOW_NEARBY, {
          params: {
            userid: wx.getStorageSync('userAccount').userid,
            page: that.data.nearby_page,
            catid: that.data.currentStageId,
            weidu: res.latitude,
            jingdu: res.longitude
          },
          success: function (res) {
            that.setData({
              showDataNearby: res.data.data,
              isTopLoading: true
            });
          },
          fail: function (res) { },
          complete: function () { }
        });
      },
      // 处理位置获取失败的情况
      fail: function (res) {
        that.setData({
          defaultNearbyHide: false,
          isTopLoading: true
        });
      }
    });
  },
  // 点赞功能
  likeComment: function(e){
    var that=this;
    if (wx.getStorageSync('userAccount')) {
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
          // 重新登录
          if(res.data.status==2){
            app.globalData.relogin = true;
            wx.showToast({
              title: 'relogin',
              icon: 'none'
            });
            wx.switchTab({
              url: '../user/user',
            });
            // 不需重新登录
          } else {
            // 添加判断
            var id = e.currentTarget.dataset.itemid;
            switch (that.data.currentTab) {
              case 0:
                var showData = that.data.showData;
                for (var i = 0; i < showData.length; i++) {
                  if (showData[i]['itemid'] == id) {
                    showData[i]['isagree'] = 1;
                    showData[i]['agrees'] = showData[i]['agrees'] - 0 + 1;
                    that.setData({
                      showData: showData
                    })
                  }
                }
                break;
              case 1:
                var showDataFriend = that.data.showDataFriend;
                for (var i = 0; i < showDataFriend.length; i++) {
                  if (showDataFriend[i]['itemid'] == id) {
                    showDataFriend[i]['isagree'] = 1;
                    showDataFriend[i]['agrees'] = showDataFriend[i]['agrees'] - 0 + 1;
                    that.setData({
                      showDataFriend: showDataFriend
                    })
                  }
                }
                break;
              case 2:
                var showDataAttention = that.data.showDataAttention;
                for (var i = 0; i < showDataAttention.length; i++) {
                  if (showDataAttention[i]['itemid'] == id) {
                    showDataAttention[i]['isagree'] = 1;
                    showDataAttention[i]['agrees'] = showDataAttention[i]['agrees'] - 0 + 1;
                    that.setData({
                      showDataAttention: showDataAttention
                    })
                  }
                }
                break;
              case 3:
                var showDataNearby = that.data.showDataNearby;
                for (var i = 0; i < showDataNearby.length; i++) {
                  if (showDataNearby[i]['itemid'] == id) {
                    showDataNearby[i]['isagree'] = 1;
                    showDataNearby[i]['agrees'] = showDataNearby[i]['agrees'] - 0 + 1;
                    that.setData({
                      showDataNearby: showDataNearby
                    })
                  }
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
  // 取消点赞
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
        if (res.data.status == 2) {
          wx.showToast({
            title: 'relogin',
            icon: 'none'
          });
          app.globalData.relogin=true;
          wx.switchTab({
            url: '../user/user',
          })
        } else {
          var id = e.currentTarget.dataset.itemid;
          switch (that.data.currentTab) {
            case 0:
              var showData = that.data.showData;
              for (var i = 0; i < showData.length; i++) {
                if (showData[i]['itemid'] == id) {
                  showData[i]['isagree'] = 0;
                  showData[i]['agrees'] = showData[i]['agrees'] - 1;
                  that.setData({
                    showData: showData
                  })
                }
              }
              break;
            case 1:
              var showDataFriend = that.data.showDataFriend;
              for (var i = 0; i < showDataFriend.length; i++) {
                if (showDataFriend[i]['itemid'] == id) {
                  showDataFriend[i]['isagree'] = 0;
                  showDataFriend[i]['agrees'] = showDataFriend[i]['agrees'] - 1;
                  that.setData({
                    showDataFriend: showDataFriend
                  })
                }
              }
              break;
            case 2:
              var showDataAttention = that.data.showDataAttention;
              for (var i = 0; i < showDataAttention.length; i++) {
                if (showDataAttention[i]['itemid'] == id) {
                  showDataAttention[i]['isagree'] = 0;
                  showDataAttention[i]['agrees'] = showDataAttention[i]['agrees'] - 1;
                  that.setData({
                    showDataAttention: showDataAttention
                  })
                }
              }
              break;
            case 3:
              var showDataNearby = that.data.showDataNearby;
              for (var i = 0; i < showDataNearby.length; i++) {
                if (showDataNearby[i]['itemid'] == id) {
                  showDataNearby[i]['isagree'] = 0;
                  showDataNearby[i]['agrees'] = showDataNearby[i]['agrees'] - 1;
                  that.setData({
                    showDataNearby: showDataNearby
                  })
                }
              }
          }
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  // 顶部导航切换
  switchTopBar: function(e){
    var id = e.target.dataset.topbaritem;
    if (this.data.currentTab == id) {
      return false;
    } else {
      this.setData({
        currentTab: id
      });
      this.showPage(id);
    }
  },
  // 滑动页面切换
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkBar();
    this.showPage(e.detail.current);
  },
  // 导航选项超过 2 个，滚动顶部导航 将不完全显示的部分显示出来
  checkBar: function(){
    if (this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 50
      });
    } else {
      this.setData({
        scrollLeft: 0
      });
    }
  },
  // 显示与顶部导航选项相对应的页面内容，即滑动刷新
  showPage: function (currentTab){
    var that=this;
    switch (currentTab) {
      case 1:
        that.loadFriend();
        break;
      case 2:
        that.loadAttention();
        break;
      case 3:
        that.loadNearby();
        break;
      default:
        that.loadTiwen();
        break;
    }
  },
  // 年级切换
  bindStagePickerChange: function (e) {
    var that = this;
    var index = e.detail.value;
    var catid = that.data.stageIdArray[index-0];
    that.setData({
      stageIndex: e.detail.value,
      currentStageId: catid
    });
    switch (that.data.currentTab) {
      case 1:
        that.loadFriend();
        break;
      case 2:
      that.loadAttention();
        break;
      case 3:
        that.loadNearby();
        break;
      default:
        that.loadTiwen();
        break;
    }
    Req.POST(API.SHOW_RECOMMEND, {
      params: {
        catid: catid
      },
      success: function(res){
        that.setData({
          showData: res.data.data,
          // 年级切换后 科目刷新 默认显示全部
          currentSubject: 0
        })
      },
      fail: function(){},
      complete: function(){}
    })
    
  },
  // 科目切换
  switchSubject: function(e){
    var that = this;
    // 当前科目id
    that.setData({
      currentSubjectId: e.target.dataset.subjectid
    })
    // 科目选项样式切换
    var id = e.target.dataset.subjectitem;
    if (that.data.currentSubject == id) {
      return false;
    } else {
      that.setData({
        currentSubject: id
      });
    }
    // 刷新对应科目的秀的内容
    Req.POST(API.SHOW_RECOMMEND, {
      params:{
        catid: that.data.currentStageId,
        subjectid: e.target.dataset.subjectid
      },
      success: function (res) {
        that.setData({
          showData: res.data.data
        })
      },
      fail: function () { },
      complete: function () { }
    })
  },
  goShowItemDetail: function() {},
  // 预览图片
  getInfo: function(e) {
    var images=[];
    for (var i of e.target.dataset.images){
      var item = i.replace(/\.thumb\..*/,'');
      images.push(item);
    }
    flag=true;
    wx.previewImage({ urls: images });
  },
  // scroll-view 组件中的原生事件 滚动到底部的钩子
  // 数据分页
  reachDown: function(e) {
    var that = this;
    // 触底刷新提示
    that.setData({ isBottomLoading: false, bottomLoadingHint: '加载中' });
    var tiwen_page = that.data.tiwen_page;
    var quan_page = that.data.quan_page;
    var attention_page = that.data.attention_page;
    var nearby_page = that.data.nearby_page;
    switch (that.data.currentTab) {
      case 1:
        Req.POST(API.SHOW_RECOMMEND, {
          params: {
            catid: that.data.currentStageId,
            xiutype: 2,
            subjectid: that.data.currentSubjectId,
            page: quan_page + 1
          },
          success: function (res) {
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showDataFriend;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showDataFriend: itemList,
                quan_page: quan_page + 1,
                isBottomLoading: true
              });
            } else {
              that.setData({
                bottomLoadingHint: '到底了'
              });
            }
          },
          fail: function () { },
          complete: function () { }
        });
        break;
      case 2:
        // 时间戳
        var timestamp = Date.parse(new Date()) / 1000;
        // userid
        var userid = wx.getStorageSync('userAccount').userid;
        // 加密字符串
        var auth = wx.getStorageSync('userAccount').auth;
        var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
        Req.POST(API.SHOW_ATTENTION, {
          params: { paramData: paramData, page: attention_page + 1 },
          success: function (res) {
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showDataAttention;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showDataAttention: itemList,
                attention_page: attention_page + 1,
                isBottomLoading: true
              });
            } else {
              that.setData({
                bottomLoadingHint: '到底了'
              });
            }
          },
          fail: function () { },
          complete: function () { }
        });
        break;
      // 附近
      case 3:
      // 这里要做判断的
        Req.POST(API.SHOW_NEARBY, {
          params: {
            catid: that.data.currentStageId,
            weidu: that.data.latitude,
            jingdu: that.data.longitude,
            page: nearby_page + 1
          },
          success: function (res) {
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showDataNearby;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showDataNearby: itemList,
                nearby_page: nearby_page + 1,
                isBottomLoading: true
              });
            } else {
              that.setData({
                bottomLoadingHint: '到底了'
              });
            }
          },
          fail: function () { },
          complete: function () { }
        });
        break;
      default:
        Req.POST(API.SHOW_RECOMMEND, {
          params: {
            userid: wx.getStorageSync('userAccount').userid,
            catid: that.data.currentStageId,
            xiutype: 1,
            subjectid: that.data.currentSubjectId,
            page: tiwen_page + 1
          },
          success: function (res) {
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showData;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showData: itemList,
                tiwen_page: tiwen_page + 1,
                isBottomLoading: true
              });
            } else {
              that.setData({
                bottomLoadingHint: '到底了'
              });
            }
          },
          fail: function () { },
          complete: function () { }
        });
        break;
    }
  },
  // 触摸操作开始
  myTouchStart: function (e) {
    // 开始触摸，获取触摸点坐标放到数组中
    this.setData({ startPoint: [e.changedTouches[0].pageX, e.changedTouches[0].pageY] })
  },
  // 触摸操作结束
  myTouchEnd: function(e){
    if(top){
      top=0;
      return;
    }
    var that = this;
    var scrollTop;
    var query = wx.createSelectorQuery();
    
    // 判断坐标变换 判断下拉动作
    if (e.changedTouches[0].pageY > that.data.startPoint[1]) {
      if (Math.abs(e.changedTouches[0].pageY - that.data.startPoint[1]) >= Math.abs(e.changedTouches[0].pageX - that.data.startPoint[0]) ) {
        // 刷新页面 
        that.setData({
          isTopLoading: false
        });
        query.select('#scroll').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
          scrollTop = res[1].scrollTop;
          if(scrollTop==0){
            switch (that.data.currentTab) {
              case 1:
                that.loadFriend();
                break;
              case 2:
                that.loadAttention();
                break;
              case 3:
                that.loadNearby();
                break;
              default:
                that.loadTiwen();
                break;
            }
          }
        });
      }
    }
  },
  transferData: function(e){
    var that=this;
    app.globalData.showid = e.currentTarget.dataset.itemdata.itemid;
    app.globalData.home=true;
    that.setData({
      itemdata: e.currentTarget.dataset.itemdata,
      index: e.currentTarget.dataset.index
    })
  },
  shareBtn: function(e){
    var that=this;
    app.globalData.itemid = e.currentTarget.dataset.itemid;
  },
  // 用户点击右上角分享
  onShareAppMessage: function (res) {
    if(res.from==='button'){
      return {
        path: '/pages/showDetail/showDetail?share=1&itemid='+res.target.dataset.itemid
      }
    }
  }
});