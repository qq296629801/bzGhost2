<template>
	<view>
		<u-popup v-model="pStatus" :mask-close-able="false">
			<view style="height: 300rpx;"></view>
			<view class="content">
				<view class="luck">
					<view class="row">
						<view class="term">
							红包个数
						</view>
						<view class="input">
							<u-input v-model="packet.number" type="number" />
						</view>
					</view>
					<view class="row">
						<view class="term">
							总金额
						</view>
						<view class="input">
							<u-input v-model="packet.money" type="number" /> 元
						</view>
					</view>
					<view class="blessing">
						<u-input v-model="packet.blessing" type="text" />
					</view>
					<u-button type="success" @tap="close">返回</u-button>
					<u-button type="error" @tap="hand">发送</u-button>
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
				},
				typeClass:''
			};
		},
		methods:{
			tt(){
				this.typeClass ='normal'
			},
			ttt(){
				this.typeClass =''
			},
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
