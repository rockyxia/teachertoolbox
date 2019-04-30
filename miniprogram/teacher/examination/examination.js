// teacher/examination/examination.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testArray: null,
    indicatorDots: false,
    autoplay: false,
    currentSwiper: 0
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  // 开发中提示
  developmenting(){
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 2000
    })
  },

  // 查看答案
  checkAnswer() {
    // console.log(this.data.currentSwiper)
    this.editTestArrayAnswer(this.data.currentSwiper, true)
  },
  // 隐藏答案
  hideAnswer(){
    this.editTestArrayAnswer(this.data.currentSwiper, false)
  },

  // 获取当前页
  getCurrentSwiper(event) {
    // console.log(event)
    this.setData({
      currentSwiper: event.detail.current
    })
  },

  // 点击选项
  operateOption(event) {
    // console.log(this.data.currentSwiper, event.currentTarget.dataset.value, event.currentTarget.dataset.type)
    // 修改数据
    this.editTestArray(this.data.currentSwiper, event.currentTarget.dataset.value, event.currentTarget.dataset.type)
  },
  // 修改数据源1
  editTestArray(test, option, type) {
    let _testArray = this.data.testArray
    for (let i = 0; i < _testArray.length; i++) {
      if (i == test){
        let _options = _testArray[i].options
        for (let k = 0; k < _options.length; k++) {
          if (type == "1"){
            // 单选
            _options[k].selected = false
          }
          if (_options[k].name == option) {
            _options[k].selected = !_options[k].selected
          }
        }
      }
    }
    this.setData({
      testArray: _testArray
    })
  },
  // 修改数据源2
  editTestArrayAnswer(test, answer) {
    let _testArray = this.data.testArray
    for (let i = 0; i < _testArray.length; i++) {
      if (i == test) {
        _testArray[i].showAnswer = answer
      }
    }
    this.setData({
      testArray: _testArray
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.date
    })
    console.log(options.categroyId)
    db.collection('test-list').where({
      categroyid: options.categroyId
    }).get().then(res => {
      // console.log(res.data)
      Array.prototype.random = function () {
        var idx = Math.floor((Math.random() * this.length));
        var n = this.splice(idx, 1)[0];
        return n;
      }
      var i = 0;
      var a = [];
      while (i++ < 10) {
        a.push(res.data.random())
      }

      for (let j = 0; j < a.length; j++) {
        // _categroyArray[0].push({ name: _data[i].name, id: _data[i].id })
        let _childs = a[j].options
        a[j].showAnswer = false
        // let _tempArray = []
        for (let k = 0; k < _childs.length; k++) {
          // _tempArray.push({ name: _childs[j].name, id: _childs[j].id })
          _childs[k].selected = false
        }
        // _categroyArray[i + 1] = _tempArray
      }

      console.log(a);
      this.setData({
        testArray: a
      })
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