// components/classic/epsoid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal) {
        if (newVal < 10) {
          this.setData({
            _index: '0' + newVal
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index: 0
  },

  ready: function() {
    let date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();
    this.setData({
      month: this.data.months[month],
      year: year
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})