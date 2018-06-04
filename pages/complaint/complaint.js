import { toast } from '../../utils/util.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    complaintList:['欺诈','色情','政治谣言','诱导分享','恶意营销','隐私信息收集'],
    check:0,
    checkInfo:'欺诈',
    phone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
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
  onShareAppMessage: function () {
  
  },
  checkIndex(e){
    let _data = e.currentTarget.dataset;
    this.setData({
      check:_data.index + 1,
      checkInfo: this.data.complaintList[_data.index]
    })
  },
  go(){
    if (this.data.phone && !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.data.phone))) {
      toast("请输入正确的手机号");
      return;
    } 
    if (!this.data.checkInfo){
      toast("请选择投诉原因");
    }
    toast("投诉成功");
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },2000)
   
  },
  userinput(e){
    this.setData({
      phone: e.detail.value
    })
  }
})