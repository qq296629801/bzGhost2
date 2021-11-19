<template>
	<view class="face-wrap">
		<view class="face-btn" @tap="handleRemoveEmoji">
			<image src="@/static/img/clear.png"></image>
		</view>
		<view class="" v-for="(item,index) in faceList">
			<view class="face-box" @tap="handleClikEmoji(item)">
				<image class="face" :src="faceMap[item]"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { faceUtils } from '@/util/ChatUtils.js';
	export default {
		name:'face',
		data() {
			return {
				faceList: faceUtils.alt,
			    faceMap: faceUtils.faces(),
				cur:''
			}
		},
		methods: {
			handleRemoveEmoji() {
			},
			handleClikEmoji(item) {
				console.log(item)
				this.$emit('addEmoji', item)
			}
		}
	}
</script>

<style lang="scss">
	.face-wrap {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		
		.face-box {
			width: 60rpx;
			height: 60rpx;
		}
		
		.swiper-wrap {
			height: 100%;
		}

		.face-btn {
			z-index: 1;
			position: fixed;
			padding: 10rpx;
			border-radius: 10rpx;
			right: 0;
			bottom: 0;
			background-color: #fff;
			image{
				width: 64rpx;
				height: 64rpx;
			}
		}

		.face {
			width: 100%;
			height: 100%;
		}
	}
</style>
