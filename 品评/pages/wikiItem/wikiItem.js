// pages/wikiItem/wikiItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: true,
    hideSide: true
  },
  previewPic: function(){
    wx.previewImage({
      urls: ['http://img3.imgtn.bdimg.com/it/u=1349217170,3670712141&fm=15&gp=0.jpg', 'http://photocdn.sohu.com/20070921/Img252290486.jpg','http://img2.imgtn.bdimg.com/it/u=1502144705,796352457&fm=15&gp=0.jpg'],
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onPageScroll:function(e){ // 获取滚动条当前位置
    console.log(e.scrollTop)
    if (e.scrollTop > 80) {
      this.setData({
        floorstatus: false
      });
    } else {
      this.setData({
        floorstatus: true
      });
    }
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      });
      this.setData({
        floorstatus: true
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  showSide: function(){
    this.setData({
      hideSide: false
    })
    this.animation.translate(-220).step()
    this.setData({ animation: this.animation.export() })
  },
  hideSide: function(e){
    this.animation.translate(220).step()
    this.setData({ animation: this.animation.export() })
    console.log(e)
    this.setData({
      hideSide: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = wx.createSelectorQuery();
    var catalog_1;
    query.select("#pics").boundingClientRect();
    query.exec(function(res){
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation();
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
    wx.stopPullDownRefresh();
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