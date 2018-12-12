// nopage.js
const app = getApp()

Page({
  onLoad: function () {
    wx.showLoading({
      title: '功能建设中...',
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 20
      })
    }, 3000)
  }
})