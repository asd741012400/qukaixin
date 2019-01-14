// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0.00,
    vla:0,
    selectedSwitch:0,
    BusinessID:0,
    popShow:false,
    tokenData:{},
    orderid:0,
    prevent:true,

    phoneBottom:0,
    phone:false,
    time:"发送验证码",
    userPhone: 0,
    userPhone2:0,
    phonePass:0,
    countDownNum:60,
    inputDisabled: false,
    btnDisabled:true,
    oTimer:null,
    iofoOn:true
  },


  popShow:function(e){

    var that = this;

    clearInterval(that.data.oTimer)
    wx.navigateBack()
  },
  urlFun:function(){
    var that = this;
    clearInterval(that.data.oTimer)
    wx.navigateTo({
      url: '../merchant/merchant?bid=' + that.data.BusinessID + "&oid=" + that.data.orderid + "&url=shopDetails",
    })
  },

  bindButtonTap:function(e){
    var that = this;
    that.setData({
      phoneBottom: e.detail.height
    })
  },
  bindblurs: function (e) {
    var that = this;
    that.setData({
      phoneBottom: 0
    })
  },
  bindKeyInput:function(e){
    var that = this;
    that.setData({
      vla: e.detail.value
    })
  },
  closePopFun:function(){
    var that = this;
    that.setData({
      phone : false,
      prevent: true,
      affirm: false,
      phonePass:"",
      time: "发送验证码",
      countDownNum: 60,
      inputDisabled: false
    })
    clearInterval(that.data.oTimer)
  },
 
  selectedSwitch:function(e){
    var that = this,
      index = e.currentTarget.dataset.index;
    that.setData({
      prevent: true
    }) 
    if (index == 0)
    {
      that.setData({
        selectedSwitch : 0
      })
    }
    else if (index == 1)
    {
      that.setData({
        selectedSwitch: 1
      })
    }
  },

  //判断 余额 / 微信 支付
  confirmPayment:function(){
    var that = this,
      user = wx.getStorageSync('user');

    if (that.data.vla != 0)
    {
      if (that.data.prevent)
      {
        
        that.setData({
          prevent:false
        })

        if (that.data.selectedSwitch == 0)
        {

          if (parseFloat(that.data.vla) > parseFloat(that.data.balance))
          {
            wx.showToast({
              title: '余额不足',
              icon: 'none',
              duration: 500
            })
          }
          else
          {
            that.setData({
              phone: true
            })
          }
         
        }
        else if (that.data.selectedSwitch == 1)
        {
          wx.showLoading({
            title: '加载中',
          })

          that.addPayMenu(that.data.tokenData)
          
        }
      }
    }
    else
    {
      wx.showToast({
        title: '输入金额不能为空',
        icon: 'none',
        duration: 500
      })
    }


  },
  //获取短信验证码的值
  recordPass:function(e){
    
    var that = this;

    if (e.detail.value == "")
    {
      that.setData({
        affirm: false
      })
    }
    else
    {
      that.setData({
        affirm: true
      })
    }

    that.setData({
      phonePass: e.detail.value,
    })
  },  

  //判断手机验证码是否为空
  getVerificationCode:function(){
    var that = this;

    if (that.data.countDownNum == 60)
    {
      that.sendVerification()
    }      
  

  },

  //倒计时
  countDown: function (){
    var that = this;
    that.data.oTimer = setInterval(function(){
      that.data.countDownNum--;
      that.setData({
        time: that.data.countDownNum + "s后重新发送"
      })
      console.log(that.data.countDownNum)
      if (that.data.countDownNum <= 0)
      {
        clearInterval(that.data.oTimer)
        that.setData({
          time: "重新发送",
          countDownNum:60,
          inputDisabled:false
        })
      }
    }, 1000)
  },


  //发送验证码
  sendVerification:function(){
    var that = this;

    wx.request({
      url: 'https://api.quku199.com/api/Sms/PostRegisterSms',     //否则调发短信接口
      method: "POST",
      data: {
        userphone: that.data.userPhone2,
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '已经成功发送',
            icon: 'none',
            duration: 1000
          })
          that.setData({
            time: "60s后重新发送",
            inputDisabled: true
          })

          that.countDown()
        }
        else {
          wx.showToast({
            title: '发送失败',
            icon: 'none',
            duration: 1000
          })
          that.setData({
            time: "重新发送",
            countDownNum: 60,
            inputDisabled: false
          })
        }
      }
    })
  },

  //短信验证
  verificationInfo:function(){
    var that = this;
    
    if (that.data.iofoOn)
    {
      that.setData({
        iofoOn:false
      })
      if (that.data.phonePass != "")
      {
        wx.request({
          url: 'https://api.quku199.com/api/Sms/CheckSmsCode',     //否则调发短信接口
          method: "POST",
          data: {
            userphone: that.data.userPhone2,
            smscode: that.data.phonePass
          },
          success: function (res) {
            
            that.setData({
              iofoOn: true
            })
            if (res.data.errcode == 0) {
              
              that.PayTheBillForBalance()

            }
            else {
              wx.showToast({
                title: res.data.errmsg,
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
      else
      {
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none',
          duration: 1000
        })
      }
    }
    
  },


  //余额支付
  PayTheBillForBalance:function(){
    var that = this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/Pay/PayTheBillForBalance',
      method:"POST",
      data:{
        UserID: user.UserID,
        BusinessID: that.data.BusinessID,
        PayType:2,
        Pid:"",
        PayAmount: that.data.vla
      },
      success:function(res){
        if (res.statusCode == 200) 
        {

          if (res.data.errcode == 0) 
          {
        
            var Balance = that.data.balance - that.data.vla

            that.setData({
              balance: Balance,
              time: "发送验证码",
              countDownNum: 60,
              inputDisabled: false,
              phone:false,
              popShow: true,
              orderid:res.data.data
            })

          }
          else
          {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
              duration: 1000
            })
            console.log("res.data.errcode-----PayTheBillForBalance---", res.data.errcode)
          }
        }
        else
        {
          console.log("res.statusCode-----PayTheBillForBalance---", res.statusCode)
        }
      }
    })
  },


  addPayMenu:function(json){
    var that = this,
      UserID = json.UserID,
      BusinessID = json.BusinessID,
      Token = json.Token;
    wx.request({
      url: 'https://api.quku199.com/api/UserOrder/AddPayMenu',
      method:'POST',
      data:{
        UserID: UserID,
        BusinessID: BusinessID,
        Token: Token,
        Mark: ""
      },
      success:function(res){
        if (res.statusCode == 200) {

          if (res.data.errcode == 0) 
          {
            that.WechatPayForUser(res.data.data.OutTradeNo)         
          }
        }
        else
        {
          console.log("res.statusCode-----AddPayMenu---",res.statusCode)
        }  
        

      }
    })

  },


  WechatPayForUser: function (OutTradeNo){
    var that = this;
    var user = wx.getStorageSync('user');
    var values = that.data.vla * 100;
    
    wx.request({
      url: 'https://api.quku199.com/api/Pay/WechatPayForUser',
      method: "POST",
      data: {
        // total_fee: values,
        total_fee: 1,
        body: "买单",
        trade_type: "JSAPI",
        openid: user.unionid,
        paytype: 1,
        attach: 2,
        out_trade_no:OutTradeNo
      },
      success: function (res) {
        if (res.statusCode == 200) {

          if (res.data.errcode == 0) {

            that.setData({
              orderid: res.data.data.out_trade_no
            })


            that.PayInfoForWx(res.data.data.prepay_id)
          }
          else {
            console.log("res.data.errmsg---WechatPayForUser----", res.data.errmsg)

          }
        }
        else 
        {
          console.log("res.statusCode---WechatPayForUser----", res.statusCode)
        }
      }
    })
  },


  PayInfoForWx:function(packages){
    var that = this;
    wx.request({
      url: 'https://api.quku199.com/api/Pay/PayInfoForWx',
      method:"POST",
      data:{
        'package': packages,
      },
      success:function(res){

        if(res.statusCode == 200)
        {
      
          wx.hideLoading()
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonce_str,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) {
              // console.log(res)
              that.setData({
                popShow: true,
                prevent: true
              })

            },
            'fail': function (res) {
              console.log(111111, res)
              that.setData({
                prevent: true
              })

            }
          })
        }
        else
        {
          wx.showToast({
            title: '系统异常，请稍后再试',
            icon: 'node',
            duration: 1000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      user = wx.getStorageSync('user');

    
    that.setData({
      BusinessID: options.id,
      num: options.num
    })
    // console.log(that.data.BusinessID)





    wx.request({
      url: 'https://api.quku199.com/api/UserOrder/GetUserPayToken',
      method:"POST",
      header:{
        'Cookie': 'JSESSIONID=' + user.UserID
      },
      data:{
        UserID: user.UserID,
        BusinessID: that.data.BusinessID
      },
      success:function(res){
        if (res.statusCode == 200) {

          if (res.data.errcode == 0)
          {
            that.setData({
              tokenData: res.data.data
            })
            // console.log(that.data.tokenData)
          }
          else
          {
            console.log("res.data.errcode----GetUserPayToken", res.data.errcode)
          }
        }  
        else
        {
          console.log("res.statusCode----GetUserPayToken",res.statusCode)
        }
      }
    })



    wx.request({
      url: 'https://api.quku199.com/api/User/GetUserBalance',
      method:"POST",
      data:{
        UserID: user.UserID
      },
      success:function(res){
        if(res.statusCode == 200){

          if (res.data.errcode == 0)
          {
            that.setData({
              balance:res.data.data
            })
          }
          else
          {
            console.log("res.data.errmsg---GetUserBalance---", res.data.errmsg)
          }
        }
        else
        {
          console.log("res.statusCode---GetUserBalance---", res.statusCode)
        }
      }
    })



    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method:"POST",
      data:{
        UserID: user.UserID
      },
      success:function(res){
        if (res.statusCode == 200) {

          if (res.data.errcode == 0) {
            var userPhone = res.data.data.UserPhone;
            that.setData({
              userPhone2: userPhone
            })
            var strReplace = userPhone.substr(3,5)
            userPhone = userPhone.replace(strReplace,"*****")


            that.setData({
              userPhone: userPhone
            })
          }
          else {
            console.log("res.data.errmsg---MyDetails---", res.data.errmsg)
          }
        }
        else {
          console.log("res.statusCode---MyDetails---", res.statusCode)
        }
      }
    })
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