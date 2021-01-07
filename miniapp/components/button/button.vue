<template>
  <button class="em-btn-class em-btn"
          :class="['em-btn-'+size,plain?'em-'+type+'-outline':'em-'+(type || 'gradual'),getDisabledClass(disabled,type),getShapeClass(shape,plain)]"
          :hover-class="getHoverClass(disabled,type,plain)" :loading="loading" :disabled="disabled"
          :open-type="openType" @tap="handleClick"
          @getuserinfo="bindgetuserinfo" :form-type="formType" v-if="!hidden">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "emButton",
  props: {
    // primary, white, danger, warning, green, gray,gradual
    type: {
      type: String,
      default: 'gradual'
    },
    // block, mini, small
    size: {
      type: String,
      default: 'block'
    },
    // circle, square，rightAngle
    shape: {
      type: String,
      default: 'square'
    },
    plain: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    openType: {
      type: String,
      default: ''
    },
    formType: {
      type: String,
      default: ''
    },
    hidden: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        return false;
      }
      this.$emit('click', {})
    },
    bindgetuserinfo({
                      detail = {}
                    } = {}) {
      this.$emit('getuserinfo', detail);
    },
    getDisabledClass: function (disabled, type) {
      let className = '';
      if (disabled && type != 'white' && type != 'gray') {
        className = type == 'gradual' ? 'btn-gradual-disabled' : 'em-dark-disabled';
      }
      return className;
    },
    getShapeClass: function (shape, plain) {
      let className = '';
      if (shape == 'circle') {
        className = plain ? 'em-outline-fillet' : 'em-fillet';
      } else if (shape == "rightAngle") {
        className = plain ? 'em-outline-rightAngle' : 'em-rightAngle';
      }
      return className;
    },
    getHoverClass: function (disabled, type, plain) {
      let className = '';
      if (!disabled) {
        className = plain ? 'em-outline-hover' : ('em-' + (type || 'gradual') + '-hover');
      }
      return className;
    }
  }
}
</script>

<style lang="stylus" scoped>
/* color start*/
.em-primary
  background: #5677fc !important;
  color: #fff;

.em-danger
  background: #fc4d52 !important;
  color: #fff;

.em-red
  background: #e41f19 !important;
  color: #fff;

.em-warning
  background: #ff7900 !important;
  color: #fff;

.em-green
  background: #19be6b !important;
  color: #fff;

.em-white
  background: #fff !important;
  color: #333 !important;

.em-gray
  background: #ededed !important;
  color: #999 !important;

.em-hover-gray
  background: #f7f7f9 !important;

/* color end*/

/* button start*/

.em-btn
  width: 100%;
  position: relative;
  border: 0 !important;
  border-radius: 10rpx;
  display: inline-block;

  &::after
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 0;
    top: 0;
    border-radius: 20rpx;

.em-btn-block
  font-size: 36rpx;
  height: 90rpx;
  line-height: 90rpx;

.em-white::after
  border: 1px solid #eaeef1;

.em-white-hover
  background: #e5e5e5 !important;
  color: #2e2e2e !important;

.em-dark-disabled
  opacity: 0.6 !important;
  color: #fafbfc !important;

.em-outline-hover
  opacity: 0.5;

.em-primary-hover
  background: #4a67d6 !important;
  color: #e5e5e5 !important;

.em-primary-outline::after
  border: 1px solid #5677fc !important;

.em-primary-outline
  color: #5677fc !important;
  background: none;

.em-danger-hover
  background: #d53912 !important;
  color: #e5e5e5 !important;

.em-danger-outline
  color: #fc4d52 !important;
  background: none;

.em-danger-outline::after
  border: 1px solid #fc4d52 !important;

.em-red-hover
  background: #c51a15 !important;
  color: #e5e5e5 !important;

.em-red-outline
  color: #e41f19 !important;
  background: none;

.em-red-outline::after
  border: 1px solid #e41f19 !important;

.em-warning-hover
  background: #e56d00 !important;
  color: #e5e5e5 !important;

.em-warning-outline
  color: #ff7900 !important;
  background: none;

.em-warning-outline::after
  border: 1px solid #ff7900 !important;

.em-green-hover
  background: #16ab60 !important;
  color: #e5e5e5 !important;

.em-green-outline
  color: #44cf85 !important;
  background: none;

.em-green-outline::after
  border: 1px solid #44cf85 !important;

.em-gray-hover
  background: #d5d5d5 !important;
  color: #898989;

.em-gray-outline,
.em-white-outline
  color: #999 !important;
  background: none !important;

.em-gray-outline::after,
.em-white-outline::after
  border: 1px solid #ccc !important;

/*圆角 */

.em-fillet
  border-radius: 45rpx;

.em-white.em-fillet::after
  border-radius: 90rpx;

.em-outline-fillet::after
  border-radius: 90rpx;

/*平角*/
.em-rightAngle
  border-radius: 0;

.em-white.em-rightAngle::after
  border-radius: 0;

.em-outline-rightAngle::after
  border-radius: 0;

/*渐变 */

.em-gradual
  background: linear-gradient(-90deg, #5677fc, #5c8dff);
  border-radius: 45rpx;
  color: #fff;

.em-gradual-hover
  color: #d5d4d9 !important;
  background: linear-gradient(-90deg, #4a67d6, #4e77d9);

.btn-gradual-disabled
  color: #fafbfc !important;
  border-radius: 45rpx;
  background: linear-gradient(-90deg, #cad8fb, #c9d3fb);

/*不同尺寸 */
.em-btn-mini
  width: auto;
  font-size: 30rpx;
  height: 70rpx;
  line-height: 70rpx;

.em-btn-small
  width: auto;
  font-size: 30rpx;
  height: 60rpx;
  line-height: 60rpx;

/* button end*/
</style>
