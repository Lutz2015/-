// pages/realtime/realtime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realtimeCheck: 1,
    gamelist: [{
      countrylicon: '../../images/other/jpan.png',//左队国家icon
      countryricon: '../../images/other/jpan.png',//右队国家icon
      countrynamel: '俄罗斯',//左队国家名字
      countrynamer: '中国',//右队国家名字
      gametime: '06/14 23:00',
      openpage: 1,//是否展开
      gametype: 1,//比赛方式 1猜比分 2猜输赢 3猜比分加输赢
      coinl: 0, //猜左队的比分 
      coinr: 0, //猜右队的比分 
      suspect: 1//猜输赢类型 1左队赢 2平局 3右队赢
    }]
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
  openPage(e) {
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'gamelist'}[${_data.idx}].openpage`]: Number(_data.type) });
  },
  itemCheckGameSuspect(e) {
    // let _data = e.currentTarget.dataset;
    // this.setData({ [`${'gamelist'}[${_data.idx}].suspect`]: _data.index });
  },
  //各个列表切换比赛模式
  itemCheckGameType(e) {
    // let _data = e.currentTarget.dataset;
    // this.setData({ [`${'gamelist'}[${_data.idx}].gametype`]: _data.type });
  },
  swichrealtimeTab(e) {
    let _index = e.currentTarget.dataset.index;
    this.setData({
      realtimeCheck: _index
    })
  }
})