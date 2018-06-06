import { toast } from '../../utils/util.js';
import { wxopensave, initLotteryData, lottery, GetPrize, lotteryrule} from '../../utils/getdata.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    initLotteryData: {},//初始化信息
    lotteryGoods:"",//抽中的奖品信息
    activeType: 2,  //底部tab选中
    pubCoverHide: true,//遮罩曾隐藏
    alertBoxOneHide: true,//中奖弹窗1
    alertBoxTwoHide: true,//中奖弹窗2
    inviteBoxhide:true,
    animationData: {},
    ruleData:"",
    sum: 0, //当前角度
    prevSum: 0,//记录上一次的角度
    isRoll: false,
    address:{}
  },
  onLoad: function (options) {
    //初始化动画
    let that = this;
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-in-out',
    })
    this.animation = animation;
    
    initLotteryData()
      .then(res => {
        that.setData({
          initLotteryData: res.data
        })
      })

    lotteryrule()
      .then(res => {
        WxParse.wxParse('ruleData', 'html', res.data, that);
      })  
    wx.hideShareMenu()
  },
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

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      if (res.target.dataset.type == 1) {
        return {
          title: '我猜中了世界杯比赛，你的运气如何？',
          imageUrl: '../../images/other/share.png',
          path: `/pages/home/home`
        }
      } else if (res.target.dataset.type == 2) {
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
  tran: function (idx) {
    let that = this;
    let tran_promise = new Promise(function (resolve, reject) {
      let ruleFigure; //获取规定产品转盘位置
      for (let i = 0; i < that.data.initLotteryData.prize_config.length;i++){
        if (that.data.initLotteryData.prize_config[i].wp_id == idx){
           ruleFigure = i;
           break;
         }
      }
      let ratateTxt = that.data.initLotteryData.prize_config.filter(function(item,index){
        return item.wp_id == idx;
      }); //获取规定产品名字
      let sum = that.data.sum - that.data.prevSum + 360 * (Math.floor((Math.random() * 5)) + 5) + 60 * ruleFigure + 30; //最终角度
      that.animation.rotate(sum).step();
      that.setData({
        animationData: that.animation.export(),
        sum: sum,
        prevSum: 60 * ruleFigure + 30
      })
      setTimeout(function () {
        resolve(ratateTxt)
      }, 3000)
    })
    return tran_promise;
  },
  goDraw() {
    let that = this;
    if (this.data.isRoll) return;
    if (that.data.initLotteryData.lottery_times <= 0) {
      toast('抽奖次数不足～');
      return;
    }
    this.setData({
      isRoll: true
    })
    lottery()
      .then(res => {
        if (res.code == "SUCCESS"){
       
          that.tran(res.data.pid)
            .then(ratateTxt => {
              if (!res.data.pid) {
                toast('很遗憾，您没有中奖～');
                that.setData({
                  isRoll: false,
                  [`${'initLotteryData'}.lottery_times`]: res.data.lottery_times,
                  [`${'initLotteryData'}.score`]: res.data.score
                })
                return;
              }
              that.setData({
                [`${'initLotteryData'}.lottery_times`]: res.data.lottery_times,
                [`${'initLotteryData'}.score`]: res.data.score,
                lotteryGoods: res.data,
                isRoll: false,                
                pubCoverHide:false,
                alertBoxOneHide:false
              })
            })
        }else{
          toast(res.msg);
          that.setData({
            isRoll: false
          })
        }
        
      })

  },//暂不领取
  temporary(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '关闭领奖后，可在我的奖品内查看记录',
      success: function (res) {
        that.setData({
          pubCoverHide:true,
          alertBoxOneHide:true
        })
      }
    })
  },
  nowGet(){
    let that = this;
    let _address = wx.getStorageSync('address');
    if (!_address) {
      wx.chooseAddress({
        success: function (res) {
          wx.setStorageSync('address', res);
          that.setData({
            address: res,
            alertBoxTwoHide:false,
            alertBoxOneHide: true            
          })
        },
        fail: function () {
          that.setData({
            pubCoverHide: true,
            alertBoxOneHide: true
          })
          that.checkAdressFn();
        }
      })
    } else {
      that.setData({
        address: _address,
        alertBoxTwoHide: false,
        alertBoxOneHide:true
      })
    }
  },
  checkAddress() {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        wx.setStorageSync('address', res);
        that.setData({
          address: res
        })
      }
    })
  },
  sureGet(){

    let that = this;
    let _address = this.data.address;
    if (_address.userName && _address.telNumber) {
      let _addressInfo = `${_address.provinceName}${_address.cityName}${_address.countyName}${_address.detailInfo}`
      GetPrize(that.data.lotteryGoods.pid, _address.userName, _address.telNumber, _addressInfo)
        .then(res => {
          if (res.code == "SUCCESS") {
            toast('领取成功')
              that.setData({
                pubCoverHide:true,
                inviteBoxhide:true,
                alertBoxTwoHide: true
              })
          }
        })

    }
  },
  //底部tab页面跳转
  gotoHome(e) {
    wxopensave(e.detail.formId)
      .then(res => {
        console.log(res)
      })
    wx.redirectTo({
      url: '../home/home'
    })
  },
  gotoDraw(e) {
    wxopensave(e.detail.formId)
      .then(res => {
        console.log(res)
      })
    console.log('已经是抽奖页了～')
  },
  gotoMe(e) {
    wxopensave(e.detail.formId)
      .then(res => {
        console.log(res)
      })
    wx.redirectTo({
      url: '../me/me'
    })
  },
  closeAll(){
    this.setData({
      pubCoverHide:true,
      inviteBoxhide:true
    })
  },
  checkAdressFn() {
    let that = this;
    wx.showModal({
      title: '获取地址失败',
      showCancel: false,
      content: '没有收获地址，无法正常发货，请您授权并选择地址',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            complete: function (data) {
              if (data.authSetting["scope.address"]) {
                wx.getSetting({
                  success: function (res) {
                    if (res.authSetting['scope.address']) {
                      wx.chooseAddress({
                        success: function (res) {
                          wx.setStorageSync('address', res);
                          that.setData({
                            address: res
                          })
                        }
                      })
                    }
                  }
                })
              } else {
                that.checkAdressFn();
              }
            }
          })
        }
      }
    })
  }
})