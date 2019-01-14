// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '未设置',
    sexShow:false,
    sex: '未设置',
    sexNum:0,
    PersonalImg:"",
    PersonalName:"",
    PersonalPhone:"",
  },

  UpdateUserPhone:function(e){
    wx.navigateTo({
      url: '../Update-Phone/Update-Phone?userphone=' + this.data.PersonalPhone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user')

    //个人资料
    wx.request({
      url: 'https://api.quku199.com/api/User/GetUserInfo',
      method: "POST",
      data: {
        UserId: user.UserID,
      },
      success:function(res){
        // wx.getUserInfo({
        //   success: function (res) {
        //     var sex = userInfo.gender //性别 0：未知、1：男、2：女
        //     var date =userInfo.Birthday
        //   }
        // })
          // console.log(res)
          if(res.statusCode==200)
          {
            if (res.data.errcode == 0)
              {
                if (res.data.data.Sex == 0)
                { 
                  res.data.data.Sex = "未设置"
                }
                else if (res.data.data.Sex == 1)
                {
                  res.data.data.Sex = "男"
                }
                else if (res.data.data.Sex == 2) {
                  res.data.data.Sex = "女"
                }
                if (res.data.data.Birthday == null) {
                  res.data.data.Birthday = "未设置"
                }

                  that.setData({
                    PersonalImg: res.data.data.HeadImageUrl,
                    PersonalName: res.data.data.UserName,
                    PersonalPhone: res.data.data.UserPhone,
                    sex: res.data.data.Sex,
                    date: res.data.data.Birthday,
                  })
              }
              else
              {
              console.log(res.data.errmsg)
              }
          }
          else
          {
            console.log(res.data.statusCode)
          }
      }
    })


  },


  submitComment:function(){
    var that = this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: 'https://api.quku199.com/api/User/UpdateUserInfo',
      method:"POST",
      data:{
        UserPhone: that.data.PersonalPhone,
        UserID: user.UserID,
        Birthday: that.data.date,
        Sex: that.data.sexNum,
      },
      success:function(res){
        if (res.statusCode == 200)
        { 
          if (res.data.errcode == 0)
          {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          }
          else
          {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
              duration: 1000
            })
          }
        } 
        else
        {
          console.log("res.statusCode----UpdateUserInfo-----", res.statusCode)
        }
      }
    })
  },



  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  Sex:function(e){
    var that = this;
    if(e.currentTarget.dataset.sex==0){
      if (e.currentTarget.dataset.sexnum == 0) 
      {
        that.setData({
          sex: "男",
          sexNum:1
        })
      } 
      else if (e.currentTarget.dataset.sexnum == 1)
      {
        that.setData({
          sex: "女",
          sexNum: 2
        })
        
      }
      that.setData({
        sexShow: false
      })
    }
    else
    {
      that.setData({
        sexShow: true
      })
    }

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