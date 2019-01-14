var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:"",
    fun_id: 2,
    currentTime: 61,
    time: '发送校验码',
    BankName:'',
    BankNum:'',
    PhoneNum:'',
    CheckNum:'',
    Isdisabled:false,
    UserName:'',
    UserCardId:'',
    cardtype:'',
    skipUrl:"",
    sureClick:true
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

  getVerificationCode() {
    var that = this;

    if (that.data.PhoneNum.length == 11){

      //发送短信
      wx.request({
        url: 'https://api.quku199.com/api/Sms/PostRegisterSms',
        method: "POST",
        data: {
          userphone: that.data.PhoneNum,
        },
        success: function (res) {
          if (res.data.errcode == 0){
            wx.showToast({
              title: '发送成功',
              icon: 'none',
              duration: 1500,
            })
            that.getCode();
            that.setData({
              disabled: true
            })
          }
          else
          {
            wx.showToast({
              title: res.data.errcode,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '手机号码不正确',
        icon:'none',
        duration:1500,
      })
    }
    
  },

  Phone:function(e){
    var that = this
    that.setData({
      PhoneNum: e.detail.value,
    })
    console.log(that.data.PhoneNum)
    if (that.data.PhoneNum != "" && that.data.CheckNum != "" && that.data.check == 1)
    {
      that.setData({
        Isdisabled: true,
      })
    }
    else
    {
      that.setData({
        Isdisabled: false,
      })
    }
  },

  CheckNum: function (e) {
    var that = this
    that.setData({
      CheckNum: e.detail.value,
    })
    if (that.data.PhoneNum != "" && that.data.CheckNum != "" && that.data.check == 1) {
      that.setData({
        Isdisabled: true,
      })
    }
    else {
      that.setData({
        Isdisabled: false,
      })
    }
  },
  yanzheng:function(e){
    var that = this
    if (that.data.check == 1) 
    {
      if (that.data.PhoneNum != "" && that.data.CheckNum != "" && that.data.check == 1)
      {
        that.setData({
          Isdisabled: true,
        })
      }
      that.setData({
        check: "0",
      })
    }
    else 
    {
      that.setData({
        Isdisabled: false,
        check: "1",
      })
    }
  },

  BindBankCard:function(e){
    var that = this
    if (that.data.sureClick){
        that.setData({
          sureClick:false
        })
    //短信验证码验证接口
    wx.request({
      url: 'https://api.quku199.com/api/Sms/CheckSmsCode',
      method: "POST",
      data: {
        userphone: that.data.PhoneNum,
        smscode: that.data.CheckNum,
      },
      success: function (res) {
        that.setData({
          sureClick: false
        })
        var user = wx.getStorageSync('user')
        if (res.data.errcode == 0) {
          wx.request({
            url: 'https://api.quku199.com/api/CheckBankCard/BingBankCard',
            method: "POST",
            data: {
              Name: that.data.UserName,
              CardNum: that.data.BankNum,
              UserCardId: that.data.UserCardId,
              UserPhone: that.data.PhoneNum,
              BankName: that.data.BankName,
              UserID: user.UserID,
              cardtype: that.data.cardtype,
            },
            success: function (res) {
              that.setData({
                sureClick: true
              })
              if (res.data.errcode == 0) 
              {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1000
                })


                if (that.data.skipUrl == "backCard")
                {
                  setTimeout(function () {
                    //  wx.redirectTo({
                    //    url: '../bankCard/bankCard?BankName=' + that.data.BankName + '&&that.data.cardtype=' + that.data.cardtype + '&&CardNum=' + that.data.BankNum + '',
                    // })
                    wx.navigateBack({
                      delta: 2
                    })
                  }, 1000)
                  
                  
                }
                else
                {
                  setTimeout(function () {
                    // wx.redirectTo({
                    //   url: '../withdraw/withdraw'
                    // })
                    wx.navigateBack({
                      delta: 2
                    })
                  }, 1000)
                }
                
                  
              }
              else
              {
                wx.showToast({
                  title: res.data.errmsg,
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      BankName: options.BankName,
      BankNum: options.BankNum,
      UserName: options.UserName,
      UserCardId: options.UserCardId,
      cardtype: options.cardtype,
      skipUrl: options.url
    })
    // console.log(that.data)    
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