<template>
	<view>
		<view
			class="contentType4" 	
			@tap="showCard(item)"
		>
			<div class="packet" :class="isItMe || packet.surplusNumber==0?'close':'open'">
			  <view class="img" v-if="isItMe || packet.surplusNumber==0">
				   <image src="/static/img/red-chai.png"></image>
			  </view>
			  <view class="img" v-else>
				 <image src="/static/img/red.png"></image>
			  </view>
			  <span>{{ packet.description }}</span>
			</div>
			<div class="tag" :class="isItMe || packet.surplusNumber==0?'close':'open'">红包</div>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
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
			...mapState(['user']),
			packet:function(v){
				let message = JSON.parse(this.item.content)
				return message.Packets[0]
			},
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
