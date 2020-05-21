// home.js

Page({
  data: {
    navigatorArray: [
      {
        url: '/pages/xfyunOcr/xfyunOcr',
        src: './icon-ocr.png',
        text: '图转文字'
      },
      {
        url: '/pages/xfyunTts/xfyunTts',
        src: './icon-tts.png',
        text: '文字转语音'
      },
      {
        url: '/pages/scanCode/scanCode',
        src: './icon-ewmsm.png',
        text: '二维码识别'
      },
      {
        url: '/pages/qrCode/qrCode',
        src: './icon-ewmsc.png',
        text: '二维码生成'
      },
      {
        url: '/pages/rmbCapital/rmbCapital',
        src: './icon-rmb.png',
        text: '人民币大写'
      },
      {
        url: '/pages/phoneNumber/phoneNumber',
        src: './icon-tel.png',
        text: '常用电话'
      },
      // {
      //   url: '/pages/nopage/nopage',
      //   src: './icon-lhl.png',
      //   text: '老黄历'
      // },
      // {
      //   url: '/pages/nopage/nopage',
      //   src: './icon-glnl.png',
      //   text: '公历农历转换'
      // },
      {
        url: '/pages/phoneQuery/phoneQuery',
        src: './icon-phone.png',
        text: '手机号归属'
      },
      // {
      //   url: '/pages/nopage/nopage',
      //   src: './icon-ip.png',
      //   text: 'IP地址'
      // },
      // {
      //   url: '/pages/nopage/nopage',
      //   src: './icon-jt.png',
      //   text: '历史上的今天'
      // },
      // {
      //   url: '/pages/nopage/nopage',
      //   src: './icon-bmi.png',
      //   text: 'BMI指数'
      // },
      {
        url: '/pages/nopage/nopage',
        src: './icon-medal.png',
        text: '电子奖状'
      }
    ]
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

  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  }
})