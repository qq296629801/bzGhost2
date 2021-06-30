<template>
	<view>
		<view class="t-login">
			<view class="t-b">{{title}}</view>
			<form class="cl">
				<view class="t-a">
					<image src="/static/shilu-login/1.png"></image>
					<input name="phone" type="text" maxlength="11" v-model="regForm.phone" placeholder="用户名" />
				</view>
				<view class="t-a">
					<image src="/static/shilu-login/2.png"></image>
					<input name="pwd" type="password" maxlength="32" v-model="regForm.pwd" placeholder="密码" />
				</view>
				<view class="t-a">
					<image src="/static/shilu-login/4.png"></image>
					<input name="nickName" type="text" maxlength="32" v-model="regForm.nickName" placeholder="昵称" />
				</view>
				<view class="t-a">
					<image src="/static/shilu-login/3.png"></image>
					<input name="invitationPerson" type="text" maxlength="6" v-model="regForm.invitationPerson" placeholder="邀请码" />
				</view>
				<!-- <view class="t-a">
					<image src="/static/shilu-login/3.png"></image>
					<input name="code" type="number" maxlength="6" v-model="code" placeholder="请输入验证码" />
					<view class="t-c" @tap="getcode">{{yanzhengma}}</view>
				</view> -->
				<view class="t-d"></view>
				<button @tap="reg">注册</button>
			</form>
			<view class="t-e cl">
			</view>
		</view>
	</view>
</template>

<script>
	import apiconfig from '../../apiconfig.js'
	var _this, js;
	export default {
		components:{},
		data() {
			return {
				title: '注册',
				regForm:{
					phone:'',
					pwd:'',
					invitationPerson:'QhQf',
					nickName:'',
					devId: 0,
				}
			};
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		computed: {
		 /* yanzhengma() {
		    if (this.second == 0) {
		      return '获取验证码';
		    } else {
		      if (this.second < 10) {
		        return '重新获取' + this.second;
		      } else {
		        return '重新获取' + this.second;
		      }
		    }
		  } */
		},
		mounted() {
			_this = this;
		},
		destroyed() {
		  clearInterval(js)
		  this.second = 0;
		},
		methods:{
			linkAgree () {
				this.$u.route({
					url: 'pages/agreement/agreement'
				})
			},
			getcode() {
			  if (this.phone.length != 11) {
			    uni.showToast({
			      icon: 'none',
			      title: '手机号不正确'
			    });
			    return;
			  }
			  if (this.second > 0) {
			    return;
			  }
			  this.second = 60;
			  //请求业务
			  js = setInterval(function() {
			    _this.second--;
			    if (_this.second == 0) {
			      _this.clear()
			    }
			  }, 1000)
			  
					uni.request({
						url:this.$api+'/register/sendSms', 
						data: {phone:this.phone},
						success: (res) => {
							console.log(res.data);
						}
					});
			},
			reg() {
				let _this = this
				apiconfig.register({data:_this.regForm}).then(res=>{
					uni.showToast({
						title:res.data.data,
						icon:'success'
					})
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
	margin-bottom: 50rpx;
	background: #fff;
	border: 1px solid #dfdfdf;
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
