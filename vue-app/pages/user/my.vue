<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<u-cell-group>
			<u-cell title="头像">
				<u-avatar
					@tap="jumpImage(webUrl + user.avatar)"
					slot="right-icon"
					size="60"
					shape="square"
					:src="webUrl + user.avatar"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>
			
			<u-cell title="昵称" :value="user.realname">
			</u-cell>
			
			<u-cell title="手机" :arrow="false" :value="user.mobile">
			</u-cell>
			
		</u-cell-group>
		
	</view>
</template>

<script>
	import base from '@/util/baseUrl.js'
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				webUrl:base.webUrl,
			}
		},
		computed:{
			...mapState(['user'])
		},
		methods: {
			upAvatar(avatar){
				this.$http.post('user/upAvatar', this.user).then(res => {
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: white;
	}
</style>
