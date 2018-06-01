import { myData } from '../../utils/getdata.js'
const app = getApp();
Page({

  data: {
    activeType: 3,
    userinfo:{},
    myData:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let _userInfo =  wx.getStorageSync('userInfo').userInfo;
    that.setData({
       userinfo:_userInfo
    })
    myData()
     .then(res => {
       that.setData({
         myData: res.data
       })
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
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
  onShareAppMessage: function () {
  
  }, 
  gotoMygoods(){
    wx.navigateTo({
      url: '../mygoods/mygoods'
    })
  },
  gotoMyaddress(){
    wx.navigateTo({
      url: '../myaddress/myaddress'
    })
  },
  gotoQuestions(){
    wx.navigateTo({
      url: '../Questions/Questions'
    })
  },
  gotoIntegral() {
    wx.navigateTo({
      url: '../Integral/Integral'
    })
  },
  gotoRanking() {
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },
  gotoGuess() {
    wx.navigateTo({
      url: '../Guess/Guess'
    })
  },
  gotoHome() {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  gotoDraw() {
    wx.redirectTo({
      url: '../luckdraw/luckdraw'
    })
  },
  gotoMe() {
    console.log('已经是我的页面～')
  }
})