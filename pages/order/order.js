// pages/free-details/free-details.js
Page({
      
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    starsNum:5,
    allList:[],
    loding: true,
    lodingText: true,
    orderPage: {
      pageIndex: 1,
      pageSize: 5,
      state: null,
    },
    endPage:false,
    allListEnd:true
  },

  tabBindtap: function (e) {
    var id = e.currentTarget.dataset.id,
      that = this;
    this.setData({
      tabIndex: id,
      orderPage:{
        pageIndex:1,
        pageSize:5,
        state:null
      },
      endPage:false
    })

    if (id == 0)
    {

      that.setData({
        orderPage: {
          state: null,
          pageIndex: that.data.orderPage.pageIndex,
          pageSize: that.data.orderPage.pageSize,
        },
        allList:[]
      })
      this.orderListFun(that.data.orderPage)
    }
    else if (id == 1)
    {
      that.setData({
        orderPage: {
          state: 0,
          pageIndex: that.data.orderPage.pageIndex,
          pageSize: that.data.orderPage.pageSize,
        },
        allList: []
      })
      this.orderListFun(that.data.orderPage)
    }
    else if (id == 2) {
      that.setData({
        orderPage: {
          state: 1,
          pageIndex: that.data.orderPage.pageIndex,
          pageSize: that.data.orderPage.pageSize,
        },
        allList: []
      })
      this.orderListFun(that.data.orderPage)
    }
    
  },

  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    if (url == "merchant-details")
    {
      wx.navigateTo({
        url: "../merchant-details/merchant-details?id=" + e.currentTarget.dataset.cid
      })
    }
    else if (url == "shopDetails")
    {
      wx.navigateTo({
        url: "../shopDetails/shopDetails?id=" + e.currentTarget.dataset.bid 
      })
    }
    else if (url == "merchant")
    {
      wx.navigateTo({
        url: "../merchant/merchant?bid=" + e.currentTarget.dataset.bid + "&oid=" + e.currentTarget.dataset.oid + "&url=order"
      })
    }
    
  },

  orderListFun:function(json){
    var state = json.state,
      that = this,
      pageIndex = json.pageIndex,
      pageSize = json.pageSize,
      state = json.state;
    var user = wx.getStorageSync('user');
    that.setData({
      loding: true,
      lodingText: true
    })
    wx.request({
      url: 'https://api.quku199.com/api/UserOrder/GetUserOrderList',
      method:"POST",
      data:{
        pageIndex: pageIndex,
        pageSize: pageSize,
        state: state,
        UserId: user.UserID
      },
      success:function(res){
        if(res.statusCode == 200)
        {
          if (res.data.errcode == 0)
          {
            if (res.data.data == null && that.data.allList.length == 0)
            {
              that.setData({ 
                allListEnd:false
              });
            }
            else
            {
              that.data.allList = that.data.allList.concat(res.data.data)
              
              that.setData({
                allList: that.data.allList,
                allListEnd: true
              })
              if (that.data.allList.length >= res.data.datacount) {

                
                that.setData({
                  lodingText: false,
                  endPage: true,
                                    
                });
              }
            }
           

            that.setData({
              loding: false,
            });
            // console.log(res.data)
          }
          else
          {
            console.log("res.data.errmsg---GetUserInfoList---", res.data.errmsg)
          }
        }
        else
        {
          console.log("res.statusCode---GetUserInfoList---", res.statusCode)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      that.setData({
        orderPage: {
          state: null,
          pageIndex: 1,
          pageSize: that.data.orderPage.pageSize,
        },
        allList: [],
        tabIndex: 0,
        lodingText: true,
        endPage: false,
      })
      this.orderListFun(that.data.orderPage)
     
   
    
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
      pageIndex = that.data.orderPage.pageIndex,
      endPage = that.data.endPage;

    if (!endPage)
    {
      if (that.data.tabIndex == 0)
      {
        pageIndex++;
        that.setData({
          orderPage: {
            state: null,
            pageIndex: pageIndex,
            pageSize: that.data.orderPage.pageSize,
          }
        })
        this.orderListFun(that.data.orderPage)
      }
      if (that.data.tabIndex == 1) {
        pageIndex++;
        that.setData({
          orderPage: {
            state: 0,
            pageIndex: pageIndex,
            pageSize: that.data.orderPage.pageSize,
          }
        })
        this.orderListFun(that.data.orderPage)
      }
      if (that.data.tabIndex == 2) {
        pageIndex++;
        that.setData({
          orderPage: {
            state: 1,
            pageIndex: pageIndex,
            pageSize: that.data.orderPage.pageSize,
          }
        })
        this.orderListFun(that.data.orderPage)
      }
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