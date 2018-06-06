import { isUserAutor, login, checklogin } from './utils/common.js';
import { toast, formatData } from './utils/util.js';
App({
    onLaunch: function(page) {
      console.log('小程序初始化')
      let _loginKey = wx.getStorageSync('loginKey');
      if (!_loginKey && page.path != "pages/home/home") {
            wx.redirectTo({
              url: 'pages/home/home'
            })
      }
      
      if (!wx.canIUse('button.open-type.getUserInfo')){
        toast('请升级微信版本!','none',5000)        
      }
    },
    onShow:function(){
      console.log('后台进入前台')
      checklogin()
        .then(res => {
          if (res.data.code != "LOGINED") {
            toast('登陆信息失效，请退出重新登陆');
            wx.removeStorageSync('loginKey');
          } 
        }, err => {
          toast('登陆检测异常')
        })
    },
    //初始化用户授权机制
    getUserInfo(e, pageThis) {
      //判断用户是否同意授权
      let that = this;
      if (e.detail.errMsg == "getUserInfo:ok") {
        //同意授权
        wx.setStorageSync('userInfo', e.detail);
        that.globalData.userInfo = e.detail;
        pageThis.agreelogin(e.detail);
      } else {
        //不同意授权
        pageThis.openSetting();
      }
    },
    agreelogin(userdata, c) {
      let that = this;
      wx.showLoading({
        title: '加载中',
      })
      login(userdata)
        .then(res => {
          if (res.data.code == "SUCCESS") {
            that.globalData.loginKey = res.data.data.loginKey;
            wx.setStorageSync('loginKey', res.data.data.loginKey);
            //成功获取loginkey后执行回调函数
            c && c();
          }else{
            wx.hideLoading();
          }
        }, err => {
          wx.hideLoading();
        })
    },
    openSetting: function (pageThis) {
      wx.showModal({
        title: '授权失败',
        showCancel: false,
        content: '没有授权的情况下，无法发为您提供服务，请打开小程序授权',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              complete: function (data) {
                if (data.authSetting["scope.userInfo"]) {
                  isUserAutor()
                    .then(res => {
                      wx.setStorageSync('userInfo', res);
                      pageThis.agreelogin(res)
                    })
                } else {
                  pageThis.openSetting();
                }
              }
            })
          }
        }
      })
    },
    globalData: {
      userInfo: null,
      loginKey: null
    }
})