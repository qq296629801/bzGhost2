<template>
	<view>
		<view class="body-box">
			<view class="b-title">
				<view class="t-dot"></view>
				<view class="t-title">{{title}}</view>
				<view class="t-border">
				</view>
			</view>
			<view class="body">
				<u-read-more ref="uReadMore">
					<u-parse :html="content" @load="parseLoaded"></u-parse>
				</u-read-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'detail-title',
		props: {
			content: String, 
			title:String
		},
		data() {
			return {
			};
		},
		methods:{
			parseLoaded() {
				this.$refs.uReadMore.init();
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
.body-box{
	text-indent: 1em;
	.b-title{
		margin-top: 20rpx;
		display: -webkit-flex; /* Safari */
	    display: flex;
		height: 50rpx;
		font-size: 30rpx;
		font-weight: 600;
		.t-dot{
			height: 30rpx;
			width: 6rpx;
			background-color: #64b532;
			margin-left: 1em;
		}
		.t-title{
			text-indent: 1em;
			width: 250rpx;
			overflow: hidden;
			line-height: 30rpx;
		}
		.t-border{
			height: 3rpx;
			background-color: #dedede;
			margin-top: 20rpx;
			width: 100%;
		}
	}
}
</style>
