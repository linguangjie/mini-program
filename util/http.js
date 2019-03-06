import {
  config
} from '../config.js'

const tips = {
  1: '0',
  1005: '1',
  3000: '2'
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          let errorCode = res.data.error_code;
          this._showError(errorCode);
        }
      },
      fail: (err) => {
        this._showError(1);
      }
    })
  }
  _showError(errorCode) {
    if (!errorCode) {
      errorCode = 1;
    }
    let tip = tips[errorCode];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}