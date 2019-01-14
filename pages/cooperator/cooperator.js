// pages/cooperator/cooperator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameIndex:0,
    UserName:"",
    Contact:"",
    Email:"",
    PredictCapital:"",
    Province1:"",
    City1:"",
    Province2:"",
    City2:"",
    ApplicationType:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  quZhi:function(e){
    var that = this;
    if (e.currentTarget.dataset.name == 1)
    {
      that.setData({
          UserName: e.detail.value,
       })
      
    }
    else if (e.currentTarget.dataset.name == 2)
    {
      that.setData({
        Contact: e.detail.value,
      })
      
    }
    else if (e.currentTarget.dataset.name == 3) {
      that.setData({
        Email: e.detail.value,
      })
     
    }
    else if (e.currentTarget.dataset.name == 4) {
      that.setData({
        PredictCapital: e.detail.value,
      })
      
    }
    else if (e.currentTarget.dataset.name == 5) {
      that.setData({
        Province1: e.detail.value,
      })
      
    }
    else if (e.currentTarget.dataset.name == 6) {
      that.setData({
        City1: e.detail.value,
      })
     
    }
    else if (e.currentTarget.dataset.name == 7) {
      that.setData({
        Province2: e.detail.value,
      })

    }
    else if (e.currentTarget.dataset.name == 8) {
      that.setData({
        City2: e.detail.value,
      })
    }
  },

  //提交
  cooSure:function(e)
  {
    var that = this;
    var user = wx.getStorageSync('user')
    if (that.data.UserName == "" || that.data.Contact == "" || that.data.Email == "" || that.data.PredictCapital == "" || that.data.Province1 == "" || that.data.City1 == "" || that.data.Province2 == "" || that.data.City2 == "")
    {
        wx.showToast({
          title: '不能为空',
          icon:"none",
          duration:1500
        })
    }
    else{
      wx.request({
        url: 'https://api.quku199.com/api/UserApplication/AddUserApplication',
        method: "POST",
        data: {
          UserID: user.UserID,
          ApplicationType: that.data.ApplicationType,
          UserName: that.data.UserName,
          Contact: that.data.Contact,
          Email: that.data.Email,
          PredictCapital: that.data.PredictCapital,
          Province1: that.data.Province1,
          City1: that.data.City1,
          Province2: that.data.Province2,
          City2: that.data.City2,
        },
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.errcode == 0) {
              wx.showToast({
                title: '提交成功',
                icon: "none",
                duration: 1000,
              })
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },1000)
              
            }
            else {
              console.log(res.data.errmsg)
            }
          }
          else {
            console.log(res.data.statusCode)
          }
        }
      })
    }
    
  },



  onLoad: function (options) {

    this.setData({
      ApplicationType: options.id
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