// components/search/index.js
import {
  KeywordStorage
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behavior/pagination.js'

const keywordStorage = new KeywordStorage()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**s
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    this.setData({
      historyWords: keywordStorage.getHistory()
    })
    keywordStorage.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore() {
      if (this.data.q) {
        return
      }
      if (this.data.loading) {
        return
      }

      if (this.hasMore()) {
        this.setData({
          loading: true
        })
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.setData({
            loading: false
          })
        })
      }

    },
    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },
    onConfirm(event) {
      this.setData({
        searching: true,
        loadingCenter: true
      })

      let q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q,
          loadingCenter: false
        })
        keywordStorage.addToHistory(q)
      })
    },
    onDelete(event) {
      this.setData({
        searching: false,
        q: ''
      })
      this.initialize()
    }
  }
})