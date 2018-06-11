import { myPrizeList, GetPrize} from '../../utils/getdata.js'
import { toast } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realtimeCheck: 1,
    showGoBack: false,
    isLoding: false,//待领取加载状态
    lists: [],//待领取列表
    pages: [],//待领取分页
    isLoding1: false,//已领取加载状态
    lists1: [],//已领取列表
    pages1: [],//已领取分页
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){
      this.setData({
        realtimeCheck:options.type
      })
    }
    if (options.from == "formid") {
      this.setData({
        showGoBack: true
      })
    }
    wx.hideShareMenu();
    this.myPrizeListFn(1, 1 ,0); //首次加载未领取
    this.myPrizeListFn(1, 1 ,1); //首次加载已领取
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
    if (that.data.realtimeCheck == 1){
      //待领取
      if (that.data.isLoding || that.data.pages.current == that.data.pages.last) {
        return;
      }
      that.setData({
        isLoding: true
      })
      that.myPrizeListFn(2, that.data.pages.next,0)
    }else{
      //已领取
      if (that.data.isLoding1 || that.data.pages1.current == that.data.pages1.last) {
        return;
      }
      that.setData({
        isLoding1: true
      })
      that.myPrizeListFn(2, that.data.pages1.next,1)
    }
  },
  //获取加载列表 changtype = 1表示第一次加载
  myPrizeListFn: function (changtype, pageIndex,status) {
    let that = this;
    myPrizeList(pageIndex, status)
      .then(res => {
        if (status){
          //已领取
          if (changtype == 1) {
            that.setData({
              lists1: res.data.lists,
              pages1: res.data.pages
            })
          } else {
            let _nowLists = that.data.lists1.concat(res.data.lists);
            that.setData({
              lists1: _nowLists,
              pages1: res.data.pages
            })
          }
          that.setData({
            isLoding1: false
          })
        }else{
          //未领取
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
        }
      })
  },

  onShareAppMessage: function () {

  },
  gotoComplaint() {
    wx.navigateTo({
      url: '../complaint/complaint'
    })
  },
  swichrealtimeTab(e) {
    let _index = e.currentTarget.dataset.index;
    this.setData({
      realtimeCheck: _index
    })
  },
  openPage(e){
    let _data = e.currentTarget.dataset;
    let that = this;
    let _address = wx.getStorageSync('address');
    if (!_address) {
      wx.chooseAddress({
        success: function (res) {
          wx.setStorageSync('address', res);
          that.setData({
            address: res,
            [`${'lists'}[${_data.index}].isopen`]: 0            
          })
        },
        fail: function () {
          that.checkAdressFn()
        }
      })
    } else {
      that.setData({
        address: _address,
        [`${'lists'}[${_data.index}].isopen`]: 0
      })
    }
  },
  closePage(e) {
    let _data = e.currentTarget.dataset;
    this.setData({ [`${'lists'}[${_data.index}].isopen`]: 1 });
  },
  getGoods(e){
    let that = this;
    let _data = e.currentTarget.dataset; 
    let _address = this.data.address;
    if (_address.userName && _address.telNumber){
      let _addressInfo = `${_address.provinceName}${_address.cityName}${_address.countyName}${_address.detailInfo}`
      GetPrize(_data.wpid, _address.userName, _address.telNumber, _addressInfo)
        .then(res => {
          if (res.code == "SUCCESS"){
            toast('领取成功')  
            let _lists = that.data.lists;
            _lists.splice(_data.index,1);
            that.setData({
              lists: _lists
            })
            that.myPrizeListFn(1, 1, 1); //重新初始化已领取         
          }
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
  },
  goHome: function () {
    wx.redirectTo({
      url: `/pages/home/home`,
    })
  }
})