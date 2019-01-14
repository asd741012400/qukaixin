// pages/bankCard/bankCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:0,
      backCardDetails:{}
  },
  urlFun: function (e) {
    var that = this;
    wx.navigateTo({
      url: "../bindBankcard/bindBankcard?url=backCard"
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
    var that = this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/CheckBankCard/GetBankCard',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {
            if (res.data.data == null) {
              wx.showToast({
                title: '系统错误，请稍后再试',
                icon: 'none',
                duration: 2000
              })

            }
            else {

              var num = res.data.data.BankCardNumber;

              var card = num.substring(num.length - 3)

              res.data.data.BankCardNumber = "**** **** **** **** " + card

              that.setData({
                backCardDetails: res.data.data
              })
            }
            that.setData({
              show: 1
            })
          }
          else {
            that.setData({
              show: 0
            })
            console.log("res.data.errcode---GetBankCard---", res.data.errmsg)
          }
        }
        else {
          console.log("res.statusCode---GetBankCard---", res.statusCode)

        }
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