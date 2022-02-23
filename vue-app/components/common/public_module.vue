<template>
	<view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	export default {
		computed: {
			...mapState(['user','packetPush'])
		},
		watch:{
		    packetPush: function(v){
				switch(v.code){
					case 1:
					if(v.eventObj==1){
						// 更新群消息
						
						// 更新会话
						let userId = this.user.operId;
						this.$http.post('app/conversation/list', {
							userId
						}).then(res=>{
							this.$store.commit("setConversation", res)
						});
					}
					break;
					case 2:
						console.log(2);
						break;
					default:
				}
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
