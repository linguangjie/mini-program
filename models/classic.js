import {
  HTTP
} from '../util/http.js';

class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (data) => {
        callback(data);
        this._setLatestIndex(data.index);
        let key = this._getKey(data.index);
        wx.setStorageSync(key, data);
      }
    })
  }

  getClassic(index, nextOrPrevious, callback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          callback(res);
        }
      })
    } else {
      callback(classic);
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index === latestIndex ? true : false;
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }
}

export {
  ClassicModel
};