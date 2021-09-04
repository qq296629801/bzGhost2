<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon @tap="jump('pages/firendCircle/firendCircle')" name="camera-fill" color="#000000" size="40"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 u-p-r-30">
				<u-avatar @tap="previewImage" mode="square" src="/static/image/girl.jpg" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userData.user.realname}}</view>
				<view class="u-font-14 u-tips-color">{{userData.user.money}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<view style="font-size: 16px;color: #969799;" class="iconfont iconxingzhuangjiehe" @tap="jump('pages/my/person')"></view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28" @tap="jump('pages/my/person')"></u-icon>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @tap="jump(item.url)" v-for="(item, index) in groupList" :key="index" :title="item.title" :title-style="{ marginLeft: '30rpx' ,fontWeight:'800'}">
					<u-icon slot="icon" :name="item.icon" :color="item.color" size="40"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
				pic:'',
				show:true,
				groupList: [
					{
						title: '视频',
						color: '#1fb6f1',
						icon: 'play-circle-fill',
						url:'pages/index/index'
					},
					{
						title: '商店',
						color: '#1fb6f1',
						icon: 'shopping-cart-fill',
						url:'pages/my/face'
					}
					,
					{
						title: '友圈',
						color: '#1fb6f1',
						icon: 'moments-circel-fill',
						url:'pages/firendCircle/firendCircle'
					},
					{
						title: '设置',
						color: '#1fb6f1',
						icon: 'setting-fill',
						url:'pages/setings/setings'
					}
				],
			}
		},
		onLoad() {
		},
		computed: {
			...mapState(['userData','chatObj'])
		},
		methods: {
			jump(url){
				this.$u.route({
					url:url
				})
			},
			previewImage() {
				// let current = this.$url + this.userData.user.avatar
				let current = '/static/image/girl.jpg'
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
page{
	background-color: #F6F7F8;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
