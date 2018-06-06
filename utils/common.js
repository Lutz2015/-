let { toast } = require("./util.js");
// const BASEURL = "https://v-test.vdailian.com/"; //开发
const BASEURL = "https://v-api.vdailian.com/"; //线上
let timer = null;
//登录
const getLoginKey = (code, token, userInfo) => {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      method: 'POST',
      responseType: 'text',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Token-Key': token.TokenKey,
        'Token-Value': token.TokenValue
      },
      url: BASEURL + 'vapi/passport/wxlogin',
      data: {
        code: code,
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        source: 'wcup'
      },
      success: function (res) {
        console.log('获取loginkey成功')
        console.log(res)
        resolve(res);
      },
      fail: function (error) {
        console.log('获取loginkey失败')
        console.log(error)
        reject(error);
      }
    })
  })
  return promise;
}
//获取toKen
const getToken = () => {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: BASEURL + 'vapi/token/get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == "SUCCESS") {
          wx.setStorageSync('token', res.data.data) //保存token
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: function (err) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '当前网络不好！请检查网络！',
          success: function (res) {

          }
        })
      }
    })
  })
  return promise;
}
//新api封装
const getApi = (urls, options = {}, METHOD = "POST") => {
  let promise = new Promise(function (resolve, reject) {
    let loginkey = wx.getStorageSync('loginKey');
    let tokenKey = wx.getStorageSync('token').TokenKey || null;
    let tokenValue = wx.getStorageSync('token').TokenValue || null;
    let _data = Object.assign({}, options, {
      'loginKey': loginkey
    })
    if (!tokenKey || !tokenValue) {
      getTokenApi(urls, _data, METHOD, resolve, reject)
    } else {
      wx.request({
        method: METHOD,
        responseType: 'text',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Token-Key': tokenKey,
          'Token-Value': tokenValue
        },
        url: BASEURL + urls,
        data: _data,
        success: function (res) {
          if (res.data.code == "TOKEN_KEY_NULL") {
            getTokenApi(urls, _data, METHOD, resolve, reject)
          }
          else {
            resolve(res.data);
          }
        },
        fail: function (err) {
          reject(err)
        },
        complete: function () {
        }
      })
    }
  })
  return promise;
}
//token过期的情况
const getTokenApi = (urls, _data, METHOD, resolve, reject) => {
  getToken().then(res => {
    wx.request({
      method: METHOD,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Token-Key': res.data.TokenKey,
        'Token-Value': res.data.TokenValue
      },
      url: BASEURL + urls,
      data: _data,
      success: function (res) {
        resolve(res.data);
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
      }
    })
  }, err => {
    reject(err);
  })
}
//判断用户是否授权
const isUserAutor = () => {
  let promise = new Promise(function (resolve, reject) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              resolve(res)
            }
          })
        }
      }
    })
  })
  return promise;
}

const login = (getUserInfo) => {
  let promise = new Promise(function (resolve, reject) {
    wx.login({
      success: getCode => {
        //获取toKen
        let tokenKey = wx.getStorageSync('token').TokenKey || null;
        let tokenValue = wx.getStorageSync('token').TokenValue || null;
        if (!tokenKey || !tokenValue) {
          getToken().then(token => {
            getLoginKey(getCode.code, token.data, getUserInfo)
              .then(res => {               
                if (res.data.code == "GET_WX_USERINFO_FAILED") {
                  toast('获取用户信息失败，请在点击进入按钮')
                } else {
                  resolve(res)
                }
              }, err => {
                reject(err);
              })
          }, err => {
            reject(err);            
          })
        } else {
          getLoginKey(getCode.code, wx.getStorageSync('token'), getUserInfo)
            .then(res => {
              if (res.data.code == "GET_WX_USERINFO_FAILED") {
                toast('获取用户信息失败，请在点击进入按钮')                
              } else {
                resolve(res)
              }
            }, err => {
              reject(err);
            })
        }
      }
    })
  })
  return promise;
}
const checklogin = () => {
  let promise = new Promise(function (resolve, reject) {
    let tokenKey = wx.getStorageSync('token').TokenKey || null;
    let tokenValue = wx.getStorageSync('token').TokenValue || null;
    if (!tokenKey || !tokenValue) {
      getToken().then(res => {
        wx.request({
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Token-Key': res.data.TokenKey,
            'Token-Value': res.data.TokenValue
          },
          url: BASEURL + 'vapi/passport/checklogin',
          data: {},
          success: function (res) {
            resolve(res);
          },
          fail: function (error) {
            reject(error);
          }
        })
      }, err => {
        reject(err);
      })
    } else {
      wx.request({
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Token-Key': tokenKey,
          'Token-Value': tokenValue
        },
        url: BASEURL + 'vapi/passport/checklogin',
        data: {},
        success: function (res) {
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        }
      })
    }




  })
  return promise;
}
export { getApi, getToken, getLoginKey, isUserAutor, login, checklogin };