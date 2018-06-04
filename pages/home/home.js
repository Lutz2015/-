import { toast, formatWeek, formatData, formatTime } from '../../utils/util.js';
import { getBannerInfo, inviteCallBack, myData, matchGuessList, matchGuess, getRewardList, guessRule, wxopensave } from '../../utils/getdata.js';
import { checklogin } from '../../utils/common.js';
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
  data: {
    marquee: {},
    shareid: "",//分享者id
    myLotteryTimesLastday: '',//昨日抽奖次数
    ruleData:"",
    bannerInfo: [],
    list1: [],//可竞猜
    list2: [],//已结束
    list: [],//待竞猜
    statusCheck: 1,
    pubCoverHide: true,//遮罩曾隐藏
    guideBox1hide: true,
    guideBox2hide: true,
    guideBox3hide: true,
    guideBox4hide: true,
    inviteBoxhide: true,
    ruleBoxHide: true,
    drawBoxhide: true,
    isLogin: true,//默认开启启动页
    activeType: 1 //底部tab选中
  },
  onLoad: function (options) {
    let that = this;
    checklogin()
      .then(res => {
        if (res.data.code == "LOGINED") {
          if (wx.getStorageSync('loginKey')) {
            that.matchGuessListFn(1);
            that.getRewardListFn();
            that.getBannerInfoFn();
            that.guessRuleFn();
            let _data = new Date();
            let _dataNow = formatData(Date.parse(new Date()));
            var logs = wx.getStorageSync('logs') || {};
            if (!logs[_dataNow] || !logs[_dataNow].hasLogin) {
              logs[_dataNow] = {};
              logs[_dataNow].hasLogin = true;
              wx.setStorageSync('logs', logs);
              myData()
                .then(res => {
                  if (res.data.myLotteryTimesLastday) {
                    that.setData({
                      myLotteryTimesLastday: res.data.myLotteryTimesLastday,
                      pubCoverHide: false,
                      drawBoxhide: false
                    })
                  }
                })
            }
          } else {
            //开启引导授权
            if (options.shareid) {
              that.setData({
                isLogin: false,
                shareid: options.shareid
              })
            } else {
              that.setData({
                isLogin: false
              })
            }
          }
        } else {
          if (options.shareid) {
            that.setData({
              isLogin: false,
              shareid: options.shareid
            })
          } else {
            that.setData({
              isLogin: false
            })
          }
        }
        console.log(res)
      }, err => {
        toast('系统错误')
        if (options.shareid) {
          that.setData({
            isLogin: false,
            shareid: options.shareid
          })
        } else {
          that.setData({
            isLogin: false
          })
        }
      })

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
    //1 不带参数  2带参数
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
    return {
      title: '快来参与世界杯竞猜，大奖等你来拿！',
      imageUrl: '../../images/other/share.png',
      path: `/pages/home/home`
    }
  },
  //tab切换
  swichStatusTab(e) {
    let _index = e.currentTarget.dataset.index;
    if (this.data.statusCheck == _index) {
      return;
    }
    if (_index == 1) {
      this.matchGuessListFn(1);
    } else if (_index == 2) {
      this.matchGuessListFn(0);
    } else if (_index == 3) {
      this.matchGuessListFn(2);
    }
    this.setData({
      statusCheck: _index
    })
  },
  openPage(e) {
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'list1'}[${_data.idx}].isopen`]: Number(_data.type) });
  },
  itemCheckGameSuspect(e) {
    let _data = e.currentTarget.dataset;
    //猜过并且在两个小时内的一律不能猜
    if (this.data.list1[_data.idx].isGuess && this.data.list1[_data.idx].gameInStatus) {
      return;
    }
    this.setData({ [`${'list1'}[${_data.idx}].guessHistory.quiz_result`]: _data.index });
  },
  //各个列表切换比赛模式
  itemCheckGameType(e) {
    let _data = e.currentTarget.dataset;
    if (_data.type == this.data.list1[_data.idx].guessHistory.quiz_mode) {
      return;
    }
    if (_data.isguess) {
      toast('不能修改竞猜方式～');
      return;
    }
    this.setData({ [`${'list1'}[${_data.idx}].guessHistory.quiz_mode`]: _data.type });
  },
  formSubmit: function (e) {
    let that = this;
    let _list = that.data.list1[e.detail.target.dataset.idx];
    let _inputv = e.detail.value;
    let _data = {};
    wxopensave(e.detail.formId)
     .then(res => {
       console.log(res)
     })
    //是否提交竞猜过
    if (_list.gameInStatus && _list.isGuess) {
      toast('无法修改!');
      return;
    }
    _data.match_id = e.detail.target.dataset.matchid;
    _data.quiz_mode = _list.guessHistory.quiz_mode;
    if (_list.guessHistory.quiz_mode == 1) {
      if (!_inputv.input1 || !_inputv.input2) {
        toast('请您输入比分～')
        return;
      }
      _data.quiz_htscore = _inputv.input1;
      _data.quiz_vtscore = _inputv.input2;
      _data.quiz_result = "";
    } else if (_list.guessHistory.quiz_mode == 3) {
      if (!_inputv.input3 || !_inputv.input4) {
        toast('请您输入比分～')
        return;
      }
      if (!_list.guessHistory.quiz_result) {
        toast('请您选择胜方～')
        return;
      }
      _data.quiz_htscore = _inputv.input3;
      _data.quiz_vtscore = _inputv.input4;
      _data.quiz_result = _list.guessHistory.quiz_result;
    } else if (_list.guessHistory.quiz_mode == 2) {
      if (!_list.guessHistory.quiz_result) {
        toast('请您选择胜方～')
        return;
      }
      _data.quiz_htscore = 0;
      _data.quiz_vtscore = 0;
      _data.quiz_result = _list.guessHistory.quiz_result;
    } else {
      toast('请选择竞猜模式')
    }
    matchGuess(_data)
      .then(res => {
        if (res.code == "SUCCESS") {
          that.setData({
            [`${'list1'}[${e.detail.target.dataset.idx}].isGuess`]: 1,
            [`${'list1'}[${e.detail.target.dataset.idx}].isopen`]: 1
          })
          toast('提交成功', 'success')
        } else {
          toast(res.msg)
        }
      })
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
  closeOne() {
    this.setData({
      guideBox1hide: true,
      guideBox2hide: false,
    })
  },
  closeTwo() {
    this.setData({
      guideBox2hide: true,
      guideBox3hide: false,
    })
  },
  closeThree() {
    this.setData({
      guideBox3hide: true,
      guideBox4hide: false,
    })
  },
  closeFour() {
    this.setData({
      guideBox4hide: true,
      inviteBoxhide: false,
    })
  },
  closeAll() {
    this.setData({
      ruleBoxHide: true,
      pubCoverHide: true,
      inviteBoxhide: true,
      drawBoxhide: true
    })
  },
  showRuleBox() {
    this.setData({
      ruleBoxHide: false,
      pubCoverHide: false
    })
  },
  /**
   * marquee相关
   */
  getDuration: (width) => {// 保留，根据文字长度设置时间
    return width / 6;
  },
  codePointLength: (text) => {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
  },
  startMarquee(str) {
    const width = this.codePointLength(str);
    const time = this.getDuration(width);
    this.setData({ [`${'marquee'}.width`]: width, [`${'marquee'}.time`]: time });
  },
  /**
   * 需要授权页面的
   */
  matchGuessListFn(status) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    matchGuessList(status)
      .then(res => {
        wx.hideLoading()
        let _list = res.data.lists.map(function (item, index) {
          let ms = item.match_date - res.data.timestamp;
          if (ms > 0 && ms < 7200) {
            item['gameInStatus'] = true;
            //两个小时内
          } else {
            //两个小时外
            item['gameInStatus'] = false;
          }
          if (!item.guessHistory) {
            item.guessHistory = {
              "quiz_htscore": "",
              "quiz_vtscore": "",
              "quiz_result": "",
              "quiz_mode": "1"
            }
          }
          item.match_date = `${formatTime(parseInt(item.match_date))}  ${formatWeek(parseInt(item.match_date))}`
          return item;
        })
        if (status == 1) {
          //1竞猜中
          that.setData({
            list1: _list,
            list: [],
            list2: []
          })
        } else if (status == 2) {
          //2竞猜结束
          that.setData({
            list2: _list,
            list: [],
            list1: []
          })
        } else {
          //0待竞猜
          that.setData({
            list: _list,
            list1: [],
            list2: []
          })
        }
      })
  },
  getRewardListFn() {
    let that = this;
    getRewardList(1, 100)
      .then(res => {
        let text = "";
        for (var i = 0; i < res.data.lists.length; i++) {
          let _nickName = res.data.lists[i].nickName || '玩家';
          text += `球迷${_nickName}抽中了${res.data.lists[i].name}\xa0\xa0\xa0\xa0`
        }
        that.setData({
          [`${'marquee'}.text`]: text
        })
        that.startMarquee(text);

      })
  },
  guessRuleFn(){
    let that = this;    
    guessRule()
     .then(res => {
       WxParse.wxParse('ruleData', 'html', res.data, that);
     })
  },
  gotoWhere(e) {
    console.log(e)
    wx.navigateTo({
      url: `${e.target.dataset.url}`
    })
  },
  getBannerInfoFn() {
    let that = this;
    getBannerInfo()
      .then(res => {
        that.setData({
          bannerInfo: res.data
        })
      })
  },
  getUserInfo(e) {
    app.getUserInfo(e, this);
  },
  agreelogin(userdata) {
    let that = this;
    app.agreelogin(userdata, function () {
      console.log(that.data.shareid)//邀请用户身份
      console.log(wx.getStorageSync('loginKey'))//被邀请用户身份
      if (that.data.shareid && wx.getStorageSync('loginKey')) {
        inviteCallBack(that.data.shareid, wx.getStorageSync('loginKey'))
          .then(res => {
            console.log(res)
          })
      }
      // that.matchGuessListFn(0);
      that.matchGuessListFn(1);
      // that.matchGuessListFn(2);
      that.getRewardListFn();
      that.getBannerInfoFn();
      that.guessRuleFn();
      that.setData({
        isLogin: true,
        pubCoverHide: false,
        guideBox1hide: false
      })
    });
  },
  openSetting: function () {
    app.openSetting(this);
  }
})