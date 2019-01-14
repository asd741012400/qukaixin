// pages/cooperation/cooperation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cooperList:[
    //   {
    //     cooperImg:"http://image.quku199.com/cooperation/cooperation-one.png",
    //     cooperTitle:"商家入驻",
    //     cooperText:"平台优势，成单量更有保障",
    //     cooperUrl:"../enter/enter",
    //     text:"开店申请"
    //   },
    //   {
    //     cooperImg: "http://image.quku199.com/cooperation/cooperation-two.png",
    //     cooperTitle: "代理商",
    //     cooperText: "平台优势，成单量更有保障",
    //     text: "立即申请"
    //   },
    //   {
    //     cooperImg: "http://image.quku199.com/cooperation/cooperation-three.png",
    //     cooperTitle: "广告合作",
    //     cooperText: "平台优势，成单量更有保障",
    //     text: "立即申请"
    //   },
    //   {
    //     cooperImg: "http://image.quku199.com/cooperation/cooperation-four.png",
    //     cooperTitle: "城市合伙人",
    //     cooperText: "平台优势，成单量更有保障",
    //     cooperUrl: "../cooperator/cooperator",
    //     text: "立即申请"
    //   },
    // ],

    cooperList: [
      {
        cooperImg: "http://image.quku199.com/cooperation/cooperation-two.png",
        cooperTitle: "代理商",
        cooperText: "平台优势，成单量更有保障",
        cooperUrl: "../cooperator/cooperator",
        text: "立即申请",
        id:1
      },
      {
        cooperImg: "http://image.quku199.com/cooperation/cooperation-three.png",
        cooperTitle: "广告合作",
        cooperText: "平台优势，成单量更有保障",
        cooperUrl: "../cooperator/cooperator",
        text: "立即申请",
        id: 2
      },
      {
        cooperImg: "http://image.quku199.com/cooperation/cooperation-four.png",
        cooperTitle: "城市合伙人",
        cooperText: "平台优势，成单量更有保障",
        cooperUrl: "../cooperator/cooperator",
        text: "立即申请",
        id: 3
      },
    ],
  },
  urlFun: function (e) {
    var that = this,
      url = e.currentTarget.dataset.url;
    // console.log(2222)
    wx.navigateTo({
      url: url + "?id=" + e.currentTarget.dataset.id
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