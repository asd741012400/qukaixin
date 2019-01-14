// pages/personalCenter/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 0,
    rankingList: [],
    signInShow: false,
    SignIn:0,
    OsignIn:'',
    MyIntegral:'',
    dd:"",
    LevelTypeIDState:'',
   songjifen:'',
  },

  urlFun: function (e) {
    var that = this,
    
      url = e.currentTarget.dataset.url;

    wx.navigateTo({
      url: url
    })
  },
 

//点击签到
  signInFn: function (e) {
    var that = this
    var user = wx.getStorageSync('user')

    wx.request({
      url: 'https://api.quku199.com/api/User/UpdateIntegral',
      method: "POST",
      data: {
        UserId: user.UserID,
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {
          
            var num = parseInt(res.data.data) + parseInt(that.data.MyIntegral);
            that.setData({
              songjifen: res.data.data,
              MyIntegral: num
            })
           
            if (that.data.OsignIn == 0) {
              that.setData({
                signInShow: true,
                OsignIn: 1
              })
            }
            else {
              that.setData({
                signInShow: false,
              })
            }
          }
          else {
            console.log(res.data.errmsg)
          }
        }
        else {
          console.log(res.data.statusCode)
        }
      }
    })
  },

  //点击隐藏弹层
  clickFalse: function (e) {
    var that = this
    that.setData({
      signInShow: false
    })
  },

  //弹层后，点击购买会员跳转
  clickPayVip: function (e) {
    wx.navigateTo({
      url: '../Member/Member',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user')
    

    

    //签到
    // wx.request({
    //   url: 'https://api.quku199.com//api/User/UpdateIntegral',
    //   method:"POST",
    //   data:{
    //     UserId: user.UserID,
    //     LevelTypeID: user.LevelTypeID,
    //   },
    //   success:function(res){

    //   }
    // })

    //排行榜
    wx.request({
      url: 'https://api.quku199.com/api/User/GetUser_Top10',
      method: "POST",
      success: function (res) {
        that.setData({
          rankingList: res.data.data,
        })

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
    var that = this;
    var user = wx.getStorageSync('user')


    //我的
    wx.request({
      url: 'https://api.quku199.com/api/User/MyDetails',
      method: "POST",
      data: {
        UserId: user.UserID,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errcode == 0) {
            console.log()
            // var balance = res.data.data.UserBalance.substring(0, res.data.data.UserBalance.length -2) 
            // var integral = res.data.data.Integral.substring(0, res.data.data.Integral.length - 5) 
            that.setData({
              Headimg: res.data.data.HeadImageUrl,
              OsignIn: res.data.data.SignIn,
              HeadName: res.data.data.UserName,
              LevelTypeIDState: res.data.data.LevelTypeID,
              LevelTypeName: res.data.data.LevelTypeName,
              Myrank_no: res.data.data.rank_no,
              MyFree_Coupons: res.data.data.Free_Coupons,
              MyUserBalance: res.data.data.UserBalance,
              MyIntegral: res.data.data.Integral,
            })
          }
          else {
            console.log(res.data.errmsg)
          }
        }
        else {
          console.log(res.data.statusCode)
        }
      }
    })
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