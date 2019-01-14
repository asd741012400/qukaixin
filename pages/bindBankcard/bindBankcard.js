// pages/bindBankcard/bindBankcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      next:"",
      Name:"",
      Card:"",
      Bankcard:"",
      BankName:"",
      Isdisabled:false,
      cardtype:'',
      skipUrl:"",
      bankImg:"",
      TheBank:false,
      TheBankLength:0
  },
  

    //获取名字
  name:function(e){
    var that=this;
      that.setData({
        Name: e.detail.value,
      })
    if (that.data.Name != "" && that.data.Card != "" && that.data.Bankcard != "")
    {
      that.setData({
        Isdisabled: true,
      })
      that.nextSure()
    }
    else {
      that.setData({
        Isdisabled: false,
      })
    } 
  },
    //获取身份证号码
  card:function(e){
    var that = this;
    that.setData({
      Card: e.detail.value,
    })
    if (that.data.Name != "" && that.data.Card != "" && that.data.Bankcard != "") {
      that.setData({
        Isdisabled: true,
      })
      that.nextSure()
    }  
    else
    {
      that.setData({
        Isdisabled: false,
      })
    }
  },

    //获取卡号
  bankCard:function(e){
    var that = this;
    console.log(that.data.TheBankLength)
    console.log(e.detail.value.length)
    if (that.data.TheBankLength > e.detail.value.length)
    {
      that.setData({
        BankName:"",
        cardtype: "",
        bankImg: "",
        TheBank: false
      })
    }
    else
    {
      that.setData({
        Bankcard: e.detail.value,
      })
      if (that.data.Bankcard.length >= 16) {

        that.TheBankInquiry()
      }
      if (that.data.Name != "" && that.data.Card != "" && that.data.Bankcard != "") {
        that.setData({
          Isdisabled: true,
        })
        that.nextSure()

      }
      else {
        that.setData({
          Isdisabled: false,
        })
      } 
    }
    that.setData({
      TheBankLength: e.detail.value.length,
    })
    
  },
    //跳转
  tiaozhuan:function(e){

    var that = this;

    if (that.data.Card != "" && that.data.Name != "" && that.data.Bankcard != "")
    {
      wx.navigateTo({
        url: '../bindBankcardTwo/bindBankcardTwo?BankName=' + that.data.BankName + '&BankNum=' + that.data.Bankcard + '&UserName=' + that.data.Name + '&UserCardId=' + that.data.Card + '&cardtype=' + that.data.cardtype + '&url=' + that.data.skipUrl
      })
    }

    
  },


  nextSure:function(e){
      var that=this;
      if (that.data.Name==""){
          wx.showToast({
            title: '姓名不能为空',
            icon:"none",
            duration:1500
          })
          return false;
      }
      else if (that.data.Card=="")
      {
          wx.showToast({
            title: '身份证不能为空',
            icon:"none",
            duration: 1500
          })
          return false;
      }
      else if (that.data.Bankcard=="")
      {
        wx.showToast({
          title: '银行卡号不能为空',
          icon: "none",
          duration: 1500
        })
        return false;
      }
  },

  TheBankInquiry:function(){
    var that = this;
    if (!that.data.TheBank)
    {
      wx.request({
        url: 'https://api.quku199.com/api/CheckBankCard/CheckNum',
        method: "POST",
        data: {
          CardNum: that.data.Bankcard,
        },
        success: function (res) {
          if (res.data.errcode == 0) {

            that.setData({
              BankName: res.data.data.bankname,
              cardtype: res.data.data.cardtype,
              bankImg: res.data.data.BankiconUrl,
              TheBank:true
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
      skipUrl: options.url
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