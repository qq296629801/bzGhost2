<template>
	<view>
		<view v-for="(item,index) in list">
			<chatItem @linkTo="jump" :value="item" :index="index"></chatItem>
		</view>
	</view>
</template>

<script>
	import chatItem from '@/components/chatItem.vue'
	//import { queryChat } from '@/util/chatStorage.js'
	import {  cacheGroupMsg, cacheChats } from '@/util/yiqun.js'
	export default {
		name:'forward',
		components:{chatItem},
		data() {
			return {
				msgContext:'',
				msgType:0,
				list:[]
			};
		},
		onShow(){
		},
		onLoad({msgContext,msgType}) {
			this.msgContext = msgContext
			this.msgType = msgType
			this.a()
		},
		methods:{
			a(){
				// 查询缓存
				queryChat(this.userData.user.operId).then(data=>{
					this.list = data
				}).catch(e=>{
					//刷新缓存
					cacheChats(this.userData.user.operId).then(data=>{
						this.list = data
					});
				});
			},
			jump({chatId,chatType}){
				let action = chatType ==1 ? 'send2Group' : 'send2Friend'
				this.$socket[action](chatId, this.userData.user.operId, this.msgContext, this.msgType, res => {
					if (res.success) {
						cacheChats(this.userData.user.operId).then(data=>{
							this.list = data
							this.$u.vuex('push','转发成功');
							this.util.modal('转发成功');
						});
						cacheGroupMsg(this.userData.user.operId).then(data=>{
						});
						this.$socket.createChatList(this.userData.user.operId, chatId, this.msgContext, this.msgType, res => {})
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
