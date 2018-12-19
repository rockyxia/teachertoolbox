// pages/xfyunTts/xfyunTts.js
let innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * Page initial data
   */
  data: {
    text: '欢迎来到教师工具箱，快试试语音合成功能吧。',
    isplay: false,
    speed: '50',
    volume: '50',
    pitch: '50'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.xfyun()
  },

  // 合成语音开始
  formSubmit(e) {
    let that = this,
      _text = e.detail.value.textarea
    if (_text == '') {
      wx.showToast({
        title: '请输入需要合成的文字',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    that.setData({
      text: _text,
      speed: e.detail.value.speed + '',
      volume: e.detail.value.volume + '',
      pitch: e.detail.value.pitch + '',
      isplay: true
    })

    wx.showToast({
      title: '合成成功，你听...',
      icon: 'success',
      duration: 1000
    })

    that.xfyun()
  },

  formReset() {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '真的要清空吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            text: ''
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 播放
  playAudio() {
    innerAudioContext.play()
  },
  // 暂停
  pauseAudio() {
    innerAudioContext.pause()
  },
  // 停止
  stopAudio() {
    innerAudioContext.stop()
  },

  // 复制链接
  copyLink() {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none',
      duration: 1000
    })
  },

  // 粘贴内容
  pasteContent() {
    let that = this
    wx.getClipboardData({
      success(res) {
        console.log(res.data)
        if(res.data == '') {
          wx.showToast({
            title: '剪贴板是空的',
            icon: 'none',
            duration: 1000
          })
        } else {
          that.setData({
            text: res.data
          })
        }
      }
    })
  },

  // 讯飞云服务
  xfyun() {
    let that = this,
      url = 'https://dev.rockyxia.com/api_xfyn_tts.php';
    
    wx.request({
      url: url,
      method: 'POST',
      responseType: 'arraybuffer',
      data: {
        'text': that.data.text,
        'speed': that.data.speed,
        'volume': that.data.volume,
        'pitch': that.data.pitch
      },
      success(res) {
        console.log(res)

        const fs = wx.getFileSystemManager()
        let _filePath = wx.env.USER_DATA_PATH + '/tts.audio.mp3'

        fs.writeFileSync(_filePath, res.data, 'utf8')
        // if (innerAudioContext) {
          innerAudioContext.destroy()
        // }

        innerAudioContext = wx.createInnerAudioContext()

        innerAudioContext.src = _filePath

        innerAudioContext.autoplay = true
        innerAudioContext.play()
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
          
      }
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