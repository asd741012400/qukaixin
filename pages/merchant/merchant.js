// pages/merchant/merchant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant:{},
    shopList:[],
    starsNum:5,
    Star:0,
    pitchOnLabel:"",
    labelNames:[],
    BusinessID:0,
    orderid:0,
    TypeID:0,
    val:"",
    num:1,
    skipUrl:""
  },

  urlFun:function(e){
    wx.navigateTo({
      url: '../shopDetails/shopDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  lightenFun:function(e){
    var that = this,
      index = e.currentTarget.dataset.index,
      num = index+1;
    
    that.setData({
      Star: num,
      starsNum:5
    })
    // console.log(that.data.Star)
    
  },
  lightenFun2: function (e) {
    var that = this,
      idx = e.currentTarget.dataset.index,
      stat = e.currentTarget.dataset.stat,
      str = that.data.pitchOnLabel;

    that.data.labelNames.map((item ,index) => {
      if( index == idx && stat == 0 )
      {
        item.stat = 1;
      }
      if( index == idx && stat == 1 )
      {
        item.stat = 0;
      }
    })

    that.setData({
      labelNames: that.data.labelNames,
    })
  },

  bindinput:function(e){
    
    var that = this;
    
    that.setData({
      val: e.detail.value
    })

  },


  submitComment:function(){
    var that = this;
    var BusinessID = that.data.BusinessID,
      user = wx.getStorageSync('user'),
      Star = that.data.Star,
      CommentContent = that.data.val,
      OrderID = that.data.orderid,
      CouponNumber = that.data.merchant.CouponNumber,
      ConfigID = "";

    
    that.data.labelNames.map((item ,index) => {
      if (item.stat == 1)
      {
        ConfigID += item.ConfigID+","
      }
      
    })
    ConfigID = ConfigID.slice(0, ConfigID.length-1);

    if (Star <= 0)
    {
      wx.showToast({
        title: '请选择星级',
        icon: 'none',
        duration: 1000
      })
    }
    else
    {
      wx.request({
        url: 'https://api.quku199.com/api/BusinessComment/AddCommentBusiness',
        method:"POST",
        data:{
          BusinessID: BusinessID,
          UID: user.UserID,
          Star: Star,
          CommentContent: CommentContent,
          OrderID: OrderID,
          CouponNumber: CouponNumber,
          ConfigID: ConfigID,
        },
        success:function(res){
          if (res.statusCode == 200) 
          {
            if (res.data.errcode == 0) 
            {
              wx.showToast({
                title: '成功',
                icon: 'none',
                duration: 1000
              })


              setTimeout(function(){
                if (that.data.skipUrl == "shopDetails") {
                  wx.navigateBack({
                    delta: 2
                  })
                }
                else if (that.data.skipUrl == "order") {
                  wx.switchTab({
                    url: '../order/order',
                  }) 
                }
              },1000)
              

            }
            else
            {
              console.log("res.data.errcode-----AddCommentBusiness----", res.data.errcode)
            }
          }
          else
          {
            console.log("res.statusCode-----AddCommentBusiness----",res.statusCode)
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      BusinessID = options.bid,
      orderid = options.oid,
      tid = options.tid;

    console.log(options)
    that.setData({
      BusinessID: BusinessID,
      orderid: orderid,
      TypeID: tid,
      skipUrl: options.url
    })  
    wx.getLocation({
      success: function(res) {
  
        // console.log(res.latitude)
        // console.log(res.longitude)
        wx.request({
          url: 'https://api.quku199.com/api/Business/GetBusinessListByParam',
          method:"POST",
          data:{
            pageIndex:1,
            pageSize:8,
            Longitude: res.longitude,
            Latitude: res.latitude,
            TypeID: tid,
          },
          success:function(res){
            if (res.statusCode == 200) 
            {
              if (res.data.errcode == 0) 
              {
                if(res.data.data.length <= 0)
                {
                  wx.showToast({
                    title: '暂无数据',
                    icon: 'none',
                    duration: 1000
                  })
                }
                else
                {
                  res.data.data.map((item , index) => {
                    item.star = 0
                  })
                  that.setData({
                    shopList: res.data.data
                  })
                }
                // console.log(res)
              }
              else
              {
                console.log("res.data.errcode------GetBusinessListByParam", res.data.errcode)
              }
            }
            else{
              console.log("res.statusCode------GetBusinessListByParam", res.statusCode)
            } 
          }
        })




      },
    })
    
    wx.request({
      url: 'https://api.quku199.com/api/UserOrder/GetUserOrderInfo',
      method:"POST",
      data:{
        BusinessID: BusinessID,
        orderid: orderid
      },
      success:function(res){
        if(res.statusCode == 200)
        {
          if (res.data.errcode == 0)
          {
            var arr = [];
            that.setData({
              merchant: res.data.data,
            })

            res.data.data.ConfigLabelName.map((item , index) => {
              arr[index] = {};
              arr[index].ConfigID = item.ConfigID;
              arr[index].ConfigName = item.ConfigName;
              arr[index].stat = 0;
            })
            that.setData({
              labelNames: arr
            })
            
            // console.log(res)
          }
          else
          {
            console.log("res.data.errcode----GetUserOrderInfo----", res.data.errcmsg)
          }
        }
        else
        {
          console.log("res.statusCode----GetUserOrderInfo----", res.statusCode)
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