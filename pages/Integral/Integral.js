import { myScoreDetail } from '../../utils/getdata.js'
import { toast, formatTime } from '../../utils/util.js';
Page({
  data: {
    realtimeCheck: 1,
    isLoding: false,//积分获取加载状态
    lists: [],//积分获取列表
    pages: [],//积分获取分页
    isLoding1: false,//积分消耗加载状态
    lists1: [],//积分消耗列表
    pages1: []//积分消耗分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.myScoreDetailFn(1, 1, 1); //首次加载积分获取
    this.myScoreDetailFn(1, 1, 2); //首次加载积分消耗
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
  onReachBottom: function () {
    let that = this;
    //防止一直加
    if (that.data.realtimeCheck == 1) {
      //待领取
      if (that.data.isLoding || that.data.pages.current == that.data.pages.last) {
        return;
      }
      that.setData({
        isLoding: true
      })
      that.myScoreDetailFn(2, that.data.pages.next, 1)
    } else {
      //已领取
      if (that.data.isLoding1 || that.data.pages1.current == that.data.pages1.last) {
        return;
      }
      that.setData({
        isLoding1: true
      })
      that.myScoreDetailFn(2, that.data.pages1.next, 2)
    }
  },
  //获取加载列表 changtype = 1表示第一次加载
  myScoreDetailFn: function (changtype, pageIndex, status) {
    let that = this;
    myScoreDetail(pageIndex, status)
      .then(res => {
        let _list = res.data.lists.map(function (item, index) {
          item.create_time = formatTime(item.create_time)
          return item;
        })
        if (status == 2) {
          //已领取
          if (changtype == 1) {
            that.setData({
              lists1: _list,
              pages1: res.data.pages
            })
          } else {
            let _nowLists = that.data.lists1.concat(_list);
            that.setData({
              lists1: _nowLists,
              pages1: res.data.pages
            })
          }
          that.setData({
            isLoding1: false
          })
        } else {
          //未领取
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
        }
      })
  },
  onShareAppMessage: function () {

  },
  swichrealtimeTab(e) {
    let _index = e.currentTarget.dataset.index;
    this.setData({
      realtimeCheck: _index
    })
  }
})