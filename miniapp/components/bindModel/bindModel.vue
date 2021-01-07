<template>
    <view>
        <emModel :maskClosable="false" @cancel="cancelModel" :custom="true"  :show="sonShow">
            <view class="model-title">微信信息授权</view>
            <view>您还没有授权微信信息</view>
            <view class="footer-btn">
              <!--<button @click="cancelModel">返回</button>-->
              <!--<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary">绑定</button>-->
              <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" type="primary">绑定</button>
            </view>
        </emModel>
    </view>
</template>

<script>
    import emModel from '../modal/modal'
    import emButton from '../button/button'
    import global from '../../mixins/global.js'
    export default {
        mixins: [global],
        components:{
            emModel,
            emButton
        },
        props:{
            showModel:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sonShow:false
            };
        },
        watch:{
            showModel(val){
                this.sonShow = val
            }
        },
        methods: {
            cancelModel(){
                this.sonShow = false
                this.$emit('getShow',this.sonShow)
            }
        },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
@import '../../variable.styl';
.model-title
  margin-bottom 60rpx
  color #000
.footer-btn
  margin-top 60rpx
  button
    width 220rpx!important
    display inline-block
    line-height 60rpx
    height: 60rpx;
    border-radius 40rpx
    font-size $font-sm
    &::after
      display none
    &:first-child
      background #fff
      border 1px solid $em-color-error
      color $em-color-error
    &:last-child
      margin-left 30rpx
      background red
      color #fff
</style>
