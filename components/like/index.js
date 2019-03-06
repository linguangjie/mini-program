// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like,
        count = this.properties.count;
      like ? count-- : count++;
      this.setData({
        count: count,
        like: !like
      })
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})