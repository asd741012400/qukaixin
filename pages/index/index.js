Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      encryptedData: "",
      iv: "",
      rawData: "",
      signature: "",
      userCode: ""
    }
  },

  getUserInfoFun: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var encryptedData = res.encryptedData;
        var iv = res.iv;
        var rawData = res.rawData;
        var signature = res.signature;

        wx.login({
          success: function (res) {
            if(res.code)
            {
              that.setData({
                info: {
                  encryptedData: encryptedData,
                  iv: iv,
                  rawData: rawData,
                  signature: signature,
                  userCode: res.code
                }
              })
              that.transmitInfo(that.data.info)
            }
          }
        })
        
      },
      fail:function(){
        wx.showToast({
          title: '您未授权，请重新授权登录',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  wx.removeStorageSync('user');
  wx.removeStorageSync('coordinate');


  wx.login({
    success:function(res){
      if(res.code)
      {
        var userCode = res.code;

        wx.getUserInfo({
          success: function (res) {


            that.setData({
              info:{
                encryptedData: res.encryptedData,
                iv: res.iv,
                rawData: res.rawData,
                signature: res.signature,
                userCode: userCode
              }
            })

            

            
            that.transmitInfo(that.data.info)
          }
        })


      }
    }
  })






  
},

transmitInfo:function(json){

  var that = this;
   wx.request({
     url: 'https://api.quku199.com/api/User/GetOpenId',
     method: "POST",
     data: {
       code: json.userCode,
       encryptedData: json.encryptedData,
       iv: json.iv,
       rawData: json.rawData,
       signature: json.signature
     },
     success: function (res) {

       if (res.statusCode == 200) {


         wx.setStorageSync('user', res.data.data)

         //存储用户ID
         if (res.data.data.state == 1) {
           wx.redirectTo({
             url: '../map/map',
           })
         }
         else if (res.data.data.state == 0) {
           wx.redirectTo({
             url: '../VerifyPhone/VerifyPhone',
           })
         }

       }
       else {
         console.log(res.statusCode)
       }
     },
     fail: function (e) {
       console.log(e)
     },

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