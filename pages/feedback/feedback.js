// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    text:"",
    content:"",
    tiJiaoOn:true,
    opacity:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  
  },
  f1:function(e){
    var that = this;
    this.setData({
      num: e.detail.value.length,
      text:e.detail.value,
    })
    if(that.data.text !=""){
      that.setData({
        opacity:true,
      })
    }
    else{
      that.setData({
        opacity:false,
      })
    }
    // console.log(e.detail.value)
  },
  
  
  
  //意见反馈
  present: function (e) {
    var that = this;
    if (that.data.tiJiaoOn){
      that.setData({
        tiJiaoOn: false
      })
      console.log(1111)
    
    var user = wx.getStorageSync('user')
    wx.request({
      url: 'https://api.quku199.com/api/User/InsertUserOpinion',
      method: "POST",
      data: {
        UserID: user.UserID,
        Content: that.data.text,
      },
      success: function (res) {
        that.setData({
          tiJiaoOn: true
        })
        if (res.data.errcode==0){
            wx.showToast({
              title: res.data.errmsg,
              icon:'none',
              duration:1000
            })
            
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },1000)
            
          }
          else{
          wx.showToast({
            title: "提交失败，请稍后再试",
            icon: 'none',
            duration: 1500
          })
          }
      }
    })
  }
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