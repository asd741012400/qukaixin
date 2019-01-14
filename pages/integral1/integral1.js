// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Integral:"",
    bussTypeId:"",
    date:1,
    recommendList:[],
    LevelTypeID:1,
    popStateShow: false,
    popShow: false,
    popMsg: "",
    couponID: 0,
  },

  urlFun: function (e) {
    wx.navigateTo({
      url: "../integral/integral?RecordId=" + e.currentTarget.dataset.id,
      success: function () {
        // console.log(22)
      },
      fail: function () {
        console.log('页面不存在')
      },
    })
  },

  urlFun3: function (e) {
    wx.navigateTo({
      url: "../merchant-details/merchant-details?id=" + e.currentTarget.dataset.id,
      success: function () {
        // console.log(22)
      },
      fail: function () {
        console.log('页面不存在')
      },
    })
  },

  urlFun2: function (e) {
    var that = this;
    that.setData({
      popStateShow: false,
      popShow: false,
      popMsg: "",
    })
    wx.navigateTo({
      url: '../free-details/free-details?id=' + that.data.couponID,
    })
  },


  //优惠券领取
  getDiscount: function (e) {
    var id = e.currentTarget.dataset.id,
      that = this,
      user = wx.getStorageSync('user');

    wx.request({
      url: 'https://api.quku199.com/api/FreeCoupon/GetFreeCoupon',
      method: "POST",
      data: {
        CouponID: id,
        UserID: user.UserID
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {
            that.data.recommendList.map((item, index) => {

              if (item.recommendList == id) {
                item.state = 2;
              }
            })

            that.setData({
              recommendList: that.data.recommendList
            })
            that.setData({
              popStateShow: true,
              popShow: true,
              couponID: res.data.data,
            })

          }
          else {
            that.setData({
              popStateShow: false,
              popShow: true,
              popMsg: res.data.errmsg
            })
          }
        }
        else {
          console.log(res.statusCode)
        }
        // console.log(res)

      }
    })
    // console.log(e.currentTarget.dataset.id)
  },


  //优惠券弹窗关闭
  popShow: function (e) {
    var that = this;
    that.setData({
      popShow: false,
    })
  },

  //优惠券加载
  classifyFun: function (json) {
    var that = this,
      user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/FreeCouponItem/GetAllCouponList',
      method: "POST",
      data: {
        pageIndex: 1,
        pageSize: 5,
        Longitude: json.longitude,
        Latitude: json.latitude,
        UserID: user.UserID
      },
      success: function (res) {

        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {

            that.setData({
              recommendList: res.data.data
            })

            // console.log(res.data.data)

          }
          else {
            console.log(res.data.errmsg)

          }
        }
        else {
          console.log(res.statusCode)
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var user = wx.getStorageSync('user')
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success(res) {
        that.setData({
          Integral: res.data.data.Integral,
          LevelTypeID: res.data.data.LevelTypeID,
        })


        wx.getLocation({
          success: function(res) {
            var _obj = {
              longitude: res.longitude,
              latitude: res.latitude,
            };
            that.classifyFun(_obj)

          },
        })

     


      }
    })

    wx.request({
      url: 'https://api.quku199.com/api/User/GetSignInDayCount',
      method: "POST",
      data: {
        UserID: user.UserID
      },
      success(res) {
        that.setData({
          date: res.data.data
        })
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