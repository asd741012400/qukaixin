var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '发送验证码', //倒计时 
    currentTime: 61,

    img:"http://image.quku199.com/Update-Phone/ico3.png",
    inputcode:"",
    UserPhone:'',
    pass:'',
  },

  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒重新发送'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false          

        })
      }
    }, 1000)
  },
  getVerificationCode:function(e) {
   
    var that = this
    wx.request({
      url: 'https://api.quku199.com/api/Sms/PostRegisterSms',
      method:"POST",
      data:{
        userphone: that.data.UserPhone
      },
      success(res){
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '已经成功发送',
            icon: 'none',
          })
          that.getCode();
          that.setData({
            disabled: true
          })
        }
        else {
          wx.showToast({
            title: '发送失败',
            icon: 'none',
          })
        }
      }
    })
    
  },
 



  bindSure: function (e) {

    var that = this;
    if (that.data.pass.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://api.quku199.com/api/Sms/CheckSmsCode',
        method: "POST",
        data: {
          userphone: that.data.UserPhone,
          smscode: that.data.pass,
        },
        success: function (res) {
          if (res.data.errcode == 0) {
            wx.showToast({
              title: '验证成功',
              icon: 'none',
              duration: 1500
            })
            wx.navigateTo({
              url: '../Update-NewPhone/Update-NewPhone'
            })
          }            
          else {
            wx.showToast({
              title: '验证失败',
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },







  pass: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      pass: e.detail.value,
    })
  },

//验证码倒计时结束
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userphone)
     var that = this
     that.setData({
       UserPhone: options.userphone
     })
    // var that = this
    // var user = wx.getStorageSync('user')
    // console.log(user)
    // wx.request({
    //   url: 'https://api.quku199.com/api/User/UpdateUserPhoneNumber',
    //   method:"POST",
    //   data:{
    //     UserID: user.UserID,
    //     UserPhone: options.userphone
    //   },
    //   success(res){
    //     if (res.statusCode == 200){
    //       if (res.data.errcode == 0){
    //         that.setData({
    //           UserPhone: options.userphone
    //         })
    //       }
    //     }
    //   }

    // })
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