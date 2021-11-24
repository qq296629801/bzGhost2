<template>
	<view>
		<view class="head">
			<view class="avatar">
				<u-avatar @tap="previewImage" shape="square" src="/static/image/huge.jpg" size="80"></u-avatar>
			</view>
			<view class="box">
				<view class="name">{{user.realname}}</view>
				<view class="money">{{user.money}}</view>
			</view>
			<view class="arrow">
				<u-icon name="arrow-right" color="#969799" size="30" @tap="jump('pages/user/my')"></u-icon>
			</view>
		</view>
		
		<view class="">
			<u-cell-group>
				<u-cell @tap="jump(item.url)" v-for="(item, index) in list" :key="index" :title="item.title">
					<u-icon slot="icon" :name="item.icon" :color="item.color" size="30"></u-icon>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
				show:true,
				list: [
					{
						title: '相册',
						color: '#00aaff',
						icon: 'photo-fill',
						url:'pages/user/album'
					},
					{
						title: '设置',
						color: '#00aaff',
						icon: 'setting-fill',
						url:'pages/seting/index'
					}
				],
			}
		},
		onLoad() {
		},
		computed: {
			...mapState(['user','chatObj'])
		},
		methods: {
			jump(url){
				this.$u.route({
					url:url
				})
			},
			previewImage() {
				let current = '/static/image/huge.jpg'
				uni.previewImage({
					current,
					urls: [current],
					// #ifndef MP-WEIXIN
					indicator: 'number'
					// #endif
				});
			}
		}
	}
</script>

<style lang="scss">
.head{
	display: flex;
	align-items: center;
	padding: 30rpx;
	height: 300rpx;
	.avatar{
		display: flex;
		width: 30%;
	}
	.box{
		display: flex;
		width: 60%;
		flex-direction: column;
		.name{
			font-weight: bold;
		}
		.money{
			color: #565656;
		}
	}
	.arrow{
		display: flex;
		width: 10%;
	}
}
</style>
