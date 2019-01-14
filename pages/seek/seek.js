// pages/seek/seek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:"",
    searchHistory:[],
    content:true,
    latitude: 0,
    longitude:0,
    userId:0,
    searchList:[],
    searchRecord:false,
    hotSearch:true,
    hotSearchList:[]
  },

  urlFun2:function(e){
    var that = this;
    var url = e.currentTarget.dataset.url;
    var idx = e.currentTarget.dataset.index;
    var values = "";
    var arr = that.data.searchHistory;

      
    that.data.searchList.map((item , index) => {
      if (index == idx)
      {
        if (item.types == 1)
        {
          values = item.CouponName
        }
        else if (item.types == 2)
        {
          values = item.BusinessName
        }
      }
    })
    

    if (arr.length == 0)
    {
      arr.push(values)
    }
    else if (arr.length >= 10)
    {
      arr.splice(0, 0, values);
      arr.pop()
    }
    else
    {
      arr.splice(0, 0, values)
    }

    wx.setStorageSync('searchHistory', arr)

   



    if (url == "shopDetails")
    {
      wx.navigateTo({
        url: "../shopDetails/shopDetails?id=" + e.currentTarget.dataset.bid,
      })
    }
    else if (url == "merchant-details")
    {
      wx.navigateTo({
        url: "../merchant-details/merchant-details?id=" + e.currentTarget.dataset.cid,
      })
    }

    that.setData({
      content: true,
      searchHistory: wx.getStorageSync('searchHistory')
    })

  },

  delSearch:function(){
    var that = this;
    wx.showModal({
      content: '是否删除历史记录',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory');
          that.setData({
            searchHistory: []
          })
        } else if (res.cancel) {
         
        }
      }
    })

    
  },


  cancelFun:function(){
    var that = this;
    that.setData({
      val: "",
      content: true
    })
  },

  bindKeyInput: function (e) {
    var that = this;
    that.setData({
      val: e.detail.value,
    })
    

    if (that.data.val == "")
    {
      that.setData({
        content: true
      })
    }
    else
    {
      that.setData({
        content: false
      })

      that.searchFun()



    }




  
  },
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },

  searchFun:function(){
    var that = this;
    wx.request({
      url: 'https://api.quku199.com/api/FreeCouponItem/GetSearchResultList',
      method: "POST",
      data: {
        Longitude: that.data.longitude,
        Latitude: that.data.latitude,
        search: that.data.val,
        UserID: that.data.userId,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {

            if (res.data.data.length == 0) {
              that.setData({
                searchRecord: true
              })
            }
            else {
              that.setData({
                searchRecord: false,
                searchList: res.data.data
              })
            }
            console.log(res)
          }
          else {
            console.log("res.data.errcode----GetSearchResultList-----", res.data.errcode)
          }
        }
        else {
          console.log("res.statusCode----GetSearchResultList-----", res.statusCode)
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var searchHistory = wx.getStorageSync('searchHistory');


    var user = wx.getStorageSync('user');

    var that = this;

    wx.getLocation({
      success: function(res) {
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          userId:user.UserID
        })
      },
    })

    if (searchHistory != "")
    {
      that.setData({
        searchHistory: searchHistory
      })
    }
    



    wx.request({
      url: 'https://api.quku199.com/api/FreeCouponItem/GetHotSearchList',
      method:"POST",
      success:function(res){
        if (res.statusCode == 200) 
        {
          if (res.data.errcode == 0) 
          {

            if (res.data.data.length == 0)
            {
              that.setData({
                hotSearch: false,
              })
            }
            else
            {
              that.setData({
                hotSearch: true,
                hotSearchList: res.data.data
              })
            }
          }
          else
          {
            console.log("res.data.errcode----GetHotSearchList-----", res.data.errcode)
          }
        }
        else
        {
          console.log("res.statusCode----GetHotSearchList-----", res.statusCode)
        }    
        
      }
    })


  },

  shortcut:function(e){
    var that = this;
    var types = e.currentTarget.dataset.types;

    that.data.hotSearchList.map((item , index) => {
      
      if (item.types == types)
      {
        that.setData({
          val : item.name,
          content: false
        })
        that.searchFun()
      }

    })

  },
  shortcut2: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;

    
    that.data.searchHistory.map((item, index) => {

      if (idx == index) {
        that.setData({
          val: item,
          content: false
        })
        that.searchFun()
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