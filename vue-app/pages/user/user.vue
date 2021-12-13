<template>
	<view>
		<u-transition :show="true" mode="slide-right">
		
		<user-card :user="user" :isStatic="true"></user-card>
		
		<view class="cell-group">
			<u-cell-group :border="false">
				<u-cell size="large" isLink @tap="jump(item.url)" v-for="(item, index) in list" :key="index" :title="item.title">
					<u-avatar
						slot="icon"
						size="30"
						:icon="item.icon"
						fontSize="26"
						randomBgColor
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-cell-group>
		</view>
		
		
		</u-transition>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	import userCard from "@/components/chat/user-card.vue"
	import base from '@/util/baseUrl.js';
	export default {
		components:{
			userCard
		},
		data() {
			return {
				show:true,
				webUrl:base.webUrl,
				list: [
					{
						title: '相册',
						color: '#00aaff',
						icon: 'photo',
						url:'pages/user/album'
					},
					{
						title: '设置',
						color: '#00aaff',
						icon: 'setting',
						url:'pages/seting/index'
					}
				],
			}
		},
		onNavigationBarButtonTap({ index }) {
			this.jump('/pages/find/releaseCircle')
		},
		computed: {
			...mapState(['user','chatObj'])
		},
		methods: {
			jump(url){
				this.$u.route({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
.perch{
	height: 10rpx;
}
.cell-group{
	background-color: white;
}
.userinfo{
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20rpx 30rpx 40rpx 40rpx;
	background-color: #FFFFFF;
	.img{
		display: block;
		width: 110rpx;
		height: 110rpx;
		border-radius: 10rpx;
	}
	&-desc{
		padding-left: 30rpx;
		&-name{
			font-weight: bold;
			font-size: 36rpx;
			transform: translateY(-10rpx);
		}
		&-gray{
			color: $u-tips-color;
			font-size: 29rpx;
		}
	}
}
</style>
