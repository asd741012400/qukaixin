// pages/message-details/message-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    megaTitle: "",
    megaDate: "",
    megaContion: "",
  },

  

  

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  // console.log(options.RecordId)

  //消息详情
  var that = this;
  wx.request({
    url: 'https://api.quku199.com/api/MessageRecord/GetMessageRecord',
    method: "POST",
    data: {
      RecordId: options.RecordId   //请求需要的参数
    },
    success:function(res){
      that.setData({
        megaTitle: res.data.data.MessageTitle,
        megaDate: res.data.data.CreateDate,
        megaContion: res.data.data.Content,
      })
      // console.log(res)
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