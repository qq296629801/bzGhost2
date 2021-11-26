<template>
	<view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="winState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="close()"></view>
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
						<view class="img" @tap="open()">开</view>
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
	export default {
		name:'red-packet-window',
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
