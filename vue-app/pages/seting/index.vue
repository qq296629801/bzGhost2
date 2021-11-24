<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar :is-back="false" title=" " :background="{ background: '#ffffff'  }" :border-bottom="false"></u-navbar>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="status_bar"></view>
		<!-- #endif -->
		
		<u-cell-group>
			<u-cell-item title="账号与安全" @click="linkToAccount" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item @tap="upApp" title="检查更新" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		</u-cell-group>

		<view  style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item :arrow="false" @click="logout">
				<view style="text-align: center;">退出登录</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
// #ifdef APP-PLUS
import APPUpdate, { getCurrentNo } from "@/util/APPUpdate";
// #endif
import { mapState } from 'vuex';	
export default {
	data() {
		return {
			version: "", // 版本号
		}
	},
	onLoad(e) {
		// #ifdef APP-PLUS
		getCurrentNo(res => {
			this.version = res.version;
		});
		// #endif
	},
	computed:{
		...mapState(['user'])
	},
	methods: {
		onAPPUpdate() {
			APPUpdate(true);
		},
		linkToCommon(index){
			this.$u.route({
				url: 'pages/my/common'
			});
		},
		linkToAccount(){
			this.$u.route({
				url: 'pages/user/account'
			});
		},
		logout(){
			this.$socket.logout(res =>{});
			uni.clearStorageSync();
			this.$u.route({
				url: 'pages/login/login'
			});
		},
		upApp(){
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				// 获取验证码
				uni.request({
					url: '', 
					data: {keyword:''},
					success: (res) => {
						if(widgetInfo.version == res.data.data.version){
							uni.showToast({
								icon:"none",
								duration:2000,
								title:'暂无版本更新'
							})
							return;
						}
						uni.showLoading({
							title:'下载中....'
						})
						uni.downloadFile({
							url: res.data.data.android,
							success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										plus.runtime.restart();
										uni.hideLoading()
									}, function(e) {
										uni.hideLoading()
									});
								}
							},
							fail: (res) =>{
								uni.showToast({
									icon:"none",
									duration:2000,
									title:res
								})
							}
						});
					},fail() {
					  this.clear()
					}
				});
			});
			// #endif
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
