import { scoreRank, inviteRank} from '../../utils/getdata.js'
import { toast } from '../../utils/util.js';
Page({
  data: {
    realtimeCheck: 1,
    isLoding: false,//积分加载状态
    lists: [],//积分列表
    pages: [],//积分分页
    isLoding1: false,//邀请好友加载状态
    lists1: [],//邀请好友列表
    pages1: [],//邀请好友分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.scoreRankFn(1, 1); //首次加载
    this.inviteRankFn(1, 1); //首次加载

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
      //积分
      if (that.data.isLoding || that.data.pages.current == that.data.pages.last) {
        return;
      }
      that.setData({
        isLoding: true
      })
      that.scoreRankFn(2, that.data.pages.next)
    } else {
      //邀请好友
      if (that.data.isLoding1 || that.data.pages1.current == that.data.pages1.last) {
        return;
      }
      that.setData({
        isLoding1: true
      })
      that.inviteRankFn(2, that.data.pages1.next)
    }
  },

  //获取加载列表 changtype = 1表示第一次加载
  scoreRankFn: function (changtype, pageIndex) {
    let that = this;
    scoreRank(pageIndex)
      .then(res => {
        if (changtype == 1) {
          that.setData({
            lists: res.data.lists,
            pages: res.data.pages
          })
        } else {
          let _nowLists = that.data.lists.concat(res.data.lists);
          that.setData({
            lists: _nowLists,
            pages: res.data.pages
          })
        }
        that.setData({
          isLoding: false
        })
      })
  },
  //获取加载列表 changtype = 1表示第一次加载
  inviteRankFn: function (changtype, pageIndex) {
    let that = this;
    inviteRank(pageIndex)
      .then(res => {
        if (changtype == 1) {
          that.setData({
            lists1: res.data.lists,
            pages1: res.data.pages
          })
        } else {
          let _nowLists = that.data.lists.concat(res.data.lists);
          that.setData({
            lists1: _nowLists,
            pages1: res.data.pages
          })
        }
        that.setData({
          isLoding1: false
        })
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