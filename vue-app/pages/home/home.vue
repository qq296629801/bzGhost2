<template>
	<view class="content">
		<!-- 会话列表 -->
		<msg-list></msg-list>
	</view>
</template>

<script>
import msgList from '@/components/msg/msg-list.vue'
import { mapState, mapMutations} from 'vuex';
export default {
	components:{
		msgList
	},
	watch:{
		// 监听服务器是否有推送数据
		// 后期优化为推送单条数据
        newsPush: function(v){
			console.log(v)
			
			let userId = this.user.operId;
			this.$http.post('app/conversation/list', {
				userId
			}).then(res=>{
				this.$store.commit("setConversation", res)
			});
		}
	},
	computed: {
		...mapState(['newsPush','conversation','user'])
	},
	methods: {
		jump(item){
			this.$store.commit("setChatObj",item);
			this.$u.route({
				url: 'pages/chat/chat'
			})
		},
		onNavigationBarButtonTap({ index }) {
			console.log(index)
		}
	},
};
</script>
<style lang="scss">
</style>