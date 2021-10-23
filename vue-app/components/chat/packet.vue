<template>
	<view>
		<u-popup :mask="false" v-model="pStatus" :mask-close-able="false">
			<view class="top">
				拼手气红包 :(
			</view>
			<view class="content">
				<view class="luck">
					<view class="row">
						<view class="term">
							红包个数
						</view>
						<view class="input">
							<u-input v-model="packet.number" placeholder="填写个数" type="number" />
						</view>
					</view>
					<view class="row">
						<view class="term">
							总金额
						</view>
						<view class="input">
							<u-input v-model="packet.money" placeholder="0.00" type="number" /> 元
						</view>
					</view>
					<view class="blessing">
						<u-input v-model="packet.blessing" placeholder="恭喜发财,大吉大利！" type="textarea" />
					</view>
					<u-button @tap="close">返回</u-button>
					<u-button type="error"@tap="hand">塞钱进红包</u-button>
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
					blessing: null,
					money: null,
					number: null,
					status: 0
				},
				typeClass:''
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
	// background-color: #F6F7F8;
	.slot-wrap {
		display: flex;
		align-items: center;
	}
	view{
		display: flex;
		flex-wrap: wrap;
	}
	.top{
		height: 300rpx;
		color: #bd9008;
		padding: 100rpx;
		
	}
	.content{
		height: 550rpx;
		margin: 20rpx;
		border-radius: 10rpx;
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
			
			border-bottom: #e2e2e2 solid 3upx;
		}
		.row,.blessing{
			padding: 0 3%;
		}
		.row,.blessing,.hand{
			height: 100upx;
			align-items: center;
		}
		.row{
			background-color: #F6F7F8;
			font-size: 25rpx;
			font-weight: 600;
			justify-content: space-between;
			flex-wrap: nowrap;
			.term{
				width: 30%;
			}
			.input{
				width: 70%;
			}
			.input{
				flex-shrink: 0;
				flex-wrap: nowrap;
				justify-content: flex-end;
				align-items: center;
			}
		}
		.tis{
			height: 100upx;
			padding: 30upx 3%;
			font-size: 30upx;
			color: #919191;
		}
		.blessing{
			color: #fff;
			input{
				width: 100%;
				height: 50upx;
				font-size: 30upx;
				font-weight: 600;
			}
		}	
	}
</style>
