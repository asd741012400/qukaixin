// const Marquee = require('../../utils/marquee.js').marquee;

// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starsNum:5,
    markers: [],//标记点
    shopListShow:{//
      latitude: 0,
      longitude: 0,
      typeId:0,
      distance:5,
    },
    defaultTypeId: 0,
    showBottom:-500,
    shopDetail:{},
    shopList:[],
    topUpClose:true,
    loadingShow:false,
    loadingFaceTop:0,
    shopTel:true,
    text:true,
    menu:{
      menuList: [],
      menuWidth:0,
      menuIndex:0
    },
    city:"",
    controls: [],
    LevelTypeID:0,
    mapHeight:0
  },

 
  onShow: function (e) {
    var user = wx.getStorageSync('user');
    var that = this;
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method:"POST",
      data:{
        UserID: user.UserID
      },
      success:function(res){
        if(res.statusCode == 200)
        {

          that.setData({
            LevelTypeID: res.data.data.LevelTypeID
          })
          if (res.data.data.LevelTypeID == 1)
          {
            that.setData({
              topUpClose: false,
            })
          }
          
        }
      }
    })
    
    that.setData({
      showBottom: -500,
    })
    
  },
 

  //跳转至城市选择
  urlFun:function(e){
    var that = this,
      url = e.currentTarget.dataset.url;
    if (url == "city")
    {
      wx.navigateTo({
        url: '../city/city',
      })
    }
    else if (url == "personalCenter")
    {
      wx.switchTab({
        url: '../personalCenter/personalCenter'
      })
    }
    else if (url == "message")
    {
      wx.navigateTo({
        url: '../message/message',
      })
    }
    
  },


  //帮我选
  helpFn:function(e){
    var that = this;

 


    that.setData({
      loadingShow: true,
      showBottom:-500
    });

    //笑脸上下弹动
    var top = 0,
      top1 = 1,
      otimer = null;
    otimer = setInterval(function () {

      if (top <= 10 && top1 == 1) {
        top++;

      }
      else {
        top1 = 0;
      }
      if (top >= -10 && top1 == 0) {
        top--;
      }
      else {
        top1 = 1;
      }

      that.setData({
        loadingFaceTop: top,
      })


    }, 20)

    //获取自己位置帮我选商户
    wx.getLocation({
      success: function (res) {
        that.setData({
          shopListShow: {
            // latitude: res.latitude,
            latitude: that.data.shopListShow.latitude,
            // longitude: res.longitude,
            longitude: that.data.shopListShow.longitude,
            typeId: that.data.shopListShow.typeId,
            distance: that.data.shopListShow.distance,
            requestType: "Random"
          },
        })

        

        that.shopListShow(that.data.shopListShow, otimer);
        
      },
    })
    



  },

  //点击标记弹出商家详情
  markertap:function(e){
    var that = this;
    // console.log(that.data.shopList )
    that.data.shopList.map( (item , index) => {
      if (e.markerId == item.BusinessID)
      {
        // console.log(item)
        that.setData({
          shopDetail: {
            BusinessID: item.BusinessID,
            HeadImageUrl: item.HeadImageUrl,
            BusinessName: item.BusinessName,
            Star: item.Star,
            SalesNum: item.SalesNum,
            Adress: item.Adress,
            LabelName: item.LabelName,
            Distance: item.Distance,
            Latitude: item.Latitude,
            Longitude: item.Longitude,
          }, 
          showBottom: 0,
        })
      }
    })
    
  },

  //确认商户
  affirmFun:function(e){
    var that = this;
    // console.log(that.data.shopDetail.BusinessID)
    wx.navigateTo({
      url: '../shopDetails/shopDetails?id=' + that.data.shopDetail.BusinessID + "&&Longitude=" + that.data.shopDetail.Longitude + "&&Latitude=" + that.data.shopDetail.Latitude,
    })
  },

 

  //打电话
  telFun:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shopDetail.Phone,
    })
  },


  //导航
  navigationFun: function (e) {
    var that = this;
    
    var latitude = parseFloat(that.data.shopDetail.Latitude),
      longitude = parseFloat(that.data.shopDetail.Longitude);

    // console.log(that.data.shopDetail)
    wx.authorize({
      scope: 'scope.userLocation',
      success() {

        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18,
          name: that.data.shopDetail.BusinessName,
          address: that.data.shopDetail.Adress
        })

      }
    })

    

  },

  //关闭商户明细弹窗
  closetap: function (e) {
    var that = this;

    that.setData({

      showBottom: -500,
      shopDetail:{}
    })

  },

  //充值弹窗
  topUpCloseTap: function (e) {
    var that = this;


    that.setData({

      topUpClose: true

    })
  },

  //url跳转页面
  homeUrlFun: function (e) {
    var that = this;
    if(e.currentTarget.dataset.url == "homePage")
    {
      wx.switchTab({
        url: '../HomePage/HomePage',
      })
    }
    else if (e.currentTarget.dataset.url == "Member")
    {
      wx.navigateTo({
        url: '../Member/Member'
      })
    }
   

  },


  //回到标记点
  goBackFun:function(e){
    this.mapCtx.moveToLocation()
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options , e) {



    var that = this;
    var user = wx.getStorageSync('user');



    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          controls: [
            {
              id: 1,
              iconPath: '../images/icon_location.png',
              position: {
                left: (res.windowWidth - 16) / 2,
                top: ((res.windowHeight - 88) - 26) / 2,
                width: 16,
                height: 26
              },
            }
          ],
          mapHeight: res.windowHeight - 88
        })
      }
    })

    

    // wx.request({
    //   url: 'https://api.quku199.com/api/User/MyDetails',
    //   method: "POST",
    //   data: {
    //     UserID: user.UserID
    //   },
    //   success: function (res) {
    //     if (res.statusCode == 200) {

    //       that.setData({
    //         LevelTypeID: res.data.data.LevelTypeID
    //       })
    //       if (res.data.data.LevelTypeID == 1) {
            
    //         that.setData({
    //           topUpClose: false,
    //         })
    //       }

    //     }
    //   }
    // })


    if (options.city)
    {
      
      var latitude = options.latitude,
        longitude = options.longitude,
        city = options.city,
        myCity = wx.getStorageSync('city');

      if (city == myCity)
      {
        wx.getLocation({
          success: function(res) {
            that.setData({
              shopListShow: {
                latitude: res.latitude,
                longitude: res.longitude,
                typeId: that.data.defaultTypeId,
                distance: that.data.shopListShow.distance,
                requestType: null
              },
              city: myCity
            })
          },
        })
      }
      else
      {
        that.setData({
          shopListShow: {
            latitude: latitude,
            longitude: longitude,
            typeId: that.data.defaultTypeId,
            distance: that.data.shopListShow.distance,
            requestType: null
          },
          city: options.city
        })
      }
      that.shopListShow(that.data.shopListShow);
    }
    else
    {
      //获取当前位置
      wx.getLocation({
        success: function (res) {
          var json = {
            latitude: res.latitude,
            longitude: res.longitude,
          }

          wx.setStorageSync('coordinate', json)
          wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=l4nxrg2XgbPTvEiIBDAVqTABkSyzmpYG&location=' + res.latitude + ',' + res.longitude + '&output=json',
            data: {},
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // success    
              // console.log(res);
              var city = res.data.result.addressComponent.city;
              that.setData({ city: city });
              wx.setStorageSync('city', city)
            },
            fail: function () {
              that.setData({ currentCity: "获取定位失败" });
            },

          })


          that.setData({
            shopListShow: {
              latitude: res.latitude,
              // latitude: that.data.shopListShow.latitude,
              longitude: res.longitude,
              // longitude: that.data.shopListShow.longitude,
              typeId: that.data.defaultTypeId,
              distance: that.data.shopListShow.distance,
              requestType: null
            },
          })
          that.shopListShow(that.data.shopListShow);
        },
      })
    }
    
    wx.showShareMenu({
      withShareTicket: true
    })

    //商家类型列表
    wx.request({
      url: 'https://api.quku199.com/api/BusinessType/GetBusinessTypeList',
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200) {
          var iWidth = 0;
          that.data.menu.menuList = res.data.data;
          var _obj = {
            "TypeID": 0,
            "TypeName": "全部",
          }
          that.data.menu.menuList.splice(0, 0, _obj)
          that.data.menu.menuList.map((item, key) => {
            iWidth += item.length * 24 + 50
          })

          that.setData({
            menu: {
              menuWidth: iWidth,
              menuList: that.data.menu.menuList,
              menuIndex: that.data.menu.menuIndex
            }
          })
          that.setData({
            defaultTypeId: that.data.menu.menuList[0].TypeID
          })

          // console.log(res.data.data)
        }
        else {
          console.log(res.statusCode)
        }
      },
    })

  

    
    

    


  },

  //附近商家定位
  shopListShow: function (json, otimer) {
    var coordinate = wx.getStorageSync('coordinate')
    var typeId = json.typeId,
        longitude = json.longitude,
        latitude = json.latitude,
        distance = json.distance,
        requestType = json.requestType,
        arr = [],
        obj = {},
        MyLongitude = coordinate.longitude,
        MyLatitude = coordinate.latitude,
        that = this;
    wx.request({
      url: 'https://api.quku199.com/api/Business/GetBusinessList',
      method: "POST",
      data: {
        TypeId: typeId,
        Longitude: longitude,
        Latitude: latitude,
        Distance: distance,
        RequestType: requestType,
        RequestSource:"WeChat",
        CurrentLatitude: coordinate.latitude,
        CurrentLongitude: coordinate.longitude
      },
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data )

          if(res.data.errcode == -1)
          {
            wx.showToast({
              title: "在您的附近没有获取到商家信息",
              icon: 'none',
            })
            that.setData({
              markers: [],
            })
            clearInterval(otimer)
            that.setData({
              loadingShow: false,
            });
          }
          else
          {
            if (res.data.data != null)
            {

              if (requestType != null)
              {
                
                that.setData({
                  shopDetail:{
                    BusinessID: res.data.data.BusinessID,
                    HeadImageUrl: res.data.data.HeadImageUrl,
                    BusinessName: res.data.data.BusinessName,
                    Star: res.data.data.Star,
                    SalesNum: res.data.data.SalesNum,
                    Adress: res.data.data.Adress,
                    LabelName: res.data.data.LabelName,
                    Distance: res.data.data.Distance,
                    Latitude: res.data.data.Latitude,
                    Longitude: res.data.data.Longitude,
                  }
                })
                clearInterval(otimer)
                that.setData({
                  loadingShow: false,
                });
                that.setData({
                  showBottom: 0,
                  shopTel: false
                })
              
                // console.log(that.data.shopDetail)
              }
              else
              {
                res.data.data.map( (item ,index) => {
                  arr[index] = {};
                  arr[index].id = item.BusinessID;
                  arr[index].latitude = item.Latitude;
                  arr[index].longitude = item.Longitude;
                  arr[index].iconPath = "../images/icon_label.png";
                })
                that.setData({
                  markers: arr
                })
                that.setData({
                  shopList: res.data.data
                })
      
              
              }
            } 
            else {
              that.setData({
                markers: arr
              })
            }
            
            
            // console.log(that.data.shopList)
          }
          
          
          // console.log(that.data.markers)
        }
        else {
          console.log(res.statusCode)
        }
      },
    })
  },

  //点击菜单商铺类型
  menuFun: function (e) {
    var that = this;
    var json = {
      typeId : e.currentTarget.dataset.id,
      longitude : that.data.shopListShow.longitude,
      latitude : that.data.shopListShow.latitude,
      distance : that.data.shopListShow.distance,
    }
    that.shopListShow(json)


    that.setData({
      menu: {
        menuWidth: that.data.menu.menuWidth,
        menuList: that.data.menu.menuList,
        menuIndex: e.currentTarget.dataset.index
      },
      shopListShow: {
        latitude: that.data.shopListShow.latitude,
        longitude: that.data.shopListShow.longitude,
        typeId: e.currentTarget.dataset.id,
        distance: that.data.shopListShow.distance,
      },
      showBottom: -500,
      shopDetail: {}

    })
  },

  //拖拽地图更新附近商户
  refreshFun:function(e){
    var that = this;
    that.mapCtx.getCenterLocation({
      success: function (res) {
        // console.log(e)
        
        if (e.type == "end")
        {
          that.setData({
            shopListShow: {
              latitude: res.latitude,
              longitude: res.longitude,
              typeId: that.data.shopListShow.typeId,
              distance: that.data.shopListShow.distance,
            },
          })
          that.shopListShow(that.data.shopListShow);
          // console.log(res.longitude)
          // console.log(res.latitude)
        }
        
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap');
  
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