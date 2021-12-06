<template>
	<view>
		<view class="windows" :class="winState">
			<view class="mask" @touchmove.stop.prevent="discard" @tap="close()"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="red-packet">
					<view class="avatar">
						<u-avatar size="50" :src="webUrl + packet.userAvatar"></u-avatar>
						{{ packet.userName}} 的红包
					</view>
					<view class="desc">
						{{packet.description}}
					</view>
					<view class="money">
						{{robMoney}}
					</view>
					<view class="to">
						<view v-if="!isItMe && packet.surplusNumber !=0" class="open" @tap="open()">开</view>
					</view>
					<view class="showDetails" @tap="jumpDetail">
						查看领取详情
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
		name:'red-packet-window',
		data() {
			return {
				webUrl:base.webUrl
			};
		},
		props: {
			winState: {
				type: String,
				default: ''
			},
			packet:{
				type:Object,
				default() {
					return {};
				}
			}
		},
		computed:{
			...mapState(['user']),
			isItMe:function(){
				let flag = false;
				let records = this.packet.Records;
				if(records){
					for(var i in records){
						if(records[i].userName==this.user.username){
							flag = true;
						}
					}
				}
				return flag;
			},
			robMoney:function(){
				let records = this.packet.Records;
				if(records){
					for(var i in records){
						if(records[i].userName==this.user.username){
							return records[i].money
						}
					}
				}
			}
		},
		methods:{
			discard(){
				return;
			},
			open:function(){
				this.$emit('open')
			},
			close: function(){
				this.$emit('close')
			},
			jumpDetail(){
				uni.navigateTo({
					url:'/pages/chat/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
@import "@/pages/chat/index.scss";
</style>
