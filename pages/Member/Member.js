// pages/membership/membership.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    membership:{},
    LevelTypeID:0,
    back:""
  },
  PayVip: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../confirm/confirm?typeid=' + that.data.LevelTypeID,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user')
    wx.request({
      url: 'https://api.quku199.com/api/UserLevelInterests/GetUserLevelInterests',
      method: "POST",
      data: {
        UserId: user.UserID,
      },
      success: function (res) {

        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {


            that.setData({
              membership: res.data.data[0]
            })

          }
          else {
            console.log(res.data.errmsg)
          }
        }
        else {
          console.log(res.data.statusCode)
        }
      }
    })

  },

  //购买会员
 


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
  
  }
})