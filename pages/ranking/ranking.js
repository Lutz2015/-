import { scoreRank, inviteRank } from '../../utils/getdata.js'
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
    userinfo: {},//用户信息
    mydata: {},//积分排行自己
    mydata1: {}//邀请好友排行自己
  },
  onLoad: function (options) {
    wx.hideShareMenu()
    let that = this;
    let _userInfo = wx.getStorageSync('userInfo').userInfo;
    that.setData({
      userinfo: _userInfo
    })
    that.scoreRankFn(1, 1); //首次加载
    that.inviteRankFn(1, 1); //首次加载

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
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
            mydata: res.data.mydata,
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
            mydata1: res.data.mydata,
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
  onShareAppMessage: function (res) {
    //1 不带参数  2带参数
    if (res.from === 'button') {
      if (res.target.dataset.type == 1){
        return {
          title: '快来参与世界杯竞猜，大奖等你来拿！',
          imageUrl: '../../images/other/share.png',
          path: `/pages/home/home`
        }
      } else if (res.target.dataset.type == 2){
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
  swichrealtimeTab(e) {
    let _index = e.currentTarget.dataset.index;
    this.setData({
      realtimeCheck: _index
    })
  },
  showJfRule() {
    wx.showModal({
      title: '积分说明',
      showCancel:false,
      content: '积分达到100积分以上的用户均可参与抽奖',
      success: function (res) {
        console.log(res)
      }
    })
  },
  showYqRule() {
    wx.showModal({
      title: '邀请好友说明',
      showCancel: false,      
      content: '邀请好友数在前20名的用户可以参与抽奖，邀请好友数相同则视为同一名（均可参与抽奖）',
      success: function (res) {
        console.log(res)
      }
    })
  }
})