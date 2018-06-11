import { inviteRule } from '../../utils/getdata.js'
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleData: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    let that = this;
    inviteRule()
      .then(res => {
        WxParse.wxParse('ruleData', 'html', res.data, that);
      })
    if (options.from == "formid") {
      that.setData({
        showGoBack: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      if (res.target.dataset.type == 1) {
        return {
          title: '我猜中了世界杯比赛，你的运气如何？',
          imageUrl: '../../images/other/share.png',
          path: `/pages/home/home`
        }
      } else if (res.target.dataset.type == 2) {
        if (wx.getStorageSync('loginKey')) {
          return {
            title: '快来参与世界杯竞猜，大奖等你来拿！',
            imageUrl: '../../images/other/share.png',
            path: `/pages/home/home?shareid=${wx.getStorageSync('loginKey')}`
          }
        } else {
          toast('请您先授权登陆～')
        }
      }
    }
  },
  goHome: function () {
    wx.redirectTo({
      url: `/pages/home/home`,
    })
  }
})