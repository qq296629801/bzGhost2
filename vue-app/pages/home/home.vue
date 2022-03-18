<template>
	<view class="content">
		<public-module></public-module>
		<!-- 会话列表 -->
		<msg-list></msg-list>
	</view>
</template>

<script>
import msgList from '@/components/list/msg-list.vue'
import { mapState, mapMutations} from 'vuex';
import cache from '@/util/cache.js';
const postfix = 'msgItem_';
export default {
	components:{
		msgList
	},
	computed: {
		...mapState(['conversation','user','packetPush'])
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
				case 6:
					console.log(JSON.stringify(v));
					break;
				default:
			}
		}
	},
	methods: {
		jump(item){
			this.$store.commit("setChatObj",item);
			uni.navigateTo({
				url:'/pages/chat/chat'
			})
		},
		onNavigationBarButtonTap({ index }) {
			uni.navigateTo({
				url:'/pages/search/search'
			})
		}
	},
};
</script>
<style lang="scss">
</style>