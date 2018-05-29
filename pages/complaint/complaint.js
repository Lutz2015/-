Page({
  /**
   * 页面的初始数据
   */
  data: {
    complaintList:['欺诈','色情','政治谣言','诱导分享','恶意营销','隐私信息收集'],
    check:1,
    checkInfo:'欺诈'
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
  }
})