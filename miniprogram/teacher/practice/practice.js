// teacher/practice/practice.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categroyArray: [],
    multiArray: [[], []],
    multiIndex: [2, 0],
    categroyId: null,
    todayString: null,
    oldDays: null
  },

  //获取当前时间
  getCurrentMonthFirst(date) {
    var date = date;
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    return todate;
  },

  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = this.data.categroyArray[1]
            break
          case 1:
            data.multiArray[1] = this.data.categroyArray[2]
            break
          case 2:
            data.multiArray[1] = this.data.categroyArray[3]
            break
        }
        data.multiIndex[1] = 0
        break
    }
    data.categroyId = data.multiArray[1][data.multiIndex[1]].id
    console.log(data.categroyId)
    this.setData(data)
  },

  /**
   * 日期显示处理
   */
  dateShow(){
    let date = new Date()
    this.setData({
      todayString: this.getCurrentMonthFirst(date),
      oldDays: [
        this.getCurrentMonthFirst(new Date(date.getTime() - 24 * 60 * 60 * 1000)),
        this.getCurrentMonthFirst(new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000)),
        this.getCurrentMonthFirst(new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000)),
        this.getCurrentMonthFirst(new Date(date.getTime() - 4 * 24 * 60 * 60 * 1000))
      ]
    })
  },

  // 跳转
  gotoExamination(e){
    console.log(e)
    wx.navigateTo({
      url: '/teacher/examination/examination?date=' + e.target.dataset.date + '&categroyId=' + this.data.categroyId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dateShow()

    db.collection('exam_categroy').get().then(res => {
      // res.data 包含该记录的数据
      // console.log(res.data)
      let _data = res.data
      let _categroyArray = [[]]
      for (let i = 0; i < _data.length; i++) {
        _categroyArray[0].push({ name: _data[i].name, id: _data[i].id})
        let _childs = _data[i].childs
        let _tempArray = []
        for (let j = 0; j < _childs.length; j++) {
          _tempArray.push({ name: _childs[j].name, id: _childs[j].id })
        }
        _categroyArray[i + 1] = _tempArray
      }

      this.setData({ 
        categroyArray: _categroyArray,
        multiArray: [_categroyArray[this.data.multiIndex[1]], _categroyArray[this.data.multiIndex[0]+1]],
        categroyId: _categroyArray[this.data.multiIndex[0] + 1][this.data.multiIndex[1]].id
       })

      // console.log(this.data.categroyId)
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