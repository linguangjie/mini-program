import {
  config
} from '../config.js'

const tips = {
  1: '0',
  1005: '1',
  3000: '2'
}

class HTTP {
  request({
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }
  _request(url, resolve, reject, data, method) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
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