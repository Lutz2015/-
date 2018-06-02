
var utils = require('../../utils/util2.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageContent:'',
    list:[{
      title:'1.如何收到获得的奖品',
      content:'厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥',
      isOpen:false
    }, {
      title: '1.如何收到获得的奖品',
      content: '厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥',
      isOpen: false
      }, {
        title: '1.如何收到获得的奖品',
        content: '厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥厉害了我的哥',
        isOpen: false
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    var body = utils.parseStory('<p><span>这是一段p标签</span></p>', false);
    console.log(body)
    this.setData({
      "pageContent": body[0]
    });
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
  openList(e){
    let _data = e.currentTarget.dataset;
    let _list = this.data.list.map(function(item,index){
      if(_data.index == index){
        item.isOpen = true;        
      }else{
        item.isOpen = false;       
      }
       return item;
    })
    this.setData({
      list: _list
    })
  }
})