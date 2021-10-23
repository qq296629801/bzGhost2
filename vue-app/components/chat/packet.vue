<template>
	<view>
		<u-popup v-model="pStatus" :mask-close-able="false">
			<u-navbar :is-back="false">
				<view class="slot-wrap" @click="close">
					<u-icon name="arrow-left"></u-icon>
					返回
				</view>
			</u-navbar>
			<view style="height: 300rpx;">
			</view>
			<view class="content">
				<view class="luck">
					<view class="row">
						<view class="term">
							红包个数
						</view>
						<view class="input">
							<input type="number" v-model="packet.number" placeholder="输入红包个数"  /> 个
						</view>
					</view>
					<view class="row">
						<view class="term">
							总金额
						</view>
						<view class="input">
							<input type="number" v-model="packet.money" placeholder="输入金额" /> 元
						</view>
					</view>
					<view class="blessing">
						<input type="text" maxlength="12" placeholder="" v-model="packet.blessing"  />
					</view>
					<view class="hand" @tap="hand">
						发红包
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'packet',
		props: {
			pStatus: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				packet: {
					blessing: '恭喜发财,大吉大利！',
					money: 100.00,
					number: 5,
					status: 0
				}
			};
		},
		methods:{
			close(){
				this.$emit('close',false)
			},
			hand(){
				this.$emit('packet',this.packet)
			}
		}
	}
</script>

<style lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
	}
	view{
		display: flex;
		flex-wrap: wrap;
	}
	.tabr{
		width: 94%;
		height: 100upx;
		padding: 0 5%;
		border-bottom: solid 1upx #dedede;
		view{
			width: 50%;
			height: 100upx;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			font-weight: 600;
			color: #171717;
		}
		.on{
			color: #E3653E;
			font-size: 16px;
			font-weight: 600;
		}
		.border{
			height: 4px;
			background-color: #E3653E;
			-webkit-transition: all .3s ease-out;
			transition: all .3s ease-out;
			margin-top: -3px;
			border-radius: 10px;
			&.normal{
				transform: translate3d(100%,0,0);
			}
		}
		
	}
	.content{
		width: 100%;
		height: 550rpx;
		overflow: hidden;
		&.normal{
			.luck{
				transform: translate3d(-100%,0,0);
			}
			.normal{
				transform: translate3d(0,-100%,0);
			}
		}
		.luck,.normal{
			
			transition: all .3s ease-out;
		}
		.luck{
			
		}
		.normal{
			transform: translate3d(100%,-100%,0);
		}
		.row,.tis,.blessing,.hand{
			width: 90%;
		}
		.row,.tis,.blessing{
			border-bottom: #eeeeee solid 3upx;
		}
		.row,.blessing{
			padding: 0 3%;
			background-color: #fff;
		}
		.row,.blessing,.hand{
			height: 100upx;
			align-items: center;
		}
		.row{
			font-size: 25rpx;
			font-weight: 600;
			color: #000000;
			justify-content: space-between;
			flex-wrap: nowrap;
			.term,.input{
				width: 50%;
			}
			.input{
				flex-shrink: 0;
				flex-wrap: nowrap;
				justify-content: flex-end;
				align-items: center;
				input{
					height: 50upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					text-align: right;
					margin-right: 100upx;
					font-size: 30upx;
				}
			}
		}
		.tis{
			height: 100upx;
			padding: 30upx 3%;
			font-size: 30upx;
			color: #919191;
		}
		.blessing{
			input{
				width: 100%;
				height: 50upx;
				font-size: 30upx;
				font-weight: 600;
			}
		}	
		.hand{
			margin: 30upx 30%;
			color: #fff;
			font-size: 34upx;
			justify-content: center;
			background-color: #F5A48A;
			border-radius: 100upx;
			height: 90upx;
		}
	}
		
</style>
