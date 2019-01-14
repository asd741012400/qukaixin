Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    LingQuan:[],
    StarsSj:[],
    starsNum:5,
    bannerImg:[],
    coordinate :{},
  },
  urlFun: function (e) {
    var that = this;
    if (e.currentTarget.dataset.url == "map")
    {
      wx.navigateTo({
        url: "../map/map"
      })
    }
    else if (e.currentTarget.dataset.url == "seek")
    {
      wx.navigateTo({
        url: "../seek/seek"
      })
    }
    else if (e.currentTarget.dataset.url == "merchant-details")
    {
      wx.navigateTo({
        url: "../merchant-details/merchant-details?id=" + e.currentTarget.dataset.id
      })
    }
    else if (e.currentTarget.dataset.url == "Free-Volume-List") {
      wx.navigateTo({
        url: "../Free-Volume-List/Free-Volume-List"
      })
    }
    else if (e.currentTarget.dataset.url == "shopList")
    {
      wx.navigateTo({
        url: "../shopList/shopList"
      })
    }
    else if (e.currentTarget.dataset.url == "shopDetails") {
      wx.navigateTo({
        url: "../shopDetails/shopDetails?id=" + e.currentTarget.dataset.id
      })
    }
    else 
    {
      wx.navigateTo({
        url: "../food-fen/food-fen?id=" + e.currentTarget.dataset.id,
      })
    }

   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.setData({
          coordinate: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })

        //商家类型
        wx.request({
          url: 'https://api.quku199.com/api/BusinessType/GetBusinessTypeList',
          method: "POST",
          success: function (res) {
            that.setData({
              menuList: res.data.data,
            })
          }
        })

        //推荐免费劵
      var user = wx.getStorageSync('user');

      wx.request({
        url: 'https://api.quku199.com/api/FreeCoupon/GetRecommendFreeCoupon',
        method:"POST",
        data:{
          LevelTypeID: user.LevelTypeID
        },
        success:function(res){
            that.setData({
              LingQuan:res.data.data,
            })
        }
      })

      

        
      //banner图
      wx.request({
        url: 'https://api.quku199.com/api/banner/BannerList',
        method: "POST",
        data:{
          TypeID:2
        },
        success: function (res) {
          
          if (res.statusCode == 200)
          {
            if (res.data.errcode == 0)
            {

              that.setData({
                bannerImg: res.data.data
              })

            }
            else
            {
              console.log(res.data.errmsg)
            }
          }
          else
          {
            console.log(res.statusCode)

          }
        }
      })

 
      },
    })



    
  },

  //banner图跳转
  bannerUrl: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
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
    //明星商家

    wx.getLocation({
      success: function(res) {
        wx.request({
          url: 'https://api.quku199.com/api/Business/GetRecommendBusiness',
          method: "POST",
          data: {
            Longitude: res.longitude,
            Latitude: res.latitude
          },
          success: function (res) {

            that.setData({
              StarsSj: res.data.data,
            })
          }
        })

      },
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