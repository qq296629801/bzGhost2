<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<view class="top">
			<view class="blessing">
				{{ packetData.userName}}的红包
			</view>
			<view class="money">
				{{packetData.robMoney}}
			</view>
			<view class="face" :style="{'border-radius':radius}">
				<image :src="webUrl + packetData.userAvatar"></image>
			</view>
			<view class="desc">
				{{packetData.description}}
			</view>
		</view>
		<view class="info">
			剩余 {{ packetData.surplusNumber }}个，共{{ packetData.number }} 个
		</view>
		<view class="list">
			<view class="row" v-for="(row,index) in packetData.Records" :key="index">
				<view class="left">
					<image :src="webUrl + row.userAvatar"></image>
				</view>
				<view class="right">
					<view class="r1">
						<view class="username">
							{{row.userName}}
						</view>
						<view class="money">
							{{row.money}}元
						</view>
					</view>
					<view class="r2">
						<view class="time">
							{{row.lastUpdateTime}}
						</view>
						<view class="lucky" v-if="row.isLucky">
							手气王
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import base from '@/util/baseUrl.js';
	export default {
		data() {
			return {
				radius:'100% 100% 0 0',
				scrollTop:0,
				webUrl: base.webUrl
			};
		},
		computed:{
			...mapState(['packetData'])
		},
		onPageScroll(e) {
			if(e.scrollTop>100){return;}
			let radiusTmp = 100 - e.scrollTop;
			this.radius = radiusTmp+'% '+radiusTmp+'% 0 0';
		}
	}
</script>

<style lang="scss">
	view{
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
	}
	.top{
		width: 100%;
		background-color: #EC624F;
		flex-wrap: wrap;
		.blessing,.money{
			width: 100%;
			color: #f8d757;
			padding: 50upx 0;
			justify-content: center;
			font-size: 34upx;
			background: #EC624F;
		}
		.money{
			font-size: 100upx;
		}
		.face{
			background-color: #fff;
			justify-content: center;
			width: 100%;
			height: 130upx;
			margin-top: 65upx;
			border-radius: 100% 100% 0 0;
			transition: border-radius .15s;
			image{
				width: 130upx;
				height: 130upx;
				border-radius: 100%;
				margin-top: -65upx;
			}
		}
		.username{
			width: 100%;
			justify-content: center;
			background-color: #fff;
			font-size: 16rpx;
			padding-bottom: 60rpx;
		}
		.desc{
			width: 100%;
			justify-content: center;
			background-color: #fff;
			font-size: 32rpx;
			font-weight: 600;
			padding-bottom: 30rpx;
		}
	}
	.info{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		padding-left: 4%;
		font-size: 28upx;
		color: #999;
		border-bottom: 2rpx solid #ededee;
	}
	.list{
		width: 100%;
		.row{
			width: 92%;
			padding: 0 4%;
			height: 120upx;
			border-bottom: solid 1upx #ececec;
			justify-content:flex-start;
			flex-wrap: nowrap;
			.left{
				flex-shrink: 0;
				width: 100upx;
				height: 110upx;
				justify-content: flex-start;
				align-items: center;
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 100%;
				}
			}
			.right{
				width: 100%;
				height: 100upx;
				.r1{
					width: 100%;
					height: 70upx;
					justify-content: space-between;
					align-items: center;
					font-size: 34upx;
					.username{
						font-weight: 600;
					}
				}
				.r2{
					width: 100%;
					height: 30upx;
					justify-content: space-between;
					font-size: 26upx;
					.time{
						color: #8F8F94;
					}
					.lucky{
						padding: 3upx 8upx;
						border-radius: 5upx;
						background-color: #F8D757;
						align-items: center;
						height: 30upx;
						font-size: 24upx;
						color: #CF3C35;
					}
				}
			}
		}
	}
</style>
