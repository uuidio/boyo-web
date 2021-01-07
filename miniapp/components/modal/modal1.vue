<template>
	<view>
		<view :style="{width:!widthNum?width+'%':px(width),top:fxTop+'%',borderRadius:px(borderR),padding:px(pad),background:initBackgroung}" class="em-modal-class em-modal-box" :class="[show?'em-modal-show':'',paddingFlag?'p0':'']">
			<view v-if="!custom">
				<view class="em-modal-title" v-if="title">{{title}}</view>
				<view class="em-modal-content" :class="[title?'':'em-mtop']" :style="{color:color,fontSize:px(size)}">{{content}}</view>
				<view class="em-modalBtn-box" :class="[button.length>2?'em-flex-column':'']">
					<block v-for="(item,index) in button" :key="index">
						<button class="em-modal-btn" :class="['em-'+(item.type || 'primary')+(item.plain?'-outline':''),button.length!=2?'em-btn-width':'',button.length>2?'em-mbtm':'',shape=='circle'?'em-circle-btn':'']"
						 :hover-class="'em-'+(item.plain?'outline':(item.type || 'primary'))+'-hover'" :data-index="index" @tap="handleClick">{{item.text || "确定"}}</button>
					</block>
				</view>
			</view>
			<view v-else >
				<slot></slot>
			</view>
		</view>
		<view class="em-modal-mask" :class="[show?'em-mask-show':'']" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
	export default {
		name: "emModal",
		props: {
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
      widthNum: {
				type: Boolean,
				default: false
			},
      initBackgroung: {
				type: String,
				default:'#fff'
			},
      borderR:{
        type: Number,
        default:24
      },
      fxTop:{
        type: Number,
        default:50
      },
      pad:{
        type: Number,
        default:20
      },
			//标题
			title: {
				type: String,
				default: ""
			},
      width:{
        type: Number,
        default: 90
      },
      paddingFlag: {
        type: Boolean,
        default: false
      },
			//内容
			content: {
				type: String,
				default: ""
			},
			//内容字体颜色
			color: {
				type: String,
				default: "#999"
			},
			//内容字体大小
			size: {
				type: Number,
				default: 28
			},
			//形状 circle, square
			shape: {
				type: String,
				default: 'square'
			},
			button: {
				type: Array,
				default: function() {
					return [{
						text: "取消",
						type: "red",
						plain: true //是否空心
					}, {
						text: "确定",
						type: "red",
						plain: false
					}]
				}
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			//自定义弹窗内容
			custom: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleClick(e) {
				if (!this.show) return;
				const dataset = e.currentTarget.dataset;
				this.$emit('click', {
					index: Number(dataset.index)
				});
			},
			handleClickCancel() {
				if (!this.maskClosable) return;
				this.$emit('cancel');
			},
			px(num) {
				return uni.upx2px(num) + 'px'
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="stylus">
  .p0
    padding 0!important
	.em-modal-box
		position: fixed;
		width: 90%;
		left: 50%;
		top: 50%;
		margin: auto;
		background: #fff;
		z-index: 99998;
		transition: all 0.3s ease-in-out;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		box-sizing: border-box;
	.em-modal-show
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;


	.em-modal-mask
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;


	.em-mask-show
		visibility: visible;
		opacity: 1;


	.em-modal-title
		text-align: center;
		font-size: 34upx;
		color: #333;
		padding-top: 20upx;
		font-weight: bold;


	.em-modal-content
		text-align: center;
		color: #999;
		font-size: 28upx;
		padding-top: 20upx;
		padding-bottom: 60upx;


	.em-mtop
		margin-top: 30upx;


	.em-mbtm
		margin-bottom: 30upx;


	.em-modalBtn-box
		display: flex;
		align-items: center;
		justify-content: center;


	.em-flex-column
		flex-direction: column;


	.em-modal-btn
		width: 44%;
		height: 68upx;
		line-height: 68upx;
		position: relative;
		border-radius: 10upx;
		font-size: 24upx;
		overflow: visible;


	.em-modal-btn::after
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		left: 0;
		top: 0;
		border-radius: 20upx;


	.em-btn-width
		width: 80% !important;


	.em-primary
		background: #5677fc;
		color: #fff;


	.em-primary-hover
		background: #4a67d6;
		color: #e5e5e5;


	.em-primary-outline
		color: #5677fc;
		background: none;


	.em-primary-outline::after
		border: 1px solid #5677fc;


	.em-danger
		background: #ed3f14;
		color: #fff;


	.em-danger-hover
		background: #d53912;
		color: #e5e5e5;


	.em-danger-outline
		color: #ed3f14;
		background: none;


	.em-danger-outline::after
		border: 1px solid #ed3f14;


	.em-red
		background: #e41f19;
		color: #fff;


	.em-red-hover
		background: #c51a15;
		color: #e5e5e5;


	.em-red-outline
		color: #e41f19;
		background: none;


	.em-red-outline::after
		border: 1px solid #e41f19;


	.em-warning
		background: #ff7900;
		color: #fff;


	.em-warning-hover
		background: #e56d00;
		color: #e5e5e5;


	.em-warning-outline
		color: #ff7900;
		background: none;


	.em-warning-outline::after
		border: 1px solid #ff7900;


	.em-green
		background: #19be6b;
		color: #fff;


	.em-green-hover
		background: #16ab60;
		color: #e5e5e5;


	.em-green-outline
		color: #19be6b;
		background: none;


	.em-green-outline::after
		border: 1px solid #19be6b;


	.em-white
		background: #fff;
		color: #333;


	.em-white-hover
		background: #f7f7f9;
		color: #666;


	.em-white-outline
		color: #333;
		background: none;


	.em-white-outline::after
		border: 1px solid #333;


	.em-gray
		background: #ededed;
		color: #999;


	.em-gray-hover
		background: #d5d5d5;
		color: #898989;


	.em-gray-outline
		color: #999;
		background: none;


	.em-gray-outline::after
		border: 1px solid #999;


	.em-outline-hover
		opacity: 0.6;


	.em-circle-btn
		border-radius: 40upx !important;


	.em-circle-btn::after
		border-radius: 80upx !important;

</style>
