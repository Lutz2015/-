import { toast } from '../../utils/util.js';
Page({
  data: {
    activeType: 2,  //底部tab选中
    pubCoverHide: true,//遮罩曾隐藏
    alertBoxOneHide:true,//中奖弹窗1
    alertBoxTwoHide: true,//中奖弹窗2
    animationData: {},
    sum: 0, //当前角度
    prevSum:0,//记录上一次的角度
    isRoll:false,
    rotatePrize: {
      0: '感谢参与',
      1: '豌豆枕',
      2: '抱枕',
      3: '陶瓷杯',
      4: '帽子',
      5: '吉祥物'  
    }
  },
  onLoad: function (options) {
    //初始化动画
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-in-out',
    })
    this.animation = animation;
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
  onShareAppMessage: function () {

  },
  tran: function (index) {
    console.log('开始转了～')
    let that = this;
    let tran_promise = new Promise(function (resolve,reject){
      var ruleFigure = index, //获取规定产品转盘位置
        ratateTxt = that.data.rotatePrize[ruleFigure]; //获取规定产品名字
      let sum = that.data.sum - that.data.prevSum + 360 * (Math.floor((Math.random() * 5)) + 5) + 60 * ruleFigure + 30; //最终角度
      that.animation.rotate(sum).step();
      that.setData({
        animationData: that.animation.export(),
        sum: sum,
        prevSum: 60 * ruleFigure + 30
      })
      setTimeout(function () {
        that.setData({
          isRoll: false
        })
        resolve(ratateTxt)
      }, 3000)
    })
    return tran_promise;
  },
  goDraw() {
    let that = this;
    if (this.data.isRoll) return;
    this.setData({
      isRoll: true
    })
    let _num = Math.floor((Math.random() * 6));
    console.log(_num)
    this.tran(_num)
      .then(res => {
        toast(res)
      })
  },
  //底部tab页面跳转
  gotoHome() {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  gotoDraw() {
    console.log('已经是抽奖页了～')
  },
  gotoMe() {
    wx.redirectTo({
      url: '../me/me'
    })
  }
})