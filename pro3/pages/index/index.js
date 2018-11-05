// pages/index/index.js

var webroot ="http://47.93.198.68/applet/";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webroot:webroot,
    timesend:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://47.93.198.68/applet/web/index.php?r=index/index',
      method:'get',
      dataType:'json',
      success:function(e){
        that.setData({ datainfo: e.data });
        setInterval(that.endtime, 1000);
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

  },

  my:function(){
    wx.navigateTo({
      url: "/pages/my/index"
    })
  },

  /**
   * 活动规则
   */

    hd:function(){
      wx.navigateTo({
        url:"/pages/hd/index"
      })
    },
  /**
   * 点赞
   */

    dj:function(e){
      var _type=e.currentTarget.id;//点赞的类型牛批或垃圾
      var that=this;
      var id=this.data.datainfo.prize.activity_id;//活动的id
      wx.request({
        url: 'http://47.93.198.68/applet/web/index.php?r=index/getsave&type='+_type+'&id='+id,
        method: 'get',
        dataType: 'json',
        success: function (e) {
          // console.log(e)
          that.setData({'datainfo.prize':e.data});
        }
      })
    },
    // 活动剩余时间

    endtime:function(){
      // console.log(this)
      var _time=this.data.datainfo.prize._time;
      _time--;

      var days=parseInt(_time/(60*60*24));//过期剩余的天数
      var hours=parseInt(_time%(60*60*24)/(60*60));//过期剩余的小时
      var minute=parseInt(_time%(60*60)/60);//过期的分钟数
      var second=parseInt(_time%60);//过期的秒

      var timesend='活动剩余时间:'+days+'天'+hours+'小时'+minute+'分钟'+second+'秒';//拼接字符串
      this.setData({'datainfo.prize._time':_time,gqsj:timesend});
    }

})