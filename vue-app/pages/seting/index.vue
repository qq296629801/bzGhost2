<template>
	<view class="content">
		<view class="cell-group">
			<!-- 公共组件-每个页面必须引入 -->
			<public-module></public-module>
			
			<u-cell-group>
				
				<u-cell size="large" title="关于我们" @click="linkToAccount" :title-style="{ marginLeft: '10rpx' }">
				</u-cell>
				<u-cell size="large" :value="version" @tap="upApp" title="检查更新" :title-style="{ marginLeft: '10rpx' }">
				</u-cell>
				
				<u-gap height="10" bgColor="#f6f7f8"></u-gap>
				
				<u-cell size="large" :arrow="false" @click="logout">
					<view slot="label" style="text-align: center;color: red;">退出登录</view>
				</u-cell>
				
						
			</u-cell-group>
		</view>
	</view>
</template>

<script>
// #ifdef APP-PLUS
import APPUpdate, { getCurrentNo } from "@/util/APPUpdate";
// #endif
import store from '@/store/index.js' 
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
			store.commit("empty",{});
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
	.cell-group{
		background-color: white;
	}
</style>
