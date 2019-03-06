// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js';
import {
  LikeModel
} from '../../models/like.js';


let classicModel = new ClassicModel(),
  likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest((data) => {
      this.setData({
        classic: data,
        likeCount: data.fav_nums,
        likeStatus: data.like_status
      })
    })
  },
  onLike: function(event) {
    let likeOrCancel = event.detail.behavior;
    likeModel.like(likeOrCancel, this.data.classic.id, this.data.classic.type);
  },
  onNext: function(event) {
    this._updateClassic('next')
  },
  onPrevious: function(event) {
    this._updateClassic('previous')
  },
  getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },





  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.getLikeStatus(res.id, res.type);
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  }
})