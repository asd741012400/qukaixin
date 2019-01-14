// pages/withdraw/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reTime:false,
    zFb:false,
    timeIndex: 0,
    timeTxet:"",
    timeId: null,
    percentage: null,
    Tmoney: "",
    silverCard:{
      text:"",
      start:0,
      IDNumber:"",
    },
    moneytype: -1,
    Amoney:"",
    serviceCharge:[],
    withdrawDeposit:false,
    btn:false,
    withdrawDepositBtn:true,
    moneyDetail:{
      usable:0,
      commissionCharge:0,
    }
  },
  // 弹出选择到账时间
  reachTime:function(){
     var that =this;
     that.setData({
       reTime:true,
     })
  },
  // 关闭选择时间
  close:function(){
    var that =this;
    that.setData({
      reTime:false,
    })
  },
  zFbFun:function(){
    var that = this;
    that.setData({
      zFb: false,
    })
  },
  //选择时间
  cutImg:function(e){
    var that = this,
      index = e.currentTarget.dataset.index;
    if (index == 0){
        that.setData({
          timeIndex:0,
        })
    }
    else if (index == 1){
      that.setData({
        timeIndex: 1,
      })
    }
    else if (index == 2) {
      that.setData({
        timeIndex: 2,
      })
    }
    else if (index == 3) {
      that.setData({
        timeIndex: 3,
      })
    }
    else if (index == 4) {
      that.setData({
        timeIndex: 4,
      })
    }
    that.setData({
      reTime: false,
      timeTxet: e.currentTarget.dataset.text,
      timeId: e.currentTarget.dataset.id,
      percentage: e.currentTarget.dataset.percentage
    })

  },
  //选择支付方式
  Xtype:function(e){
    var that = this,
      Xindex = e.currentTarget.dataset.xindex;

    
    if (Xindex==0)
    {
        that.setData({
          moneytype:0
        })
    }
    else if (Xindex==1){
      that.setData({
        moneytype: 1
      })
    }
    if (that.data.Amoney != "" && that.data.moneytype != -1) {
      that.setData({
        btn: true,
      })
    }
    else{
      that.setData({
        btn: false,
      })
    }
  },

  //全部提现
  AllWithdrawal:function(){
      var that = this;
      that.data.Amoney = that.data.Tmoney
      that.setData({
        Amoney: that.data.Amoney,
      })
      if (that.data.Amoney != "" && that.data.moneytype != -1)
      {
        that.setData({
          btn: true,
        })
      }
      else {
        that.setData({
          btn: false,
        })
      }
  },

  //获取输入的值
  Amoney:function(e){
    var that = this;
    that.data.Amoney = e.detail.value
    that.setData({
      Amoney: that.data.Amoney,
    })
    if (parseFloat(e.detail.value) > parseFloat(that.data.Tmoney))
    {
      wx.showToast({
        title: '输入金额不能大于可提现金额',
        icon: 'none',
        duration: 500
      })
    
    }


    if (that.data.Amoney != "" && that.data.moneytype != -1) {
      that.setData({
        btn: true,
      })
    }
    else {
      that.setData({
        btn: false,
      })
    }
  },
  //绑定银行卡
  bindBank:function(){
    wx.navigateTo({
      url: '../bindBankcard/bindBankcard?url=withdraw',
    })
  },

  //确认提现
  withdrawal:function(){
  var that =this;
  var user = wx.getStorageSync('user');
  if (that.data.Amoney == 0 || that.data.Amoney == "" )
  {
    wx.showToast({
      title: '金额不能为零',
      icon: 'none',
      duration: 1000
    })
  }
  else
  {
    if (that.data.moneytype == -1)
    {
      wx.showToast({
        title: '请选择提现方式',
        icon: 'none',
        duration: 1000
      })
    }
    else
    {
      if (that.data.withdrawDepositBtn)
      {
        var usable = Number(that.data.Amoney).toFixed(2),
          commissionCharge = that.data.Amoney * that.data.percentage;
        commissionCharge = Number(commissionCharge).toFixed(2);

        if (parseFloat(usable) <= parseFloat(that.data.Tmoney))
        {
         
          that.setData({
            withdrawDepositBtn: false,
            btn: false,
            withdrawDeposit: true,
            moneyDetail: {
              usable: usable,
              commissionCharge: commissionCharge,
            },
            Amoney: usable
          })
        }
        else
        {
          wx.showToast({
            title: '输入金额不能大于可提现金额',
            icon: 'none',
            duration: 500
          })
        }

      }
    }
      
    }   
  },

  withdrawDepositClose:function(){
    var that = this;
    that.setData({
      withdrawDepositBtn: true,
      btn: true,
      withdrawDeposit: false,
    })
  },

  withdrawDepositFun:function(){
    var that = this;
    var ApplyType, types;
    var user = wx.getStorageSync('user');
    if (that.data.moneytype == 0) {
      ApplyType = 1
    }
    else {
      ApplyType = 3
    }

    wx.request({
      url: 'https://api.quku199.com/api/Business/BalanceApply',
      method: "POST",
      data: {
        UserID: user.UserID,
        Applymoney: that.data.Amoney,
        ApplyType: ApplyType,
        types: that.data.timeId,
      },
      success: function (res) {

        that.setData({
          withdrawDepositBtn: true,
          btn: true,
          withdrawDeposit:false
        })

        if (res.data.errcode == 0) {
          wx.showToast({
            title: res.data.data,
            icon: 'success',
            duration: 1000
          })

          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1000)
        }
        else {
          that.setData({
            zFb: true
          })
        }
        
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method:"POST",
      data:{
        UserID:user.UserID
      },
      success:function(res){
        that.setData({
          Tmoney: res.data.data.UserBalance
        })
      }
    })

    wx.request({
      url: 'https://api.quku199.com/api/Business/GetServiceMoney',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success: function (res) {
        if(res.data.errcode == 0)
        {
          that.setData({
            serviceCharge: res.data.data,
            percentage: res.data.data[0].Percentage,
            timeTxet: res.data.data[0].name,
            timeId: res.data.data[0].types,
          })

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
    var that = this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/CheckBankCard/GetBankCard',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          that.setData({
            silverCard: {
              text: res.data.data.BankName,
              start: 1,
              IDNumber: res.data.data.IDNumber
            }
          })
        }
        else {
          that.setData({
            silverCard: {
              text: "暂无绑定银行卡",
              start: 0
            }
          })
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