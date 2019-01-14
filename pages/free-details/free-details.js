// pages/free-details/free-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{
      latitude:0,
      longitude:0
    },
    freeDetails:{},
    starsNum: 5,
    freeList: [],
    arr:null
  },
  //打电话
  telFun: function (e) {
    var tel = e.currentTarget.dataset.tel.toString();
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  urlFun:function(e){
    var that = this;
    wx.navigateTo({
      url: '../shopDetails/shopDetails?id=' + e.currentTarget.dataset.id,
    })
  },

  //地址导航
  addressFun: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.freeDetails.Latitude),
      longitude: parseFloat(that.data.freeDetails.Longitude),
      scale: 28
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      id = options.id;

    
    wx.getLocation({
      success: function(res) {
        that.setData({
          address:{
            latitude: res.latitude,
            longitude: res.longitude
          }
        })

        wx.request({
          url: 'https://api.quku199.com/api/FreeCouponItem/UseFreeCouponDetails',
          method:"POST",
          data:{
            Longitude: that.data.address.longitude,
            Latitude: that.data.address.latitude,
            ItemID: id
          },
          success:function(res){
            if (res.statusCode == 200)
            {
              if (res.data.errcode == 0)
              {
                if (res.data.data != null)
                {
                  that.setData({
                    freeDetails:res.data.data
                  });

                  that.GetBusinessListByTypeId5();
                  // console.log(that.data.freeDetails)
                }
                else
                {
                  wx.showToast({
                    title: '暂无数据',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
              else
              {
                console.log("res.data.errcode----UseFreeCouponDetails--",res.data.errcode)
              }
              
            }
            else
            {
              console.log("res.statusCode---UseFreeCouponDetails",res.statusCode)

            }
          }
        })


       
    
      },
    })

  },


  GetBusinessListByTypeId5:function(){
    var that = this
    wx.request({
      url: 'https://api.quku199.com/api/Business/GetBusinessListByTypeId5',
      method: "POST",
      data: {
        Longitude: that.data.address.longitude,
        Latitude: that.data.address.latitude,
        // TypeId: that.data.freeDetails.TypeID
        TypeId: 7
      },
      success: function (res) {

        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {
            if (res.data.data.length != 0) {
              var labelName;

              res.data.data.map((item , index) => {
                labelName = item.ConfigName;
                if (labelName != null)
                {
                  if (labelName.indexOf(",") != -1) {

                    that.setData({
                      arr:true
                    })
                    labelName = item.ConfigName.split(",")
                  }
                  else{

                    that.setData({
                      arr:false
                    })
                    labelName = item.ConfigName
                  }

                }
                item.ConfigName = labelName


              })
             

              that.setData({
                freeList: res.data.data
              })
            }
            else {
              wx.showToast({
                title: '暂无数据',
                icon: 'none',
                duration: 1000
              })
            }
          }
          else {
            console.log("res.data.errcode----GetBusinessListByParam--", res.data.errcode)
          }

        }
        else {
          console.log("res.statusCode---GetBusinessListByParam", res.statusCode)

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