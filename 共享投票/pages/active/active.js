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
    // loading 显示/隐藏
    isLoading: false,
    // 是否显示关联活动
    isCorrelation: true,
    // 是否显示关联活动列表
    isCorList: true,
    // 关联活动列表数据
    corrList: [],
    // 是否显示箭头
    isToggle: true,
    // 分组所需数据容器
    groups: [],
    // 分组显示隐藏
    isGroup: true,
    // 分组箭头方向
    arrow: 'xiala',
    // 分组框高度
    groupH: '70rpx',
    isIntro: true,
    selected: 'list-bar',
    goList: '',
    goRank: 'goRank',
    goRules: 'goRules',
    // 下拉菜单
    actionSheetHidden: true,
    // 跑马灯提示信息
    changeLeft: 0,
    // 通用数据
    activeData: {},
    // 活动状态 开始/结束/进行
    activeState: '',
    // 数据容器
    list: [],
    // 倒计时
    time: '',
    // 分页起始页
    page: 1,
    // 是否还有分页的判断
    isPage: true,
    endpage: '',
    // hint: '',
    // 验证码弹框
    yzmHide: true,
    // 验证码图片
    yzmImg: '',
    // 存储用户输入的验证码
    yzmValue: '',
    // 验证码错误提示信息
    yzmErrMsgHide: true,
    // 口令弹框
    lingHide: true,
    // 存储用户输入的口令
    lingValue: '',
    // 邀请码弹窗
    yaoHide: true,
    // 存储用户输入的邀请码
    yaoValue: '',
    // 投票结果弹窗
    resHide: true,
    yzmValue: '',
    res: {},
    // 搜索框输入
    searchValue: '',
    // 投票所需参数
    voteId: '',
    random: '',
    inputValue: '',
    // 搜索无数据
    emptyHide: true,
    // 设备宽度
    windowHeight: '',
    // 用户信息
    avatarUrl: '',
    // title
    title: '',
    // 发布/未发布
    isshow: '',
    // 活动状态
    activeStatus: '',
    // 活动是否结束
    isend: '',
    flag: 1,
    // 投票按钮背景色
    handlerColor: '#fff',
    codeUrl: '',
    // 背景音乐
    audioHide: true,
    none: "none",
    block: "block",
    step: "zhuan",
    defaultImg1x1: '../../images/default1x1.png',
    defaultImg3x4: '../../images/default3x4.png',
    defaultImg4x3: '../../images/default4x3.png'
  },
  // 图片加载 回调函数
  imgLoad: function(e) {
    var self = this;
    self.setData({
      isLoading: true
    });
  },
  // 关闭 关联活动 弹窗
  closeGuan: function () {
    this.setData({
      isCorList: true
    });
  },
  // 点击所关联的活动 进入其活动页面
  goGuan: function (e) {
    app.globalData.itemid = e.currentTarget.dataset.guanid;
    wx.redirectTo({
      url: '../active/active'
    });
  },
  // 显示 关联活动列表
  showGuanList: function () {
    var self = this;
    Req.POST(URL.GUAN, {
      params: {
        itemid: app.globalData.itemid
      },
      success: function (res) {
        if (res.data.list) {
          self.setData({
            corrList: res.data.list,
            isCorList: false
          });
        } else {
          wx.showToast({
            title: '您未设置关联活动',
            icon: 'none',
            duration: 1000
          });
        }
      },
      fail: function () {},
      complete: function () {}
    })
  },
  // 点击箭头显示隐藏分组
  toggleGroup: function () {
    if (this.data.arrow === 'xiala') {
      this.setData({
        groupH: 'auto',
        arrow: 'shangla'
      });
    } else {
      this.setData({
        groupH: '50rpx',
        arrow: 'xiala'
      });
    }
  },
  // 点击分组选项
  changeGroup: function (e) {
    var self = this;
    var index;
    var groupid = e.currentTarget.dataset.groupitemid;
    app.globalData.gtoupid = groupid;
    var groups = self.data.groups;
    for (var i = 0; i < groups.length; i++) {
      var a = function (n) {
        if (groupid === groups[n].itemid) {
          index = n;
        }
      };
      a(i);
      groups[i].bgcolor = false;
      groups[i].textcolor = false;
    }
    groups[index].bgcolor = true;
    groups[index].textcolor = true;
    self.setData({
      groups: groups
    });
    Req.POST(URL.ACTIVE, {
      params: {
        itemid: app.globalData.itemid,
        key: self.data.searchValue,
        groupid: groupid
      },
      success: function (res) {
        if (res.data.list.length > 0) {
          self.setData({
            list: res.data.list,
            emptyHide: true
          });
        } else {
          self.setData({
            list: [],
            emptyHide: false
          });
        }
      },
      fail: function () {},
      complete: function () {}
    })
  },
  audioPause: function () {
    this.setData({
      action: {
        method: 'play'
      },
      step: "zhuan",
      block: "block",
      none: "none"
    })
  },
  audioPlay: function () {
    this.setData({
      action: {
        method: 'pause'
      },
      step: "ting",
      none: "block",
      block: "none"
    })
  },
  createCode: function () {
    var self = this;
    Req.POST(URL.GETCODE, {
      params: {
        itemid: app.globalData.itemid,
        type: 2
      },
      success: function (res) {
        // 下载小程序码图片到本地（临时）
        wx.downloadFile({
          url: res.data.list,
          success: function (res) {
            self.setData({
              codeUrl: res.tempFilePath
            });
          }
        });
      },
      fail: function () { },
      complete: function () { }
    })
  },
  createShareImg: function () {
    wx.showToast({
      title: '图片吐血生成中',
      icon: 'loading',
      duration: 3000
    });
    var self = this;
    // canvas 画图
    var phoneSystem = app.globalData.phoneSystem;
    var h = phoneSystem.windowHeight;
    var sH = phoneSystem.screenWidth;
    var w = phoneSystem.windowWidth;
    const ctx = wx.createCanvasContext('shareCanvas');
    // 字符串长度
    // const metrics = ctx.measureText(self.data.title);
    // if (metrics.width >= 252) {
    //   ctx.fillText('. . .', 645 * w / 750, 335 * h / 1334)
    // }
    // 绘制背景图
    ctx.drawImage('../../images/share.png', 0, 0, w, h);
    if (app.globalData.userInfo) {
      // 绘制用户信息
      ctx.save();
      ctx.arc(375 * w / 750, 105 * h / 1334, 75 * h / 1334, 0, 2 * Math.PI);
      ctx.clip();
      var avatarUrl = app.globalData.avatarUrl;
      ctx.drawImage(avatarUrl, 375 * w / 750 - 75 * h / 1334, 30 * h / 1334, 150 * h / 1334, 150 * h / 1334);
      // 绘制文字
      ctx.restore();
      ctx.setFillStyle('white');
      ctx.setTextAlign('center');
      ctx.setFontSize(22 * w / 750);
      ctx.fillText(app.globalData.userInfo.nickName, 375 * w / 750, 230 * h / 1334);
      ctx.setFontSize(24 * w / 750);
      ctx.fillText("转发了一个投票活动", 375 * w / 750, 270 * h / 1334);
    } else {
      ctx.setFillStyle('red');
      ctx.setTextAlign('center');
      ctx.setFontSize(24 * w / 750);
      ctx.fillText("授权后可展示头像、昵称", 375 * w / 750, 230 * h / 1334);
    }
    // 绘制小程序码
    var codeUrl = self.data.codeUrl;
    ctx.drawImage(codeUrl, 375 * w / 750 - 122 * h / 1334, 935 * h / 1334, 244 * h / 1334, 244 * h / 1334);
    ctx.save();
    ctx.beginPath()
    ctx.rect(750 * w / 750 / 2 - 252 / 2, 287 * h / 1334, 252, 30);
    ctx.setFillStyle('#0095ea')
    ctx.fill()
    ctx.clip()
    ctx.setFillStyle('white');
    ctx.setFontSize(18);
    const metrics = ctx.measureText(self.data.title);
    if (metrics.width < 252) {
      ctx.fillText(self.data.title, 375 * w / 750, 335 * h / 1334);
    } else {
      ctx.setTextAlign('left');
      ctx.fillText(self.data.title, 750 * w / 750 / 2 - 252 / 2, 335 * h / 1334);
    }
    ctx.closePath()
    ctx.restore();

    ctx.draw(false, function (res) {
      // 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: function (res) {
          if (res.tempFilePath) {
            wx.hideToast();
            wx.previewImage({
              urls: [res.tempFilePath],
              success: function (res) { }
            });
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '生成分享图失败',
            icon: 'none',
            duration: 2000
          })
        }
      }, this)
    }
    );
  },
  /**
   * 显示 / 隐藏 下拉菜单
   */
  showActionSheet: function() {
    this.setData({
      actionSheetHidden: false
    });
  },
  hideActionSheet: function() {
    this.setData({
      actionSheetHidden: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timer;
    clearInterval(timer);
    if(options) {
      // 扫码小程序码
      if(options.code) {
        wx.navigateTo({
          url: '../item/item'
        });
      }
      if (options.page) {
        wx.navigateTo({
          url: '../item/item'
        });
      }
    }
    wx.showLoading({
      title: 'loading',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
    var self = this;
    // 音乐自动播放
    self.setData({
      action: {
        method: 'play'
      }
    });
    // 生成小程序码
    self.createCode();
    // self.marquee();
    // 初始化设置
    self.setData({
      list: [],
      page: 1,
      // hint: '',
      isPage: true,
      emptyHide: true,
      isToggle: true,
      isCorrelation: true,
      time: '',
      windowHeight: app.globalData.phoneSystem.windowHeight
    });
    console.log(this.data.time)
    var params = {
      itemid: app.globalData.itemid,
      key: self.data.searchValue
    };
    Req.POST(URL.ACTIVE, {
      params: params,
      success: function (res) {
        console.log(res)
        // 关联活动判断
        if (res.data.data.correlation === '2') {
          self.setData({
            isCorrelation: false
          })
        }
        // 是否显示分组
        if (res.data.data.opengroup === '2') {
          var groups = res.data.data.groups;
          if (groups.length <= 3) {
            self.setData({
              isToggle: true
            });
          } else {
            self.setData({
              isToggle: false
            });
          }
          for (var i = 0;i < groups.length; i++) {
            groups[i].bgcolor = false;
            groups[i].textcolor = false;
          }
          // 初始渲染显示全部
          if (res.data.data.allpai === '2') {
            var obj = {
              itemid: '',
              name: '全部'
            };
            groups.unshift(obj);
          }
          groups[0].bgcolor = true;
          groups[0].textcolor = true;
          self.setData({
            isGroup: false,
            groups: groups
          });
        } else {
          self.setData({
            isGroup: true
          });
        }
        // 设置导航标题
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        });
        self.setData({
          list: res.data.list,
          activeData: res.data.data,
          title: res.data.data.title,
          activeStatus: res.data.data.status,
          isshow: res.data.data.isshow,
          isend: res.data.data.isend,
          endpage: res.data.endpage
        });
        // 如果数据为空
        if (res.data.list.length === 0) {
          self.setData({
            // hint: '',
            emptyHide: false
          });
        }
        // 如果没有主办方介绍
        if (res.data.data.zhuban) {
          self.setData({
            isIntro: false
          });
        }
        // 如果没有设置背景音乐 则按钮不显示
        if (res.data.data.bgmusic !== '') {
          self.setData({
            audioHide: false
          });
        }
        // 判断活动状态
        switch (res.data.data.isend) {
          case 1:
            self.setData({
              activeState: '距活动开始还有',
              handlerColor: '#ccc',
              flag: 0
            });
            if(res.data.data.othertime) {
              var time = res.data.data.othertime;
              timer = setInterval(function () {
                if (time > 0) {
                  time--;
                  var days = parseInt(time / 60 / 60 / 24);
                  var hours = parseInt(time / 60 / 60 % 24);
                  var minutes = parseInt(time / 60 % 60);
                  var seconds = parseInt(time % 60);
                  self.setData({
                    time: days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
                  });
                } else {
                  clearInterval(timer);
                  self.setData({
                    activeState: '活动已开始',
                    handlerColor: '#fff',
                    flag: 1
                  })
                }
              }, 1000);
            }
            break;
          case 2:
            self.setData({
              activeState: '活动已结束',
              handlerColor: '#ccc',
              time: '',
              flag: 0
            });
            break;
          case 3:
            self.setData({
              activeState: '距活动结束还有'
            });
            if(res.data.data.othertime) {
              var time = res.data.data.othertime;
              timer = setInterval(function () {
                if (time > 0) {
                  time--;
                  var days = parseInt(time / 60 / 60 / 24);
                  var hours = parseInt(time / 60 / 60 % 24);
                  var minutes = parseInt(time / 60 % 60);
                  var seconds = parseInt(time % 60);
                  self.setData({
                    time: days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
                  });
                } else {
                  clearInterval(timer);
                  self.setData({
                    activeState: '活动已结束',
                    handlerColor: '#ccc',
                    time: '',
                    flag: 0
                  })
                }
              }, 1000);
            }
            break;
        };
        
      },
      fail: function() {},
      complete: function() {
        wx.hideLoading();
      }
    })
  },

  /**
   * 跑马灯
   */
  // marquee: function () {
  //   var self = this;
  //   setInterval(function () {
  //     var left = self.data.changeLeft;
  //     if (left >= -1000) {
  //       self.setData({
  //         changeLeft: left - 2
  //       });
  //     } else {
  //       left = 750;
  //       self.setData({
  //         changeLeft: left - 2
  //       });
  //     }
  //   }, 20);
  // },

  /**
   * 活动列表页
   */
  goList: function() {
    wx.redirectTo({
      url: '../active/active'
    });
  },

  /**
   * 排名页
   */
  goRank: function () {
    wx.redirectTo({
      url: '../rank/rank'
    });
  },

  /**
   * 活动规则页
   */
  goRules: function () {
    wx.redirectTo({
      url: '../rules/rules'
    });
  },

  /**
   * 进入次级页面
   */
  goItemPage: function(e) {
    app.globalData.voteitemid = e.currentTarget.dataset.voteitemid;
    wx.navigateTo({
      url: '../item/item',
    });
  },

  /**
   * 获取验证码
   */
  getYzmImg: function() {
    var self = this;
    var ranNum = Math.floor(Math.random() * 10000000000000000);
    var yzmImg = URL.GETYZMIMG + '?rnd=' + ranNum;
    self.setData({
      yzmImg: yzmImg,
      random: ranNum
    });
  },

  /**
   * 获取用户输入的验证码
   */
  getYzmValue: function(e) {
    var self = this;
    if (e) {
      var inputValue = e.detail.value;
      // 校验用户输入与图片验证码是否匹配
      if (inputValue != '') {
        Req.POST(URL.CHECKYZM, {
          params: {
            rnd: self.data.random,
            captcha: inputValue
          },
          success: function (res) {
            // 校检成功
            if (res.data.status == "1") {
              self.setData({
                yzmErrMsgHide: true,
                inputValue: inputValue
              });
            } else {
              self.setData({
                yzmErrMsgHide: false
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
    }
  },

  /**
   * 带有验证码的操作（投票/支持/点赞）
   */
  yzmVote: function() {
    var self = this;
    var timestamp = parseInt(new Date().getTime() / 1000);
    var itemId = app.globalData.itemid;
    var voteId = app.globalData.voteitemid;
    var voteCode = app.globalData.voteCode;
    var random = self.data.random;
    var inputValue = self.data.inputValue;
    console.log(timestamp + '\n' + itemId + '\n' + voteId + '\n' + voteCode + '\n' + inputValue + '\n' + random)
    var wxline = app.strencode(timestamp + ',' + itemId + ',' + voteId + ',' + voteCode + ',' + inputValue + ',' + random);
    var params = {
      wxlie: wxline
    }
    console.log(params)
    if (self.data.yzmErrMsgHide && inputValue) {
      Req.POST(URL.VOTE, {
        params: params,
        success: function (res) {
          console.log(res)
          // 关闭验证码弹框
          self.closeYzm();
          self.setData({
            res: res.data,
            resHide: false
          });
          if (res.data.code == 1) {
            self.onLoad();
          }
        },
        fail: function () { },
        complete: function () { }
      });
    }
  },

  /**
   * 关闭验证码弹框
   */
  closeYzm: function() {
    this.setData({
      yzmHide: true,
      yzmValue: ''
    });
  },

  /**
   * 获取用户输入的口令
   */
  getLingValue: function(e) {
    if (e) {
      this.setData({
        lingValue: e.detail.value
      });
    }
  },

  /**
   * 带有口令的操作（投票/支持/点赞）
   */
  lingVote: function() {
    var self = this;
    var timestamp = parseInt(new Date().getTime() / 1000);
    var itemId = app.globalData.itemid;
    var voteId = app.globalData.voteitemid;
    var voteCode = app.globalData.voteCode;
    var random = '';
    var inputValue = self.data.lingValue;
    var wxline = app.strencode(timestamp + ',' + itemId + ',' + voteId + ',' + voteCode + ',' + inputValue + ',' + random);
    var params = {
      wxlie: wxline
    }
    if (inputValue) {
      Req.POST(URL.VOTE, {
        params: params,
        success: function (res) {
          // 关闭口令弹框
          self.closeLing();
          self.setData({
            res: res.data,
            resHide: false
          });
          if (res.data.code == 1) {
            self.onLoad();
          }
        },
        fail: function () { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: '请输入口令',
        icon: "none",
        duration: 2000
      });
    }
  },

  /**
   * 关闭口令弹框
   */
  closeLing: function() {
    this.setData({
      lingHide: true,
      lingValue: ''
    });
  },
  getYaoValue: function(e) {
    if(e) {
      this.setData({
        yaoValue: e.detail.value
      });
    }
  },
  yaoVote: function() {
    var self = this;
    var timestamp = parseInt(new Date().getTime() / 1000);
    var itemId = app.globalData.itemid;
    var voteId = app.globalData.voteitemid;
    var voteCode = app.globalData.voteCode;
    var random = '';
    var inputValue = self.data.yaoValue;
    var wxline = app.strencode(timestamp + ',' + itemId + ',' + voteId + ',' + voteCode + ',' + inputValue + ',' + random);
    var params = {
      wxlie: wxline
    }
    if (inputValue) {
      Req.POST(URL.VOTE, {
        params: params,
        success: function (res) {
          // 关闭邀请码弹框
          self.closeYao();
          self.setData({
            res: res.data,
            resHide: false
          });
          if (res.data.code == 1) {
            self.onLoad();
          }
        },
        fail: function () { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: '请输入邀请码',
        icon: "none",
        duration: 2000
      });
    }
  },
  closeYao: function() {
    this.setData({
      yaoHide: true,
      yaoValue: ''
    });
  },
  /**
   * 投票/点赞/支持
   */
  handler: function(e) {
    app.globalData.voteitemid = e.currentTarget.dataset.voteitemid;
    var yzmState = e.currentTarget.dataset.yzmstate;
    var self = this;
    if (self.data.isshow == '1') {
      wx.showToast({
        title: '活动未发布',
        icon: 'none',
        duration: 2000,
        mask: true
      });
      // 未发布
    } else {// 已发布
      // 是否通过审核
      switch (self.data.activeStatus) {
        // 未通过
        case '1':
          wx.showToast({
            title: '活动未通过审核',
            icon: 'none',
            duration: 2000,
            mask: true
          });
          break;
        // 待审核
        case '2':
          wx.showToast({
            title: '活动待审核',
            icon: 'none',
            duration: 2000,
            mask: true
          });
          break;
        // 通过审核
        case '3':
          switch (self.data.isend) {
            // 活动未开始
            case 1:
              wx.showToast({
                title: '活动未开始',
                icon: 'none',
                duration: 2000,
                mask: true
              });
              break;
            // 活动已结束
            case 2:
              wx.showToast({
                title: '活动已结束',
                icon: 'none',
                duration: 2000,
                mask: true
              });
              break;
            // 活动进行中
            case 3:
              if (self.data.flag) {
                var votetype = self.data.activeData.votetype;
                var timestamp = parseInt(new Date().getTime() / 1000);
                var itemId = app.globalData.itemid;
                var voteId = app.globalData.voteitemid;
                var voteCode = app.globalData.voteCode;
                var random = '';
                var inputValue = '';
                // 判断投票方式
                switch (votetype) {
                  // 不限
                  case '1':
                  // 仅限登录用户
                  case '2':
                  // 指定用户
                  case '3':
                    // 判断是否开启验证码投票
                    if (self.data.activeData.yqmvote == '1') {
                      if (yzmState != '1'){
                        // 显示验证码弹窗
                        self.setData({
                          yzmHide: false
                        });
                        // 获取验证码
                        self.getYzmImg();
                      } else {
                        var wxline = app.strencode(timestamp + ',' + itemId + ',' + voteId + ',' + voteCode + ',' + inputValue + ',' + random);
                        var params = {
                          wxlie: wxline
                        }
                        Req.POST(URL.VOTE, {
                          params: params,
                          success: function (res) {
                            self.setData({
                              res: res.data,
                              resHide: false
                            });
                            if (res.data.code == 1) {
                              self.onLoad();
                            }
                          },
                          fail: function () { },
                          complete: function () { }
                        });
                      }
                    } else {
                      // 显示验证码弹窗
                      self.setData({
                        yzmHide: false
                      });
                      // 获取验证码
                      self.getYzmImg();
                    }
                    break;
                  // 邀请码投票
                  case '4':
                    // 显示邀请码弹窗
                    self.setData({
                      yaoHide: false
                    });
                    // 获取用户输入
                    self.getYaoValue();
                    var _inputValue = self.data.lingValue;
                    if (_inputValue != '') {
                      self.setData({
                        inputValue: _inputValue
                      })
                    }
                    break;
                  // 口令投票
                  case '5':
                    // 显示口令弹窗
                    self.setData({
                      lingHide: false
                    });
                    // 获取用户输入
                    self.getLingValue();
                    var _inputValue = self.data.lingValue;
                    if (_inputValue != '') {
                      self.setData({
                        inputValue: _inputValue
                      })
                    }
                    break;
                }
              } else {
                // 活动已结束
                wx.showToast({
                  title: '活动已结束',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                });
              }
              break;
          }
          break;
      }
    }
  },

  /**
   * 复制链接
   */
  pageCopyLink: function() {
    wx.setClipboardData({
      data: 'http://www.voteyun.com/mobile/show.php?itemid='+app.globalData.itemid,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  cardCopyLink: function() {
    wx.setClipboardData({
      data: 'http://www.voteyun.com/mobile/list.php?voteitemid=' + app.globalData.voteitemid,
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
      key: key,
      groupid: app.globalData.gtoupid ? app.globalData.gtoupid : ''
    };
    if (key) {
      Req.POST(URL.ACTIVE, {
        params: params,
        success: function(res) {
          if (res.data.list.length>0) {
            self.setData({
              list: res.data.list,
              // hint: '我也是有底线的哟',
              emptyHide: true
            });
          } else {
            self.setData({
              list: [],
              emptyHide: false,
              // hint: ''
            });
          }
          // 搜索内容（不为空）分组框消失
          self.setData({
            isGroup: true
          })
        },
        fail: function() {},
        complete: function() {}
      });
    } else {
      self.onLoad();
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
    if (self.data.searchValue) {
      self.search();
    } else {
      self.onLoad();
    }
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var page = self.data.page;
    self.setData({
      page: page + 1
    });
    self.setData({
      // hint: '正在加载'
    });
    if (!self.data.searchValue) {
      if (self.data.endpage == '2') {
        self.setData({
          // hint: '我也是有底线的哟',
          isPage: false
        })
      }
      if (self.data.isPage) {
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
                // hint: '我也是有底线的哟',
                isPage: false
              });
            }
          },
          fail: function() {},
          complete: function() {}
        });
      }
    } else {
      if (self.data.emptyHide) {
        self.setData({
          // hint: '我也是有底线的哟'
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var self = this;
    return {
      title: self.data.activeData.title,
      path: '/pages/index/index?itemid=' + app.globalData.itemid + '&page=active'
    }
  }
})