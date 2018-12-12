// pages/qrCode/qrCode.js
// 二维码生成器
let QRCode = require('../../utils/weapp-qrcode.js')
let qrcode

Page({

  /**
   * Page initial data
   */
  data: {
    text: '欢迎来到教师工具箱',
    size: '188',
    colorArray: ["#fff", "#130c0e", "#d71345", "#f47920", '#ffd400', '#45b97c', '#009ad6', '#11264f', '#8552a1'],
    selectArray: [
      {
        id: 0,
        name: '白'
      },
      {
        id: 1,
        name: '黑'
      },
      {
        id: 2,
        name: '红'
      },
      {
        id: 3,
        name: '橙'
      },
      {
        id: 4,
        name: '黄'
      },
      {
        id: 5,
        name: '绿'
      },
      {
        id: 6,
        name: '青'
      },
      {
        id: 7,
        name: '蓝'
      },
      {
        id: 8,
        name: '紫'
      }
    ],
    beforeindex: 1,
    beforecolor: '#130c0e',
    afterindex: 0,
    aftercolor: '#fff',
    qrcode: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    that.createQRCode()
    
  },

  showEwm: function (event) {
    // console.log(event)
    let that = this

    qrcode.exportImage(function (path) {
      that.setData({
        'qrcode': path
      })

      wx.previewImage({
        current: that.data.qrcode, // 当前显示图片的http链接
        urls: [that.data.qrcode], // 需要预览的图片http链接列表
        success(res) {
          console.log("success:" + res)
        },
        fail(res) {
          console.log("fail:" + res)
        },
        complete(res) {
          console.log("complete:" + res)
        }
      })
    })
  },

  bindBeforePickerChange(e) {
    let that = this
    that.setData({
      beforeindex: e.detail.value,
      beforecolor: that.getColor(e.detail.value)
    })
  },

  bindAfterPickerChange(e) {
    let that = this
    that.setData({
      afterindex: e.detail.value,
      aftercolor: that.getColor(e.detail.value)
    })
  },

  // 获取对应数组下标的值
  getColor(index) {
    let that = this
    return that.data.colorArray[index]
  },

  
  createQRCode: function () {

    let that = this

    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: that.data.text,
      width: that.data.size,
      height: that.data.size,
      colorDark: that.data.beforecolor,
      colorLight: that.data.aftercolor,
      correctLevel: QRCode.CorrectLevel.H,
    })
    // debugger

    setTimeout(function () {
      qrcode.exportImage(function (path) {
        that.setData({
          'qrcode': path
        })
      })
    }, 500);

    

    
  },

  formSubmit(e) {
    let that = this
    that.setData({
      text: e.detail.value.text,
      size: e.detail.value.size
    })

    that.createQRCode()
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