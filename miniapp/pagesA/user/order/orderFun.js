import Vue from "../../../static/base/vueUtil";

function toPayment(payment_id,group_sign){
  uni.login({
    provider: 'weixin',
    success: function (loginRes) {
      Vue.prototype.$http({
        aurl:'wechatminipay',
        params:{
          code : loginRes.code,
          payment_id : payment_id
        },
        success:res => {
          if(res.data.code===0){
            const params = res.data.result.url
            uni.requestPayment({
              nonceStr:params.nonceStr,
              package:params.package,
              timeStamp:params.timeStamp,
              signType:params.signType,
              paySign:params.paySign,
              success: function (res) {
                console.log(res);
                if(group_sign!==0){
                  Vue.prototype.redirectToLink('/pagesA/checkout/groupStatus',{
                    payment_id:payment_id
                  })
                }else{
                  Vue.prototype.redirectToLink('/pagesA/checkout/status',{
                    status:'succ',
                    payment_id:payment_id
                  })
                }

              },
              fail: function (err) {
                // _this.redirectToLink('/pages/checkout/status',{
                //   status:'fail',
                //   payment_id:payment_id
                // })
              }
            })
          }
          console.log(res)
        },
        fail:error => {
          console.log(error)
        }
      })
    }
  });
}
function confirmOrder(tid,callback){
  uni.showModal({
    content: '确认收货该订单',
    success: function (res) {
      if (res.confirm) {
        Vue.prototype.$http({
          aurl:'receiptOrder',
          params:{
            tid:tid
          },
          success:res => {
            uni.showToast({
              title: '确认收货成功',
            });
            setTimeout(function(){
              callback && callback()
            },200)
          },
          fail:error => {
            console.log(error)
          }
        })
      } else if (res.cancel) {
      }
    }
  });
}

export { toPayment,confirmOrder }
