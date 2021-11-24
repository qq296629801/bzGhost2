<template>
	<view>
		<u-popup :show="pShow">
				<view class="content">
						<u--form
								labelPosition="left"
								:model="model1"
								:rules="rules"
								ref="form1"
								>
								<u-form-item
										label="金额"
										prop="userInfo.name"
										borderBottom
										ref="item1"
								>
									<u--input
											v-model="model1.userInfo.name"
											border="none"
									></u--input>
								</u-form-item>
									
							</u--form>
							<u-button type="error"@tap="hand">塞钱进红包</u-button>
							<u-button @tap="close">返回</u-button>
				</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'packet',
		props: {
			pShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				model1: {
					userInfo: {
						name: '0.00',
						sex: '',
					},
				},
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}
				},
				packet: {
					description: null,
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
		z-index: 999;
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
			border-radius: 10rpx;
			background-color: #fdfeff;
		}
		.row,.blessing{
			padding: 0 3%;
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
			color: #fff;
		}	
	}
</style>
