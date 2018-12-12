// pages/phoneNumber/phoneNumber.js

Page({
  callPhone: function(e) {
    const phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
    console.log(e)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 设置分享
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})