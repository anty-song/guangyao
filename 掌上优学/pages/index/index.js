// 获取API
var API = require('../../utils/api.js');
// 获取网络请求
var Req = require("../../utils/request.js");
// 获取小程序实例
var app = getApp();
var flag;
Page({
  data: {
    scrollTop: 100,
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
    // like
    // likeNum: null,
    isLike: false,
    showDataAttention: [], // 关注列表数据
    defaultAttentionHide: true,
    showDataNearby: [], // 附近列表数据
    defaultNearbyHide: true,
    showDataFriend: [], // 同学圈列表数据
    loadingHide: true,
    collectHide: true
  },
  // 页面初始化
  onLoad: function(){
    console.log('onload')
    var that = this;
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
        console.log(res)
        that.setData({
          stageArray: res.data.data.catname,
          stageIdArray: res.data.data.catid
        });
      },
      fail: function(){},
      complete: function(){}
    });
    that.loadTiwen();
  },
  // 这里只用作 手动设置位置权限后 小程序返回刷新的实现
  onShow: function(){
    if(flag){
      flag=false;
      return;
    }
    console.log('onshow')
    var that = this;
    switch (that.data.currentTab) {
      case 0:
        that.onLoad();
        that.loadTiwen();
        break;
      case 1:
        that.onLoad();
        that.loadFriend();
        break;
      case 2:
        that.onLoad();
        that.loadAttention();
        break;
      case 3:
        wx.getSetting({
          success: function (res) {
            console.log(res)
            if (res.authSetting['scope.userLocation']) {
              that.onLoad();
              that.loadNearby();
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
    console.log(wx.getStorageSync('userAccount').userid)
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
      params: { userid: wx.getStorageSync('userAccount').userid, page: 1 },
      success: function (res) {
        console.log(res)
        that.setData({
          showData: res.data.data
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  // 加载同学圈页
  loadFriend: function(){
    var that = this;
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    Req.POST(API.SHOW_RECOMMEND, {
      params: { userid: wx.getStorageSync('userAccount').userid, page: 1, xiutype: 2 },
      success: function (res) {
        that.setData({
          showDataFriend: res.data.data
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  loadAttention: function(){
    var that = this;
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    // --------------------登录态判断 TODO
    // 时间戳
    var timestamp = Date.parse(new Date()) / 1000;
    // userid
    var userid = wx.getStorageSync('userAccount').userid;
    // 加密字符串
    var auth = wx.getStorageSync('userAccount').auth;
    var paramData = app.strencode(timestamp + ',' + userid + ',' + auth);
    Req.POST(API.SHOW_ATTENTION, {
      params: { paramData: paramData, page: 1 },
      success: function (res) {
        console.log(res)
        that.setData({
          showDataAttention: res.data.data
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  // 加载附近页面
  loadNearby: function(){
    console.log('loadNearby')
    var that=this;
    // 滚动到页面对应位置 重置
    wx.pageScrollTo({
      scrollTop: 1
    });
    wx.getLocation({
      type: 'wgs84',
      // 位置获取成功回调
      success: function (res) {
        console.log(res)
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
            console.log(res)
            that.setData({
              showDataNearby: res.data.data
            });
          },
          fail: function (res) { },
          complete: function () { }
        });
      },
      // 处理位置获取失败的情况
      fail: function (res) {
        console.log(res)
        that.setData({
          defaultNearbyHide: false
        });
      }
    });
  },
  // 点赞功能
  likeComment: function(e){
    console.log('dianzan')
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
          console.log(res)
          // 重新登录
          if(res.data.status==2){
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
            var id = e.currentTarget.dataset.itemid;
            switch (that.data.currentTab) {
              case 0:
                var showData = that.data.showData;
                console.log(showData)
                for (var i = 0; i < showData.length; i++) {
                  if (showData[i]['itemid'] == id) {
                    console.log(i)
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
        console.log(res)
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
      console.log(id)
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
        that.onLoad();
        that.loadFriend();
        break;
      case 2:
        that.onLoad();
        that.loadAttention();
        break;
      case 3:
        console.log('nearby')
        that.onLoad();
        that.loadNearby();
        break;
      default:
        that.onLoad();
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
        break;
      case 2:
        break;
      case 3:
        that.onLoad();
        that.loadNearby();
        break;
      default:
        that.onLoad();
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
            console.log(res)
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showDataFriend;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showDataFriend: itemList,
                quan_page: quan_page + 1
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
            console.log(res)
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showDataAttention;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showDataAttention: itemList,
                attention_page: attention_page + 1
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
                nearby_page: nearby_page + 1
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
            console.log(res)
            // 若存在数据
            if (res.data.data.length) {
              var itemList = that.data.showData;
              for (var i = 0; i < res.data.data.length; i++) {
                itemList.push(res.data.data[i]);
              }
              that.setData({
                showData: itemList,
                tiwen_page: tiwen_page + 1
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
    var that = this;
    var scrollTop;
    var query = wx.createSelectorQuery();
    // 判断坐标变换 判断下拉动作
    if (e.changedTouches[0].pageY > that.data.startPoint[1]) {
      if (Math.abs(e.changedTouches[0].pageY - that.data.startPoint[1]) >= Math.abs(e.changedTouches[0].pageX - that.data.startPoint[0]) ) {
        // 刷新页面 
        query.select('#scroll').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
          scrollTop = res[1].scrollTop;
          if(scrollTop==0){
            switch (that.data.currentTab) {
              case 1:
                that.onLoad();
                that.loadFriend();
                break;
              case 2:
                break;
              case 3:
                that.onLoad();
                that.loadNearby();
                break;
              default:
                that.onLoad();
                that.loadTiwen();
                break;
            }
          }
        });
      }
    }
  },
  transferData: function(e){
    app.globalData.itemData=e.currentTarget.dataset.itemdata;
  }
});