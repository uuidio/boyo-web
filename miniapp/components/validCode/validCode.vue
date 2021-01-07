<!--
自定义验证码输入、密码输入使用

使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<view class="code-area" @click="to(item)">
		<view class="flex-box" :style="{'padding-left': paddingLeft + 'rpx', 'padding-right': paddingRight + 'rpx'}">
			<input
				:value="val"
				type="number"
				:focus="onFocus"
				:maxlength="maxlength"
				class="hide-input"l
				@input="getVal"
				:hold-keyboard="holdKeyboard"
				@blur="onblur"
			/>
			<view v-bind:class="['item', { active: codeIndex == 1 }]" :style="{'width': itemWidth + '%', 'margin-right': marginRight + '%'}">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 1">
					<text class="dot">.</text>
				</block>
				<block v-else>	{{ codeArr[0] ? codeArr[0] : ''}}</block>
			</view>
			<view v-bind:class="['item', { active: codeIndex == 2 }]" :style="{'width': itemWidth + '%', 'margin-right': marginRight + '%'}">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 2">
					<text class="dot">.</text>
				</block>
				<block v-else>	{{ codeArr[1] ? codeArr[1] : ''}}</block>
			</view>
			<view v-bind:class="['item', { active: codeIndex == 3 }]" :style="{'width': itemWidth + '%', 'margin-right': marginRight + '%'}">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 3">
					<text class="dot">.</text>
				</block>
				<block v-else>	{{ codeArr[2] ? codeArr[2] : ''}}</block>
			</view>
			<view v-bind:class="['item', { active: codeIndex == 4 }]" :style="{'width': itemWidth + '%', 'margin-right': marginRight + '%'}">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 4">
					<text class="dot">.</text>
				</block>
				<block v-else>	{{ codeArr[3] ? codeArr[3] : ''}}</block>
			</view>
			<block v-if="maxlength === 6">
				<view v-bind:class="['item', { active: codeIndex == 5 }]" :style="{'width': itemWidth + '%', 'margin-right': marginRight + '%'}">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 5">
						<text class="dot">.</text>
					</block>
					<block v-else>	{{ codeArr[4] ? codeArr[4] : ''}}</block>
				</view>
				<view v-bind:class="['item', { active: codeIndex == 6 }]" :style="{'width': itemWidth + '%'}">
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= 6">
						<text class="dot">.</text>
					</block>
					<block v-else>	{{ codeArr[5] ? codeArr[5] : ''}}</block>
				</view>
			</block>


		</view>
	</view>
</template>

<script>
export default {
	props: {
		holdKeyboard: {
			type: Boolean,
			default: true
		},
		onFocus: {
			type: Boolean,
			default: true
		},
		itemWidth:{
			type: Number,
			default: 11
		},
		marginRight:{
			type: Number,
			default: 2
		},
		paddingLeft:{
			type: Number,
			default: 0
		},
		paddingRight:{
			type: Number,
			default: 0
		},
		//最大长度 值为4或者6
		maxlength: {
			type: Number,
			default: 4
		},
		//是否是密码
		isPwd: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			codeIndex: 1, //下标
			codeArr: [],
			val:'',//输入框的值
		};
	},
	methods: {
		onblur(){
			// this.onFocus = false
			this.$emit('changeOnfocus',false);
		},
		setFocus(){
			// this.onFocus = true
			this.$emit('changeOnfocus',true);
		},
		//取值
		getVal(e) {
			let { value } = e.detail;
			this.val=value;
			// console.log('验证码:', value);
			let arr = value.split('');
			this.codeIndex = arr.length + 1;
			this.codeArr = arr;
			// console.log(this.codeIndex, this.pwdArr);
			if (this.codeIndex > Number(this.maxlength)) {
				//输入完成
				this.$emit('finish',this.codeArr.join(''));
			}
		},
		//清除验证码或者密码
		clear(){
			this.codeIndex=1;
			this.codeArr=[];
			this.val="";
			// this.onFocus = true
		}
	}
};
</script>

<style scoped lang="stylus">
.code-area {
	text-align: center;
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		justify-content: center;
	}

	.item {
		position: relative;
		width: 11%;
		height: 100rpx;2
		margin-right: 18rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		line-height: 100rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #cccccc;
	}

	.item:last-child {
		margin-right: 0;
	}

	.active {
		border-color: #ccc;
	}
	.active .line {
		display: block;
	}

	.line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2rpx;
		height: 40rpx;
		background: #333;
		animation: twinkling 1s infinite ease;
	}1

	.hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}

	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}

	.dot{
		font-size: 80rpx;
		line-height: 40rpx;
	}
}
</style>
