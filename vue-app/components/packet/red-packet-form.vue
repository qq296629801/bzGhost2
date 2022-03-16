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
											v-model="model1.packet.money"
											border="none"
									></u--input>
								</u-form-item>
								<u-form-item
										label="个数"
										prop="userInfo.name"
										borderBottom
										ref="item1"
								>
									<u--input
											v-model="model1.packet.number"
											border="none"
									></u--input>
								</u-form-item>
								<u-form-item
										prop="userInfo.name"
										borderBottom
										ref="item1"
								>
									<u--input
											v-model="model1.packet.description"
											border="none"
									></u--input>
								</u-form-item>
									
							</u--form>
							<u-button type="error"@tap="save">塞钱进红包</u-button>
							<u-gap height="10"></u-gap>
							<u-button @tap="cancer">撤退</u-button>
							<u-gap height="10"></u-gap>
				</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'red-packet-form',
		props: {
			pShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				model1: {
					packet: {
						description: '大吉大利，今晚吃鸡！',
						money: 100.00,
						number: 1,
						status: 0,
					},
				},
				rules: {
					'packet.money': {
						type: 'number',
						required: true,
						message: '100.00',
						trigger: ['blur', 'change']
					},
					'packet.number': {
						type: 'number',
						required: true,
						message: '1',
						trigger: ['blur', 'change']
					},
					'packet.description': {
						type: 'string',
						required: true,
						message: '1',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		methods:{
			cancer(){
				this.$emit('cancer',false)
			},
			save(){
				this.$emit('save',this.model1.packet)
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 100rpx;
		background-color: #fff;
	}
</style>
