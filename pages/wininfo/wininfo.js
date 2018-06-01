import { getRewardList} from '../../utils/getdata.js'
import { toast, formatTime } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoding: false,//加载状态
    lists: [],//列表
    pages: [],//分页

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.getRewardListFn(1, 1); //首次加载
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
  onShareAppMessage: function () {

  },
  onReachBottom: function () {
    let that = this;
    //防止一直加
    if (that.data.isLoding || that.data.pages.current == that.data.pages.last) {
      return;
    }
    that.setData({
      isLoding: true
    })
    that.getRewardListFn(2, that.data.pages.next)
  },  

  //获取加载列表 changtype = 1表示第一次加载
  getRewardListFn: function (changtype, pageIndex) {
    let that = this;
    getRewardList(pageIndex)
      .then(res => {
        let _list = res.data.lists.map(function (item, index) {
          item.create_time = formatTime(item.create_time)
          return item;
        })
        if (changtype == 1) {
          that.setData({
            lists: _list,
            pages: res.data.pages
          })
        } else {
          let _nowLists = that.data.lists.concat(_list);
          that.setData({
            lists: _nowLists,
            pages: res.data.pages
          })
        }
        that.setData({
          isLoding: false
        })
      })
  }
})