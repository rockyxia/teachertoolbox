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
        faceUrl: './hfjsdk.jpg',
        name: '合肥教师代课',
        enname: 'hfjsdk',
        intro: '合肥教师代课招聘信息及时发布，教师招考咨询、辅导，为合肥教师点赞。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/hfjsdk2020.jpg?sign=52ae988f2f7efd78fdc48515606d09bd&t=1590030483'
      },
      {
        faceUrl: './jskbzy.jpg',
        name: '教师考编资源',
        enname: 'jskbzy',
        intro: '教师考编资源大全，教师考编资源正在陆续发布中。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/jskbzy2020.jpg?sign=a90fde092500972d75a01cbce762c9aa&t=1590030506'
      },
      {
        faceUrl: './ahjszpxx.jpg',
        name: '皖徽教师招聘',
        enname: 'ahjszpxx',
        intro: '安徽教师招考信息，教师考编考试公告，面试公告等信息发布。',
        ewmUrl: 'https://7465-teacher-668d49-1258227407.tcb.qcloud.la/ahjszpxx2020.jpg?sign=c4789544884f0f0a69ba4d7d5996096c&t=1590030467'
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