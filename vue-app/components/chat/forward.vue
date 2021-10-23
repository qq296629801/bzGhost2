<template>
	<view>
		<view v-for="(item,index) in list">
			<message @jump="b(item)" :value="item" :index="index"></message>
		</view>
	</view>
</template>

<script>
	import message from '@/components/message.vue'
	import dbMessage from '@/util/chat/db_message.js'
	import dbCommon from '@/util/chat/db_common.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:'forward',
		components:{message},
		data() {
			return {
				list:[],
				message:'',
				msgType:0,
			};
		},
		onShow(){
			this.a()
		},
		onLoad({message,msgType}) {
			this.message=message;
			this.msgType=msgType;
		},
		computed:{
			...mapState(['userData','chatObj'])
		},
		methods:{
			a(){
				dbCommon.get('conversation').then(res=>{
					this.list = res
				});
			},
			b(item){
				this.$http.post('app/conversation/create',item);
				
				// 服务器还需要存储
				
				const params = {
					hasBeenSentId: Date.now(), //已发送过去消息的id
					content: this.message,
					fromUserHeadImg: '/static/logo.png', //用户头像
					fromUserId: this.userData.user.operId,
					fromUserName:this.userData.user.username,
					isItMe: true, //true此条信息是我发送的  false别人发送的
					createTime: Date.now(),
					contentType: 0,
					userId:this.userData.user.operId,
					toUserId:this.chatObj.chatId,
					toUserHeadImg:'/static/logo.png',
					toUserName:this.chatObj.chatName,
					chatType:this.chatObj.chatType
				};
				
				this.$socket.sendMessage(params, res=>{
					console.log(JSON.stringify(res));
					//dbMessage.commit(res,this.chatObj.chatId);
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
