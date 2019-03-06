import {
  HTTP
} from '../util/http-p.js'

class KeywordStorage extends HTTP {

  getHistory() {
    const words = wx.getStorageSync('q')
    if (!words) {
      return []
    }
    return words
  }
  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory('q')
    if (!words.includes(keyword)) {
      if (words.length > 10) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync('q', words)
    }
  }
}

export {
  KeywordStorage
}