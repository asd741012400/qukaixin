Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"http://image.quku199.com/BindAlipay/pay1.png",
    inputnum:"",
    img2:"http://image.quku199.com/BindAlipay/user.png",
    inputname:"",
  },

  toastFun:function(){
    
    wx.showToast({
      title: '绑定成功',
      icon: 'none',
      duration: 2000
    })

    // wx.showLoading({
    //   title: '加载中',
    // })

    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)



    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    // var arr = ['A', 'B', 'C'];
    // wx.showActionSheet({
    //   itemList: arr,
    //   success: function (res) {
    //     console.log(arr[res.tapIndex])
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
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