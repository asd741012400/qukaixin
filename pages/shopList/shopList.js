// var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    nearby:[],
    nearbyList:[],
    nearbyMetro: false,
    currentIndex: null,
    current3Index: null,
    current4Index: null,
    cateList:[],
    cate: false,
    cate2Index:null,
    sortList:[],
    sort:false,
    sort2Index:null,
    typeShop:"类型",
    areaText:"商圈",
    sortText:"智能排序",
    getData:{
      pageIndex: 1,
      pageSize: 10,
      Longitude: 0,
      Latitude: 0,
      CouponName: null,
      TypeID: null,
      TradingAreaID: null,
      SortType: 1
    },
    imagesLoding:0,
    imagesNum:10,
    loding: true,
    lodingText:true,
    shangjiaQuan:[],
    endPage:false,
    coordinate:{},
    onenum:true,
    townum: true,
    threenum: true,
    starsNum:5,
    qieHuan:0,
    // qieHuanT:0,
    // qieHuanR:0,

  },
  clickTab:function(e){
    var current = e.currentTarget.dataset.current,
        state = e.currentTarget.dataset.state,
        that = this;
    switch (current)
    {
      case "0":

        if (state)
        {
          that.setData({
            nearbyMetro: true,
            nearby2Metro: true,
            cate: false,
            current2Index: 0,
            currentIndex: 0,
            sort: false,
            qieHuan:0,
          })
          
        }
        else
        {
          that.setData({
            nearbyMetro: false,
            currentIndex: null,
          });
        }

        that.setData({
          onenum: !state,

        })

        break; 
      case "1":

        if (state) {
          that.setData({
            nearbyMetro: false,
            nearby2Metro: false,
            cate: true,
            currentIndex: 1,
            sort: false,
            qieHuan: 1,
          })

        }
        else {
          that.setData({
            cate: false,
            currentIndex: null,
          });
        }

        that.setData({
          townum: !state,

        })
        
        break;
      case "2":

        if (state) {
          that.setData({
            nearbyMetro: false,
            cate: false,
            nearby2Metro: false,
            sort: true,
            currentIndex: 2,
            qieHuan: 2,
          })

        }
        else {
          that.setData({
            sort: false,
            currentIndex: null,
          });
        }

        that.setData({
          threenum: !state,

        })
        
        break;   
    };
  },
  //区域选择
  areaFun:function(e){
    var index = e.currentTarget.dataset.index,
        id = e.currentTarget.dataset.id,
        that = this,
        obj = [];
    if (index == 0)
    {
      that.setData({
        current4Index: null,
        currentIndex: null,
        nearbyMetro: false,
        areaText: "不限",
        lodingText: true,
        endPage: false,
        nearbyList:[],
        current3Index: index,
      })
      that.setData({
        getData: {
          pageIndex: 1,
          pageSize: that.data.getData.pageSize,
          Longitude: that.data.getData.Longitude,
          Latitude: that.data.getData.Latitude,
          CouponName: that.data.getData.CouponName,
          TypeID: that.data.getData.TypeID,
          TradingAreaID: null,
          SortType: that.data.getData.SortType
        },
      })
      that.shopList(that.data.getData, true)

    }
    else
    {

      that.data.nearby.map((item ,index) => {
        if (item.TradingAreaID == id)
        {
          obj = item.city;
        }
      })
      that.setData({
        current3Index: index,
        nearbyList:obj,
        current4Index: null,
      })   

    }  
  },

  //街道选择
  tradingAreaFun: function (e) {
    var index = e.currentTarget.dataset.index,
        id = e.currentTarget.dataset.id,
        text = e.currentTarget.dataset.text,
        that = this;

   

    that.setData({
      current4Index: index,
      currentIndex: null,
      nearbyMetro: false,
      areaText: text,
      lodingText: true,
      endPage: false
    })

    that.setData({
      getData: {
        pageIndex: 1,
        pageSize: that.data.getData.pageSize,
        Longitude: that.data.getData.Longitude,
        Latitude: that.data.getData.Latitude,
        CouponName: that.data.getData.CouponName,
        TypeID: that.data.getData.TypeID,
        TradingAreaID: id,
        SortType: that.data.getData.SortType
      }
    })
    that.shopList(that.data.getData , true)
    

  },

  //美食选择
  cateFun: function (e) {
    var index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id,
      text = e.currentTarget.dataset.text,
      that = this;

 
    that.setData({
      cate: false,
      currentIndex: null,
      cate2Index: index,
      typeShop: text,
      lodingText: true,
      endPage: false
    })

    that.setData({
      getData: {
        pageIndex: 1,
        pageSize: that.data.getData.pageSize,
        Longitude: that.data.getData.Longitude,
        Latitude: that.data.getData.Latitude,
        CouponName: that.data.getData.CouponName,
        TypeID: id,
        TradingAreaID: that.data.getData.TradingAreaID,
        SortType: that.data.getData.SortType
      }
    })
    that.shopList(that.data.getData , true)
  },

  //排序选择
  sortFun: function (e) {
    var index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id,
      text = e.currentTarget.dataset.text,
      that = this;
    that.setData({
      sort: false,
      currentIndex: null,
      sort2Index: index,
      sortText: text,
      lodingText: true,
      endPage: false
    })

    that.setData({
      getData: {
        pageIndex: 1,
        pageSize: that.data.getData.pageSize,
        Longitude: that.data.getData.Longitude,
        Latitude: that.data.getData.Latitude,
        CouponName: that.data.getData.CouponName,
        TypeID: that.data.getData.TypeID,
        TradingAreaID: that.data.getData.TradingAreaID,
        SortType: id
      }
    })
    that.shopList(that.data.getData , true)
  },

 //搜索
  confirmFun:function(e){
    var value = e.detail.value,
      that = this;
    that.setData({
      lodingText: true,
      endPage: false
    })
    that.setData({
      getData: {
        pageIndex: 1,
        pageSize: that.data.getData.pageSize,
        Longitude: that.data.getData.Longitude,
        Latitude: that.data.getData.Latitude,
        CouponName: value,
        TypeID: that.data.getData.TypeID,
        TradingAreaID: that.data.getData.TradingAreaID,
        SortType: that.data.getData.SortType
      }
    })
    that.shopList(that.data.getData ,true)


  },
  //搜索2
  emptyFun:function(e){
    var value = e.detail.value,
      that = this;
    if (value == "" || value == null || value == undefined || value == "undefined")
    {
      that.setData({
        getData: {
          pageIndex: 1,
          pageSize: that.data.getData.pageSize,
          Longitude: that.data.getData.Longitude,
          Latitude: that.data.getData.Latitude,
          CouponName: null,
          TypeID: that.data.getData.TypeID,
          TradingAreaID: that.data.getData.TradingAreaID,
          SortType: that.data.getData.SortType
        }
      })
      that.shopList(that.data.getData, true)
    }  
    // console.log(value)
    
  },



  //点击背景隐藏弹窗
  showHidden:function(e){
    var that = this;
    if (e.currentTarget.dataset.item == "hs_nearbyBg")
    {
      that.setData({
        nearbyMetro: false
      })
    }
    else if (e.currentTarget.dataset.item == "hs_cateBg")
    {
      that.setData({
        cate: false
      })
    }
    else if (e.currentTarget.dataset.item == "hs_sortBg") {
      that.setData({
        sort: false
      })
    }

    that.setData({
      currentIndex:null
    })
   
  },
  //阻止隐藏弹窗
  hiddenShow:function(e){
    var that = this;
    if (e.currentTarget.dataset.item == "hs_nearby") {
      that.setData({
        nearbyMetro: true
      })
    }
    else if (e.currentTarget.dataset.item == "hs_cate") {
      that.setData({
        cate: true
      })
    }
    else if (e.currentTarget.dataset.item == "hs_sort") {
      that.setData({
        sort: true
      })
    }

  },


  //优惠券详情页面跳转
  urlFun:function(e){

    var url = e.currentTarget.dataset.url,
        that = this;
    if (url == "shopDetails")
    {
      wx.navigateTo({
        url: '../shopDetails/shopDetails?id=' + e.currentTarget.dataset.id,
      })
    }
    else if (url == "message")
    {
      wx.navigateTo({
        url: '../message/message'
      })
    }
    else if (url == "free-details"){
      wx.navigateTo({
        url: '../free-details/free-details?id=' + that.data.couponID
      })
    }
  },

  


   //图片预加载 
  imageOnLoad: function (e) {
    var that = this,
      num = that.data.imagesLoding;

    num++;

    that.setData({
      imagesLoding: num
    })
    

    if (num == that.data.imagesNum)
    {
      that.setData({
        loding: false,
      })
      // console.log("加载完成")
    }
    else
    {
      // console.log("加载中")
    }
  },

  //商品加载
  shopList: function (json, empty){
    var user = wx.getStorageSync('user')
    var pageIndex = json.pageIndex,
      pageSize = json.pageSize,
      Longitude = json.Longitude,
      Latitude = json.Latitude,
      CouponName = json.CouponName,
      TypeID = json.TypeID,
      TradingAreaID = json.TradingAreaID,
      SortType = json.SortType,
      that = this;


    that.setData({
      loding: true,
      lodingText: true
    })
    wx.request({
      url: "https://api.quku199.com/api/Business/GetBusinessListByParam",
      method:"POST",
      data:{
        pageIndex: pageIndex,
        pageSize: pageSize,
        // Longitude: Longitude,
        // Latitude: Latitude,
        Latitude: 29.57314571315719,
        Longitude: 106.57965494201659,
        Keywords: CouponName,
        TypeID: TypeID,
        TradingAreaID: TradingAreaID,
        SortType: SortType,
      },
      success:function(res){
        if (res.statusCode == 200 )
        {
          if (res.data.errcode == 0)
          {

            if (empty == true && res.data.data.length == 0)
            {
              wx.showToast({
                title: '暂无商家',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                shangjiaQuan: []
              });

            }
            else if (empty == true && res.data.data.length != 0)
            {
              that.setData({
                shangjiaQuan: []
              });
              that.data.shangjiaQuan = that.data.shangjiaQuan.concat(res.data.data)

              that.setData({
                shangjiaQuan: that.data.shangjiaQuan,
              });
              if (that.data.shangjiaQuan.length >= res.data.datacount) {
                that.setData({
                  lodingText: false,
                });
              }
            }
            else
            {   


              that.data.shangjiaQuan = that.data.shangjiaQuan.concat(res.data.data)

              that.setData({
                shangjiaQuan: that.data.shangjiaQuan,
              });
              if (that.data.shangjiaQuan.length >= res.data.datacount)
              {
                that.setData({
                  lodingText: false,
                  endPage: true
                });

              }

            }
            that.setData({
              loding: false,
            });


            // console.log(that.data.shangjiaQuan)
          }
          else
          {
            wx.showToast({
              title: '暂无商家',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              shangjiaQuan: [],
              loding: false,
              
            });
           
            console.log("res.data.errcode---", res.data.errcode)
          }
        }
        else
        {
          console.log(res.statusCode)
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




    var that = this;


    wx.getLocation({
      success: function(res) {
        that.setData({
          coordinate: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
        
        //美食
        wx.request({
          url: "https://api.quku199.com/api/BusinessType/GetBusinessTypeList",
          method:"POST",
          success:function(res){
            if (res.statusCode == 200)
            {
              if (res.data.errcode == 0)
              {
                var _obj = {
                  "TypeID": 0,
                  "TypeName": "不限",
                }
                res.data.data.splice(0, 0, _obj);
                that.setData({
                  cateList: res.data.data
                })
                // console.log(res.data.data)
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




        //附近
        wx.request({
          url: "https://api.quku199.com/api/City/GetAreaForCityName",
          method: "POST",
          data:{
            Latitude: that.data.coordinate.latitude,
            Longitude: that.data.coordinate.longitude
          },
          success: function (res) {
            if (res.statusCode == 200) {
              if (res.data.errcode == 0) {
                var _obj = {
                  "TradingAreaID": 0,
                  "CityName": "不限",
                }
                res.data.data.splice(0, 0, _obj);
                that.setData({
                  nearby: res.data.data
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

        //智能排序
        wx.request({
          url: "https://api.quku199.com/api/FreeCouponItem/GetIntelligenceList",
          method: "POST",
          success: function (res) {
            if (res.statusCode == 200) {
              if (res.data.errcode == 0) {
                var _obj = {
                  "types": 0,
                  "name": "不限",
                }
                res.data.data.splice(0, 0, _obj);

                that.setData({
                  sortList: res.data.data
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


        that.setData({
          getData:{
            pageIndex: that.data.getData.pageIndex,
            pageSize: that.data.getData.pageSize,
            Longitude: that.data.coordinate.longitude,
            Latitude: that.data.coordinate.latitude,
            CouponName: that.data.getData.CouponName,
            TypeID: that.data.getData.TypeID,
            TradingAreaID: that.data.getData.TradingAreaID,
            SortType: that.data.getData.SortType
          }
        })


        that.shopList(that.data.getData)
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
    var that = this,
        pageIndex = that.data.getData.pageIndex,
        endPage = that.data.endPage;

    
    if (!endPage)
    {
      pageIndex++;
      that.setData({
        getData: {
          pageIndex: pageIndex,
          pageSize: that.data.getData.pageSize,
          Longitude: that.data.getData.Longitude,
          Latitude: that.data.getData.Latitude,
          CouponName: that.data.getData.CouponName,
          TypeID: that.data.getData.TypeID,
          TradingAreaID: that.data.getData.TradingAreaID,
          SortType: that.data.getData.SortType
        }
      })

      that.shopList(that.data.getData)
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