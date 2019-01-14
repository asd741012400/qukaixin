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


    verifyImg: "http://image.quku199.com/Update-Phone/ico1.png",
    verifyNum: '',
    verifyImg2: "http://image.quku199.com/Update-Phone/ico3.png",
    verifyCode: 1,

    value: "",
    pass: "",
    openID: "",
    userInfo: {}
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
    }, 100)
  },

  getVerificationCode() {

    var that = this

    if (that.data.value.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    else if (that.data.value.length < 11) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    else {

      wx.request({
        url: 'https://api.quku199.com/api/Sms/PostRegisterSms',     //否则调发短信接口
        method: "POST",
        data: {
          userphone: that.data.value,
        },
        success: function (res) {
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

    }
  },


  vla: function (e) {
    var that = this;

    that.setData({
      value: e.detail.value,      //把抓出来的数据传给中间商
    })


  },
  pass: function (e) {
    var that = this;
    that.setData({
      pass: e.detail.value,
    })

  },

  bindSure: function (e) {
    var user = wx.getStorageSync('user')
    var that = this;
    if (that.data.pass.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://api.quku199.com/api/User/UpdateUserPhoneNumber',
        method: "POST",
        data: {
          UserPhone: that.data.value,
          UserID: user.UserID
        },
        success: function (res) {
          if (res.data.errcode == 0) {
            wx.showToast({
              title: '验证成功',
              icon: 'none',
              duration: 1500
            }) 
            wx.navigateTo({
              url: '../personalCenter/personalCenter',
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

//验证码倒计时结束



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //newPhone
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