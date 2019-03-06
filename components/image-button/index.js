// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  options: {
    multipleSlots: true
  },
  data: {
    openType: String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo() {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})