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
    console.log(data.multiIndex)
    this.setData(data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('exam_categroy').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      let _data = res.data
      let _categroyArray = [[]]
      for (let i = 0; i < _data.length; i++) {
        _categroyArray[0].push(_data[i].name)
        let _childs = _data[i].childs
        let _tempArray = []
        for (let j = 0; j < _childs.length; j++) {
          _tempArray.push(_childs[j].name)
        }
        _categroyArray[i + 1] = _tempArray
      }
      // console.log(_categroyArray)

      this.setData({ 
        categroyArray: _categroyArray,
        multiArray: [_categroyArray[this.data.multiIndex[1]], _categroyArray[this.data.multiIndex[0]+1]]
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