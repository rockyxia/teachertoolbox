// pages/xfyunOcr/xfyunOcr.js
Page({

  /**
   * Page initial data
   */
  data: {
    jsonHtml: [],
    strHtml: '',
    isShow: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * 从相册选择
   */
  clickAlbum: function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        that.xfyun()
      }
    })
  },

  /**
   * 从相机拍摄
   */
  clickCamera: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        that.xfyun()
      }
    })
  },

  /**
   * 复制文本
   */
  copyText: function(){
    let that = this
    wx.setClipboardData({
      data: that.data.strHtml,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 调用讯飞云服务
   */
  xfyun: function() {
    let that = this,
      url = 'https://dev.rockyxia.com/api_xfyun_ocr.php',
      imagebase64 = '';

      // console.log(that.data.tempFilePaths)
    wx.showLoading({
      title: '识别转换中',
    })

    wx.getFileSystemManager().readFile({
      filePath: that.data.tempFilePaths[0], //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        // console.log('data:image/png;base64,' + res.data)
        imagebase64 = res.data
        wx.request({
          url: url,
          method: 'POST',
          // responseType: 'arraybuffer',
          data: {
            'image': imagebase64
          },
          success(res) {
            if(res.data.code === '0') {
              // console.log(res.data.data.block)
              let jsonHtml = []
              let strHtml = ''

              let blockArray = res.data.data.block
              for (let i = 0; i < blockArray.length; ++i) {

                // console.log(blockArray[i].line)
                let lineArray = blockArray[i].line
                for ( let j = 0; j < lineArray.length; ++j) {

                  // console.log(lineArray[j].word)
                  // strHtml = strHtml + '<view>'
                  let text = []
                  let wordArray = lineArray[j].word
                  for (let k = 0; k < wordArray.length; ++k) {
                    // console.log(wordArray[k].content)
                    strHtml = strHtml + wordArray[k].content + ' '
                    let word = {
                      word: wordArray[k].content
                    }
                    text.push(word)
                  }
                  strHtml = strHtml + '\n'
                  jsonHtml.push(text)
                }
                // strHtml = strHtml + '<view>------分割线------</view>'
              }
              wx.hideLoading()
              console.log(strHtml)
              that.setData({
                strHtml: strHtml,
                jsonHtml: jsonHtml,
                isShow: true
              })
            } else {
              wx.showToast({
                title: ' 无法识别，换个试试',
                icon: 'none',
                duration: 1000
              })
            }
          },
          fail(res) {
            wx.showToast({
              title: ' 无法识别，换个试试',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })

    
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