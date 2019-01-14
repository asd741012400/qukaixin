Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: [],
    couponList: [],
    popStateShow: false,
    popShow: false,
    popMsg: "",
    couponID: 0,
    bannerImg:[]
  },
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    if (url == "shopDetails")
    {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../shopDetails/shopDetails?id=" + id
      })
    }  
    else if (url == "merchant-details")
    {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../merchant-details/merchant-details?id=" + id
      })
    }
    else if (url == "free-details") {
      that.setData({
        popStateShow: false,
        popShow: false,
        popMsg: "",
      })
      wx.navigateTo({
        url: '../free-details/free-details?id=' + that.data.couponID,
      })
    }
    
  },
  //搜索
  confirmFun: function (e) {
    var value = e.detail.value,
      that = this;
    that.setData({
      getData: {
        pageIndex: that.data.getData.pageIndex,
        pageSize: that.data.getData.pageSize,
        Longitude: that.data.getData.Longitude,
        Latitude: that.data.getData.Latitude,
        CouponName: value,
        TypeID: that.data.getData.TypeID,
      }
    })
    that.classifyFun(that.data.getData)  
  },
  //搜索2
  emptyFun: function (e) {
    var value = e.detail.value,
      that = this;
   
    if (value == "" || value == null || value == undefined || value == "undefined") {
      that.setData({
        getData: {
          pageIndex: that.data.getData.pageIndex,
          pageSize: that.data.getData.pageSize,
          Longitude: that.data.getData.Longitude,
          Latitude: that.data.getData.Latitude,
          CouponName: null,
          TypeID: that.data.getData.TypeID,
        }
      })
      that.classifyFun(that.data.getData)  
    } 
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
            that.data.couponList.map((item, index) => {

              if (item.CouponID == id) {
                item.state = 2;
              }
            })

            that.setData({
              couponList: that.data.couponList
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
              couponList: res.data.data
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
    var that = this,
        arr = [];

    //推荐商家
    wx.request({
      url: 'https://api.quku199.com/api/Business/GetRecommendBusinessForType',
      method:"POST",
      data:{
        TypeId: options.id,
      },

      success:function(res){
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {

            that.setData({
              recommend: res.data.data,
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



    //banner
    wx.request({
      url: 'https://api.quku199.com/api/banner/BannerList',
      method: "POST",
      data: {
        BusinessTypeID: options.id
      },
      success: function (res) {

        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {

            that.setData({
              bannerImg: res.data.data
            })
            // console.log(res.data.data)
          }
          else {
            console.log("res.data.errmsg----BannerList--", res.data.errmsg)
          }
        }
        else {
          console.log("res.statusCode----BannerList--", res.statusCode)

        }
      }
    })


    //分类美食领劵
   
    wx.getLocation({
      success: function(res) {
        // console.log(res)

        var json = {
          longitude : res.longitude,
          latitude: res.latitude,
        }

        that.classifyFun(json)

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