// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'
const classicModel = new ClassicModel(),
  bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {

        }
      }
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }

})