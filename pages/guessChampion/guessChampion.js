import { championGuessList, championGuess, guessChampionRule} from '../../utils/getdata.js'
import { toast } from '../../utils/util.js';
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pubCoverHide: true,
    showGoBack:false,
    ruleBoxHide:true, 
    lists:[],
    ruleData: "",
    guess_result:null, //
    canNewChose:false, //是否可以修改
    canChoseTimes:null,
    isFrist:null //存初始化数据，用来判断是否是第一次了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    championGuessList()
    .then(res => {
      that.setData({
        lists:res.data.lists,
        isFrist: res.data.guess_result,
        guess_result: res.data.guess_result,
        canChoseTimes: res.data.guess_result ?res.data.guess_result.lottery_times:null
      })
    })
    guessChampionRule()
      .then(res => {
        WxParse.wxParse('ruleData', 'html', res.data, that);
      })
    wx.hideShareMenu();
    if(options.from == "formid"){
      that.setData({
        showGoBack:true
      })
    }
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
  closeAll() {
    this.setData({
      pubCoverHide: true,
      ruleBoxHide: true
    })
  },
  showRule(){
    this.setData({
      pubCoverHide: false,
      ruleBoxHide: false
    })
  },
  choseCountry(e){
    //第一次或者可修改的情况可以触发
    if (this.data.canNewChose || !this.data.isFrist){
      let _guessresult = e.currentTarget.dataset;
      toast(`您已选择：${_guessresult.country}`)
      this.setData({
        guess_result: _guessresult
      })
    }
    
  }, 
  postChampionGuess(){
    let _this = this;
    if (_this.data.canNewChose || !_this.data.isFrist) {
      let _guessresult = this.data.guess_result;
      championGuess(_guessresult.country)
        .then(res => {
          if (!_this.data.isFrist) {
            _this.setData({
              isFrist: _guessresult,
              canNewChose: false,
              canChoseTimes:2
            })
          }else{
            _this.setData({
              isFrist: _guessresult,
              canNewChose: false,
              canChoseTimes: --_this.data.canChoseTimes             
            })
          }
          toast(`${res.msg}`)
        }, err => {
          toast('修改失败')
        })
    }  
  },
  // 重置
  canChose(){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '冠军竞猜，结果仅能修改2次，确定修改？',
      cancelColor: "#3CC51F",
      confirmColor: "#000000",
      success: function (res) {
        if (res.confirm) {
          if (_this.data.canChoseTimes<=0){
            toast('您已修改2次')
            return;
          }
          _this.setData({
            canNewChose: true,
            guess_result:null
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goHome: function () {
    wx.redirectTo({
      url: `/pages/home/home`,
    })
  }
})