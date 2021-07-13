<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar :is-back="false" title=" " :background="{ background: '#ffffff'  }" :border-bottom="false"></u-navbar>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<u-cell-group>
			<u-cell-item title="头像" :title-style="{ marginLeft: '10rpx' }">
				<u-upload :showUploadList="false" style="display: inline;" :custom-btn="true" @on-uploaded="onUploaded" :action="action">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon :name="`${$url}/${userData.user.avatar}`" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</u-cell-item>
			<u-cell-item title="名字" @tap="linkTo(userData.user.realname,0)" :value="userData.user.realname" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item title="用户名" :arrow="false" :value="userData.user.username" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
		</u-cell-group>
		<view style="height: 20rpx;"></view>
		<u-cell-group>
			<u-cell-item title="分享码" :arrow="false" :value="userData.user.invitationCode" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item title="邀请码" :arrow="false" :value="userData.user.invitationPerson" :title-style="{ marginLeft: '10rpx' }">
			</u-cell-item>
			<u-cell-item @tap="linkToQrcode" title="二维码" :title-style="{ marginLeft: '10rpx' }">
				<view style="font-size: 16px;color: #969799;" class="iconfont iconxingzhuangjiehe"></view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action:this.$uploadUrl,
				filesArr: [],
			}
		},
		methods: {
			onUploaded(lists) {
				this.filesArr = lists;
				let res = lists[0];
				if(res.response===undefined){
					uni.showToast({
						title:'文件错误',
						icon:'none'
					})
				}
				this.$socket.updateAvatar(this.userData.user.operId, res.response.data, res => {
				  this.userData.user = res.response.data;
				  });
			},
			linkToQrcode(){
				this.$u.route({
					url: 'pages/qrcode/qrcode'
				});
			},
			linkTo( context, type){
				this.$u.route({
					url: 'pages/chat/groupEdit',
					params: { context, type }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slot-btn {
	}
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
</style>
