import {
  HTTP
} from '../util/http.js';

class LikeModel extends HTTP {
  like(likeOrCancel, art_id, type) {
    let url = likeOrCancel === 'cancel' ? 'like/cancel' : 'like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      }
    })
  }
  getClassicLikeStatus(artID, category, callback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: callback
    })
  }
}
export {
  LikeModel
};