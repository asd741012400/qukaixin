Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    coordinate:{},
    arr: true,
    popStateShow: false,
    popShow: false,
    popMsg: "",
    couponID: 0,
    btnForbidden:true,
    ItemID:0
  },


  //url跳转
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    if (url == "free-details") {
      that.setData({
        popStateShow: false,
        popShow: false,
        popMsg: "",
      })
      wx.navigateTo({
        url: "../free-details/free-details?id=" + that.data.ItemID
      })
    }

  },

  //打电话
  telFun: function () {
    var that = this;
    // console.log(that.data.shopDetails.Phone)
    wx.makePhoneCall({
      phoneNumber: that.data.data.Phone //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //优惠券领取
  getDiscount: function (e) {
    var that = this,
      user = wx.getStorageSync('user'),
      id = that.data.couponID;

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

            that.data.data.ReceiveCount--
            that.data.data.LeadNumber++
            that.setData({
              popStateShow: true,
              popShow: true,
              ItemID: res.data.data,
              data: that.data.data
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
  onLoad: function (options) {
    var that = this;
    var couponID = options.id;
        // var couponID = 14;

    // console.log(couponID)
    that.setData({
      couponID: couponID
    })    


  //获取当前位置
    wx.getLocation({
      success: function(res) {
        that.setData({
          coordinate:{
            longitude: res.longitude,
            latitude: res.latitude,
          }
        })
        //获取详情信息          
        wx.request({
          url: 'https://api.quku199.com/api/FreeCouponItem/GetFreeCouponDetails',
          method:"POST",
          data:{
            Longitude: that.data.coordinate.longitude,
            Latitude: that.data.coordinate.latitude,
            CouponID: that.data.couponID,
          },
          success:function(res){
            var labelName = JSON.stringify(res.data.data.LabelName);
            if (labelName.indexOf(",") != -1 )
            {
              that.setData({
                arr:true
              })
              labelName = res.data.data.LabelName.split(",")
            }
            else
            {
              that.setData({
                arr: false
              })
              if (labelName == "null")
              {
                labelName = "";
              }
              else
              {
                labelName = res.data.data.LabelName;
              }
            }


            if (res.data.data.IsValid)
            {
              that.setData({
                btnForbidden:true
              })
            }
            else
            {
              that.setData({
                btnForbidden: false
              })
            }
            that.setData({
              data:{
                ItemID : res.data.data.ItemID,
                BusinessName : res.data.data.BusinessName,
                CouponName: res.data.data.CouponName,
                CouponImageUrl: res.data.data.CouponImageUrl,
                HeadImageUrl: res.data.data.HeadImageUrl,
                Phone: res.data.data.Phone,
                Adress: res.data.data.Adress,
                Distance: res.data.data.Distance,
                LeadNumber: res.data.data.LeadNumber,
                ReceiveCount: res.data.data.ReceiveCount,
                StartTime: res.data.data.StartTime,
                EndTime: res.data.data.EndTime,
                CouponDesc: res.data.data.CouponDesc,
                MaxIntegral: res.data.data.MaxIntegral,
                LabelName: labelName,
              }
            })

            
          }
        })
      },
    })
  },
  CompareDate:function (d1, d2)
  {
      return((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
  },
  navigationFun:function(e){
    var that = this;
    wx.openLocation({
      latitude: that.data.coordinate.latitude,
      longitude: that.data.coordinate.longitude,
      scale: 28
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