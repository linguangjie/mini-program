// components/classic/music/index.js
import {
  classicBehavior
} from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    palying: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function() {
    this._recoverPlaying();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.title;
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverPlaying: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
          this._recoverPlaying()
        }),
        mMgr.onEnded(() => {
          this._recoverPlaying()
        })
    }
  }
})