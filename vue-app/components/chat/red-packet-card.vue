<template>
	<view>
		<view
			class="contentType4" 	
			@tap="showCard(item)"
		>
			<div class="packet">
			  <view class="img">
				  <image src="/static/img/red.png"></image>
			  </view>
			  <span>{{ packet }}</span>
			</div>
			<div class="tag">红包</div>
		</view>
	</view>
</template>

<script>
	export default {
		name:'red-packet-card',
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
			};
		},
		computed:{
			packet:function(v){
				let message = JSON.parse(this.item.content)
				return message.Packets[0]
			}
		},
		methods:{
			showCard(item){
				this.$emit("showCard", item)
			}
		}
	}
</script>

<style lang="scss" scoped>
 @import '@/pages/chat/index.scss'
</style>
