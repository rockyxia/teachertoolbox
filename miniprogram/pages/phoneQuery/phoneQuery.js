// pages/phoneQuery/phoneQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo: '',
    showResult: false,
    phoneResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formSubmit: function (e) {
    const phoneNo = e.detail.value.phoneNo
    const phoneResult = ''
    if (phoneNo == '') {
      wx.showToast({
        title: '请输入手机号码！',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        phoneNo: phoneNo
      })

      this.juheApi()
    }
  },
  formReset: function () {
    console.log('清空了')
    this.setData({
      showResult: false,
      phoneResult: ''
    })
  },

  // juheApi
  juheApi() {
    // debugger
    let that = this,
      url = 'https://apis.juhe.cn/mobile/get';

    wx.request({
      url: url,
      method: 'GET',
      // data: 'phone=' + that.data.phoneNo +'&key=bbd2712836170d0d4715aa6cc5dfa72a',
      data: {
        phone: that.data.phoneNo,
        key: 'bbd2712836170d0d4715aa6cc5dfa72a'
      },
      success(res) {
        console.log(res)
        if (res.data.error_code != 0){
          that.setData({
            showResult: true,
            phoneResult: res.data.reason
          })
        } else {
          that.setData({
            showResult: true,
            phoneResult: '归属省份：' + res.data.result.province + '\n归属城市：' + res.data.result.city + '\n属地区号：' + res.data.result.areacode + '\n运营商：' + res.data.result.company + '\n卡类型：' + res.data.result.card
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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