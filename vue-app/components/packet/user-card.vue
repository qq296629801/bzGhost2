<template>
	<view class="bg">
		<u-cell-group :border="false">
			<u-cell 
			@tap="jumpMy"
			:title="user.userName || user.nickName || user.username" :label="user.money" size="large" isLink>
				<u-avatar
					@tap="jumpImage(webUrl + user.avatar)"
					slot="icon"
					size="60"
					shape="square"
					:src="webUrl + user.avatar"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>
		</u-cell-group>
		
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
	</view>
</template>

<script>
	import base from '@/util/baseUrl.js';
	export default {
		name:'user-card',
		props:{
			user:{
				type:Object,
				default:{}
			},
			isStatic:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				webUrl:base.webUrl
			};
		},
		methods:{
			jumpMy(){
				this.$u.route({
					url: 'pages/user/my'
				})
			},
			jumpImage(urls){
				uni.previewImage({urls:[urls]})
			}
		}
	}
</script>

<style lang="scss">
.bg{
	background-color: white;
}
</style>
