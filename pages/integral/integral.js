// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messList: [],
    pages: 1,
    pageSize: 10,
    arr: [],
    length: 0,
    show: false,
    imgShow: false,
    UserId:'',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this.data.pages,
      pageSize = this.data.pageSize;
    this.listLoding(page, pageSize)   //加载页面数据
  },

  listLoding: function (pages, pageSize, stati) {
    var that = this;
    var user = wx.getStorageSync('user')

    //积分明细
    wx.request({
      
      url: 'https://api.quku199.com/api/IntegralDetail/GetIntegralDetailList',//接口地址
      method: "POST",   //接收类型
      data: {
        UserId: user.UserID,  
        pageIndex: pages,   //页码
        pageSize: pageSize  //条数
      },
      success: function (res) {
        // console.log(res)
        if (res.statusCode == 200) {        //如果接口状态=200
          console.log(res)
          that.setData({
            imgShow: true
          })

          that.data.arr = that.data.arr.concat(res.data.data) //两个数组的数据整合
          // console.log(res.data.data)
          that.setData({
            length: res.data.datacount    //得到渲染的数据总条数
          })
          if (that.data.messList.length >= that.data.length) {  //如果渲染的数据总条数大于等于数据库的总条数

            that.setData({      //没有数据了
              show: true,       //提示到底了
              imgShow: false
            })
          }
          else {                //继续添加数据
            that.setData({
              messList: that.data.arr,
            })
            setTimeout(function () {
              that.setData({
                imgShow: false
              })
            }, 2000)

          }
        }
        else {
          console.log(res.statusCode)   //接口失败后返回报错
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
    var page = this.data.pages,   //定义页码
      pageSize = 5;
    page++;             //page增长
    this.setData({
      pages: page       //赋值给pages
    })
    this.listLoding(page, pageSize)   //调用listLOding函数  传参页码和条数
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})