<template>
	<view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="winState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="hiddenCard"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="redenvelope">
					<view class="from">
						<image src="/static/image/huge.jpg"></image>  
					</view>
					<view class="blessing">{{ packet.userName }}发的红包</view>
					<view class="money" v-for="(item,index) in packet.Records">
						<view v-if="item.userName == user.username">
							{{ item.money }}
						</view>
					</view>
					<view class="to">
						<view class="close-btn">
							<view class="icon close"></view>
						</view>
						
						<view class="img" @tap="openCard">开</view>
					</view>
					<view class="showDetails" @tap="toDetails">
						查看领取详情
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		name:'red-card',
		data() {
			return {
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
			...mapState(['user'])
		},
		methods:{
			discard(){
				return;
			},
			openCard:function(){
				this.$emit('openCard')
			},
			hiddenCard: function(){
				this.$emit('hiddenCard')
			},
			toDetails(){
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
