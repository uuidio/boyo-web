export default {
	data() {
		return {
      hasPayPwd: false
		}
	},
	methods: {
    hasPayPassword() {
      const that = this
      this.$http({
        aurl: 'hasPayPassword',
        success: res => {
          if(res.data.code === 0){
            const result = res.data.result
            that.hasPayPwd = result.status
            if(result.status == 0){ // 未设置支付密码
              uni.setStorageSync('accountStatus', result.status);
              uni.showModal({
              	title: '设置钱包支付密码',
              	content: '首次使用钱包功能需设置密码',
              	cancelText: '不使用',
              	confirmText: '去设置',
              	confirmColor: '#5C6F97',
              	success (res) {
              		if (res.confirm) {
              			// console.log('用户点击确定')
                    that.needTokenQueryLink('/pagesA/user/wallet/authentication', {use_type: 'set'});
              		} else if (res.cancel) {
              			// console.log('用户点击取消')
              			return false;
              		}
              	}
              })
            } else if (result.status == 1 || result.status == 2){ // 已设置
              that.toQueryLink('/pagesA/user/wallet/index',{accountStatus: result.status});
            }
          }
        },
        fail: error => {
          // uni.navigateTo({
          // 	url:"/pagesA/user/bindUser"
          // })
          console.log(error);
        }
      });
    },
	},
	onLoad: function(options) {

	},
	mounted() {}
};
