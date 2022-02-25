<template>
	<view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	import cache from '@/util/cache.js';
	const postfix = 'msgItem_';
	export default {
		computed: {
			...mapState(['user','packetPush'])
		},
		watch:{
		    packetPush: function(v){
				switch(v.code){
					case 1:
					let userId = this.user.operId
					let chatId = v.eventValue
					let para = {
						 userId,
						 chatId,
						 chatType : v.eventObj,
						 pageNum : 1,
						 pageSize : 10,
						 condition : ''
					}
					
					this.$http.post('/app/msg/list', para).then(res=>{
						cache.set(postfix+chatId,res.list)
					});
					
					this.$http.post('app/conversation/list', {
						userId
					}).then(res=>{
						this.$store.commit("setConversation", res)
					});
					break;
					default:
				}
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
