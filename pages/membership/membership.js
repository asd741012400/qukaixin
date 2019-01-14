// pages/membership/membership.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    membership:{},
    LevelTypeID:0,
    back:""
  },
  PayVip: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../confirm/confirm?typeid=' + that.data.LevelTypeID,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user')
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method:"POST",
      data:{
        UserID: user.UserID,
      },
      success:function(res){
        if (res.statusCode == 200) 
        {
          if (res.data.errcode == 0) 
          {
              that.setData({
                LevelTypeID: res.data.data.LevelTypeID
              })
              if (res.data.data.LevelTypeID == 2)
              {
                that.setData({
                  back: "linear-gradient(35deg,#68492f 0%,#a5866d 100%);"
                })
              }
              else if(res.data.data.LevelTypeID == 3)
              {
                that.setData({
                  back: "linear-gradient(35deg,#9fa3af 0%,#dadde6 100%);"
                })
              }

              that.GetUserLevelInterests()
          }
          else
          {
            console.log("res.data.errcode----MyDetails---", res.data.errcode)
          }
        } 
        else
        {
          console.log("res.statusCode----MyDetails---", res.statusCode)
        }
      }
    })

  },

  //购买会员
  GetUserLevelInterests:function(){
    var that = this ;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/UserLevelInterests/GetUserLevelInterests',
      method: "POST",
      data: {
        UserId: user.UserID,
      },
      success: function (res) {

        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {


            res.data.data.map((item, index) => {


              if (item.LevelTypeID == that.data.LevelTypeID) {
                that.setData({
                  membership: item
                })

              }

            })


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