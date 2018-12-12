// my.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {
      nickName: '点击左侧图标获取用户信息'
    },
    logged: false,
    takeSession: false,
    requestResult: '',
    genderName: '',
    address: '',
    modalHidden: true,
    modalTitle: '',
    modalEwm: '',
    nocancel: true,
    recommendArray: [
      {
        faceUrl: './hfface.jpg',
        name: '合肥教师代课',
        enname: 'hfjsdk',
        intro: '合肥教师代课招聘信息及时发布，教师招考咨询、辅导，为合肥教师点赞。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/hfewm.jpg?sign=72f47b06f2b8c650ba1453dea2d01b81&t=1544184992'
      },
      {
        faceUrl: './jsface.jpg',
        name: '教师考编资源',
        enname: 'jskbzy',
        intro: '教师考编资源大全，教师考编资源正在陆续发布中。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/jsewm.jpg?sign=ea9be31c5cbe5f832a486fa2fc0f677c&t=1544185012'
      },
      {
        faceUrl: './laface.jpg',
        name: '六安教师代课',
        enname: 'lajsdk',
        intro: '六安教师代课招聘信息及时发布，教师招考咨询、辅导，为六安教师点赞。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/laewm.jpg?sign=420762b84e3d992dc5a1f5626ac8fe9c&t=1544185026'
      }
    ]
  },

  showEwm: function (event) {
    // console.log(event)
    wx.previewImage({
      current: event.target.dataset.ewm, // 当前显示图片的http链接
      urls: [event.target.dataset.ewm], // 需要预览的图片http链接列表
      success(res) {
        console.log("success:"+res)
      },
      fail(res) {
        console.log("fail:" +res)
      },
      complete(res) {
        console.log("complete:" +res)
      }
    })
    // this.setData({
    //   modalHidden: false,
    //   modalTitle: event.target.dataset.name,
    //   modalEwm: event.target.dataset.ewm
    // })
  },

  modalConfirm: function () {
    this.setData({
      modalHidden: true
    })
  },

  modalCandel: function () {
    this.setData({
      modalHidden: true
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        genderName: e.detail.userInfo.gender == 1 ? "男，" : "女，",
        address: e.detail.userInfo.country + '-' + e.detail.userInfo.province + '-' + e.detail.userInfo.city
      })
    }
  },

  onLoad: function () {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                genderName: res.userInfo.gender == 1 ? "男，" : "女，",
                address: res.userInfo.country + '-' + res.userInfo.province + '-' +  res.userInfo.city
              })
            }
          })
        }
      }
    })

    // 设置分享
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})