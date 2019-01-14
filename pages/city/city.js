var city = require('../../utils/city.js');
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    cityShow:false,
    hotcityList: []
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var that = this;
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

    wx.getLocation({
      success: function(res) {
        that.loadCity(res.longitude, res.latitude )
      },
    })

    //热门城市
    wx.request({
      url: 'https://api.quku199.com/api/City/AppCityList',
      method:"POST",
      success: function (res) {
        if(res.statusCode == 200)
        {
          that.setData({
            hotcityList: res.data.data.hotcitylistinfo
          })
        }
        else
        {
          console.log(res.statusCode)
        }
      }
    })

  },

 

  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=l4nxrg2XgbPTvEiIBDAVqTABkSyzmpYG&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        // console.log(res);
        var city = res.data.result.addressComponent.city;
        page.setData({ 
          city: city,
          cityShow:true
        });
      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },

    })
  } ,
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    // console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    // console.log(e.currentTarget.dataset.cityCode)
    var that = this;
    wx.request({
      url: 'https://api.quku199.com/api/City/GetLotForCity',
      method:"POST",
      data:{
        Address: e.currentTarget.dataset.city
      },
      success:function(res){
        if (res.statusCode == 200) {
          if (res.data.errcode == 0)
          {
            var address = {
              latitude: res.data.data.lat,
              longitude: res.data.data.lng
            }
            wx.navigateTo({
              url: '../map/map?latitude=' + res.data.data.lat + "&longitude=" + res.data.data.lng + "&city=" + e.currentTarget.dataset.city,
            })
            // console.log( res.data.data)
          }
          else
          {
            console.log(res.data.errcode)
          }
          
        }
        else {
          console.log(res.statusCode)
        }
      }
    })


    this.setData({ city: e.currentTarget.dataset.city })
  },
  //选择热门城市
  // bindHotCity: function (e) {
  //   console.log(e.currentTarget.dataset.id)
  //   this.setData({
  //     city: e.currentTarget.dataset.city
  //   })
  // },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})