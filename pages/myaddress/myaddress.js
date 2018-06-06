import { toast } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let _address = wx.getStorageSync('address');
    if (!_address){
        wx.chooseAddress({
          success: function (res) {
            wx.setStorageSync('address', res);
            that.setData({
              address: res
            })
          },
          fail:function(){
            that.checkAdressFn();
          }
        })
    }else{
      that.setData({
        address: _address
      })
    }
    wx.hideShareMenu()
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
  checkAddress(){
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
  checkAdressFn(){
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