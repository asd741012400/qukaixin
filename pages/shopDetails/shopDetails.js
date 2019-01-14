// pages/shopDetails/shopDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:{
      "indicatorDots": true,
      bannerList:[]
    },
    tabArr: {
      tabIndex:0,
    }, 
    show:false,
    starsNum:5,
    shopDetails:{},

    shopDetailsAreIntroduced:"",
    integralList:[],
    freeList:[],
    commentLists:{
      commentListsNum:0,
      commentList:[]
    },

    fixation:false,

    freePage:{
      pageIndex:1,
      pageSize:5,
      RequestType:0,
      BusinessID:null,
    },
    integralPage: {
      pageIndex: 1,
      pageSize: 5,
      RequestType: 1,
      BusinessID: null,
    },
    commentPage: {
      pageIndex: 1,
      pageSize: 5,
      BusinessID: null,
    },

    integralEndPage: false,
    freeEndPage: false,
    commentEndPage:false,


    loding: true,
    lodingText: true,


    popStateShow: false,
    popShow: false,
    popMsg: "",



    fixation:true,
    ItemID:0,
  },
  //跳转
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;

    if (url == "merchant-details")
    {
      wx.navigateTo({
        url: "../merchant-details/merchant-details?id=" + e.currentTarget.dataset.id
      })
    }
    else if (url == "free-details")
    {
      that.setData({
        popStateShow: false,
        popShow: false,
        popMsg: "",
      })
      wx.navigateTo({
        url: "../free-details/free-details?id=" + that.data.ItemID + "&num"
      })
    }
    else if (url == "pay"){
      wx.navigateTo({
        url: "../pay/pay?id=" + that.data.shopDetails.BusinessID + "&num=" + 2
      })
      
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


            if (that.data.tabArr.tabIndex == 0)
            {
              that.data.integralList.map((item, index) => {

                if (item.CouponID == id) {
                  item.state = 2;
                }
              })
              that.setData({
                integralList: that.data.integralList
              })
            }
            else if (that.data.tabArr.tabIndex == 1)
            {
              that.data.freeEndPage.map((item, index) => {

                if (item.CouponID == id) {
                  item.state = 2;
                }
              })
              that.setData({
                freeEndPage: that.data.freeEndPage
              })
            }
            

            that.setData({
              popStateShow: true,
              popShow: true,
              ItemID: res.data.data,
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


    //打电话
  telFun:function(){
    var that=this;
    // console.log(that.data.shopDetails.Phone)
    wx.makePhoneCall({
      phoneNumber: that.data.shopDetails.Phone //仅为示例，并非真实的电话号码
    })
  },
      //地址导航
  addressFun:function(){
    var that=this;
    wx.openLocation({
      latitude: parseFloat(that.data.shopDetails.Latitude),
      longitude: parseFloat(that.data.shopDetails.Longitude),
      scale: 28
    })
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
  onPageScroll: function (e) { // 获取滚动条当前位置
    var that = this;
    if (e.scrollTop >= 410)
    {
      that.setData({
        fixation:false
      })
    }
    else
    {
      that.setData({
        fixation: true
      })

    }
  
  },
   /* 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

        //地址导航
      var that = this;
 


      that.setData({
          getListHeigth: wx.getSystemInfoSync().windowWidth - 400,
      })      

      wx.getLocation({
        success: function(res) {
          //商家详情头部数据
          wx.request({
            url: 'https://api.quku199.com/api/Business/GetBusinessInfo',
            method:"POST",
            data:{
              // BusinessID: "97ba2962-8799-4bcd-bb64-c7b1b4f6cb2c",
              // Longitude: "106.576241",                                     //传参数死
              // Latitude: "29.583233",
              BusinessID:options.id,
              Longitude: res.longitude,          //传参数活
              Latitude: res.latitude,
            },
            success:function(res){

              if (res.statusCode == 200)
              {
                if (res.data.errcode == 0)
                {
                  that.setData({
                    shopDetails: res.data.data
                  })
                }
                else
                {
                  console.log("res.data.errcode---GetBusinessInfo--", res.data.errcode) 
                }
              }
              else
              {
                console.log("res.statusCode---GetBusinessInfo--", res.statusCode) 
              }
              
              // console.log(res.data.data)          

            }
          })
        },
      })  


      //商家介绍

      wx.request({
        url: 'https://api.quku199.com/api/Business/GetBusinessIntroduce',
        method:"POST",
        data:{
          BusinessID: options.id,
        },
        success:function(res){
          if (res.statusCode == 200)
          {
            if (res.data.errcode == 0)
            {
              that.setData({
                shopDetailsAreIntroduced: res.data.data
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


      //积分 

      that.setData({
        integralPage:{
          BusinessID: options.id,
          pageIndex: that.data.integralPage.pageIndex,
          pageSize: that.data.integralPage.pageSize,
          RequestType: 1,
        }
        
      })

      this.integralFun(that.data.integralPage)

      // 免费领
      that.setData({
        freePage: {
          BusinessID: options.id,
          pageIndex: that.data.freePage.pageIndex,
          pageSize: that.data.freePage.pageSize,
          RequestType: 0,
        }

      })

      this.integralFun(that.data.freePage)


      //评论
      that.setData({
        commentPage: {
          BusinessID: options.id,
          pageIndex: that.data.commentPage.pageIndex,
          pageSize: that.data.commentPage.pageSize,
        }

      })
      this.commentList(that.data.commentPage)



      //banner
      wx.request({
        url: 'https://api.quku199.com/api/banner/BannerList',
        method: "POST",
        data: {
          BusinessID: options.id
        },
        success: function (res) {

          if (res.statusCode == 200) {
            if (res.data.errcode == 0) {

              that.setData({
                banner:{
                  indicatorDots:true,
                  bannerList: res.data.data
                } 
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

  },

  showFn:function(){
    var that = this;

    that.setData({

      show: (!that.data.show)

    })
    // console.log(that.data.show )
  },

  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    var _datasetId = e.currentTarget.dataset.id;
    var _obj = {};
    var that = this;
    _obj.tabIndex = _datasetId;
    // console.log(that.data.integralEndPage)
    
    if (that.data.integralEndPage == true && _datasetId == 0)
    {
      this.setData({
        tabArr: _obj,
        loding: true,
        lodingText: false
      });
    }
    else if (that.data.freeEndPage == true && _datasetId == 1)
    {
      this.setData({
        tabArr: _obj,
        loding: true,
        lodingText: false
      });
    }
    else if (that.data.commentEndPage == true && _datasetId == 31){
      this.setData({
        tabArr: _obj,
        loding: true,
        lodingText: false
      });
    }
    else
    {
      this.setData({
        tabArr: _obj,
        loding: false,
        lodingText: true
      });
    }
    

  },


  //积分换 / 免费领
  integralFun:function(json){
    var user = wx.getStorageSync('user');
    var that = this;
    var BusinessID = json.BusinessID,
      pageIndex = json.pageIndex,
      pageSize = json.pageSize,
      RequestType = json.RequestType;
    
    that.setData({
      loding: true,
      lodingText: true
    })
    wx.request({
      url: 'https://api.quku199.com/api/Business/BusinessFreeCoupon',
      method:"POST",
      data:{
        BusinessID: BusinessID,
        pageIndex: pageIndex,
        pageSize: pageSize,
        RequestType: RequestType,
        UserID: user.UserID
      },
      success:function(res){
        

        if (res.statusCode == 200)
        {
          if (res.data.errcode == 0)
          {

            if (RequestType == 1)
            {
              if (res.data.data == null )
              {
                console.log("暂无数据")
              }
              else
              {

                that.data.integralList = that.data.integralList.concat(res.data.data)
                that.setData({
                  integralList: that.data.integralList
                })

              }
              if (that.data.integralList.length >= res.data.datacount) {
                that.setData({
                  lodingText: false,
                  integralEndPage: true,
                });

              }
            }
            else if (RequestType == 0)
            {
              that.data.freeList = that.data.freeList.concat(res.data.data)
              that.setData({
                freeList: that.data.freeList
              })

              if (that.data.freeList.length >= res.data.datacount) {
                that.setData({
                  lodingText: false,
                  freeEndPage: true
                });
              }
            }
            that.setData({
              loding: false,
            });
            // console.log(that.data.integralList)
            // console.log(that.data.freeList)
          }
          else
          {
            that.setData({
              lodingText: false,
              integralEndPage: true,
            });

            console.log("res.data.errcode---BusinessFreeCoupon--", res.data.errcode)
          }
        }
        else
        {
          console.log("res.statusCode---BusinessFreeCoupon--",res.statusCode)
        }

      }
    })
    

  },

  //用户评论
  commentList:function(json){
    var that = this,
      pageIndex = json.pageIndex,
      pageSize = json.pageSize,
      BusinessID = json.BusinessID;
    that.setData({
      loding: true,
      lodingText: true
    })
    wx.request({
      url: 'https://api.quku199.com/api/BusinessComment/GetBusinessCommentList',
      method:"POST",
      data:{
        BusinessID: BusinessID,
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      success:function(res){
        if (res.statusCode == 200)
        {
          if (res.data.errcode == 0)
          {

            if (res.data.data.length != 0)
            {
              that.data.commentLists.commentList = that.data.commentLists.commentList.concat(res.data.data)
              that.setData({
                commentLists: {
                  commentList: that.data.commentLists.commentList,
                  commentListsNum: res.data.datacount
                }
              })

              if (that.data.commentLists.commentList.length >= res.data.datacount) {
                that.setData({
                  lodingText: false,
                  commentEndPage: true
                });
              }

              
            }
            else
            {
              wx.showToast({
                title: '暂无数据',
                icon: 'none',
                duration: 1500
              })
            }
            that.setData({
              loding: false,
            });
          }
          else
          {
            console.log("res.statusCode----GetBusinessCommentList---", res.data.errmsg)
          }
        }
        else
        {
          console.log("res.statusCode----GetBusinessCommentList---", res.statusCode)
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

    var that = this,
      integralPageIndex = that.data.integralPage.pageIndex,
      integralEndPage = that.data.integralEndPage,
      freePageIndex = that.data.freePage.pageIndex,
      freeEndPage = that.data.freeEndPage,
      commentPageIndex = that.data.commentPage.pageIndex,
      commentEndPage = that.data.commentEndPage,
      getPages = null;


    if (that.data.tabArr.tabIndex == 0) {
      if (!integralEndPage) {
        integralPageIndex++;
        getPages = 1;
        that.setData({
          integralPage: {
            BusinessID: that.data.integralPage.BusinessID,
            pageIndex: integralPageIndex,
            pageSize: that.data.integralPage.pageSize,
            RequestType: getPages,
          }
        });
        this.integralFun(that.data.integralPage)
      }
      else {
        that.setData({
          loding: true,
          lodingText: false
        })
      }
    }
    else if (that.data.tabArr.tabIndex == 1) {
      //免费领
      if (!freeEndPage) {
        freePageIndex++;
        getPages = 0
        that.setData({
          freePage: {
            BusinessID: that.data.freePage.BusinessID,
            pageIndex: freePageIndex,
            pageSize: that.data.freePage.pageSize,
            RequestType: getPages,
          }
        });

        this.integralFun(that.data.freePage)

      }
      else {
        that.setData({
          loding: true,
          lodingText: false
        })
      }
    }
    else if (that.data.tabArr.tabIndex == 3) {
      //用户评论
      if (!commentEndPage) {
        commentPageIndex++;
        that.setData({
          commentPage: {
            BusinessID: that.data.commentPage.BusinessID,
            pageIndex: commentPageIndex,
            pageSize: that.data.commentPage.pageSize,
          }
        });

        this.commentList(that.data.commentPage)

      }
      else {
        that.setData({
          loding: true,
          lodingText: false
        })
      }
    }



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})