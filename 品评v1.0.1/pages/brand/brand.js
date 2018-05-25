// pages/vote/vote.js
var URL = require('../../utils/config.default.js');
var Req = require("../../utils/request.js");

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],           // 数据容器
    searchedLists: [],
    page: 1,            // 网络请求 分页加载 初始第一页
    hint: "",           // 底部提示信息
    inputValue: ''      // 拿到搜索框用户输入内容
  },

  /**
   * 搜索框搜索
   */
  bindKeyInput: function(e){
    var that = this;
    that.setData({
      hint: "正在加载",
      inputValue: e.detail.value
    });
    var params = {
      action: "getcat",
      page: 1,
      keyword: that.data.inputValue
    };
    Req.POST(URL.BRAND, {
      params: params,
      success: function (res) {
        var itemList = res.data.list;
        
        // 这里应将拿到的数据直接 赋值 给容器（这里指data中的list）
        // 使加载的新数据覆盖旧的数据 

        that.setData({
          list: itemList,
          searchedLists: itemList
        });
        if(!res.data.ispage) {
          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            hint: "暂无其他数据"
          })
        }
      },
      fail: function (res) {
        // do fail
      },
      complete: function (res) { }
    });
  },

  /**
   * 点击更多 实现页面跳转 到投票页
   */
  showMore: function (e) {
    var catid = e.currentTarget.dataset.catid;
    var catname = e.currentTarget.dataset.catname;
    console.log(catid);
    app.globalData.catid = catid;
    app.globalData.catname = catname;
    wx.navigateTo({
      url: "../braVote/braVote"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 判断小程序入口是否是 分享页面
    // wx.showLoading({
    //   title: 'loading'
    // });
    if(options) {
      if(options.catid){
        app.globalData.catid = options.catid;
        app.globalData.catname = options.catname;
        wx.navigateTo({
          url: "../braVote/braVote"
        });
      }
      if(options.scene){
        console.log(options.scene);
        var scene =  JSON.parse(options.scene);
        console.log(scene);
        if(scene.catid){
          app.globalData.catid = scene.catid;
        }
        if (scene.type) {
          if (scene.type == 1) {
            wx.navigateTo({
              url: "../braVote/braVote"
            });
          }
          if (scene.type == 2) {
            wx.navigateTo({
              url: "../proVote/proVote"
            });
          }
        }
        
      }
    }

    wx.getUserInfo({
      success: function(res) {}
    });
    var value = wx.getStorageSync('user');
    
    that.setData({
      hint: "正在加载"
    })
    var page = that.data.page
    var params = {
      action: "getcat",
      page: page,
      keyword: that.data.inputValue
    };
    Req.POST(URL.BRAND, {
      params: params,
      success: function(res){
        // 判断若 ispage 不为 0 则将数据添加到容器中
        if (res.data.ispage) {
          var itemList = that.data.list;
          
          // 不能直接将拿到的数据赋值给容器（这里指data中的list）
          // 否则出现加载的新数据覆盖旧的数据 所以 在容器有旧数据的前提下向其中
          // 添加新数据 一直 push 不要有赋值操作
          
          for (var i = 0; i < res.data.list.length; i++) {
            itemList.push(res.data.list[i]);
          }
          that.setData({
            list: itemList
          });
        } else {

          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            hint: "暂无数据"
          })
        }
      },
      fail: function(res) {},
      complete: function() {
        // wx.hideLoading();
      }
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  Base64: function() {
    var that = this;
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
    // public method for encoding
    that.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    };

    // public method for decoding
    that.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = _utf8_decode(output);
      return output;
    };

    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }
      return utftext;
    };

    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    };
  },
  /*
  * 上拉刷新 请求更多数据
  */
  onReachBottom: function(e) {
    var that = this;
    that.setData({
      hint: "正在加载"
    })
    var page = that.data.page;
    that.setData({
      page: page + 1
    })
    var params = {
      action: "getcat",
      page: page + 1,
      keyword: that.data.inputValue
    };
    Req.POST(URL.BRAND, {
      params: params,
      success: function (res) {
        if (res.data.ispage) {
          var itemList = that.data.list;

          // 不能直接将拿到的数据赋值给容器（这里指data中的list）
          // 否则出现加载的新数据覆盖旧的数据 所以 在容器有旧数据的前提下向其中
          // 添加新数据 一直 push 不要有赋值操作

          for (var i = 0; i < res.data.list.length; i++) {
            itemList.push(res.data.list[i]);
          }
          that.setData({
            list: itemList
          });
        } else {
          // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
          that.setData({
            hint: "我也是有底线的哟"
          })
        }
      },
      fail: function (res) {
        // do fail
      },
      complete: function (res) { }
    });
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list: [],
      searchedLists: [],
      page: 1            // 网络请求 分页加载 初始第一页
    });
    
    if (that.data.inputValue) {
      var params = {
        action: "getcat",
        page: 1,
        keyword: that.data.inputValue
      };
      Req.POST(URL.BRAND, {
        params: params,
        success: function (res) {
          var itemList = res.data.list;

          // 这里应将拿到的数据直接 赋值 给容器（这里指data中的list）
          // 使加载的新数据覆盖旧的数据 

          that.setData({
            list: itemList,
            searchedLists: itemList
          });
          if (!res.data.ispage) {
            // 当数据全部加载完毕 没有可加载的时候执行 下面的操作
            that.setData({
              hint: "暂无其他数据"
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { }
      });
      that.setData({
        list: that.data.searchedLists
      });
    } else {
      that.onLoad();
    }
    // 请求数据后停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: "十大品牌",
      imageUrl: '../../images/share_img.png',
      success: function(res) {
        var shareTickets = res.shareTickets;
        if(shareTickets.length == 0) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function(res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function(res) {
        // do fail
      }
    }
  }
})