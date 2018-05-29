import { toast } from '../../utils/util.js';
const app = getApp();
Page({
  data: {
    // marquee: {
    //   text: '',
    //   time:10
    // },
    gamelist:[{
      countrylicon: '../../images/other/jpan.png',//左队国家icon
      countryricon: '../../images/other/jpan.png',//右队国家icon
      countrynamel: '俄罗斯',//左队国家名字
      countrynamer: '中国',//右队国家名字
      gametime:'06/14 23:00',
      openpage:1,//是否展开
      gametype:1,//比赛方式 1猜比分 2猜输赢 3猜比分加输赢
      coinl:0, //猜左队的比分 
      coinr:0, //猜右队的比分 
      suspect:1//猜输赢类型 1左队赢 2平局 3右队赢
    }],
    statusCheck:1,
    pubCoverHide:true,//遮罩曾隐藏
    isLogin: true,//默认开启启动页
    activeType: 1 //底部tab选中
  },
  onLoad: function (options) {
    if (wx.getStorageSync('loginKey')) {
      console.log('登陆成功')
    } else {
      //开启引导授权
      this.setData({
        isLogin: false
      })
    }
    // this.setData({
    //   [`${'marquee'}.text`]:'hello world!你好中国！2018 你好！'
    // })
    // this.startMarquee();
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
  //tab切换
  swichStatusTab(e){
   let _index = e.currentTarget.dataset.index;
   this.setData({
     statusCheck: _index
   })
  }, 
  openPage(e){
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'gamelist'}[${_data.idx}].openpage`]: Number(_data.type) });
  }, 
  itemCheckGameSuspect(e){
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'gamelist'}[${_data.idx}].suspect`]: _data.index });
  },
  //各个列表切换比赛模式
  itemCheckGameType(e){
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'gamelist'}[${_data.idx}].gametype`]: _data.type });
  },
  gotoHome() {
    console.log('已经是首页了～')
  },
  gotoDraw() {
    wx.redirectTo({
      url: '../luckdraw/luckdraw'
    })
  },
  gotoMe() {
    wx.redirectTo({
      url: '../me/me'
    })
  },
  gotoWinInfo() {
    wx.navigateTo({
      url: '../wininfo/wininfo'
    })
  },
  gotoRealTime() {
    wx.navigateTo({
      url: '../realtime/realtime'
    })
  },
  /**
   * marquee相关
   */
  // getDuration: (width) => {// 保留，根据文字长度设置时间
  //   return width / 5;
  // },
  // codePointLength:(text) => {
  //   var result = text.match(/[\s\S]/gu);
  //   return result ? result.length : 0;
  // },
  // startMarquee(){
  //   const str = this.data.marquee.text;
  //   const width = this.codePointLength(str);
  //   const time = this.getDuration(width);
  //   this.setData({ [`${'marquee'}.width`]: width, [`${'marquee'}.time`]: time});
  // },
  /**
   * 需要授权页面的
   */
  getUserInfo(e) {
    app.getUserInfo(e, this);
  },
  agreelogin(userdata) {
    let that = this;
    app.agreelogin(userdata, function () {
      that.setData({
        isLogin: true
      })
    });
  },
  openSetting: function () {
    app.openSetting(this);
  }
})