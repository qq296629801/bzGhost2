<template>
	<view>
		<view>群组：{{chatObj.chatName}}</view>
		<view>当前发送消息数：{{count}}</view>
		<u-button @tap="myFunction" text="开始"></u-button>
		<u-button @tap="delFunction" text="结束"></u-button>
	</view>
</template>

<script>
	import webim from '@/util/socket/webim.js'
	var myVar = null;
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				msg:'',
				count:0
			};
		},
		computed:{
			...mapState(['user','chatObj'])
		},
		methods:{
			delFunction(){
				clearInterval(myVar);
			},
			myFunction() {
			    myVar = setInterval(this.testConcurrent, 500);
			},
			testConcurrent(){
				let _t = this;
				const params = {
					isItMe:true,
					contentType: 0,
					content: Date.now(),
					createTime: Date.now(),
					hasBeenSentId: Date.now(),
					fromUserId: _t.user.operId,
					fromUserName: _t.user.username,
					fromUserHeadImg: _t.user.avatar,
					userId: _t.user.operId,
					toUserId: _t.chatObj.chatId,
					toUserName: _t.chatObj.chatName,
					toUserHeadImg:_t.chatObj.avatar,
					chatType: _t.chatObj.chatType,
				};
				_t.$socket.sendMessage(params, res=>{
					this.msg = res;
					this.count++;
					
					_t.$socket.push(data => {
						this.$store.commit("setPacketPush",data);
					}, 1, _t.chatObj.chatId,_t.chatObj.chatType);
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
