const app = getApp();
Component({

  behaviors: [],

  properties: {
    activeType: {
      type: String,
      value: 1,
    }
  },
  data: {
    
  },
  attached: function () { },
  created(){
    console.log('......')

  },
  ready: function () {

  },
  moved: function () { },
  detached: function () { },
  methods: {
    gotoHome(){
      wx.navigateTo({
        url: '../home/home'
      })
    },
    gotoDraw() {
      wx.navigateTo({
        url: '../luckdraw/luckdraw'
      })
    },
    gotoMe() {
      wx.navigateTo({
        url: '../me/me'
      })
    }
  }

})