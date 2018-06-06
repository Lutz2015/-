import { championGuessList, championGuess, guessChampionRule} from '../../utils/getdata.js'
import { toast } from '../../utils/util.js';
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pubCoverHide: true,
    ruleBoxHide:true, 
    lists:[],
    ruleData: "",
    guess_result:null,
    isFrist:null,
    lottery_times:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    championGuessList()
    .then(res => {
      console.log(res)
      that.setData({
        lists:res.data.lists,
        isFrist: res.data.guess_result,
        guess_result: res.data.guess_result,
        lottery_times:res.data.lottery_times
      })
    })
    guessChampionRule()
      .then(res => {
        WxParse.wxParse('ruleData', 'html', res.data, that);
      })
    wx.hideShareMenu();

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
    console.log(e)
    let _guessresult = e.currentTarget.dataset;
    toast(`您已选择：${_guessresult.country}`)    
    this.setData({
      guess_result: _guessresult
    })
  }, 
  postChampionGuess(){
    let _guessresult = this.data.guess_result;
    let _this = this;
    if(!_this.data.isFrist){
      championGuess(_guessresult.country)
        .then(res => {
          if (res.code == "SUCCESS") {
            _this.setData({
              isFrist: _guessresult
            })
          }
          toast(res.msg)
        }, err => {
          toast('修改失败')
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '冠军竞猜，结果仅能修改2次，确定修改？',
        cancelColor:"#3CC51F",
        confirmColor:"#000000",
        success: function (res) {
          if (res.confirm) {
            championGuess(_guessresult.country)
              .then(res => {
                if (res.code == "SUCCESS") {
                  _this.setData({
                    isFrist: null,
                    guess_result: null
                  })
                }
                toast(res.msg)
              }, err => {
                toast('修改失败')
              })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
     
   
  }
})