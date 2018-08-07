Page({
  data: {
    winHeight: 0,
    isFriend: false,
    topbarItemId: 0, // 顶部导航 默认显示第一个 即 ‘有问必答’
    topbarList: [{ title: '有问必答' }, { title: '同学圈' }, { title: '关注' }, { title: '附近' }], // 顶部导航列表
    stageArray: ['全部', '幼儿园', '小学', '初中', '高中', '中专', '大学'], // 上学阶段 年级
    stageIndex: 0, // 默认显示 ‘全部’
    showImg: 'http://hyps2001.com/uploads/allimg/160805/1-160P51331554N.jpg'
  },
  onLoad: function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        var W = res.windowWidth,
            H = res.windowHeight,
            rpxR = 750/W,
            calc = H*rpxR-88;
        that.setData({
          winHeight: calc
        });
      },
    });
  },
  // 顶部导航切换
  toggleTopBar: function(e){
    var id = e.target.dataset.topbaritem;
    this.setData({
      topbarItemId: id
    })
  },
  // 年级切换
  bindStagePickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      stageIndex: e.detail.value
    })
  },
  goShowItemDetail: function() {},
  getInfo: function(e) {
    // 预览图片
    wx.previewImage({
      urls: [this.data.showImg],
      success: function(res) { 
        console.log(res)
      }
    })
    // 获取图片信息
    wx.getImageInfo({
      src: this.data.showImg,
      success: function(res) {
        console.log(res)
      }
    })
  }
})