// pages/scanCode/scanCode.js
Page({

  /**
   * Page initial data
   */
  data: {
    showResult: false,
    codeResult: ''
  },

  /**
   * 二维码扫描识别
   */
  scanCode: function() {
    let _this = this
    wx.scanCode({
      success(res) {
        // console.log(res)
        _this.setData({
          codeResult: res.result,
          showResult: true
        })
        wx.showToast({
          title: '扫描成功',
          icon: 'success',
          duration: 1000
        })

      },
      fail(res) {
        wx.showToast({
          title: '呜呜，扫描失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 复制结果到剪贴板
   */
  copyResult: function() {
    let _this = this
    wx.setClipboardData({
      data: _this.data.codeResult,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail() {
        wx.showToast({
          title: '呜呜，复制失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 设置分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})