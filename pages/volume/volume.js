// pages/free-details/free-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabIndex:0,
      starsNum: 5,
      freeVolumePages:{
        pageIndex:1,
        pageSize:6,
        State:0
      },
      freeVolume:[],
      freeVolumeEndPage:false,
      loding: true,
      lodingText: true,

  },

  //图片预加载 
  imageOnLoad: function (e) {
    var that = this,
      num = that.data.imagesLoding;

    num++;

    that.setData({
      imagesLoding: num
    })


    if (num == that.data.imagesNum) {
      that.setData({
        loding: false,
      })
      // console.log("加载完成")
    }
    else {
      // console.log("加载中")
    }
  },

  urlFun:function(e){
    var that = this,
      url = e.currentTarget.dataset.url;
    if (url == "merchant-details")
    {
      wx.navigateTo({
        url: '../merchant-details/merchant-details?id=' + e.currentTarget.dataset.id,
      })
    } 
    else if (url == "merchant")
    {
      wx.navigateTo({
        url: '../merchant/merchant?bid=' + e.currentTarget.dataset.bid + "&oid=" + e.currentTarget.dataset.oid + "&tid=" + e.currentTarget.dataset.tid,
      })
    }
    else if (url == "free-details")
    {
      wx.navigateTo({
        url: '../free-details/free-details?id=' + e.currentTarget.dataset.id,
      })
    }
  },

  tabBindtap:function(e){
    var id = e.currentTarget.dataset.id,
      that = this;
    this.setData({
      tabIndex: id,
      freeVolumePages: {
        pageIndex: 1,
        pageSize: 6,
        State: 0
      },
      endPage: false,
      freeVolume:[]
    })

    if (id == 0)
    {
      this.setData({
        freeVolumePages: {
          pageIndex: that.data.freeVolumePages.pageIndex,
          pageSize: that.data.freeVolumePages.pageSize,
          State: 0
        },
      })
    }
    else if(id == 1)
    {
      this.setData({
        freeVolumePages: {
          pageIndex: that.data.freeVolumePages.pageIndex,
          pageSize: that.data.freeVolumePages.pageSize,
          State: 1
        },
      })
    }
    else if (id == 2) {
      this.setData({
        freeVolumePages: {
          pageIndex: that.data.freeVolumePages.pageIndex,
          pageSize: that.data.freeVolumePages.pageSize,
          State: 2
        },
      })
    }
    else if (id == 3) {
      this.setData({
        freeVolumePages: {
          pageIndex: that.data.freeVolumePages.pageIndex,
          pageSize: that.data.freeVolumePages.pageSize,
          State: 3
        },
      })
    }
  
    // console.log(that.data.freeVolumePages)

    that.freeVolumeFun(that.data.freeVolumePages);

  },

  freeVolumeFun:function(json){
    var that = this,
      pageIndex = json.pageIndex,
      pageSize = json.pageSize,
      State = json.State;
    var user = wx.getStorageSync('user');
    that.setData({
      loding: true,
      lodingText: true
    })
    wx.request({
      url: 'https://api.quku199.com/api/FreeCouponItem/GetFreeCouponItemList',
      method:"POST",
      data:{
        pageIndex: pageIndex,
        pageSize: pageSize,
        State: State,
        UserId: user.UserID
      },
      success:function(res){
        if (res.statusCode == 200)
        {
          if (res.data.errcode == 0)
          {
            if (res.data.data.length != 0)
            {

              that.data.freeVolume = that.data.freeVolume.concat(res.data.data)
              that.setData({
                freeVolume: that.data.freeVolume
              })
              if (that.data.freeVolume.length >= res.data.datacount) {
                that.setData({
                  lodingText: false,
                  freeVolumeEndPage: true
                });
              }

              that.setData({
                loding: false,
              });

            }
            else
            {
              that.setData({
                loding: false,
              });

            }
          }
          else
          {
            console.log("res.data.errcode----GetFreeCouponItemList", res.data.errmsg)

          }
        }
        else
        {
          console.log("res.statusCode----GetFreeCouponItemList",res.statusCode)

        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.freeVolumeFun(that.data.freeVolumePages);
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
    var that = this,
      pageIndex = that.data.freeVolumePages.pageIndex,
      State = that.data.freeVolumePages.State,
      pageSize = that.data.freeVolumePages.pageSize,
      freeVolumeEndPage = that.data.freeVolumeEndPage;
  
    if (!freeVolumeEndPage)
    {
      pageIndex++;
      that.setData({
        freeVolumePages: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          State: State
        },
      })
      that.freeVolumeFun(that.data.freeVolumePages);
    }
    else
    {
      that.setData({
        loding: true,
        lodingText: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})