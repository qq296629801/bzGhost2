<template>
	<view>
		<view v-for="(item,index) in list">
			<message @jump="b(item)" :value="item" :index="index"></message>
		</view>
	</view>
</template>

<script>
	import message from '@/components/message.vue'
	import dbMessage from '@/util/db_message.js'
	export default {
		name:'forward',
		components:{message},
		data() {
			return {
				list:[]
			};
		},
		onShow(){
			this.a()
		},
		methods:{
			a(){
				common.get('conversation').then(res=>{
					this.list = res
				});
			},
			b(item){
				this.$http.post('app/conversation/create',item);
				
				// 存储服务器
				// 区分 群组 私聊
				// let reqData = {
				// 	groupId: this.chatObj.chatId,
				// 	userId: this.userData.user.operId,
				// 	message: this.formData.content,
				// 	msgType: 0
				// }
				// this.$http.post('app/group/msg/add', reqData);
				
				this.$socket.sendMessage(params, res=>{
					dbMessage.commit(res,chatId);
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
