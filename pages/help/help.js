// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    dataidx:1,
    
  },
  tableFn: function (e) {
    var that = this
    var _datasetId = e.currentTarget.dataset.idx;
    that.setData({
      tabIndex: _datasetId,
      dataidx: parseInt(_datasetId) + 1,
    });
    console.log(that.data.dataidx)
    wx.request({
      url: 'https://api.quku199.com/api/HelpCenter/GetHelpCenterList',
      method: "POST",
      data:{
        QType: that.data.dataidx,
        RequestType: 1
      },
      success(res){
        that.setData({          
          CenterList: res.data.data,          
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://api.quku199.com/api/HelpCenter/GetHelpCenterList',
      method:"POST",
      data:{
        QType: that.data.dataidx,
        RequestType:1
      },
      success(res){
        console.log(res.data.data);
        that.setData({
          CenterList:res.data.data
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