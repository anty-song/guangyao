// 导入工具函数

// 以便获取时间戳
var util = require('../../utils/util.js');
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
    // 存储小程序码地址
    codeUrl: '',
    catid: '',
    catname: '',
    // 投票结果弹窗所需数据
    imgUrl: '',
    markTipColor: '',
    markTip: '',
    currentTime: '',
    linkState: 'none',
    shareUrlState: 'none',
    shareUrl: '',
    btnBgColor: '',
    displayResult: "none",
    titleState: 'none',
    timeState: 'none',

    displayMark: "none",    // 弹出层初始状态
    hint: "",               // 底部提示信息
    champion: [],           // 冠军相关数据
    second: [],             // 亚军相关数据
    third: [],              // 季军相关数据
    topTen: [],             // 前十相关数据
    others: [],             // 其他排名数据
    markImg: '',            // 对应弹出层中的图片
    imgYzm: '',             // 验证码图片的地址
    markTit: '',            // 对应弹出层中的名字
    yzmValue: '',           // 验证码输入框中的值 初始值为空
    voteNum: '',
    markYzm: '',            // 放置 captcha 字段的值
    ranNum: '',             // 放置15位随机数
    markId: '',             // 放置 itemid 字段的值
    iconType: '',
    // 手机型号等信息
    pixelRatio: '',
    screenHeight: '',
    screenWidth: '',
    windowHeight: '',
    windowWidth: '',
    // 用户信息
    nickName: '',
    avatarUrl: '',
    localAvatarUrl: '',
    actionSheetHidden: true
  },
  /**
   * 显示底部菜单
   */
  showActionSheet: function() {
    var that = this;
    that.setData({
      actionSheetHidden: false
    });
  },
  /**
   * 隐藏底部菜单
   */
  hideActionSheet: function() {
    var that = this;
    that.setData({
      actionSheetHidden: true
    });
  },
  // 获取小程序码
  showCode: function () {
    var that = this;
    // 预览小程序码
    wx.previewImage({
      urls: [that.data.codeUrl]
    });
  },
  createCode: function () {
    var that = this;
    Req.POST(URL.GETCODE, {
      params: {
        file_name: 'cat'+that.data.catid+'.png',
        type: 1,
        catid: app.globalData.catid
      },
      success: function (res) {
        console.log(res);
        // 下载小程序码图片到本地（临时）
        wx.downloadFile({
          url: res.data.tuurl,
          success: function(res){
            console.log('res.tempFilePath---'+res.tempFilePath);
            that.setData({
              codeUrl: res.tempFilePath
            });
          }
        });
      },
      fail: function (res) { },
      complete: function (res) { }
    });
  },
  createShareImg: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth
        })
      },
    });
    var w = that.data.windowWidth;
    var p = that.data.pixelRatio;
    const ctx = wx.createCanvasContext('shareCanvas');
    // 绘制背景图
    ctx.save();
    ctx.drawImage('../../images/share_img_bg.png', 0, 0, that.data.windowWidth, that.data.windowHeight);
    ctx.restore();
    // 绘制小程序码及文字
    ctx.save();
    ctx.arc(200 * w / 750, 1020 * w / 750, 130 * w / 750, 0, 2 * Math.PI);
    ctx.clip();
    console.log(that.data.codeUrl);
    var wxcode = that.data.codeUrl;
    ctx.drawImage(wxcode, 70 * w / 750, 890 * w / 750, 260 * w / 750, 260 * w / 750);
    ctx.restore();
    ctx.save();
    ctx.setFillStyle('white');
    ctx.setFontSize(30 * w / 750);
    ctx.fillText("长按识别小程序", 400 * w / 750, 1000 * w / 750);
    ctx.fillText("立即参与！", 400 * w / 750, 1060 * w / 750);
    ctx.restore();
    // 绘制用户信息
    ctx.save();
    ctx.arc(140 * w / 750, 140 * w / 750, 60 * w / 750, 0, 2 * Math.PI);
    ctx.clip();
    console.log(that.data.avatarUrl);
    ctx.drawImage(that.data.avatarUrl, 80 * w / 750, 80 * w / 750, 120 * w / 750, 120 * w / 750);
    ctx.restore();
    ctx.save();
    ctx.setFillStyle('#353535');
    ctx.setFontSize(30 * w / 750);
    ctx.fillText(that.data.nickName, 220 * w / 750, 134 * w / 750);
    ctx.fillText("分享了一个行业投票", 220 * w / 750, 174 * w / 750);
    ctx.draw(false, function(res){
      // 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: function (res) {
          console.log(res.tempFilePath)
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              var savedFilePath = res.savedFilePath
              console.log(savedFilePath)
              wx.previewImage({
                urls: [savedFilePath]
              });
            }
          });
          that.setData({
            tempFilePath: res.tempFilePath
          });
          app.globalData.tempFilePath = res.tempFilePath;
        }
      }, this)
    }
    );
  },
  /**
   * 点击立即投票按钮
   * 投票弹窗弹出 渲染数据 并且 显示图片验证码
   */
  showMark: function(e) {
    var timestamp = Date.parse(new Date()) / 1000;
    var expiration = wx.getStorageSync('userInfo_expiration');
    var userInfo = wx.getStorageSync('userInfo');
    // 读取本地缓存 判断用户信息 及信息是否过期
    if (userInfo && expiration > timestamp) {
      var that = this;
      var markImg = e.currentTarget.dataset.img;    // 通过自定义属性获取当前 item 图片地址
      var markTit = e.currentTarget.dataset.tit;    // 通过自定义属性获取当前 item 名称
      var markId = e.currentTarget.dataset.id;      // 通过自定义属性获取当前 item id
      var markYzm = e.currentTarget.dataset.yzm;    // 通过自定义属性获取当前 item 字段 captcha
      var voteNum = e.currentTarget.dataset.num;    // 通过自定义属性获取当前 item 票数
      var ranNum = parseInt(Math.random() * 1000000000000000);

      var params = {
        authType: markYzm,
        rnd: ranNum,
        id: markId,
        outb: 0
      }
      that.setData({
        yzmValue: '',       // 初始化输入框的值
        iconType: "",       // 初始设置验证码相关 icon 不显示
        displayMark: "block",
        markImg: markImg,
        markTit: markTit,
        voteNum: voteNum,
        imgYzm: URL.IMGYZM + "?authType=" + markYzm + "&rnd=" + ranNum + "&id=" + markId + "&autb=0",

        markYzm: markYzm,
        ranNum: ranNum,
        markId: markId
      });
    } else {
// ？存在问题跳转过快 提示信息都没看清
      wx.showToast({
        title: '您未登录或登录信息过期，请重新登录！',
        icon: 'none',
        duration: 2000
      });
      setTimeout(function(){
        wx.navigateTo({
          url: '../login/login?pageid=brand'
        }, 3000);
      });
    }
  },

  /**
   * 点击投票按钮
   */
  vote: function () {
    var that = this;
    // 获取请求接口所需的参数
    var timestamp = Date.parse(new Date()) / 1000;
    var userid = wx.getStorageSync('userInfo').userid;
    // var openid = app.globalData.openId;
    var openid = 1;
    var auth = wx.getStorageSync('userInfo').auth;
    var itemid = that.data.markId;
    var catid = that.data.catid;
    var rnd = that.data.ranNum;
    var authType = that.data.markYzm;
    var captcha = that.data.yzmValue;
    var systemInfo;
    // 获取手机系统信息
    wx.getSystemInfo({
      success: function (res) {
        systemInfo = res.model + '-' + res.system + '-' + res.language + '-' + res.version + '-' + openid;
      },
    });
    var base64_wxlie = app.strencode(timestamp + ',' + userid + ',' + openid + ',' + auth + ',' + itemid + ',' + catid + ',' + rnd + ',' + authType + ',' + captcha);
    var params = {
      wxlie: base64_wxlie
    };
    // 判断 iconType 状态
    // 验证码校验成功关闭投票弹出层 显示“投票成功”弹层
    if (that.data.iconType == 'success') {
      Req.POST(URL.VOTE, {
        params: params,
        success: function (res) {
          if (res.data.status == 1) {
            that.setData({
              champion: [],           // 冠军相关数据
              second: [],             // 亚军相关数据
              third: [],              // 季军相关数据
              topTen: [],             // 前十相关数据
              others: [],    
              titleState: 'block',
              timeState: 'block',
              displayResult: 'block',
              linkState: 'block',
              shareUrlState: 'block',
              currentTime: res.data.time,
              voteNum: res.data.vote,
              shareUrl: res.data.shareUrl,
              markTip: res.data.msg,
              imgUrl: '../../images/success.png',
              markTipColor: '#0261b1',
              btnBgColor: '#0261b1'
            });
            that.onLoad();
          } else if (res.data.status == 2) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2500
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '../login/login?pageid=brand'
              }, 2500);
            });
          } else {
            that.setData({
              titleState: 'none',
              timeState: 'none',
              displayResult: 'block',
              currentTime: util.formatTime(new Date()),
              markTip: res.data.msg,
              imgUrl: '../../images/fail.png',
              markTipColor: '#e21919',
              btnBgColor: '#e21919'
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { }
      });
      that.setData({
        displayMark: "none",
      });
    } else {

    }
  },

  /**
   * 点击文本框 复制链接
   */
  copyLink: function() {
    var that = this;
    wx.setClipboardData({
      data: that.data.shareUrl,
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {} else if (res.cancel) {}
          }  
        })
      }
    })
  },

  /**
   * 验证码输入框 获取用户输入
   */
  bindKeyInput: function(e) {
    var that = this;
    that.setData({
      yzmValue: e.detail.value
    });
    var yzmValue = that.data.yzmValue;
    var markId = that.data.markId;
    var markYzm = that.data.markYzm;
    var voteNum = that.data.voteNum;
    var ranNum = that.data.ranNum;
    var params = {
      authType: markYzm,
      rnd: ranNum,
      id: markId,
      captcha: yzmValue
    }
    // 校验用户输入与图片验证码是否匹配
    if (yzmValue != '') {
      Req.POST(URL.IMGYZMCHECK, {
        
        params: params,
        success: function (res) {
          var result = res.data;
          // 校检成功
          if (result == "_checkcaptcha(0)") {
            that.setData({
              iconType: "success"
            });
          } else {
            that.setData({
              iconType: "warn"
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { }
      })
    } else {
      wx.showToast({
        title: '请输入验证码',
        icon: "none",
        duration: 2000
      })
    }
  },

  /**
   * 点击验证码图片更换验证码
   */
  changeYzm: function(e) {
    var that = this;
    var markYzm = that.data.markYzm;
    var ranNum = Math.floor(Math.random() * 1000000000000000);
    var markId = that.data.markId;
    that.setData({
      yzmValue: '',       // 初始化输入框的值
      iconType: '',       // 初始化 icon 状态
      imgYzm: URL.IMGYZM + "?authType=" + markYzm + "&rnd=" + ranNum + "&id=" + markId + "&autb=0",
      ranNum: ranNum
    });
  },
  /**
   * 点击投票弹窗中的关闭按钮
   */
  closeMark: function() {
    var that = this;
    that.setData({
      displayMark: "none",
      markImg: '',
      yzmValue: '',       // 初始化输入框的值
      iconType: ''       // 初始化 icon 状态
    });
  },

  /**
   * 点击投票成功弹窗中的关闭按钮
   */
  closeVoteResult: function () {
    var that = this;
    this.setData({
      displayResult: "none",
      markImg: ''
    });
    that.closeMark();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: 'loading'
    // });
    // console.log(options.scene)
    var that = this;
    that.createCode();
    // that.createShareImg();
    var catid, catname, avatarUrl, nickName;
      // 从全局中取到 catid
    catid = app.globalData.catid;
    catname = app.globalData.catname;
    avatarUrl = app.globalData.userInfo.avatarUrl;
    wx.downloadFile({
      url: avatarUrl,
      success: function (res) {
        console.log('res.tempFilePath---' + res.tempFilePath);
        that.setData({
          avatarUrl: res.tempFilePath
        });
      }
    });
    nickName = app.globalData.userInfo.nickName;
    that.setData({
      catid: catid,
      catname: catname,
      nickName: nickName,
      hint: "正在加载。。。。"
      // isGotData: 'none'
    });
    // 设置导航标题
    wx.setNavigationBarTitle({
      title: "中国"+catname+"十大品牌评选"
    });
    var page = that.data.page;
    var params = {
      action: "getlist",
      catid: catid
    };
    Req.POST(URL.VOTEITEM, {
      params: params,
      success: function (res) {
        // 这里对请求数据进行数组分割 达到在前端分别渲染
        var Lists = res.data.list;
        var champion = Lists.splice(0,1);
        var second = Lists.splice(0, 1);
        var third = Lists.splice(0, 1);
        var topTen = Lists.splice(0, 7);
        var others = Lists;
        if (res.data.status) {
          var itemList = that.data.others;
          // 不能直接将拿到的数据赋值给容器（这里指data中的list）
          // 否则出现加载的新数据覆盖旧的数据 所以 在容器有旧数据的前提下向其中
          // 添加新数据 一直 push 不要有赋值操作
          for (var i = 0; i < others.length; i++) {
            itemList.push(others[i]);
          }
          that.setData({
            champion: champion,
            second: second,
            third: third,
            topTen: topTen,
            others: itemList
          });
        } else {
          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            hint: "我也是有底线的哟。。。。"
          });
        }
      },
      fail: function (res) {
        // do fail
      },
      complete: function(res) {
        // wx.hideLoading();
        // that.setData({
        //   isGotData: 'block'
        // });
      }
    });
    // 带票分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    var that = this;
    that.setData({
      champion: [],
      second: [],
      third: [],
      topTen: [],
      others: []
      // isGotData: 'none'
    });
    that.onLoad();
    // 请求数据后停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var catname = that.data.catname;
    var catid = that.data.catid;
    var shareImg = that.data.markImg;
    return {
      title: "中国" + catname + "十大品牌评选",
      path: '/pages/brand/brand?catid=' + catid + '&catname=' + catname,
      imageUrl: shareImg ? shareImg : '../../images/share_img.png',
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