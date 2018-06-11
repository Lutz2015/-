import { myQuizRecordList } from '../../utils/getdata.js'
import { toast, formatTime } from '../../utils/util.js';

Page({
  data: {
    realtimeCheck: 1,
    isLoding: false,//竞猜记录加载状态
    lists: [],//竞猜记录列表
    pages: [],//竞猜记录分页
    isLoding1: false,//竞猜记录加载状态
    lists1: [],//竞猜记录列表
    pages1: []//竞猜记录分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.myQuizRecordListFn(1, 1, 0); //首次加载猜错
    this.myQuizRecordListFn(1, 1, 1); //首次加载猜对
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
      that.myQuizRecordListFn(2, that.data.pages.next, 1)
    } else {
      //已领取
      if (that.data.isLoding1 || that.data.pages1.current == that.data.pages1.last) {
        return;
      }
      that.setData({
        isLoding1: true
      })
      that.myQuizRecordListFn(2, that.data.pages1.next, 0)
    }
  },
  //获取加载列表 changtype = 1表示第一次加载
  myQuizRecordListFn: function (changtype, pageIndex, status) {
    let that = this;
    myQuizRecordList(pageIndex, status)
      .then(res => {
        let _list = res.data.lists.map(function (item, index) {
          item.match_date = formatTime(item.match_date)
          return item;
        })
        if (!status) {
          //猜对
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
          //猜错
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
  openPage(e) {
    let _data = e.currentTarget.dataset;
    if (this.data.realtimeCheck == 1){
      this.setData({ [`${'lists'}[${_data.idx}].isopen`]: parseInt(_data.type) });
    }else{
      this.setData({ [`${'lists1'}[${_data.idx}].isopen`]: parseInt(_data.type) });
    }
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