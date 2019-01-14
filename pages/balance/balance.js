// pages/balance/balance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    
      logo:"http://image.quku199.com/balance/balance-logo.png",
      My:"我的余额",
      // money:"396.55",
      TouchBalance:"余额明细",
  },
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    console.log(2222)
    wx.navigateTo({
      url: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this
    var user = wx.getStorageSync('user')
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success(res) {
        // var balance = res.data.data.UserBalance.substring(0, res.data.data.UserBalance.length - 2) 
        that.setData({
          money: res.data.data.UserBalance
        })
      }
    })
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
  
  }
})