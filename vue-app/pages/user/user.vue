<template>
	<view>
		<view class="head">
			<view class="avatar">
				<u-avatar shape="square" src="https://cdn.uviewui.com/uview/album/1.jpg" size="60"></u-avatar>
			</view>
			<view class="box">
				<view class="name">
					<u--text size="22" mode="name" :text="user.realname"></u--text>
				</view>
				<view class="money">
					<u--text type="info" :text="user.money"></u--text>
				</view>
			</view>
			<view class="arrow">
				<u-icon name="arrow-right" color="#969799" size="30" @tap="jump('pages/user/my')"></u-icon>
			</view>
		</view>
		
		<u-gap height="10" bgColor="#f6f7f8"></u-gap>
		
		<view class="cell-group">
			<u-cell-group>
				<u-cell isLink @tap="jump(item.url)" v-for="(item, index) in list" :key="index" :title="item.title">
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
.cell-group{
	background-color: white;
}
.head{
	display: flex;
	align-items: center;
	padding: 30rpx;
	height: 300rpx;
	background-color: white;
	.avatar{
		display: flex;
		width: 20%;
	}
	.box{
		display: flex;
		width: 70%;
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
