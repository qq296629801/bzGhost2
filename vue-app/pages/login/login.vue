<template>
	<view>
		<view class="t-login">
			<view class="t-b">{{title}}</view>
			<form class="cl">
				<view class="t-a">
					<image src="/static/shilu-login/1.png"></image>
					<input name="phone" v-model="phone" placeholder="请输入手机号" />
				</view>
				<view class="t-a">
					<image src="/static/shilu-login/2.png"></image>
					<input name="code" type="password" v-model="pass" placeholder="请输入密码" />
				</view>
				<view class="t-d"></view>
				<button @tap="linkLogin">立即登录</button>
			</form>
			<view class="t-f">
				登录即同意 <text @tap="linkAgr">《用户协议》</text>
				<text @tap="linkReg" style="color: #000000;">注册</text>
			 </view>
			 <view class="t-f">
				
			 </view>
			<view class="t-e cl">
			</view>
		</view>
	</view>
</template>

<script>
	import dbUtil from '../../util/dbUtil.js'
	export default {
		components:{},
		data() {
			return {
				title: 'Yiqun',
				pass:'123456',
				phone:'admin',
			};
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		mounted: function () {
		  this.$nextTick(function () {
			  
		  })
		},
		methods:{
			linkAgr(){
				// 跳转到消息列表
				this.$u.route({
					url: 'pages/login/agreement'
				});
			},
			linkReg(){
				// 跳转到消息列表
				this.$u.route({
					url: 'pages/login/reg'
				});
			},
			linkLogin(){
				this.$socket.login(this.phone, this.pass, null, res=>{
					if (res.success) {
						let userData = res.response.data;
						
						this.$u.vuex("userData", userData);
						
						dbUtil.upCacheMsg(userData.user.operId);
						
						dbUtil.upCacheAddr(userData.user.operId).then(res=>{
							this.$u.vuex('firendItem', res)
						});
						dbUtil.upCacheChat(userData.user.operId).then(res=>{
							this.$u.vuex('chatItem', res);
						});
						
						this.$u.route({
							url: 'pages/home/home',
							type: 'switchTab'
						});
					} else {
					  uni.showModal({
					  	title:res.reason + "，请稍后再试",
					  	showCancel:false
					  })
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000
}

.t-login button {
	font-size: 28rpx;
	background: #000;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	border: 1px solid #dfdfdf;
	margin-bottom: 50rpx;
	background: #fff;
	font-size: 28rpx;
	border-radius: 50rpx
}

.t-login .t-a {
	position: relative
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	border-right: 2rpx solid #dedede;
	padding-right: 20rpx
}

.t-login .t-b {
	text-align: center;
	font-size: 46rpx;
	color: #000;
	padding: 150rpx 0
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #000;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0
}

.t-login .t-g {
	float: left;
	width: 50%
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx
}

.t-login .t-f {
	text-align: center;
	margin: 80rpx 0 0 0;
	color: #666
}

.t-login .t-f text {
	margin-left: 8rpx;
	color: #999
}

.t-login .uni-input-placeholder {
	color: #000
}

.cl {
	zoom: 1
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20'
}
</style>
